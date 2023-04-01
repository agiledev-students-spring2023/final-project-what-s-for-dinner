const express = require('express');
const router = express.Router();

const YOUR_API_KEY = "078f8383b35041d4be142556738ff3db";

router.get('/ingredients', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `https://api.spoonacular.com/ingredients/list?apiKey=${YOUR_API_KEY}`
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch ingredients');
    }
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
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${YOUR_API_KEY}&query=${query}`
    );
    if (response.status !== 200) {
      throw new Error('Failed to search ingredients');
    }
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
