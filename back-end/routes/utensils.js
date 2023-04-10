const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path'); // add this line

const utensilsFilePath = path.join(__dirname, '../tmp_data/utensils.txt'); // this line specifies the filepath to utensil data
const utensilsData = fs.readFileSync(utensilsFilePath, 'utf8');

// Route to get all utensils
router.get("/utensils", (req, res) => {
  try {
    const fileContent = fs.readFileSync(utensilsFilePath, 'utf-8');
    const utensils = fileContent.split('\n').map(line => {
      try {
        const { utensil_title, image_url, description } = JSON.parse(line);
        return { utensil_title, image_url, description };
      } catch (error) {
        console.error(`Error parsing utensil: ${line}`, error);
        return null;
      }
    }).filter(utensil => utensil !== null);
    
    res.json(utensils);
  } catch (error) {
    console.error('Error fetching data from file:', error);
    res.status(500).json({ error: 'Failed to fetch utensils' });
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
