// Base email template with Axenora AI branding - Cyber Green/Cyan Theme
const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axenora AI</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background-color: #060d14;
      color: #e0e0e0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0c1a25;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(0, 210, 180, 0.15);
    }
    .header {
      background: linear-gradient(135deg, #00d4b4 0%, #22c55e 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #060d14;
      font-size: 32px;
      font-weight: bold;
    }
    .header .logo-text {
      color: #060d14;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #00d4b4;
      margin-top: 0;
    }
    .content p {
      line-height: 1.6;
      color: #b0b0b0;
      margin: 16px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #00d4b4 0%, #22c55e 100%);
      color: #060d14;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 20px 0;
    }
    .info-box {
      background-color: #0f2233;
      border-left: 4px solid #00d4b4;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
    }
    .info-box p {
      margin: 8px 0;
    }
    .info-box strong {
      color: #00d4b4;
    }
    .footer {
      background-color: #060d14;
      padding: 30px 20px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .footer p {
      margin: 8px 0;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      color: #00d4b4;
      text-decoration: none;
      margin: 0 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Axenora <span class="logo-text">AI</span></h1>
    </div>
    ${content}
    <div class="footer">
      <p><strong>Axenora AI</strong> - Transforming Business with AI</p>
      <p>Founder: Kaarthik Dass Arora</p>
      <div class="social-links">
        <a href="https://axenoraai.in">Website</a> |
        <a href="mailto:contact@axenoraai.in">Contact</a>
      </div>
      <p style="margin-top: 20px; font-size: 12px;">
        &copy; 2026 Axenora AI. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

// Contact form notification email (to admin)
export const contactEmailTemplate = ({ name, email, phone, company, message, service }) => {
  const content = `
    <div class="content">
      <h2>🔔 New Contact Form Submission</h2>
      <p>You have received a new contact form submission from your website.</p>
      
      <div class="info-box">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
      
      <p>Please respond to this inquiry as soon as possible.</p>
    </div>
  `;
  return baseTemplate(content);
};

// Thank you email (to user)
export const thankYouEmailTemplate = (name) => {
  const content = `
    <div class="content">
      <h2>Thank You for Contacting Us! 🙏</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Axenora AI! We've received your message and our team will get back to you within 24 hours.</p>
      
      <p>In the meantime, feel free to explore our services:</p>
      
      <a href="https://axenoraai.in/solutions" class="button">Explore Solutions</a>
      
      <div class="info-box">
        <p><strong>What to expect next:</strong></p>
        <p>✅ Our team will review your inquiry</p>
        <p>✅ We'll reach out within 24 hours</p>
        <p>✅ We'll schedule a consultation if needed</p>
      </div>
      
      <p>Best regards,<br><strong>Axenora AI Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};

// Newsletter welcome email
export const welcomeEmailTemplate = (name) => {
  const content = `
    <div class="content">
      <h2>Welcome to Axenora AI! 🚀</h2>
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to our newsletter! You're now part of an exclusive community that's transforming business with AI.</p>
      
      <div class="info-box">
        <p><strong>What you'll receive:</strong></p>
        <p>📧 Weekly AI insights and trends</p>
        <p>🎯 Exclusive tips to grow your business</p>
        <p>🚀 Early access to new features</p>
        <p>💡 Success stories from our clients</p>
      </div>
      
      <p>Get started by exploring our solutions:</p>
      
      <a href="https://axenoraai.in/solutions" class="button">Explore Solutions</a>
      
      <p>Looking forward to helping you scale your business!</p>
      <p>Best regards,<br><strong>Kaarthik Dass Arora</strong><br>Founder, Axenora AI</p>
    </div>
  `;
  return baseTemplate(content);
};

// Booking confirmation email
export const bookingConfirmationTemplate = ({ name, service, date, timeSlot, bookingId }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const content = `
    <div class="content">
      <h2>Booking Confirmed! ✅</h2>
      <p>Hi ${name},</p>
      <p>Your booking with Axenora AI has been confirmed! We're excited to meet with you.</p>
      
      <div class="info-box">
        <p><strong>Booking Details:</strong></p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
      </div>
      
      <p><strong>What to prepare:</strong></p>
      <p>✅ Have your questions ready</p>
      <p>✅ Be in a quiet environment</p>
      <p>✅ Have a stable internet connection</p>
      
      <p>You'll receive a meeting link closer to your appointment time.</p>
      
      <a href="https://axenoraai.in/bookings/${bookingId}" class="button">View Booking Details</a>
      
      <p>Need to reschedule? Contact us at <a href="mailto:contact@axenoraai.in" style="color: #00d4b4;">contact@axenoraai.in</a></p>
      
      <p>See you soon!<br><strong>Axenora AI Team</strong></p>
    </div>
  `;
  return baseTemplate(content);
};
