<<<<<<< HEAD
<<<<<<< HEAD
//model to store relationship between a user and a utensil
=======
>>>>>>> 70ced8f (utensils model)
=======
//model to store relationship between a user and a utensil
>>>>>>> 8ccee45 (utensils changes back-end)
const mongoose = require("mongoose");

const userUtensilSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  utensilId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utensil",
    required: true,
  },
});

module.exports = mongoose.model("UserUtensil", userUtensilSchema);
