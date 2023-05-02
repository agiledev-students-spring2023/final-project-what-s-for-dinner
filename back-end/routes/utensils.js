const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

const utensilsFilePath = path.join(__dirname, '../tmp_data/utensils.txt');

router.get("/utensils", (req, res) => {
  try {
    const fileContent = fs.readFileSync(utensilsFilePath, 'utf-8');
    const utensils = fileContent.split('\n').map(line => {
      try {
        const { id, utensil_title, image_url } = JSON.parse(line);
        return { id, utensil_title, image_url };
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

module.exports = router;
