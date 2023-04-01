const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.MEAL_DB_API_KEY;
const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/filter.php?i=`;
router.get("/recipes", async function (req, res) {
  try{
      const ingredients = req.query.ingredients;
      const response = await axios.get(`${API_URL}?i=${ingredients}`);
      const meals = response.data.meals;
      res.status(200).json({ meals });
    res.json(response.data);
  } catch (error){
    console.error(error);
    res.status(500).send('An error occurred while searching for meals.');
  }
  
});

module.exports = router;