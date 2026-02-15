import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';
import { sendContactEmail } from '../services/email.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional({ checkFalsy: true }).trim(),
    body('message').trim().notEmpty().withMessage('Message is required')
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

      const { name, email, phone, company, message, service } = req.body;

      // Create contact in Supabase
      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          name,
          email,
          phone: phone || '',
          company,
          message,
          service
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      // Send email notification
      await sendContactEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission - ${name}`,
        name,
        email,
        phone,
        company,
        message,
        service
      });

      // Send thank you email to user
      await sendContactEmail({
        to: email,
        subject: 'Thank you for contacting Axenora AI',
        name,
        isThankYou: true
      });

      res.status(201).json({
        success: true,
        message: 'Thank you! We will get back to you soon.',
        data: { id: contact.id }
      });

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit form. Please try again.'
      });
    }
  }
);

// @route   GET /api/contact
// @desc    Get all contacts (admin only)
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select(`
        *,
        assigned_to_user:profiles!assigned_to(id, name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

export default router;
