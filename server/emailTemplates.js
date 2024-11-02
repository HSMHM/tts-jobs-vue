// server/emailTemplates.js

module.exports = {
    // Admin email template
    adminEmail: ({ fullName, email, jobTitle, contactNumber }) => `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>طلب توظيف جديد</title>
          <style>
            /* Styles here */
            * { font-family: "Tajawal", sans-serif; direction: rtl; }
            body { background-color: #f2f2f2; padding: 20px; display: flex; justify-content: center; align-items: center; }
            .email-container { max-width: 600px; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: 0 auto; text-align: center; }
            .email-header { background: linear-gradient(135deg, #7928ca, #ff0080); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .email-body { padding: 20px; }
            .email-footer { background-color: #f8f9fa; padding: 10px; font-size: 0.9em; color: #6c757d; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h4>طلب توظيف جديد</h4>
              <p>تم تقديم طلب توظيف جديد من:</p>
            </div>
            <div class="email-body">
              <p><strong>الاسم:</strong> ${fullName}</p>
              <p><strong>البريد الإلكتروني:</strong> ${email}</p>
              <p><strong>رقم التواصل:</strong> ${contactNumber}</p>
              <p><strong>الوظيفة:</strong> ${jobTitle}</p>
              <p>شكراً لكم.</p>
            </div>
            <div class="email-footer">
              <small>&copy; ${new Date().getFullYear()} شركة التحول التقني. جميع الحقوق محفوظة.</small>
            </div>
          </div>
        </body>
      </html>
    `,
  
    // User email template in Arabic
    userEmail_ar: ({ fullName, jobTitle }) => `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>شكراً لتقديمك</title>
          <style>
            /* Styles here */
            * { font-family: "Tajawal", sans-serif; direction: rtl; }
            body { background-color: #f2f2f2; padding: 20px; display: flex; justify-content: center; align-items: center; }
            .email-container { max-width: 600px; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: 0 auto; text-align: center; }
            .email-header { background: linear-gradient(135deg, #7928ca, #ff0080); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .email-body { padding: 20px; }
            .email-footer { background-color: #f8f9fa; padding: 10px; font-size: 0.9em; color: #6c757d; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h3>شكراً لك، ${fullName}!</h3>
              <p>نقدّر تقديمك للحصول على وظيفة <strong>${jobTitle}</strong>.</p>
            </div>
            <div class="email-body">
              <p>مرحباً ${fullName}،</p>
              <p>شكراً لتقديمك للحصول على وظيفة <strong>${jobTitle}</strong> في شركتنا. لقد استلمنا طلبك وسنقوم بمراجعته قريباً.</p>
            </div>
            <div class="email-footer">
              <small>&copy; ${new Date().getFullYear()} شركة التحول التقني. جميع الحقوق محفوظة.</small>
            </div>
          </div>
        </body>
      </html>
    `,
  
    // User email template in English
    userEmail: ({ fullName, jobTitle }) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Thank You for Applying</title>
          <style>
            /* Styles here */
            * { font-family: "Tajawal", sans-serif; }
            body { background-color: #f2f2f2; padding: 20px; display: flex; justify-content: center; align-items: center; }
            .email-container { max-width: 600px; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: 0 auto; text-align: center; }
            .email-header { background: linear-gradient(135deg, #7928ca, #ff0080); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .email-body { padding: 20px; }
            .email-footer { background-color: #f8f9fa; padding: 10px; font-size: 0.9em; color: #6c757d; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h3>Thank you, ${fullName}!</h3>
              <p>We appreciate your application for the <strong>${jobTitle}</strong> position.</p>
            </div>
            <div class="email-body">
              <p>Hi ${fullName},</p>
              <p>Thank you for applying for the position of <strong>${jobTitle}</strong> at our company. We have received your application and will review it soon.</p>
            </div>
            <div class="email-footer">
              <small>&copy; ${new Date().getFullYear()} TechTrans Co. All rights reserved.</small>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  