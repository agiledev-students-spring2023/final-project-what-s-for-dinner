const mongoose = require('mongoose');

const utensilSchema = new mongoose.Schema({
  utensil_title: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
});

const Utensils = mongoose.model('Utensils', utensilSchema);
module.exports = Utensils;
