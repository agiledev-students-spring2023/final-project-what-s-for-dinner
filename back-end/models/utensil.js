const mongoose = require("mongoose");

const utensilSchema = new mongoose.Schema({
  utensil_title: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Utensil", utensilSchema);
