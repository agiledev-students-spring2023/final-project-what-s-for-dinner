const express = require("express");
const router = express.Router();
const Utensils = require("../models/utensils");

// Route to get all utensils
router.get("/utensils", async (req, res) => {
  try {
    const utensils = await Utensil.find({});
    res.json(utensils);
  } catch (error) {
    console.error("Error fetching utensils:", error);
    res.status(500).json({ error: "Failed to fetch utensils" });
  }
});

// Route to add a new utensil
router.post("/utensils", async (req, res) => {
  try {
    const newUtensil = new Utensil({
      utensil_title: req.body.utensil_title,
      image_url: req.body.image_url,
      description: req.body.description,
    });
    await newUtensil.save();
    res.status(200).json(newUtensil);
  } catch (error) {
    console.error("Error adding utensil:", error);
    res.status(500).json({ error: "Failed to add utensil" });
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
