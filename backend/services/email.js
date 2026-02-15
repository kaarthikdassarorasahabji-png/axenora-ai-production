import { Resend } from 'resend';
import {
  contactEmailTemplate,
  thankYouEmailTemplate,
  welcomeEmailTemplate,
  bookingConfirmationTemplate
} from './emailTemplates.js';

// Initialize Resend client
const getResend = () => {
  return new Resend(process.env.RESEND_API_KEY);
};

// Sender address — use your verified domain or Resend's onboarding address
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || 'Axenora AI <onboarding@resend.dev>';

// Send contact form email
export const sendContactEmail = async ({
  to,
  subject,
  name,
  email,
  phone,
  company,
  message,
  service,
  isThankYou = false
}) => {
  try {
    const resend = getResend();

    const htmlContent = isThankYou
      ? thankYouEmailTemplate(name)
      : contactEmailTemplate({ name, email, phone, company, message, service });

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
      subject,
      html: htmlContent
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Email sent successfully to:', to, '| ID:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Send welcome email for newsletter
export const sendWelcomeEmail = async (email, name) => {
  try {
    const resend = getResend();

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      subject: 'Welcome to Axenora AI Newsletter! 🚀',
      html: welcomeEmailTemplate(name)
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Welcome email sent to:', email, '| ID:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Welcome email failed:', error);
    throw error;
  }
};

// Send booking confirmation
export const sendBookingConfirmation = async ({
  to,
  name,
  service,
  date,
  timeSlot,
  bookingId
}) => {
  try {
    const resend = getResend();

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [to],
      subject: 'Booking Confirmation - Axenora AI',
      html: bookingConfirmationTemplate({ name, service, date, timeSlot, bookingId })
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Booking confirmation sent to:', to, '| ID:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Booking confirmation failed:', error);
    throw error;
  }
};
