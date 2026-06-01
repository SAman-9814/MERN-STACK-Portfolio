import { sendContactEmail, sendThankYouEmail } from '../utils/mailer.js';

export const handleContactSubmit = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields (name, email, message) are required.' });
  }

  try {
    const contactResult = await sendContactEmail(name, email, message);
    
    if (contactResult.success === false) {
      // Credentials not configured - return warning status
      return res.status(200).json({
        success: false,
        message: 'Email configurations are missing on the server. Message logged to server logs.'
      });
    }

    // Attempt to send thank you confirmation receipt
    try {
      await sendThankYouEmail(name, email);
    } catch (thankYouError) {
      console.error('Failed to send thank you confirmation email:', thankYouError);
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Contact submit controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email message.'
    });
  }
};
