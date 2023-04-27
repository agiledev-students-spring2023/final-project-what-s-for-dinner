const mongoose = require('mongoose');

// Define the Ingredient schema
const ingredientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true }
});

ingredientSchema.statics.findOneAndDelete = async function (query) {
  const ingredient = await this.findOne(query);
  if (ingredient) {
    await ingredient.deleteOne();
  }
  return ingredient;
};

// Define the Ingredient model
module.exports = mongoose.model('Ingredient', ingredientSchema);

