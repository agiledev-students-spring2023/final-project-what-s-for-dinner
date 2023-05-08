const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users.js");
const { pass } = require("../config/jwt-config.js");

const authenticationRouter = () => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Please provide all necessary information.",
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    try {
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User already exists.",
        });
      }

      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });

      await newUser.save();

      const token = newUser.generateJWT();

      res.status(201).json({
        success: true,
        message: "User created successfully.",
        token: token,
        username: newUser.username,
      });
    } catch (error) {
      console.error(`Failed to save user: ${error}`);
      res.status(500).json({
        success: false,
        message: "Error saving user to database.",
        error: error,
      });
    }
  });

  router.post("/login", async function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all necessary information.",
      });
    }

    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        console.error(`User not found.`);
        return res.status(401).json({
          success: false,
          message: "User not found in database.",
        });
      }

      if (!await user.validPassword(password)) {
        console.error(`Incorrect password.`);
        return res.status(401).json({
          success: false,
          message: "Incorrect password.",
        });
      }

      const token = user.generateJWT();

      res.json({
        success: true,
        message: "User logged in successfully.",
        token: token,
        username: user.username,
      });
    } catch (error) {
      console.error(`Error looking up user: ${error}`);
      return res.status(500).json({
        success: false,
        message: "Error looking up user in database.",
        error: error,
      });
    }
  });

  router.get("/logout", function (req, res) {
    res.json({
      success: true,
      message:
        "There is actually nothing to do on the server side... you simply need to delete your token from the browser's local storage!",
    });
  });

  return router;
};

module.exports = authenticationRouter;
