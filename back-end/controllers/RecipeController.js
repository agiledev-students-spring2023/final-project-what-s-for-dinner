const IngredientModel = require('../models/ingredients');
const Recipe = require('../models/recipes');
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId;
const User = require ('../models/users');
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
        const recipes = await Recipe.find({ Cleaned_Ingredients: { $regex: new RegExp(ingredientNames.join("|"), "i") } }).exec();  
        return recipes
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving recipes');
      }
    }
    static async getRecipesByIngredients(req, res) {
      try {
        const { ingredients, limit = 10, sentRecipeIds } = req.query;
        
        if (!ingredients) {
          return res.status(400).json({ error: 'Ingredients are required' });
        }
    
        const ingredientsArray = ingredients.split(',');
        const filter = { Cleaned_Ingredients: { $regex: new RegExp(ingredientsArray.join("|"), "i") } };
        if (sentRecipeIds) {
          // Exclude sent recipe IDs from the query
          filter._id = { $nin: sentRecipeIds.split(',') };
        }
        
        const recipes = await Recipe.find(filter)
          .limit(parseInt(limit))
          .exec();
        
        res.status(200).json({ recipes });
        
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving recipes');
      }
    }
    
    
    static async getRecipesSorted(req, res) {
      try {
        const { ingredients, limit, sentRecipeIds } = req.query;
        const ingredientsArray = ingredients ? ingredients.split(',') : [];
        const recipes = await Recipe.find({ Cleaned_Ingredients: { $regex: new RegExp(ingredientsArray.join("|"), "i") }, _id: { $nin: sentRecipeIds.split(',') } })
          .limit(limit)
          .exec();;
        const sortedRecipes = [...recipes].sort((a, b) => a.Instructions.length - b.Instructions.length);
    
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
        const { ingredients, limit, sentRecipeIds } = req.query;
        const ingredientsArray = ingredients ? ingredients.split(',') : [];
        const recipes = await Recipe.find({ 
          Cleaned_Ingredients: { $regex: new RegExp(ingredientsArray.join("|"), "i") },
          _id: { $nin: sentRecipeIds.split(',') }
        })
        .limit(limit)
        .exec();;        
        const recipeSimilarities = recipes.map((recipe) => {
          const recipeIngredients = recipe.Cleaned_Ingredients;
          const similarity = ingredientsArray.reduce((total, ingredient) => {
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
          recipe = await Recipe.find({ _id: new ObjectId(mealId)}).exec();
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
            response = await Recipe.find({ Title: regex })
            .limit(60)
            .exec();
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
      static async addComment(req, res) {
        const { recipeId, username, comment, rating } = req.body;
        try {
          const recipe = await Recipe.findById(recipeId);
          if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
          }
          const newComment = {
            username,
            comment,
            rating
          };
          recipe.Comments.push(newComment);
          const averageRating = await RecipeController.getAverageRating(recipeId);
          recipe.Rating = averageRating;
          console.log(recipe.Rating)
          await recipe.save();
          console.log(recipe.Rating)
          res.status(200).json({ message: 'Comment added successfully', averageRating});
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      }

      static async getAverageRating(recipeId) {
        try {
          const recipe = await Recipe.findById(recipeId);
          if (!recipe) {
            return null;
          }
          const numRatings = recipe.Comments.length;
          if (numRatings === 0) {
            return 0;
          }
          const totalRating = recipe.Comments.reduce((sum, comment) => sum + comment.rating, 0);
          const averageRating = totalRating / numRatings;
          return averageRating;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      
      // Save a recipe for a user
      static async saveRecipe(req, res) {
        try {
          const { recipeId, username } = req.body;

          console.log(recipeId);
          // Find the user in the database
          const user = await User.findOne({ username });
      
          // If the user's savedRecipes array is undefined or null, create an empty array
          if (!user.savedRecipes) {
            user.savedRecipes = [];
            
          }

          let recipe = await Recipe.findOne({ _id: new ObjectId(recipeId)}).exec();
          //console.log(recipe);      
          // Add the recipe to the user's saved recipes array
          console.log(recipe._id)
          user.savedRecipes.push(recipe._id);
      
          // Save the user's updated document to the database
          await user.save();
      
          // Send a success response
          res.status(200).json({ message: 'Recipe saved successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while saving the recipe');
        }
      }
      
      

    // View saved recipes for a user
    static async viewSavedRecipes(req, res) {
      try {
        const { username } = req.query;
        // Find the user in the database
        const user = await User.findOne({ username });
        //console.log(user);
        // Get the saved recipes for the user from the database
        const savedRecipes = await Recipe.find({ _id: { $in: user.savedRecipes } });
        // Send the saved recipes in the response
        console.log(savedRecipes);
        res.status(200).json({ savedRecipes });
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving saved recipes');
      }
    }


    
  }
  
  module.exports = RecipeController;
  