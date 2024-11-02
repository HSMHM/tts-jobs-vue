const sendMail = require('../../server/mailer');
const path = require('path');

// Determine the correct views path based on environment
const isNetlify = __dirname.includes('netlify/functions');
const viewsPath = isNetlify ? path.join(__dirname, 'views') : path.join(__dirname, '../server/views');
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
      userContext,
      viewsPath  // Pass viewsPath as an argument
    );

    // Send email to the admin
    await sendMail('hassan@tts.sa', adminSubject, 'adminEmail', adminContext, viewsPath); // Pass viewsPath as an argument

    return { statusCode: 200, body: 'Emails sent' };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { statusCode: 500, body: `Failed to send emails: ${error.message}` };
  }
};
