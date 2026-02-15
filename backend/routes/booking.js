import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';
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
      const { data: existingBooking } = await supabase
        .from('bookings')
        .select('*')
        .eq('date', date)
        .eq('time_slot', timeSlot)
        .in('status', ['pending', 'confirmed'])
        .single();

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: 'This time slot is already booked'
        });
      }

      // Create booking
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          name,
          email,
          phone,
          service,
          date,
          time_slot: timeSlot,
          notes
        })
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
      await sendBookingConfirmation({
        to: email,
        name,
        service,
        date,
        timeSlot,
        bookingId: booking.id
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
    let query = supabase
      .from('bookings')
      .select('*, user:profiles!user_id(id, name, email)')
      .order('date', { ascending: false });

    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query = query.eq('user_id', req.user.id);
    }

    const { data: bookings, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
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
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check ownership
    if (booking.user_id && booking.user_id !== req.user.id && req.user.role !== 'admin') {
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
    console.error('Fetch booking error:', error);
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

    const updateData = {};
    if (status) updateData.status = status;
    if (meetingLink) updateData.meeting_link = meetingLink;
    if (notes) updateData.notes = notes;

    const { data: booking, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update booking error:', error);
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
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check ownership
    if (booking.user_id && booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

export default router;
