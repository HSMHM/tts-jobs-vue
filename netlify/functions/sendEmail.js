const sendMail = require('../../server/mailer'); // Import the mailer from server
const path = require('path');

// Modify the `viewsPath` dynamically within this file as well to ensure the right path is used
const isNetlify = __dirname.includes('netlify/functions');
const viewsPath = isNetlify ? path.join(__dirname, 'views') : path.join(__dirname, '../server/views');
process.env.VIEWS_PATH = viewsPath; // Set an environment variable to pass the views path

console.log(`Using views path in sendEmail.js: ${viewsPath}`);

exports.handler = async function (event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the request body
    const { fullName = 'Applicant', email, jobTitle = 'Position', contactNumber = 'N/A', language } = JSON.parse(event.body);

    // Determine email subjects based on language
    const userSubject = language === 'ar' ? 'شكراً لتقديم طلبك' : 'Thank you for your application';
    const adminSubject = language === 'ar' ? 'تم تقديم طلب توظيف جديد' : 'New Job Application Submitted';

    // Context for user and admin emails
    const userContext = { fullName, jobTitle };
    const adminContext = { fullName, email, jobTitle, contactNumber };

    // Log data to ensure values are correct
    console.log('User Email Context:', userContext);
    console.log('Admin Email Context:', adminContext);

    // Send email to the user
    await sendMail(
      email,
      userSubject,
      language === 'ar' ? 'userEmail_ar' : 'userEmail',
      userContext
    );

    // Send email to the admin
    await sendMail('hassan@tts.sa', adminSubject, 'adminEmail', adminContext);

    return { statusCode: 200, body: 'Emails sent' };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { statusCode: 500, body: `Failed to send emails: ${error.message}` };
  }
};
