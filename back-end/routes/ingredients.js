const express = require('express');
const router = express.Router();
const IngredientModel = require('../models/ingredients.js');
const { body, validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch')
  .then(({default: fetch}) => fetch(...args));

// Get all ingredients from the database
router.get('/my-ingredients', async (req, res) => {
  try {
    const username = req.query.username;
    const ingredients = await IngredientModel.find({ username }, { _id: 0, __v: 0 });
    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

// Add an ingredient to the database
router.post('/my-ingredients', [
  body('name').isString().notEmpty(),
  body('amount').isInt({ min: 1 }),
], async (req, res) => {
  try {
    const { name, amount, username } = req.body; // Modify to get username from req.body

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the ingredient already exists in the database for the specific user
    let existingIngredient = await IngredientModel.findOne({ name: name.toLowerCase(), username }); // Modify to search by name and username
    if (existingIngredient) {
      existingIngredient.amount += amount;
      await existingIngredient.save();
      res.json({ message: `Successfully added ${amount} ${name}(s)` });
    } else {
      // Create a new ingredient in the database for the specific user
      const newIngredient = new IngredientModel({ username, name: name.toLowerCase(), amount }); // Modify to include username
      await newIngredient.save();
      res.json({ message: `Successfully added ${amount} ${name}(s)` });
    }
  } catch (error) {
    console.error('Error adding ingredient:', error);
    res.status(500).json({ error: 'Failed to add ingredient' });
  }
});

// Delete an ingredient from the database
router.delete('/my-ingredients/:name', async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    const username = req.query.username;
    const ingredient = await IngredientModel.findOneAndDelete({ name: name.toLowerCase(), username }); // Modify to search by name and username
    if (!ingredient) {
      res.status(404).json({ error: `Ingredient with name ${name} not found` });
    } else {
      res.json({ message: `Successfully deleted ingredient with name ${name}` });
    }
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

// Search for ingredients using the Spoonacular API
router.get('/search-ingredient', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}`
    );
    if (response.status !== 200) {
      throw new Error('Failed to search ingredients');
    }
    const data = await response.json();
    // Transform the data to match the expected format
    const transformedData = data.results.map(item => ({
      id: item.id,
      name: item.name,
      amount: 0
    }));
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients from API' });
  }
});

module.exports = router;
