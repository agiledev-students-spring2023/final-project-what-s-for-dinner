const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const User = require("../models/users.js")
const nodemailer = require("nodemailer")

router.post(
  "/reset-password",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { username, email } = req.body

      // check if user exists with the given username and email
      const user = await User.findOne({ email: email, username: username })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User with the given username and email not found",
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
        subject: "What's for Dinner: Password Restoration",
        text: `Your new password is ${newPassword}.`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          return res.status(500).json({
            success: false,
            error: "Failed to send email with new password",
          })
        } else {
          console.log("Email sent: " + info.response)
          return res.status(200).json({
            success: true,
            message: "New password sent to email",
          })
        }
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: "Failed to restore password",
      })
    }
  }
)

module.exports = router