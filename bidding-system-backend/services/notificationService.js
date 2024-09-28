const nodemailer = require('nodemailer');

// Set up email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

exports.sendNotification = async (email, subject, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };
  await transporter.sendMail(mailOptions);
};
