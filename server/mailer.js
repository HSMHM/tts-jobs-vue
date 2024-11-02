const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: '../.env' });

// Check if running in Netlify functions environment
const isNetlify = process.env.NETLIFY_ENV === 'true';
const viewsPath = isNetlify ? path.join(__dirname, 'views') : path.join(__dirname, '../server/views');
console.log(`Using views path: ${viewsPath}`); // Log the path for debugging

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

// Import and configure `nodemailer-express-handlebars`
const initializeHandlebars = async () => {
  const { default: hbs } = await import('nodemailer-express-handlebars');
  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extName: '.hbs',
        partialsDir: viewsPath,
        layoutsDir: viewsPath,
        defaultLayout: false,
      },
      viewPath: viewsPath,
      extName: '.hbs',
    })
  );
};

// Initialize handlebars configuration only once
initializeHandlebars().catch((error) => {
  console.error('Failed to configure handlebars:', error);
});

// Define the sendMail function
const sendMail = async (to, subject, template, context) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      template,
      context,
    });
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendMail;
