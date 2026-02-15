import express from 'express';
import { supabase } from '../config/supabase.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admin/analytics/overview
// @desc    Get dashboard overview stats
// @access  Private/Admin
router.get('/analytics/overview', protect, admin, async (req, res) => {
  try {
    // Mock data for now - in production this would query real tables
    // We'll implement real queries as we populate data
    
    // 1. Total Revenue (sum of all completed orders)
    const { data: revenueData, error: revenueError } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('payment_status', 'paid');
      
    // Debug logging
    console.log('Revenue Data:', revenueData);
    
    // Ensure total_amount is parsed as float
    const totalRevenue = revenueData?.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0) || 0;

    // 2. Active Clients (count of users with at least one order)
    const { count: activeClients } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // 3. Pending Orders
    const { count: pendingOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // 4. Active Services (count of running services)
    const { count: activeServices } = await supabase
      .from('user_services') 
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const responseData = {
      revenue: totalRevenue,
      activeClients: activeClients || 0, 
      pendingOrders: pendingOrders || 0,
      activeServices: activeServices || 0 
    };

    console.log('Admin Dashboard Stats Response:', responseData);

    res.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Error in analytics/overview:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/admin/clients
// @desc    Get all clients
// @access  Private/Admin
router.get('/clients', protect, admin, async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/admin/clients/:id/suspend
// @desc    Suspend/Activate a client
// @access  Private/Admin
router.put('/clients/:id/suspend', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expecting 'active' or 'suspended' or 'banned'

    // First check current status if not provided, or just toggle?
    // Let's assume frontend sends the *new* status or we toggle.
    // Let's implement toggle if status not provided, otherwise set.
    
    let newStatus = status;
    if (!newStatus) {
         const { data: profile } = await supabase.from('profiles').select('status').eq('id', id).single();
         newStatus = profile?.status === 'suspended' ? 'active' : 'suspended';
    }

    // We don't have a 'status' column in profiles yet usually? 
    // Let's check ensure_profile_columns.sql... it added 'status'.
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error suspending client:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        profiles:user_id (name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Private/Admin


router.put('/orders/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/admin/services/activations
// @desc    Get service activation requests
// @access  Private/Admin
router.get('/services/activations', protect, admin, async (req, res) => {
  try {
    // This assumes a 'user_services' table exists
    const { data, error } = await supabase
      .from('user_services')
      .select(`
        *,
        profiles:user_id (name, email)
      `)
      .order('created_at', { ascending: false });

    // if table doesn't exist yet, return empty or mock
    if (error) {
        console.warn('user_services table might not exist yet', error.message);
        return res.json({ success: true, data: [] });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
     res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   POST /api/admin/services/activate
// @desc    Activate a service manually
// @access  Private/Admin
router.post('/services/activate', protect, admin, async (req, res) => {
  try {
    const { userId, serviceId, tier, billingCycle } = req.body;
    
    const { data, error } = await supabase
        .from('user_services')
        .insert({
            user_id: userId,
            service_id: serviceId,
            tier,
            billing_cycle: billingCycle,
            status: 'active',
            start_date: new Date(),
            renewal_date: new Date(Date.now() + 30*24*60*60*1000) // +30 days mock
        })
        .select();

    if (error) throw error;

    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error activating service:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/admin/settings
// @desc    Get system settings
// @access  Private/Admin
router.get('/settings', protect, admin, async (req, res) => {
   // Placeholder
   res.json({
     success: true,
     data: {
       maintenance_mode: false,
       allow_registrations: true,
       email_notifications: true
     }
   });
});

export default router;
