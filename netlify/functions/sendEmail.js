const sendMail = require('../../server/mailer'); // Import the mailer from server

exports.handler = async function (event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse the request body
  const { fullName, email, jobTitle,contactNumber, language } = JSON.parse(event.body);

  // Determine email subjects based on language
  const userSubject = language === 'ar' ? 'شكراً لتقديم طلبك' : 'Thank you for your application';
  const adminSubject = language === 'ar' 
    ? 'تم تقديم طلب توظيف جديد' 
    : 'New Job Application Submitted';

  try {
    // Send email to the user
    await sendMail(
      email,
      userSubject,
      language === 'ar' ? 'userEmail_ar' : 'userEmail',
      { fullName, jobTitle }
    );

    // Send email to the admin
    await sendMail('hassan@tts.sa', adminSubject, 'adminEmail', { fullName, email, jobTitle, contactNumber });

    // Respond with a success message
    return { statusCode: 200, body: 'Emails sent' };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { statusCode: 500, body: 'Failed to send emails' };
  }
};
