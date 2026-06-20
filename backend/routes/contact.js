import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { supabase } from '../config/supabase.js';
import { sendContactEmail } from '../services/email.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many enquiries. Please try again later.' },
});

const allowedServices = [
  'CRM dashboard',
  'Employee monitoring',
  'EmpMetria rollout',
  'Custom chatbot',
  'WhatsApp automation',
  'Instagram automation',
  'Full business operating system',
];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be between 2 and 80 characters'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 30 }).withMessage('Phone number is too long'),
    body('company').optional({ checkFalsy: true }).trim().isLength({ max: 120 }).withMessage('Company name is too long'),
    body('service').isIn(allowedServices).withMessage('Choose a valid system type'),
    body('message').trim().isLength({ min: 10, max: 4000 }).withMessage('Message must be between 10 and 4000 characters'),
    body('website').optional({ checkFalsy: true }).isEmpty().withMessage('Invalid submission')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          message: errors.array()[0]?.msg || 'Invalid enquiry details',
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

      const emailResults = await Promise.allSettled([sendContactEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission - ${name}`,
        name,
        email,
        phone,
        company,
        message,
        service
      }),

      sendContactEmail({
        to: email,
        subject: 'Thank you for contacting Axenora AI',
        name,
        isThankYou: true
      })]);

      if (emailResults.some((result) => result.status === 'rejected')) {
        console.warn('Contact saved, but one or more notification emails failed');
      }

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
router.get('/', protect, admin, async (req, res) => {
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
