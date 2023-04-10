const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

const ingredientsFilePath = path.join(__dirname, '../tmp_data/ingredients.txt');

describe('Ingredient routes', () => {
  describe('GET /my-ingredients', () => {
    it('should return an array of ingredients', (done) => {
      chai.request(app)
        .get('/my-ingredients')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /my-ingredients', () => {
    it('should add a new ingredient to the file', (done) => {
      chai.request(app)
        .post('/my-ingredients')
        .send({ name: 'testIngredient', amount: 1, id: 123 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Successfully added 1 testIngredient(s)');
          // Check if the ingredient was added to the file
          const fileContent = fs.readFileSync(ingredientsFilePath, 'utf-8');
          expect(fileContent).to.include('testIngredient');
          done();
        });
    });

    it('should update an existing ingredient in the file', (done) => {
      chai.request(app)
        .post('/my-ingredients')
        .send({ name: 'testIngredient', amount: 2, id: 123 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Successfully added 2 testIngredient(s)');
          // Check if the ingredient was updated in the file
          const fileContent = fs.readFileSync(ingredientsFilePath, 'utf-8');
          expect(fileContent).to.include('"amount": 3');
          done();
        });
    });
  });

  describe('GET /search-ingredient', () => {
    it('should return an array of matching ingredients from the API', (done) => {
      chai.request(app)
        .get('/search-ingredient')
        .query({ query: 'potato' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('amount').to.equal(0);
          done();
        });
    });
  });
});
