const nodemailer = require('nodemailer');

exports.sendNotification = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: subject,
        text: message
    };

    await transporter.sendMail(mailOptions);
};
