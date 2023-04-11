const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 
const expect = chai.expect;
const sinon = require('sinon');
const axios = require('axios');


chai.use(chaiHttp);
describe('The "/recipes" route', () => {
    describe('GET /recipes', () => {
        it('should return 400 if no ingredients are provided', async () => {
        const res = await chai.request(server).get('/recipes');
        expect(res.status).to.equal(400);
        expect(res.text).to.equal("No ingredients provided");
        });

        it('should return 200 and an array of meals if ingredients are provided', async () => {
        const res = await chai.request(server).get('/recipes?ingredients=chicken,onion');
        expect(res).to.have.status(200);
        expect(res.body.meals).to.be.an('array');
        });        
    });

    describe('GET /recipes/sort-by-time', () => {
        it('should return 400 if no ingredients are provided', async () => {
          const res = await chai.request(server).get('/recipes/sort-by-time');
          expect(res.status).to.equal(400);
          expect(res.text).to.equal("No ingredients provided");
        });
      
        it('should return 200 and an array of meals sorted by idMeal', async () => {
          const res = await chai.request(server).get('/recipes/sort-by-time?ingredients=chicken,onion');
          expect(res).to.have.status(200);
          expect(res.body.meals).to.be.an('array');
          const meals = res.body.meals;
          const sortedIds = meals.map((meal) => meal.idMeal).sort();
          expect(sortedIds).to.deep.equal(meals.map((meal) => meal.idMeal));
        });
      });

    describe('GET /recipes/sort-by-difficulty', () => {
        it('should return 400 if no ingredients are provided', async () => {
        const res = await chai.request(server).get('/recipes/sort-by-difficulty');
        expect(res.status).to.equal(400);
        expect(res.text).to.equal("No ingredients provided");
        });

        it('should return 200 and an array of meals sorted by idMeal', async () => {
            const res = await chai.request(server).get('/recipes/sort-by-difficulty?ingredients=chicken,onion');
            expect(res).to.have.status(200);
            expect(res.body.meals).to.be.an('array');
            const meals = res.body.meals;
            const sortedIds = meals.map((meal) => meal.idMeal).sort();
            expect(sortedIds).to.deep.equal(meals.map((meal) => meal.idMeal));
        });
    });

    describe('GET /recipes/:id', () => {
        it('should return 404 if meal id does not exist', async () => {
            const res = await chai.request(server).get('/recipes/123456');
            expect(res.status).to.equal(404);
            expect(res.text).to.equal("Meal not found");
          });

        it('should return 200 and a meal object', async () => {
        const res = await chai.request(server).get('/recipes/52771');
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('name', 'Spicy Arrabiata Penne');
        });
    });
    describe('GET /search', () => {
        it('should return an array of meal objects', async () => {
          const res = await chai.request(server).get('/search?keyword=chicken');
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('name');
          expect(res.body.data[0]).to.have.property('thumbnail');
          // check if category property is not empty
        });
      
        it('should return an empty array if no meals are found', async () => {
          const res = await chai.request(server).get('/search?keyword=invalidKeyword');
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).to.be.empty;
        });
      
        it('should return an error if an API error occurs', async () => {
          // Mock axios to return a 500 error
          const axiosMock = sinon.stub(axios, 'get').rejects({ response: { status: 500 } });
      
          const res = await chai.request(server).get('/search?keyword=chicken');
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message', 'An error occurred while searching for meals.');
      
          axiosMock.restore();
        });
      });


      describe('GET /random-recipe', () => {
        it('should return a random recipe', (done) => {
          chai.request(server).get('/random-recipe')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('idMeal');
              expect(res.body).to.have.property('strMeal');
              expect(res.body).to.have.property('strMealThumb');
              done();
            });
        });
      
        it('should handle errors', (done) => {
          const axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('Test error'));
      
          chai.request(server)
            .get('/random-recipe')
            .end((err, res) => {
              expect(res).to.have.status(500);
              axiosGetStub.restore();             
              done();
            });
        });
      });      
      
});
