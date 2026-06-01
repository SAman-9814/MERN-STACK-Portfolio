import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email notification for a new contact form submission.
 * @param {string} name 
 * @param {string} email 
 * @param {string} message 
 */
export const sendContactEmail = async (name, email, message) => {
  const receiver = process.env.EMAIL_RECEIVER || process.env.EMAIL_USER;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: Nodemailer email credentials are not set in your .env file. Email was not sent.');
    console.log(`Contact Message Details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    return { success: false, error: 'Email credentials not configured.' };
  }

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: receiver,
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 24px; font-weight: 700; background: linear-gradient(to right, #b820e6, #da7d20); color: #b820e6; letter-spacing: -0.5px;">aman.dev</span>
        </div>
        <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin-top: 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; font-family: 'Segoe UI', sans-serif;">New Message Received</h2>
        <div style="margin-top: 20px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px; font-weight: 500;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Email:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #b820e6; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          <div style="padding: 20px; background-color: #f8fafc; border-left: 4px solid #b820e6; border-radius: 8px; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
            <p style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Message Content</p>
            <p style="margin: 0; color: #334155; font-size: 14.5px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        <div style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">This email was automatically generated from your Portfolio Website contact form.</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
    throw error;
  }
};

/**
 * Send a thank you confirmation email to the visitor who submitted the contact form.
 * @param {string} name 
 * @param {string} email 
 */
export const sendThankYouEmail = async (name, email) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: Nodemailer credentials are not set. Thank you email skipped.');
    return { success: false, error: 'Email credentials not configured.' };
  }

  const mailOptions = {
    from: `"Aman Sah" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out!`,
    text: `Hi ${name},\n\nThank you for contacting me. I have received your message and will get back to you as soon as possible.\n\nBest regards,\nAman Sah\nFull Stack & AI Engineer`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 24px; font-weight: 700; background: linear-gradient(to right, #b820e6, #da7d20); color: #b820e6; letter-spacing: -0.5px;">aman.dev</span>
        </div>
        <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin-top: 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; font-family: 'Segoe UI', sans-serif;">Thank You for Reaching Out</h2>
        <div style="margin-top: 20px; color: #334155; font-size: 15px; line-height: 1.6;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for visiting my website and sending a message. I've successfully received your submission and will read through it shortly.</p>
          <p>I aim to respond to all inquiries within 24 to 48 hours. In the meantime, feel free to check out my latest works or connect with me via social channels.</p>
          
          <div style="margin-top: 30px; padding: 16px 20px; background: linear-gradient(135deg, #f9f0ff, #fff7ed); border-left: 4px solid #b820e6; border-radius: 8px;">
            <p style="margin: 0; font-size: 15px; font-weight: 700; color: #b820e6; line-height: 1.3;">Aman Sah</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.3;">Full Stack &amp; AI Engineer</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">sah99017@gmail.com &nbsp;|&nbsp; Kathmandu, Nepal</p>
          </div>
        </div>
        <div style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">This is an automated receipt confirming your submission. Please do not reply to this email directly.</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending thank you email:', error);
    throw error;
  }
};
