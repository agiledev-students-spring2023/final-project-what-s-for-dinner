const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const Utensils = require("../models/utensils");
let fetch;
import("node-fetch").then((module) => {
  fetch = module.default;
});

const utensilsFilePath = path.join(__dirname, '../tmp_data/utensils.txt');

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
  try {
    const newUtensil = {
      id: null,
      utensil_title: req.body.utensil_title
    };
    const fileContent = fs.readFileSync(utensilsFilePath, 'utf-8');
    const utensils = fileContent.split('\n').filter((line) => line.trim() !== '').map(line => JSON.parse(line));
    newUtensil.id = utensils.length + 1;
    utensils.push(newUtensil);
    fs.writeFileSync(utensilsFilePath, `${fileContent}\n${JSON.stringify(newUtensil)}`, 'utf8');
    res.status(200).json(newUtensil);
  } catch (error) {
    console.error('Error adding utensil:', error);
    res.status(500).json({ error: 'Failed to add utensil' });
  }
});

// Other routes remain unchanged

module.exports = router;
