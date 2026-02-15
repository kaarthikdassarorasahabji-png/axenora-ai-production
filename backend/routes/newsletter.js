import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';
import { sendWelcomeEmail } from '../services/email.js';

const router = express.Router();

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe',
  [
    body('email').isEmail().withMessage('Valid email is required')
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

      const { email, name } = req.body;

      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletters')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        if (existing.status === 'active') {
          return res.status(400).json({
            success: false,
            message: 'You are already subscribed to our newsletter!'
          });
        } else {
          // Resubscribe
          const { error } = await supabase
            .from('newsletters')
            .update({
              status: 'active',
              name: name || existing.name,
              subscribed_at: new Date().toISOString(),
              unsubscribed_at: null
            })
            .eq('id', existing.id);

          if (error) throw error;
        }
      } else {
        // New subscriber
        const { error } = await supabase
          .from('newsletters')
          .insert({
            email: email.toLowerCase(),
            name
          });

        if (error) throw error;
      }

      // Send welcome email
      await sendWelcomeEmail(email, name);

      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      });

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to subscribe. Please try again.'
      });
    }
  }
);

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe',
  [
    body('email').isEmail().withMessage('Valid email is required')
  ],
  async (req, res) => {
    try {
      const { email } = req.body;

      const { data: subscriber } = await supabase
        .from('newsletters')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: 'Email not found in our list'
        });
      }

      const { error } = await supabase
        .from('newsletters')
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString()
        })
        .eq('id', subscriber.id);

      if (error) throw error;

      res.json({
        success: true,
        message: 'Successfully unsubscribed from newsletter'
      });

    } catch (error) {
      console.error('Unsubscribe error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unsubscribe'
      });
    }
  }
);

export default router;
