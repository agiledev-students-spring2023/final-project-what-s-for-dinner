const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Utensils = require("../models/utensils");
let fetch;
import("node-fetch").then((module) => {
  fetch = module.default;
});

const utensilsFilePath = path.join(__dirname, "../tmp_data/utensils.txt");

const fetchUtensilsFromAPI = async (recipeId) => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget.json?apiKey=${process.env.SPOONACULAR_API_KEY}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch utensils from API");
  }
  const data = await response.json();
  return data.equipment;
};

const saveUtensilsToDatabase = async (utensilsData) => {
  for (const utensilData of utensilsData) {
    const existingUtensil = await Utensils.findOne({ id: utensilData.id });

    if (!existingUtensil) {
      const newUtensil = new Utensils(utensilData);
      await newUtensil.save();
      console.log(`Saved utensil: ${utensilData.name}`);
    }
  }
};

// Add a new route to fetch and save utensils data from the API
router.get("/utensils/fetch-from-api", async (req, res) => {
  try {
    const recipeId = req.query.recipeId;
    const utensilsData = await fetchUtensilsFromAPI(recipeId);
    await saveUtensilsToDatabase(utensilsData);
    res.status(200).json({ message: "Utensils data saved to the database" });
  } catch (error) {
    console.error("Error fetching and saving utensils:", error);
    res.status(500).json({ error: "Failed to fetch and save utensils" });
  }
});

// Route to get all utensils
router.get("/utensils", (req, res) => {
  // Replace the file read with a database query
  Utensils.find({}, { _id: 0, __v: 0 })
    .then(utensils => {
      res.json(utensils);
    })
    .catch(error => {
      console.error('Error fetching data from the database:', error);
      res.status(500).json({ error: 'Failed to fetch utensils' });
    });
});

// Route to add a new utensil
router.post("/utensils", (req, res) => {
  try {
    const newUtensil = new Utensils(req.body);
    newUtensil.save()
      .then(savedUtensil => {
        res.status(200).json(savedUtensil);
      })
      .catch(error => {
        console.error('Error adding utensil:', error);
        res.status(500).json({ error: 'Failed to add utensil' });
      });
  } catch (error) {
    console.error('Error adding utensil:', error);
    res.status(500).json({ error: 'Failed to add utensil' });
  }
});

module.exports = router;
