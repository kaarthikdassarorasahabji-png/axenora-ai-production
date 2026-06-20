import express from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/supabase.js';
import { sendContactEmail } from '../services/email.js';
import { generateAssistantReply } from '../services/llm.js';

const router = express.Router();
const chatLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 35, standardHeaders: true, legacyHeaders: false });
const leadLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false });
const phonePattern = /^[+()\-\s0-9]{7,24}$/;

const escapeHtml = (value) => String(value || '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

router.post('/', chatLimiter, [
  body('messages').isArray({ min: 1, max: 12 }).withMessage('Conversation is required'),
  body('messages.*.role').isIn(['user', 'assistant']).withMessage('Invalid message role'),
  body('messages.*.content').isString().isLength({ min: 1, max: 1200 }).withMessage('Message is too long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0]?.msg });
  try {
    const messages = req.body.messages.slice(-10).map(({ role, content }) => ({ role, content: content.trim() }));
    const result = await generateAssistantReply(messages);
    return res.json({ success: true, ...result });
  } catch (error) {
    console.error('Chat LLM error:', error.message);
    return res.status(error.message === 'llm_not_configured' ? 503 : 502).json({
      success: false,
      message: 'The assistant is briefly unavailable. Please try again in a moment.',
    });
  }
});

router.post('/lead', leadLimiter, [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Enter your name'),
  body('phone').trim().matches(phonePattern).withMessage('Enter a valid phone number'),
  body('email').optional({ checkFalsy: true }).trim().isEmail().normalizeEmail().withMessage('Enter a valid email'),
  body('interest').optional({ checkFalsy: true }).trim().isLength({ max: 120 }),
  body('summary').optional({ checkFalsy: true }).trim().isLength({ max: 1200 }),
  body('consent').equals('true').withMessage('Consent is required'),
  body('website').optional({ checkFalsy: true }).isEmpty().withMessage('Invalid submission'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0]?.msg });

  const { name, phone, email, interest, summary, page, sessionId } = req.body;
  try {
    const lead = {
      name,
      phone,
      email: email || null,
      interest: interest || 'General enquiry',
      summary: summary || null,
      source: 'website-chatbot',
      page: String(page || '').slice(0, 300),
      session_id: String(sessionId || '').slice(0, 120),
      consented_at: new Date().toISOString(),
      status: 'new',
    };

    let { data, error } = await supabase.from('chat_leads').insert(lead).select('id').single();
    if (error?.code === '42P01' || error?.code === 'PGRST205') {
      const fallback = await supabase.from('contacts').insert({
        name, email: email || 'chatbot-lead@axenoraai.in', phone, company: 'Website chatbot',
        service: 'Custom chatbot', message: `${interest || 'General enquiry'}\n\n${summary || 'No conversation summary provided'}`,
      }).select('id').single();
      data = fallback.data;
      error = fallback.error;
    }
    if (error) throw error;

    const safeSummary = escapeHtml(summary || 'No conversation summary provided');
    await sendContactEmail({
      to: process.env.LEADS_EMAIL || 'kaarthikdassarorasahabji@gmail.com',
      subject: `New chatbot lead - ${escapeHtml(name)}`,
      name: escapeHtml(name),
      email: escapeHtml(email || 'Not provided'),
      phone: escapeHtml(phone),
      company: 'Website chatbot',
      service: escapeHtml(interest || 'General enquiry'),
      message: `${safeSummary}<br><br>Page: ${escapeHtml(page || 'Unknown')}`,
    });

    return res.status(201).json({ success: true, message: 'Thanks. Your details were saved and the team has been notified.', id: data.id });
  } catch (error) {
    console.error('Chat lead error:', error);
    return res.status(500).json({ success: false, message: 'We could not save your details. Please try again.' });
  }
});

export default router;
