const mongoose = require('mongoose');

// Define the Ingredient schema
const savedRecipesSchema = new mongoose.Schema({
  username: { type: String, required: true },
  Title : {type: String},
  Ingredients : {type: String},
  Instructions: {type: String},
  Image_Name: {type: String},
});

// Define the Ingredient model
module.exports = mongoose.model('Saved Recipe', savedRecipesSchema);

