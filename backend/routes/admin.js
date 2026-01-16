import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import Newsletter from '../models/Newsletter.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Analytics from '../models/Analytics.js';

const router = express.Router();

// All routes are protected and admin-only
router.use(protect, admin);

// @route   GET /api/admin/dashboard
// @desc    Get dashboard overview stats
// @access  Private/Admin
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalContacts,
      totalSubscribers,
      totalBookings,
      totalRevenue,
      recentContacts,
      recentBookings
    ] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments({ status: 'active' }),
      Booking.countDocuments(),
      Payment.aggregate([
        { $match: { status: 'succeeded' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Booking.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalContacts,
          totalSubscribers,
          totalBookings,
          totalRevenue: totalRevenue[0]?.total || 0
        },
        recentContacts,
        recentBookings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/users/:id', async (req, res) => {
  try {
    const { role, isVerified } = req.body;
    
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (role) user.role = role;
    if (typeof isVerified !== 'undefined') user.isVerified = isVerified;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

// @route   PUT /api/admin/contacts/:id
// @desc    Update contact status
// @access  Private/Admin
router.put('/contacts/:id', async (req, res) => {
  try {
    const { status, assignedTo, notes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    if (status) contact.status = status;
    if (assignedTo) contact.assignedTo = assignedTo;
    if (notes) contact.notes = notes;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
});

// @route   GET /api/admin/newsletters
// @desc    Get all newsletter subscribers
// @access  Private/Admin
router.get('/newsletters', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });

    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers'
    });
  }
});

export default router;
