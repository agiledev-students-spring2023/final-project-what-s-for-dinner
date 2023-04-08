const express = require('express');
const router = express.Router();

const YOUR_API_KEY = "86b8ac3348974b5ab495921e201be0de";

const fs = require('fs');
const path = require('path');

// Define the file path
const ingredientsFilePath = path.join(__dirname, '../tmp_data/ingredients.txt');

router.get('/my-ingredients', async (req, res) => {
  try {
    const fileContent = fs.readFileSync(ingredientsFilePath, 'utf-8');
    const ingredients = fileContent.split('\n').map(line => {
      try {
        const { name, amount } = JSON.parse(line);
        return { name, amount };
      } catch (error) {
        console.error(`Error parsing ingredient: ${line}`, error);
        return null;
      }
    }).filter(ingredient => ingredient !== null);
    
    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching data from file:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

router.post('/my-ingredients', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const { name, amount, id } = req.body;
    let existingIngredient = false;
    let ingredientsData = fs.readFileSync(ingredientsFilePath, 'utf8');
    if (ingredientsData) {
      const ingredientsArray = ingredientsData.split('\n').filter((line) => line.trim() !== '');
      for (let i = 0; i < ingredientsArray.length; i++) {
        const [existingId, existingName, existingAmount] = ingredientsArray[i].split(',');
        if (existingName.toLowerCase() === name.toLowerCase()) {
          const newAmount = parseInt(existingAmount) + parseInt(amount);
          ingredientsArray[i] = `${existingId},${existingName},${newAmount}`;
          existingIngredient = true;
          break;
        }
      }
      ingredientsData = ingredientsArray.join('\n');
    }
    if (!existingIngredient) {
      // If the ingredient does not exist, add it to the file
      fs.appendFileSync(ingredientsFilePath, `\n{"id": ${id}, "name": ${name}, "amount": ${amount}}`);
    } else {
      // If the ingredient exists, overwrite the file with the updated ingredient list
      fs.writeFileSync(ingredientsFilePath, ingredientsData, 'utf8');
    }
    res.json({ message: `Successfully added ${amount} ${name}(s)` });
  } catch (error) {
    console.error('Error adding ingredient:', error);
    res.status(500).json({ error: 'Failed to add ingredient' });
  }
});

router.get('/search-ingredient', async (req, res) => {
  const { query } = req.query;
  //console.log(query);
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${YOUR_API_KEY}&query=${query}`
    );
    if (response.status !== 200) {
      throw new Error('Failed to search ingredients');
    }
    const data = await response.json();
    //console.log(data);
    // Transform the data to match the expected format
    const transformedData = data.results.map(item => ({
      id: item.id,
      name: item.name,
      amount: 0
    }));
    res.json(transformedData);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to search ingredients' });
  }
});

module.exports = router;