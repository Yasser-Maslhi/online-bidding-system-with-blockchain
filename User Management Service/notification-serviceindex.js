const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());

// Send notification
app.post('/notify', async (req, res) => {
    const { email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Bid Notification',
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Notification sent');
    });
});

app.listen(3003, () => {
    console.log('Notification Service running on port 3003');
});
