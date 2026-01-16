import express from 'express';
import { body, validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter.js';
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
      let subscriber = await Newsletter.findOne({ email });

      if (subscriber) {
        if (subscriber.status === 'active') {
          return res.status(400).json({
            success: false,
            message: 'You are already subscribed to our newsletter!'
          });
        } else {
          // Resubscribe
          subscriber.status = 'active';
          subscriber.name = name || subscriber.name;
          subscriber.subscribedAt = new Date();
          await subscriber.save();
        }
      } else {
        // New subscriber
        subscriber = await Newsletter.create({ email, name });
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

      const subscriber = await Newsletter.findOne({ email });

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: 'Email not found in our list'
        });
      }

      subscriber.status = 'unsubscribed';
      subscriber.unsubscribedAt = new Date();
      await subscriber.save();

      res.json({
        success: true,
        message: 'Successfully unsubscribed from newsletter'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to unsubscribe'
      });
    }
  }
);

export default router;
