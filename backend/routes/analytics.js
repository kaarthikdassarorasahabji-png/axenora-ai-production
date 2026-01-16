import express from 'express';
import Analytics from '../models/Analytics.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/analytics/track
// @desc    Track analytics event
// @access  Public
router.post('/track', async (req, res) => {
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

    await Analytics.create({
      event,
      page,
      sessionId,
      ipAddress,
      userAgent,
      referrer,
      metadata,
      userId: req.user?._id // If authenticated
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

    const query = {};

    // Date range filter
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    // Event filter
    if (event) {
      query.event = event;
    }

    // Get total events
    const totalEvents = await Analytics.countDocuments(query);

    // Get events by type
    const eventsByType = await Analytics.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$event',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get page views
    const pageViews = await Analytics.aggregate([
      {
        $match: {
          ...query,
          event: 'page_view'
        }
      },
      {
        $group: {
          _id: '$page',
          views: { $sum: 1 }
        }
      },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]);

    // Get unique sessions
    const uniqueSessions = await Analytics.distinct('sessionId', query);

    // Get events over time (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const eventsOverTime = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        uniqueSessions: uniqueSessions.length,
        eventsByType,
        pageViews,
        eventsOverTime
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

    const query = event ? { event } : {};

    const events = await Analytics.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Analytics.countDocuments(query);

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
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

export default router;
