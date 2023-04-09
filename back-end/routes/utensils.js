const express = require('express');
const router = express.Router();

//since there is no api, data is hardcoded
let utensils = [
    {
      id: 1,
      recipe_title: "Whisk",
      country: "Brazil",
      price: "$10.51",
      recipe_description:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
    },
    {
      id: 2,
      recipe_title: "Spatula",
      country: "Russia",
      price: "$2.37",
      recipe_description:
        "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    },
    {
      id: 3,
      recipe_title: "Knife",
      country: "Russia",
      price: "$2.37",
      recipe_description:
        "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
    }
  ];

// Get all utensils
router.get('/api/utensils', (req, res) => { //api needed
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