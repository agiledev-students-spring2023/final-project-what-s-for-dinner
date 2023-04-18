const express = require("express")
const router = express.Router()
const User = require("../models/users.js")
const nodemailer = require("nodemailer")

router.post("/reset-password", async (req, res) => {
  try {
    const { username, email } = req.body

    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide all necessary information.",
      });
    }

    // check if user exists with the given username and email
    const user = await User.findOne({ email:email })
    if (!user) {
      return res.status(404).json({
        error: "User with the given username and email not found",
      })
    }

    // generate new password
    const newPassword = Math.random().toString(36).slice(-8)

    // update user password in database
    user.password = newPassword
    await user.save()

    // send email with new password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Restoration",
      text: `Your new password is ${newPassword}.`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return res.status(500).json({
          error: "Failed to send email with new password",
        })
      } else {
        console.log("Email sent: " + info.response)
        return res.status(200).json({
          message: "New password sent to email",
        })
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Failed to restore password",
    })
  }
})

module.exports = router