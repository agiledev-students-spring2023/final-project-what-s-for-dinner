const mongoose = require('mongoose');

// Define the Ingredient schema
const savedRecipesSchema = new mongoose.Schema({
  username: { type: String, required: true },
  Title : {type: String},
  Ingredients : {type: String},
  Instructions: {type: String},
  Image_Name: {type: String},
});

const SavedRecipe = mongoose.model('SavedRecipe', savedRecipesSchema, 'SavedRecipe');
module.exports = SavedRecipe;
