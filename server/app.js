require('dotenv').config();
const express = require('express');
const path = require('path');
const sendMail = require('./mailer'); 
const axios = require('axios');
const app = express();

if (!process.env.MAIL_HOST || !process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
  console.error('Missing required environment variables for mailer configuration.');
  process.exit(1);
}

app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
  const { fullName, email, jobTitle, contactNumber, language} = req.body;
  const sheetLink = 'https://docs.google.com/spreadsheets/d/1Hrwr_xDyXSGnjZtmGfXhmyb1Ysa-YBGKHIbgA-Um-_U/edit?gid=0#gid=0';
  if (!fullName || !email || !jobTitle) {
    console.error('Form submission missing required fields:', { fullName, email, jobTitle, contactNumber, sheetLink });
    return res.status(400).json({ error: 'Missing required fields: fullName, email, or jobTitle' });
  }

  try {
    const userTemplate = language === 'ar' ? 'userEmail_ar' : 'userEmail';
    const adminTemplate = 'adminEmail';

    const userSubject = language === 'ar' ? 'شكراً لتقديم طلبك' : 'Thank you for your application';
    const adminSubject = language === 'ar'
      ? 'تم تقديم طلب توظيف جديد'
      : 'New Job Application Submitted';

    await sendMail(email, userSubject, userTemplate, { fullName, jobTitle });
    console.log(`User email sent to ${email} for job: ${jobTitle}`);

    await sendMail('hassan@tts.sa', adminSubject, adminTemplate, { fullName, email, jobTitle, contactNumber, sheetLink });
    console.log('Admin notification email sent.');

    res.status(200).json({ message: 'Form submitted and emails sent successfully.' });
  } catch (error) {
    console.error('Error occurred in /api/submit-form route:', error);
    res.status(500).json({ error: 'Failed to send emails. Please try again later.' });
  }
});

app.post('/api/forward-to-google-script', async (req, res) => {
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxfUAB-uPsPoPf_zKSW2ltTgytThmGzfdiESQj4dB5ajKCLHY2KD7NCrTUB0F21XIkk/exec'; // Replace with your actual Google Apps Script URL

  try {
    const response = await axios.post(googleScriptUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error with Google Apps Script request:', error.message);
    res.status(500).json({ error: 'Failed to send data to Google Apps Script' });
  }
});


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
