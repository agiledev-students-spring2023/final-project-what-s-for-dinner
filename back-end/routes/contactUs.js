const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact-us', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.EMAIL_USERNAME, 
    subject: 'Contact Us Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

module.exports = router;
