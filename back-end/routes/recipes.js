const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.MEAL_DB_API_KEY;
const API_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/filter.php`;
const API_SPEC_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/lookup.php`;

router.get("/recipes", async function (req, res) {
  try{
      const ingredients = req.query.ingredients;
      if (!ingredients || ingredients.length === 0) {
        return res.status(400).send('No ingredients provided');
      }
      const response = await axios.get(`${API_URL}?i=${ingredients}`);
      const meals = response.data.meals;
      res.status(200).json({ meals });
  } catch (error){
    console.error(error);
    res.status(500).send('An error occurred while searching for meals.');
  }
  
});
router.get('/recipes/sort-by-time', async function(req, res) {
  try {
    const ingredients = req.query.ingredients;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).send('No ingredients provided');
    }
    const response = await axios.get(`${API_URL}?i=${ingredients}`);
    const meals = response.data.meals;
    if (!meals || meals.length === 0) {
      return res.status(404).send('No meals found');
    }
    //meals.sort((a, b) => parseInt(a.time) - parseInt(b.time)); //will make this what the code is when we have a database with these parameters
    meals.sort((a, b) => a.idMeal.localeCompare(b.idMeal));
    res.status(200).json({ meals });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for meals.');
  }
});
router.get('/recipes/sort-by-difficulty', async function(req, res) {
  try {
    const ingredients = req.query.ingredients;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).send('No ingredients provided');
    }
    const response = await axios.get(`${API_URL}?i=${ingredients}`);
    const meals = response.data.meals;
    console.log(meals);
    if (!meals || meals.length === 0) {
      return res.status(404).send('No meals found');
    }
    //meals.sort((a, b) => parseInt(a.difficulty) - parseInt(b.difficulty)); // will make this what the code is when we have a database with these parameters
    meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));//this is a palce holder just for display purposes
    res.status(200).json({ meals });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for meals.');
  }
});

router.get('/recipes/:id', async (req, res, next) => {
  try {
    console.log('Before API request');
    const mealId = req.params.id;
    console.log(mealId);
    const response = await axios.get(`${API_SPEC_URL}?i=${mealId}`);
    console.log(response.data.meals[0]);
    const meal = response.data.meals[0];
    console.log('After API request');

    if (!meal) {
      return res.status(404).send('Meal not found');
    }

    const {
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
    } = meal;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push({
          name: meal[`strIngredient${i}`],
          measurement: meal[`strMeasure${i}`],
        });
      }
    }

    const data = {
      name: strMeal,
      category: strCategory,
      area: strArea,
      instructions: strInstructions,
      thumbnail: strMealThumb,
      ingredients,
    };
    res.json({ data });
  } catch (error) {
    next(error);
  }
});


module.exports = router;