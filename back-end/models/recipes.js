const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let recipeSchema = new Schema(
    {
        //_id:{type:ObjectId},
        Title : {type: String},
        Ingredients : {type: String},
        Instructions: {type: String},
        Image_Name: {type: String},
        Cleaned_Ingredients: {type: String},
        Rating: {type: Number},
        Comments: {type: Array}
    }
)

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');
module.exports = Recipe;
