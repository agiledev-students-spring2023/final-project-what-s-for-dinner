const mongoose = require('mongoose');

// Define the Ingredient schema
const ingredientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true }
});

// Define the Ingredient model
module.exports = mongoose.model('Ingredient', ingredientSchema);

