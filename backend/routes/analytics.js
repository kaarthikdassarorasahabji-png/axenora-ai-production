import express from 'express';
import rateLimit from 'express-rate-limit'; // Import rateLimit
import { supabase } from '../config/supabase.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Rate limiter for tracking events (e.g., 100 requests per 15 minutes)
const trackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// @route   POST /api/analytics/track
// @desc    Track analytics event
// @access  Public
router.post('/track', trackLimiter, async (req, res) => {
  try {
    const { event, page, sessionId, metadata } = req.body;

    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'Event is required'
      });
    }

    // Get IP and user agent
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers.referer || req.headers.referrer;

    await supabase.from('analytics').insert({
      event,
      page,
      session_id: sessionId,
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer,
      metadata,
      user_id: req.user?.id // If authenticated
    });

    res.json({
      success: true,
      message: 'Event tracked'
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track event'
    });
  }
});

// @route   GET /api/analytics/stats
// @desc    Get analytics statistics
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const { startDate, endDate, event } = req.query;

    // Build base query
    let query = supabase.from('analytics').select('*', { count: 'exact' });

    if (startDate) {
      query = query.gte('timestamp', startDate);
    }
    if (endDate) {
      query = query.lte('timestamp', endDate);
    }
    if (event) {
      query = query.eq('event', event);
    }

    const { count: totalEvents } = await query;

    // Get events by type (using RPC for aggregation)
    const { data: eventsByType } = await supabase.rpc('get_events_by_type', {
      start_date: startDate || null,
      end_date: endDate ||null,
      event_filter: event || null
    }).catch(() => ({ data: [] })); // Fallback if RPC doesn't exist

    // Get page views
    const { data: pageViews } = await supabase.rpc('get_page_views', {
      start_date: startDate || null,
      end_date: endDate || null
    }).catch(() => ({ data: [] }));

    // Get unique sessions
    const { data: sessionData } = await supabase
      .from('analytics')
      .select('session_id')
      .not('session_id', 'is', null);

    const uniqueSessions = new Set(sessionData?.map(d => d.session_id)).size;

    // Get events over time (last 7 days) - simplified version
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentEvents } = await supabase
      .from('analytics')
      .select('timestamp')
      .gte('timestamp', sevenDaysAgo.toISOString())
      .order('timestamp', { ascending: true });

    // Group by date on client side (since we don't have complex aggregation RPCs)
    const eventsOverTime = {};
    recentEvents?.forEach(e => {
      const date = new Date(e.timestamp).toISOString().split('T')[0];
      eventsOverTime[date] = (eventsOverTime[date] || 0) + 1;
    });

    const eventsOverTimeArray = Object.keys(eventsOverTime).map(date => ({
      _id: date,
      count: eventsOverTime[date]
    }));

    res.json({
      success: true,
      data: {
        totalEvents: totalEvents || 0,
        uniqueSessions,
        eventsByType: eventsByType || [],
        pageViews: pageViews || [],
        eventsOverTime: eventsOverTimeArray
      }
    });

  } catch (error) {
    console.error('Analytics stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

// @route   GET /api/analytics/events
// @desc    Get recent analytics events
// @access  Private/Admin
router.get('/events', protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 50, event } = req.query;

    let query = supabase
      .from('analytics')
      .select('*', { count: 'exact' })
      .order('timestamp', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (event) {
      query = query.eq('event', event);
    }

    const { data: events, count: total } = await query;

    res.json({
      success: true,
      data: events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Fetch events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

export default router;
