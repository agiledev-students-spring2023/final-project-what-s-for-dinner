// models/utensils.js
const mongoose = require("mongoose");

const utensilsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String
});

const Utensils = mongoose.model("Utensils", utensilsSchema);

module.exports = Utensils;
