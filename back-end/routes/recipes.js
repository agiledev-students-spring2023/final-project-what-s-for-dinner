const express = require('express');
const router = express.Router();
const path = require('path');
const RecipeController = require('../controllers/RecipeController');
require('dotenv').config();
const API_KEY = process.env.MEAL_DB_API_KEY;
const API_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/filter.php`;
const API_SPEC_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/lookup.php`;
const FILE_PATH = path.join(__dirname, '../tmp_data/recipes.txt');
const API_SEARCH_URL = "www.themealdb.com/api/json/v1/1/search.php";

router.get('/recipes', RecipeController.getRecipesByIngredients);
router.get('/recipes/sort-by-time', RecipeController.getRecipesSorted);
router.get('/recipes/sort-by-similar', RecipeController.getRecipesSimilar);
router.get('/recipes/:id', RecipeController.getRecipe);
router.get('/search', RecipeController.getSearchRecipes);
router.get('/random-recipe', RecipeController.getReccomended);
router.post('/reviews', RecipeController.addComment);
router.post('/save-recipe/:id', RecipeController.saveRecipe);
router.get('/saved-recipes', RecipeController.viewSavedRecipes);
router.get('/api/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../public/foodimages', imageName);

  res.sendFile(imagePath);
});

module.exports = router;