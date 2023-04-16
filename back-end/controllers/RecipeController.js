const Ingredient = require('../models/ingredients');
const Recipe = require('../models/recipes');

class RecipeController {
    static async getRecipesByIngredients(req, res) {
      try {
        // Retrieve the list of ingredients from the ingredients collection
        const ingredients = await Ingredient.find().distinct('name').exec();
  
        // Check if there are any ingredients in the collection
        if (!ingredients || ingredients.length === 0) {
          return res.status(400).send('No ingredients found');
        }
  
        // Find recipes that contain at least one of the ingredients
        const recipes = await Recipe.find({ ingredients: { $in: ingredients } }).exec();
  
        // Return the list of recipes
        res.status(200).json({ recipes });
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving recipes');
      }
    }
    async getRecipesSorted(req, res) {
        try {
          // Get recipes by ingredients
          const recipes = await this.getRecipesByIngredients(req, res);
      
          // Sort recipes by length of instructions
          recipes.sort((a, b) => a.instructions.length - b.instructions.length);
      
          // Return the sorted list of recipes
          res.status(200).json({ recipes });
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while retrieving recipes');
        }
    }

    static async getRecipesSimilar(req, res) {
        try {
    
          const recipes = await this.getRecipesByIngredients(req, res);
    
          const recipeSimilarities = recipes.map((recipe) => {
          const recipeIngredients = recipe.ingredients;
          const similarity = ingredients.reduce((total, ingredient) => {
              return total + (recipeIngredients.includes(ingredient) ? 1 : 0);
          }, 0);
          return { recipe, similarity };
          });
    
          const sortedRecipes = recipeSimilarities.sort((a, b) => b.similarity - a.similarity).map((r) => r.recipe);
    
          res.status(200).json({ recipes: sortedRecipes });
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while retrieving sorted recipes');
        }
      }

  
  }
  
  module.exports = RecipeController;