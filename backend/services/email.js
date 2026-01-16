import nodemailer from 'nodemailer';
import {
  contactEmailTemplate,
  thankYouEmailTemplate,
  welcomeEmailTemplate,
  bookingConfirmationTemplate
} from './emailTemplates.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

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
    const transporter = createTransporter();

    const htmlContent = isThankYou
      ? thankYouEmailTemplate(name)
      : contactEmailTemplate({ name, email, phone, company, message, service });

    await transporter.sendMail({
      from: `"Axenora AI" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent
    });

    console.log('✅ Email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Send welcome email for newsletter
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Axenora AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to Axenora AI Newsletter! 🚀',
      html: welcomeEmailTemplate(name)
    });

    console.log('✅ Welcome email sent to:', email);
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
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Axenora AI" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Booking Confirmation - Axenora AI',
      html: bookingConfirmationTemplate({ name, service, date, timeSlot, bookingId })
    });

    console.log('✅ Booking confirmation sent to:', to);
    return true;
  } catch (error) {
    console.error('❌ Booking confirmation failed:', error);
    throw error;
  }
};
