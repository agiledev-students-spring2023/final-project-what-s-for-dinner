const express = require('express');
const router = express.Router();
const fetch = import('node-fetch').default;

const YOUR_API_KEY = "f2bec4050b0a4618abf65fde4f95492a";

router.get('/ingredients', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/ingredients/list?apiKey=${YOUR_API_KEY}`
    );
    const data = await response.json();
    // Transform the data to match the expected format
    const transformedData = data.map(item => ({ name: item.name }));
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${YOUR_API_KEY}&query=${query}`
    );
    const data = await response.json();
    // Transform the data to match the expected format
    const transformedData = data.results.map(item => ({ name: item.name }));
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to search ingredients' });
  }
});

module.exports = router;
