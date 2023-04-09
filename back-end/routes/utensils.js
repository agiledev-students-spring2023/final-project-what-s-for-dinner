const express = require('express');
const router = express.Router();

let utensils = [
  // Your utensils data here (you can copy it from your frontend code)
];

// Get all utensils
router.get('/api/utensils', (req, res) => {
  res.json(utensils);
});

// Add a new utensil
router.post('/api/utensils', (req, res) => {
  const newUtensil = req.body;
  newUtensil.id = Date.now();
  utensils.push(newUtensil);
  res.json(newUtensil);
});

// Update a utensil by ID
router.put('/api/utensils/:id', (req, res) => {
  const utensilId = parseInt(req.params.id);
  const updatedUtensil = req.body;
  const index = utensils.findIndex((utensil) => utensil.id === utensilId);

  if (index >= 0) {
    utensils[index] = updatedUtensil;
    res.json(updatedUtensil);
  } else {
    res.status(404).json({ message: 'Utensil not found' });
  }
});

// Delete a utensil by ID
router.delete('/api/utensils/:id', (req, res) => {
  const utensilId = parseInt(req.params.id);
  const index = utensils.findIndex((utensil) => utensil.id === utensilId);

  if (index >= 0) {
    const deletedUtensil = utensils.splice(index, 1);
    res.json(deletedUtensil);
  } else {
    res.status(404).json({ message: 'Utensil not found' });
  }
});

module.exports = router;