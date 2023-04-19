const IngredientModel = require('../models/ingredients');
const Recipe = require('../models/recipes');
const ObjectId = require('mongodb').ObjectId;

class RecipeController {
    static async getIngredients(req, res) {
      try {
        // Retrieve the list of ingredients from the ingredients collection
        const username = req.query.username;
        const ingredients = await IngredientModel.find({ username }, { _id: 0, __v: 0 });

        // Find recipes that contain all of the ingredients, but not guaranteed to have ONLY the ingredients
        const ingredientNames = ingredients.map(({ name }) => name);
        const ingredientAmounts = ingredients.map(({ amount }) => amount);
        console.log(ingredientNames);
        const regexPatterns = ingredientNames.map(name => new RegExp(`\\b${name}\\b`, "i"));
        const recipes = await Recipe.find({ 
          $and: [ { 
            Cleaned_Ingredients: {
              $all: regexPatterns
            }
          } ]
        }).exec();
        
        return recipes
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving recipes');
      }
    }
    static async getRecipesByIngredients(req, res) {
      try {
        const recipes = await RecipeController.getIngredients(req, res);

        res.status(200).json({ recipes });

      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving recipes');
      }
    }
    static async getRecipesSorted(req, res) {
      try {
        // Get recipes by ingredients
        //const ingredients = ["broccolini"];
        const recipes = await RecipeController.getIngredients(req, res);
        //const recipes = await Recipe.find({ Cleaned_Ingredients: { $regex: new RegExp(ingredients.join("|"), "i") } }).exec();
        console.log(recipes)
        // Create a new sorted array of recipes
        const sortedRecipes = [...recipes].sort((a, b) => a.Instructions.length - b.Instructions.length);
    
        // Return the sorted list of recipes
        res.status(200).json({ recipes: sortedRecipes });
        return;
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving recipes');
        return;
      }
    }

    static async getRecipesSimilar(req, res) {
      try {
        const ingredients = ["eggs", "rice"];
    
        const recipes = await RecipeController.getIngredients(req, res);
        
        const recipeSimilarities = recipes.map((recipe) => {
          const recipeIngredients = recipe.Cleaned_Ingredients;
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

      static async getRecipe(req, res) {
        const mealId = req.params.id;
        let recipe;
        try {
          recipe = await Recipe.find({ _id: new ObjectId(mealId)}).exec();;
          console.log(recipe);
          if (!recipe) {
            res.status(404).send('Recipe not found');
            return;
          }
      
          res.json({ recipe });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      }

      static async getSearchRecipes(req, res) {
        const keyword = req.query.keyword;
        let response;
        try {
          if (keyword) {
            const regex = new RegExp(keyword, 'i');
            response = await Recipe.find({ Title: regex }).exec();
          } else {
            response = await Recipe.find().exec();
          }
          res.json({ recipes: response });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      }

      static async getReccomended(req, res) {
        try {
          const response = await Recipe.aggregate([{ $sample: { size: 1 } }]);
          const randomRecipe = response[0];
          res.json(randomRecipe);
      } catch (err) {
          console.error(err);
          res.status(500).send('Internal server error');
      }
    }
  }
  
  module.exports = RecipeController;
  