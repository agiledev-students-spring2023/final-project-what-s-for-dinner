const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const API_KEY = process.env.MEAL_DB_API_KEY;
const API_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/filter.php`;
const API_SPEC_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/lookup.php`;
const FILE_PATH = path.join(__dirname, '../tmp_data/recipes.txt');
const API_SEARCH_URL = "www.themealdb.com/api/json/v1/1/search.php";

router.get("/recipes", async function (req, res) {
  try{
      const ingredients = req.query.ingredients;
      if (!ingredients || ingredients.length === 0) {
        return res.status(400).send('No ingredients provided');
      }
      let response;
      try {
        response = await axios.get(`${API_URL}?i=${ingredients}`);
      } catch (error) {
        console.error(error);
        const fileData = fs.readFileSync(FILE_PATH, 'utf8');
        const meals = JSON.parse(fileData);
        return res.status(200).json({ meals });
      }
      const meals = response.data.meals;
      //JUST IN CASE THE MEALDB API has a server error again!
      if (!meals || meals.length === 0) {
        const fileData = fs.readFileSync(FILE_PATH, 'utf8');
        return res.status(200).json({ meals: JSON.parse(fileData) });
      }
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
    let response;
    try {
      response = await axios.get(`${API_URL}?i=${ingredients}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while searching for meals.');
    }
    const meals = response.data.meals;
    if (!meals || meals.length === 0) {
      const fileData = fs.readFileSync(FILE_PATH, 'utf8');
      return res.status(200).json({ meals: JSON.parse(fileData) });
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
    let response;
    try {
      response = await axios.get(`${API_URL}?i=${ingredients}`);
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while searching for meals.');
    }
    const meals = response.data.meals;
    if (!meals || meals.length === 0) {
      const fileData = fs.readFileSync(FILE_PATH, 'utf8');
      return res.status(200).json({ meals: JSON.parse(fileData) });
    }
    //meals.sort((a, b) => parseInt(a.time) - parseInt(b.time)); //will make this what the code is when we have a database with these parameters
    meals.sort((a, b) => a.idMeal.localeCompare(b.idMeal));
    res.status(200).json({ meals });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for meals.');
  }
});

router.get('/recipes/:id', async (req, res, next) => {
  try {
    const mealId = req.params.id;
    let response;
    try {
      response = await axios.get(`${API_SPEC_URL}?i=${mealId}`);
      console.log(response);
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 500) {
        console.log('API error: ', apiError);
        console.log('Using local data instead');
        const data = fs.readFileSync('../tmp_data/recipes.txt', 'utf-8');
        const meals = JSON.parse(data).meals;
        const meal = meals.find(m => m.idMeal === mealId);
        if (meals.length === 0 || !meal) {
          return res.status(404).send('Meal not found');
        }
        response = { data: { meals: [meal] } };
      } else {
        throw apiError;
      }
    }
    if (!response.data.meals || response.data.meals.length === 0) {
      return res.status(404).send('Meal not found');
    }
    const meal = response.data.meals[0];
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


router.get('/search', async (req, res, next) => {
  try {
    console.log(req.query);
    const keyword = req.query.keyword;
    console.log(keyword);
    const response = await axios.get(`${API_URL}?i=${keyword}`);
    if (!response.data.meals || response.data.meals.length === 0) {
      return res.status(200).json({ data: [] });
    }
    const meals = response.data.meals;

    const data = meals.map(meal => {
      const {
        idMeal,
        strMeal,
        strMealThumb,
      } = meal;

      return {
        id: idMeal,
        name: strMeal,
        thumbnail: strMealThumb,
      };
    });

    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while searching for meals.' });
  }
});


module.exports = router;