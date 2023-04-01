const express = require('express');
const axios = require('axios');

const router = express.Router();
const { popRecipes } = require('./utils/popRecipes.js')
router.get("/recipes", async function (req, res) {
  try{
      const ingredients = req.query.ingredients;
      const response = searchMealsByIngredients(ingredients);
      const meals = response.data.meals;
      res.status(200).json({ meals });
    res.json(response.data);
  } catch (error){
    console.error(error);
    res.status(500).send('An error occurred while searching for meals.');
  }
  
});

module.exports = router;