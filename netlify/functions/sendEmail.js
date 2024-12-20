 
const sendMail = require('../../server/mailer');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { 
      fullName = 'Applicant', 
      email, 
      jobTitle = 'Position', 
      contactNumber = 'N/A', 
      language,
    } = JSON.parse(event.body);

    const userSubject = language === 'ar' ? 'شكراً لتقديم طلبك' : 'Thank you for your application';
    const adminSubject = language === 'ar' ? 'طلب توظيف' : 'Application Submitted';

    const userTemplate = language === 'ar' ? 'userEmail_ar' : 'userEmail';
    const adminTemplate = 'adminEmail';

    const sheetLink = 'https://docs.google.com/spreadsheets/d/1Hrwr_xDyXSGnjZtmGfXhmyb1Ysa-YBGKHIbgA-Um-_U/edit?gid=0#gid=0';

    await sendMail(email, userSubject, userTemplate, { fullName, jobTitle });

    await sendMail('hr@tts.sa', adminSubject, adminTemplate, { fullName, email, jobTitle, contactNumber, sheetLink });

    return { statusCode: 200, body: 'Emails sent' };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { statusCode: 500, body: `Failed to send emails: ${error.message}` };
  }
};
