const express = require("express");
const router = express.Router();
const fs = require('fs');

const utensilsData = fs.readFileSync('utensils_data.txt', 'utf8');
const utensils = JSON.parse(utensilsData);

// Route to get all utensils
router.get("/api/utensils", (req, res) => {
  res.json(utensils);
});

// Route to add a new utensil
router.post("/api/utensils", (req, res) => {
  const newUtensil = req.body;
  newUtensil.id = utensils.length + 1;
  utensils.push(newUtensil);
  res.status(200).json(newUtensil);
});

module.exports = router;
