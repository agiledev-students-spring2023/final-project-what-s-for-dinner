const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const IngredientModel = require('../models/ingredients.js');
const { expect } = chai;

chai.use(chaiHttp);

describe('Ingredients API', () => {
  describe('GET /my-ingredients', () => {
    it('should return all ingredients for a given username', async () => {
      const username = 'ginettexu';
      const res = await chai
        .request(app)
        .get(`/ingredients/my-ingredients?username=${username}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    }).timeout(5000);
  });

  describe('POST /my-ingredients', () => {
    it('should add a new ingredient for a given username', async () => {
      const username = 'ginettexu';
      const newIngredient = {
        name: 'apple',
        amount: 5,
        username,
      };

      const res = await chai
        .request(app)
        .post('/ingredients/my-ingredients')
        .send(newIngredient);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.equal('Successfully added 5 apple(s)');

      // verify that the ingredient was added to the database
      const ingredient = await IngredientModel.findOne({ name: 'apple', username });
      expect(ingredient).to.exist;
      expect(ingredient.amount).to.equal(5);

      await IngredientModel.findOneAndDelete({ name: ingredient.name, username });
    }).timeout(5000);

    it('should return an error if the request body is invalid', async () => {
      const res = await chai
        .request(app)
        .post('/ingredients/my-ingredients')
        .send({ name: '', amount: -1 });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors.length).to.equal(2);
    });
  });

  describe('DELETE /my-ingredients/:name', () => {
    it('should delete an ingredient for a given username', async () => {
      const username = 'ginettexu';
      const ingredientName = 'apple';

      // add an ingredient to the database for the test user
      const newIngredient = new IngredientModel({ username, name: ingredientName.toLowerCase(), amount: 5 });
      await newIngredient.save();

      const res = await chai
        .request(app)
        .delete(`/ingredients/my-ingredients/${ingredientName}?username=${username}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').to.equal(`Successfully deleted ingredient with name ${ingredientName}`);

      // verify that the ingredient was deleted from the database
      const ingredient = await IngredientModel.findOne({ name: ingredientName, username });
      expect(ingredient).to.not.exist;
    });

    it('should return an error if the ingredient does not exist', async () => {
      const username = 'ginettexu';
      const ingredientName = 'non-existent ingredient';

      const res = await chai
        .request(app)
        .delete(`/ingredients/my-ingredients/${ingredientName}?username=${username}`);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error').to.equal(`Ingredient with name ${ingredientName} not found`);
    });
  });

  describe('GET /search-ingredient', () => {
    it('should search for ingredients using a given query string', async () => {
      const query = 'apple';
      const res = await chai
      .request(app)
      .get(`/ingredients/search-ingredient?query=${query}`);
  
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0); // assuming at least one ingredient exists in the database matching the query
    });
  });
});
