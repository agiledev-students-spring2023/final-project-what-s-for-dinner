const express = require("express");
const router = express.Router();
const UserUtensil = require("../models/userUtensil");
const Utensil = require("../models/utensil");

// Route to get all utensils
router.get("/utensils", async (req, res) => {
  try {
    const utensils = await Utensil.find({});
    res.json(utensils);
  } catch (error) {
    console.error('Error fetching utensils:', error);
    res.status(500).json({ error: 'Failed to fetch utensils' });
  }
});

// Route to add a new utensil
router.post("/utensils", async (req, res) => {
  try {
    const newUtensil = new Utensil({ utensil_title: req.body.utensil_title });
    await newUtensil.save();
    res.status(200).json(newUtensil);
  } catch (error) {
    console.error('Error adding utensil:', error);
    res.status(500).json({ error: 'Failed to add utensil' });
  }
});

// Route to associate a utensil with a user
router.post("/user-utensils", async (req, res) => {
  try {
    const { userId, utensilId } = req.body;
    const userUtensil = new UserUtensil({ userId, utensilId });
    await userUtensil.save();
    res.status(200).json(userUtensil);
  } catch (error) {
    console.error("Error associating utensil with user:", error);
    res.status(500).json({ error: "Failed to associate utensil with user" });
  }
});

// Other routes remain unchanged

module.exports = router;
