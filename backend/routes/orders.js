import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabase } from '../config/supabase.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();



// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @route   GET /api/orders
// @desc    Get all orders for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch orders with items
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          service_name,
          tier_name,
          price,
          billing_cycle
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform order_items to items for frontend
    const formattedOrders = orders.map(order => ({
      ...order,
      items: order.order_items || []
    }));

    res.json({
      success: true,
      data: formattedOrders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @route   POST /api/orders/create
// @desc    Create new order for checkout
// @access  Private
router.post('/create', protect, async (req, res) => {
  try {
    const { items, total, billingDetails } = req.body;
    const userId = req.user.id;



    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in cart'
      });
    }

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`
    });



    // Create Order in Database
    const orderNumber = `ORD-${Date.now()}`;
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_number: orderNumber,
        total_amount: total,
        status: 'pending',
        payment_status: 'pending',
        razorpay_order_id: razorpayOrder.id,
        billing_name: billingDetails.name,
        billing_email: billingDetails.email,
        billing_phone: billingDetails.phone,
        billing_address: billingDetails.address,
        billing_city: billingDetails.city,
        billing_state: billingDetails.state,
        billing_country: billingDetails.country,
        order_notes: billingDetails.whatsapp ? `WhatsApp: ${billingDetails.whatsapp}` : null
      })
      .select()
      .single();

    if (orderError) {
      console.error('[Orders Debug] DB Insert Error:', orderError);
      throw orderError;
    }



    // Create Order Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      service_id: item.serviceId,
      service_name: item.serviceName,
      tier_name: item.tierName,
      price: item.price,
      billing_cycle: item.billingCycle
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('[Orders Debug] Order Items Error:', itemsError);
      throw itemsError;
    }



    res.json({
      success: true,
      order: razorpayOrder,
      internalOrderId: order.id
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
});

// @route   POST /api/orders/verify
// @desc    Verify Razorpay payment
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;



    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
  

      // Update order status to confirmed
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: 'confirmed',
          payment_status: 'paid',
          razorpay_payment_id: razorpay_payment_id,
          confirmed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      


      res.json({
        success: true,
        message: 'Payment verified successfully',
        order: data
      });
    } else {
      console.error('[Orders Debug] Invalid payment signature');
      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Admin: Update order status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'payment_confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const { data: order, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

export default router;
