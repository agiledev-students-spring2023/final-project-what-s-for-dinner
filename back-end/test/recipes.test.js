const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 
const expect = chai.expect;
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
});
