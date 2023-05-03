const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 
const expect = chai.expect;
const sinon = require('sinon');
const axios = require('axios');
const RecipeController = require('../controllers/RecipeController');
const IngredientModel = require('../models/ingredients');
const ObjectId = require('mongodb').ObjectId;
const Recipe = require('../models/recipes');
const User = require('../models/users')


chai.use(chaiHttp);

describe('RecipeController', () => {
  describe('getIngredients', () => {
    it('should retrieve the list of ingredients from the ingredients collection', async () => {
      const req = { query: { username: 'testUser' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      const ingredients = [{ name: 'testIngredient1', amount: 1 }, { name: 'testIngredient2', amount: 2 }];
      sinon.stub(IngredientModel, 'find').resolves(ingredients);
      const expectedIngredientNames = ingredients.map(({ name }) => name);
      const expectedIngredientAmounts = ingredients.map(({ amount }) => amount);
      const expectedRegexPatterns = expectedIngredientNames.map(name => new RegExp(`\\b${name}\\b`, "i"));
      const expectedRecipes = [{ title: 'testRecipe1' }, { title: 'testRecipe2' }];
      sinon.stub(Recipe, 'find').returns({ exec: () => Promise.resolve(expectedRecipes) });
      const result = await RecipeController.getIngredients(req, res);
      expect(result).to.deep.equal(expectedRecipes);
      expect(IngredientModel.find.calledOnceWithExactly({ username: 'testUser' }, { _id: 0, __v: 0 })).to.be.true;
      expect(Recipe.find.calledOnceWithExactly({ Cleaned_Ingredients: { $regex: new RegExp(expectedIngredientNames.join("|"), "i") } })).to.be.true;
      IngredientModel.find.restore();
      Recipe.find.restore();
    });

    it('should handle errors while retrieving the list of ingredients', async () => {
      const req = { query: { username: 'testUser' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      const error = new Error('Internal server error');
      sinon.stub(IngredientModel, 'find').rejects(error);
      await RecipeController.getIngredients(req, res);
      expect(res.status.calledOnceWithExactly(500)).to.be.true;
      expect(res.send.calledOnceWithExactly('An error occurred while retrieving recipes')).to.be.true;
      IngredientModel.find.restore();
    });
  });

  describe('getRecipesByIngredients', () => {
    it('should get recipes by ingredients and return them in the response', async () => {
      try {
        const req = { query: { ingredients: 'tomato,potato', limit: 10 } };
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub(), send: sinon.stub() };
        const expectedRecipes = [{ title: 'testRecipe1' }, { title: 'testRecipe2' }];
        sinon.stub(Recipe, 'find').resolves(expectedRecipes);
        await RecipeController.getRecipesByIngredients(req, res);
        console.log(req.query); // log the request query object
        console.log(expectedRecipes); // log the expected recipes array
        expect(res.status.calledOnceWithExactly(200)).to.be.true;
        expect(res.json.calledOnceWithExactly({ recipes: expectedRecipes })).to.be.true;
      } catch (error) {
        // handle the error here
        console.error(error);
      } finally {
        Recipe.find.restore();
      }
    });
    
  
    it('should handle errors while getting recipes by ingredients', async () => {
      const req = { query: { ingredients: 'tomato,potato', limit: 10 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub(), send: sinon.stub() };
      const error = new Error('Internal server error');
      try {
        sinon.stub(Recipe, 'find').rejects(error);
        await RecipeController.getRecipesByIngredients(req, res);
        expect(res.status.calledOnceWithExactly(500)).to.be.true;
        expect(res.json.calledOnceWithExactly({ error: error.message })).to.be.true;
      } catch (e) {
        return e;
      } finally {
        Recipe.find.restore();
      }
    });
  });
  
  
    
  describe('getRecipesSorted', () => {
    it('should return a sorted list of recipes', async () => {
      const req = { query: { ingredients: 'ingredient1,ingredient2', limit: 10, sentRecipeIds: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub(), send: sinon.stub() };
      const recipes = [{ title: 'testRecipe1', Instructions: 'testInstructions1' }, { title: 'testRecipe2', Instructions: 'testInstructions2' }];
      sinon.stub(Recipe, 'find').resolves(recipes);
      try {
        const expectedSortedRecipes = [...recipes].sort((a, b) => a.Instructions.length - b.Instructions.length);
        await RecipeController.getRecipesSorted(req, res);
        expect(res.json.calledOnceWithExactly({ recipes: expectedSortedRecipes })).to.be.true;
      } catch (error) {
        console.error(error);
      } finally {
        Recipe.find.restore();
      }
    });
  
    it('should handle errors while retrieving recipes', async () => {
      const req = { query: { ingredients: 'ingredient1,ingredient2', limit: 10, sentRecipeIds: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub(), send: sinon.stub() };
      sinon.stub(Recipe, 'find').rejects(new Error('testError'));
      try {
        await RecipeController.getRecipesSorted(req, res);
        expect(res.status.calledOnceWithExactly(500)).to.be.true;
        expect(res.send.calledOnceWithExactly('An error occurred while retrieving recipes')).to.be.true;
      } catch (error) {
        console.error(error);
      } finally {
        Recipe.find.restore();
      }
    });
  });
  
  
  
  describe('getRecipesSimilar', () => {
    it('should return a sorted list of recipes with similarity scores', async () => {
      const req = { query: { ingredients: 'eggs,testIngredient1,testIngredient2', limit: 5, sentRecipeIds: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const recipes = [
        { title: 'testRecipe1', Instructions: 'testInstructions1', Cleaned_Ingredients: ['eggs', 'rice', 'testIngredient1'] },
        { title: 'testRecipe2', Instructions: 'testInstructions2', Cleaned_Ingredients: ['eggs', 'testIngredient2'] }
      ];
      sinon.stub(Recipe, 'find').resolves(recipes);
      const expectedSimilarRecipes = [
        { recipe: recipes[0], similarity: 2 },
        { recipe: recipes[1], similarity: 1 }
      ];
      const expectedSortedRecipes = expectedSimilarRecipes.sort((a, b) => b.similarity - a.similarity).map((r) => r.recipe);
      
      try {
        await RecipeController.getRecipesSimilar(req, res);
        expect(Recipe.find.calledOnceWithExactly({ 
          Cleaned_Ingredients: { $regex: /eggs|testIngredient1|testIngredient2/i },
          _id: { $nin: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'] }
        }, null, { limit: 5 })).to.be.true;
        expect(res.json.calledOnceWithExactly({ recipes: expectedSortedRecipes })).to.be.true;
      } catch (error) {
        // handle error
      } finally {
        Recipe.find.restore();
      }
    });
  
    it('should handle errors while retrieving recipes', async () => {
      const req = { query: { ingredients: 'eggs,testIngredient1,testIngredient2', limit: 5, sentRecipeIds: '12345,67890' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      sinon.stub(Recipe, 'find').rejects(new Error('testError'));
  
      try {
        await RecipeController.getRecipesSimilar(req, res);
        expect(res.status.calledOnceWithExactly(500)).to.be.true;
        expect(res.send.calledOnceWithExactly('An error occurred while retrieving sorted recipes')).to.be.true;
      } catch (error) {
        // handle error
      } finally {
        Recipe.find.restore();
      }
    });
  });
  
  

    describe('getRecipe', () => {
      it('should return the recipe with the given ID', async () => {
        // Arrange
        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = { json: sinon.stub(), status: sinon.stub().returnsThis(), send: sinon.stub() };
        const expectedRecipe = { _id: '507f1f77bcf86cd799439011', title: 'Test Recipe', ingredients: ['testIngredient'] };
        sinon.stub(Recipe, 'find').returns({
          exec: sinon.stub().resolves(expectedRecipe)
        });
    
        // Act
        await RecipeController.getRecipe(req, res);
    
        // Assert
        expect(res.status.called).to.be.false;
        expect(res.json.calledWith({ recipe: expectedRecipe })).to.be.true;
        expect(Recipe.find.calledWith({ _id: new ObjectId('507f1f77bcf86cd799439011') })).to.be.true;
        Recipe.find.restore();
      });
    
      it('should return 404 if recipe not found', async () => {
        // Arrange
        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = { json: sinon.stub(), status: sinon.stub().returnsThis(), send: sinon.stub() };
        sinon.stub(Recipe, 'find').returns({
          exec: sinon.stub().resolves(null)
        });
    
        // Act
        await RecipeController.getRecipe(req, res);
    
        // Assert
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.send.calledWith('Recipe not found')).to.be.true;
        expect(Recipe.find.calledWith({ _id: new ObjectId('507f1f77bcf86cd799439011') })).to.be.true;
        Recipe.find.restore();
      });
    
      it('should return 500 if there is an error', async () => {
        // Arrange
        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = { json: sinon.stub(), status: sinon.stub().returnsThis(), send: sinon.stub() };
        const errorMessage = 'Internal server error';
        sinon.stub(Recipe, 'find').returns({
          exec: sinon.stub().throws(new Error(errorMessage))
        });
    
        // Act
        await RecipeController.getRecipe(req, res);
    
        // Assert
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.send.calledWith(errorMessage)).to.be.true;
        expect(Recipe.find.calledWith({ _id: new ObjectId('507f1f77bcf86cd799439011') })).to.be.true;
        Recipe.find.restore();
      });

      describe('getSearchRecipes', () => {
        it('should return all recipes if no keyword is provided', async () => {
          const req = { query: {} };
          const res = { json: sinon.stub(), status: sinon.stub().returnsThis(), send: sinon.stub() };
          const mockRecipes = [{ title: 'testRecipe1' }, { title: 'testRecipe2' }];
          sinon.stub(Recipe, 'find').returns({ exec: () => Promise.resolve(mockRecipes) });

          await RecipeController.getSearchRecipes(req, res);
        
          expect(Recipe.find.calledOnceWithExactly()).to.be.true;
          expect(res.json.calledOnceWithExactly({ recipes: mockRecipes })).to.be.true;

          Recipe.find.restore();
        });
      
        it('should return recipes containing the keyword', async () => {
          const req = { query: { keyword: 'test' } };
          const res = { json: sinon.stub(), status: sinon.stub().returnsThis(), send: sinon.stub() };
          const recipes = [{ Title: 'testRecipe1' }, { Title: 'Recipe with test in title' }];
          const expectedResponse = [recipes[1]];
          sinon.stub(Recipe, 'find').returns({ exec: () => Promise.resolve(recipes) });
          try {
            await RecipeController.getSearchRecipes(req, res);
            expect(Recipe.find.calledOnceWithExactly({ Title: new RegExp(req.query.keyword, 'i') })).to.be.true;
            expect(res.json.calledOnceWithExactly({ recipes: expectedResponse })).to.be.true;
          } catch (error) {
            console.error(error);
          } finally {
            Recipe.find.restore();
          }
        });
      
        it('should handle errors', async () => {
          const req = { query: {} };
          const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
          const error = new Error('Test error');
          sinon.stub(Recipe, 'find').rejects(error);
          await RecipeController.getSearchRecipes(req, res);
          expect(res.status.calledOnceWithExactly(500)).to.be.true;
          expect(res.send.calledOnceWithExactly('Internal server error')).to.be.true;
          Recipe.find.restore();
        });
      });
      
    });

    describe('getRecommended', () => {
      it('should return a random recipe', async () => {
        const sampleRecipe = { title: 'Test Recipe', ingredients: ['ingredient1', 'ingredient2'] };
        sinon.stub(Recipe, 'aggregate').resolves([sampleRecipe]);
        const req = {};
        const res = { json: sinon.stub() };
        await RecipeController.getReccomended(req, res);
        expect(res.json.calledOnceWithExactly(sampleRecipe)).to.be.true;
        Recipe.aggregate.restore();
      });
    
      it('should handle errors and return 500 status code', async () => {
        sinon.stub(Recipe, 'aggregate').rejects(new Error('Test error'));
        const req = {};
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
        await RecipeController.getReccomended(req, res);
        expect(res.status.calledOnceWithExactly(500)).to.be.true;
        expect(res.send.calledOnceWithExactly('Internal server error')).to.be.true;
        Recipe.aggregate.restore();
      });
    });
describe('addComment', () => {
  it('should add a comment to the recipe and update the average rating', async () => {
    const req = {
      body: {
        recipeId: 'recipe-id',
        username: 'test-user',
        comment: 'test-comment',
        rating: 4
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const recipe = {
      Comments: [],
      save: sinon.stub().resolves() // add save function to the recipe object
    };
    sinon.stub(Recipe, 'findById').resolves(recipe);
    sinon.stub(RecipeController, 'getAverageRating').resolves(4);
  
    try {
      await RecipeController.addComment(req, res);
  
      expect(res.status.calledOnceWithExactly(200)).to.be.true;
      expect(res.json.calledOnceWithExactly({ message: 'Comment added successfully', averageRating: 4 })).to.be.true;
      expect(recipe.Comments).to.have.lengthOf(1);
      expect(recipe.Comments[0]).to.deep.equal({
        username: 'test-user',
        comment: 'test-comment',
        rating: 4
      });
      expect(recipe.Rating).to.equal(4);
    } catch (error) {
      console.error(error);
    } finally {
      Recipe.findById.restore();
      RecipeController.getAverageRating.restore();
    }
  });      
  
  it('should return a 404 error if the recipe is not found', async () => {
    const req = {
      body: {
        recipeId: 'recipe-id',
        username: 'test-user',
        comment: 'test-comment',
        rating: 4
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    sinon.stub(Recipe, 'findById').resolves(null);
  
    await RecipeController.addComment(req, res);
  
    expect(res.status.calledOnceWithExactly(404)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'Recipe not found' })).to.be.true;
  
    Recipe.findById.restore();
  });
  
  it('should return a 500 error if an error occurs while adding a comment', async () => {
    const req = {
      body: {
        recipeId: 'recipe-id',
        username: 'test-user',
        comment: 'test-comment',
        rating: 4
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
    const error = new Error('Test error');
    sinon.stub(Recipe, 'findById').rejects(error);
  
    await RecipeController.addComment(req, res);
  
    expect(res.status.calledOnceWithExactly(500)).to.be.true;
    expect(res.send.calledOnceWithExactly('Internal server error')).to.be.true;
  
    Recipe.findById.restore();
  });
});
    describe('GET /api/images/:imageName', () => {
      it('should send the requested image file', async () => {
        const res = await chai.request(server).get('/api/images/test.jpg');
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'image/jpeg');
        expect(Buffer.isBuffer(res.body)).to.be.true;
        const imageBuffer = res.body;
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');
        expect(imageBase64).to.be.a('string');
      });
      
    
      it('should return an error if the requested image file does not exist', async () => {
        const res = await chai.request(server).get('/api/images/nonexistent.jpg');
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        //expect(res.body.message).to.equal('File not found');
      });
    });
    
    describe('getAverageRating', () => {
      it('should return the average rating of a recipe', async () => {
        const recipeId = 'testRecipeId';
        const recipe = {
          _id: recipeId,
          Comments: [
            { rating: 3 },
            { rating: 5 },
            { rating: 2 }
          ]
        };
        sinon.stub(Recipe, 'findById').resolves(recipe);
        const expectedAverageRating = 3.33;
        const result = await RecipeController.getAverageRating(recipeId);
        expect(result).to.be.closeTo(expectedAverageRating, 0.01);
        Recipe.findById.restore();
      });
    
      it('should return null if the recipe is not found', async () => {
        const recipeId = 'testRecipeId';
        sinon.stub(Recipe, 'findById').resolves(null);
        const result = await RecipeController.getAverageRating(recipeId);
        expect(result).to.be.null;
        Recipe.findById.restore();
      });
    
      it('should return 0 if the recipe has no ratings', async () => {
        const recipeId = 'testRecipeId';
        const recipe = { _id: recipeId, Comments: [] };
        sinon.stub(Recipe, 'findById').resolves(recipe);
        const result = await RecipeController.getAverageRating(recipeId);
        expect(result).to.equal(0);
        Recipe.findById.restore();
      });
    
      it('should handle errors while retrieving the recipe', async () => {
        const recipeId = 'testRecipeId';
        sinon.stub(Recipe, 'findById').rejects(new Error('testError'));
        const result = await RecipeController.getAverageRating(recipeId);
        expect(result).to.be.null;
        Recipe.findById.restore();
      });
    });
    describe('RecipeController.saveRecipe', () => {
      
      it('should return a 500 error if an error occurs', async () => {
        const req = {
          body: {
            recipeId: new ObjectId().toHexString(),
            username: 'testuser'
          }
        };
        const res = {
          status: sinon.stub().returnsThis(),
          send: sinon.stub()
        };
        sinon.stub(User, 'findOne').rejects(new Error('Database error'));
        
        try {
          await RecipeController.saveRecipe(req, res);
          expect(res.status.calledOnceWith(500)).to.be.true;
          expect(res.send.calledOnceWith('An error occurred while saving the recipe')).to.be.true;
        } catch (error) {
          throw error;
        } finally {
          User.findOne.restore();
        }
      });
    });
    
});
