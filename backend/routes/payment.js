import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { protect } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Initialize Razorpay
const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file');
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

// @route   POST /api/payments/create-order
// @desc    Create Razorpay order
// @access  Private (Auth required)
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, currency = 'INR', service, plan, customerName, customerEmail, customerPhone } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be at least ₹1 (100 paise)'
      });
    }

    const { id: userId } = req.user; // Get user ID from token

    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: Math.round(amount), // Amount in paise
      currency,
      receipt: `order_${Date.now()}`,
      notes: {
        service: service || '',
        plan: plan || '',
        userId: userId, // Add user ID to notes
        customerName: customerName || '',
        customerEmail: customerEmail || '',
        customerPhone: customerPhone || ''
      }
    });

    // Save payment record
    try {
      await supabase.from('payments').insert({
        user_id: userId, // Link to user
        razorpay_order_id: order.id,
        amount: amount / 100,
        currency,
        service,
        plan,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        status: 'created'
      });
    } catch (dbError) {
      console.warn('⚠️  Could not save to database:', dbError.message);
    }

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
});

// @route   POST /api/payments/verify
// @desc    Verify Razorpay payment signature
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification data'
      });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      // Update payment record
      await supabase
        .from('payments')
        .update({
          razorpay_payment_id,
          razorpay_signature,
          status: 'paid'
        })
        .eq('razorpay_order_id', razorpay_order_id);

      console.log('✅ Payment verified:', razorpay_payment_id);

      res.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id
      });
    } else {
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('razorpay_order_id', razorpay_order_id);

      console.log('❌ Payment verification failed for order:', razorpay_order_id);

      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Payment verify error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification error'
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Razorpay webhook events
// @access  Public (verified by signature)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    switch (event) {
      case 'payment.captured':
        const capturedPayment = payload.payment.entity;
        await supabase
          .from('payments')
          .update({
            razorpay_payment_id: capturedPayment.id,
            status: 'paid'
          })
          .eq('razorpay_order_id', capturedPayment.order_id);
        console.log('✅ Payment captured:', capturedPayment.id);
        break;

      case 'payment.failed':
        const failedPayment = payload.payment.entity;
        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('razorpay_order_id', failedPayment.order_id);
        console.log('❌ Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`Unhandled Razorpay event: ${event}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

// @route   GET /api/payments
// @desc    Get all payments (admin) or user payments
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    // If not admin, only show user's payments
    if (req.user.role !== 'admin') {
      query = query.eq('user_id', req.user.id);
    }

    const { data: payments, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Fetch payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payments'
    });
  }
});

// @route   GET /api/payments/:id
// @desc    Get single payment
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.user_id && payment.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Fetch payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment'
    });
  }
});

export default router;
