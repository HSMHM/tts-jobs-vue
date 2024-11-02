const nodemailer = require('nodemailer');
const emailTemplates = require('./emailTemplates'); // Import the email templates
require('dotenv').config({ path: '../.env' });

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3',
  },
});

const sendMail = async (to, subject, templateName, context) => {
  try {
    // Check if the template function exists
    if (typeof emailTemplates[templateName] !== 'function') {
      throw new Error(`Template "${templateName}" not found in emailTemplates.js`);
    }
    
    // Get the email content by calling the template function with the context
    const html = emailTemplates[templateName](context);

    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html, // Use the HTML content directly
    });
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendMail;
