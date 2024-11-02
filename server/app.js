require('dotenv').config();
const express = require('express');
const path = require('path');
const sendMail = require('../emails/mailer'); // Import sendMail directly
const app = express();

app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
  const { fullName, email, jobTitle, language } = req.body;

  if (!fullName || !email || !jobTitle) {
    console.error('Form submission missing required fields:', { fullName, email, jobTitle });
    return res.status(400).send('Missing required fields');
  }

  try {
    // Determine the template and email subject based on the language
    const userTemplate = language === 'ar' ? 'userEmail_ar' : 'userEmail';
    const adminTemplate = 'adminEmail';

    // Set email subjects based on language
    const userSubject = language === 'ar' ? 'شكراً لتقديم طلبك' : 'Thank you for your application';
    const adminSubject = language === 'ar' 
      ? 'تم تقديم طلب توظيف جديد' 
      : 'New Job Application Submitted';

    // Send email to the submitter using the selected template and subject
    await sendMail(email, userSubject, userTemplate, { fullName, jobTitle });

    // Send email to the admin with a dynamic subject
    await sendMail('hassan@tts.sa', adminSubject, adminTemplate, { fullName, email, jobTitle });

    res.status(200).send('Form submitted and emails sent');
  } catch (error) {
    console.error('Error occurred in /api/submit-form route:', error);
    res.status(500).send('Failed to send emails');
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, '../dist');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
}

const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
