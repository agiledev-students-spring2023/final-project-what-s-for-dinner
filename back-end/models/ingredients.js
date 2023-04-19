const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
