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
<<<<<<< HEAD
<<<<<<< HEAD
=======
  description: {
    type: String,
    required: true,
  },
>>>>>>> 8ccee45 (utensils changes back-end)
=======
>>>>>>> c020431 (completed utensil functionality - works)
});

module.exports = mongoose.model("Utensil", utensilSchema);
