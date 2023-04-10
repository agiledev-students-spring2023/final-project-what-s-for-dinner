const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path'); // add this line

const utensilsFilePath = path.join(__dirname, '../tmp_data/utensils.txt'); // this line specifies the filepath to utensil data
const utensilsData = fs.readFileSync(utensilsFilePath, 'utf8');
const utensils = JSON.parse(utensilsData);

// Route to get all utensils
router.get("/utensils", (req, res) => {
  res.json(utensils);
});

// Route to get a specific utensil by ID
router.get("/utensils/:id", (req, res) => {
  const utensilId = parseInt(req.params.id);
  const utensil = utensils.find((u) => u.id === utensilId);

  if (utensil) {
    res.json(utensil);
  } else {
    res.status(404).json({ message: "Utensil not found" });
  }
});

// Route to add a new utensil
router.post("/utensils", (req, res) => {
  const newUtensil = req.body;
  newUtensil.id = utensils.length + 1;
  utensils.push(newUtensil);
  res.status(200).json(newUtensil);
});

// Route to update a utensil
router.put("/utensils/:id", (req, res) => {
  const utensilId = parseInt(req.params.id);
  const updatedUtensil = req.body;
  const index = utensils.findIndex((u) => u.id === utensilId);

  if (index !== -1) {
    utensils[index] = { ...utensils[index], ...updatedUtensil };
    res.status(200).json(utensils[index]);
  } else {
    res.status(404).json({ message: "Utensil not found" });
  }
});

// Route to delete a utensil
router.delete("/utensils/:id", (req, res) => {
  const utensilId = parseInt(req.params.id);
  const index = utensils.findIndex((u) => u.id === utensilId);

  if (index !== -1) {
    utensils.splice(index, 1);
    res.status(200).json({ message: "Utensil deleted" });
  } else {
    res.status(404).json({ message: "Utensil not found" });
  }
});

module.exports = router;
