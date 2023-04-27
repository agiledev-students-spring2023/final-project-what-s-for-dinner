const express = require('express');
const router = express.Router();
const path = require('path');
const SavedRecipeModel = require('../models/savedRecipes.js');
const RecipeController = require('../controllers/RecipeController');
require('dotenv').config();
const API_KEY = process.env.MEAL_DB_API_KEY;
const API_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/filter.php`;
const API_SPEC_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/lookup.php`;
const FILE_PATH = path.join(__dirname, '../tmp_data/recipes.txt');
const API_SEARCH_URL = "www.themealdb.com/api/json/v1/1/search.php";

module.exports = router;

// Temporary Test of new saved recipe
const newItem = new SavedRecipeModel({
    username: 'username',
    Title: 'title',
    Ingredients: "ingredients",
    Instructions: "do this",
    Image_Name: "image"
  });

router.get('/saved-recipes', async (req, res) => {
    try {
      const username = req.query.username;
      const savedRecipes = await SavedRecipeModel.find({ username }, { _id: 0, __v: 0 });
      res.json(savedRecipes);
    } catch (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'Failed to fetch saved recipes' });
    }
  });


router.post('/saved-recipes', async (req, res) => {
    try {
      const { username, Title, Ingredients, Instructions, Image_Name } = req.body; // Modify to get username from req.body
  
      // Validate the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      newItem.save();
  

      /*
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
      */
    } 
    catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ error: 'Failed to add recipe' });
    }
    
  });