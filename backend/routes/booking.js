import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import { protect, admin } from '../middleware/auth.js';
import { sendBookingConfirmation } from '../services/email.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Public
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('service').notEmpty().withMessage('Service is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('timeSlot').notEmpty().withMessage('Time slot is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { name, email, phone, service, date, timeSlot, notes } = req.body;

      // Check if slot is available
      const existingBooking = await Booking.findOne({
        date: new Date(date),
        timeSlot,
        status: { $in: ['pending', 'confirmed'] }
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: 'This time slot is already booked'
        });
      }

      // Create booking
      const booking = await Booking.create({
        name,
        email,
        phone,
        service,
        date: new Date(date),
        timeSlot,
        notes
      });

      // Send confirmation email
      await sendBookingConfirmation({
        to: email,
        name,
        service,
        date,
        timeSlot,
        bookingId: booking._id
      });

      res.status(201).json({
        success: true,
        message: 'Booking created successfully! Check your email for confirmation.',
        data: booking
      });

    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create booking'
      });
    }
  }
);

// @route   GET /api/bookings
// @desc    Get all bookings (admin) or user bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    const bookings = await Booking.find(query)
      .sort({ date: -1 })
      .populate('user', 'name email');

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check ownership
    if (booking.user && booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { status, meetingLink, notes } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (status) booking.status = status;
    if (meetingLink) booking.meetingLink = meetingLink;
    if (notes) booking.notes = notes;

    await booking.save();

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking'
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel booking
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check ownership
    if (booking.user && booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

export default router;
