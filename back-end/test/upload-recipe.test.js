const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('POST /upload-recipe', () => {
  it('should upload a recipe successfully', (done) => {
    chai.request(app)
      .post('/api/upload-recipe')
      .set('content-type', 'multipart/form-data')
      .field('title', 'Test Recipe')
      .field('description', 'This is a test recipe')
      .field('instructions', 'Step 1: Do this. Step 2: Do that.')
      .field('ingredients', 'Ingredient 1, Ingredient 2')
      .attach('image', Buffer.from('image-data'), 'test-image.jpg')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Recipe uploaded successfully.');
        done();
      });
  });
});

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const app = require('../app');

// chai.use(chaiHttp);

// describe('POST /upload-recipe', () => {
//   it('should add a new recipe to the file and return a success message', (done) => {
//     chai.request(app)
//       .post('/api/upload-recipe')
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .field('title', 'New Recipe')
//       .field('description', 'A delicious new recipe')
//       .field('instructions', '1. Mix ingredients. 2. Bake for 20 minutes.')
//       .field('ingredients', 'flour, sugar, eggs, milk')
//       .attach('image', './test/test-image.jpg')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal('Recipe uploaded successfully.');
//         done();
//       });
//   });

//   it('should return an error message when required fields are missing', (done) => {
//     chai.request(app)
//       .post('/api/upload-recipe')
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .field('description', 'A delicious new recipe')
//       .field('instructions', '1. Mix ingredients. 2. Bake for 20 minutes.')
//       .attach('image', './test/test-image.jpg')
//       .end((err, res) => {
//         expect(res).to.have.status(500);
//         expect(res.body.error).to.equal('Failed to Upload Recipe');
//         done();
//       });
//   });
// });

// const request = require("supertest");
// const app = require("../app");

// describe("POST /upload-recipe", () => {
//   const testRecipe = {
//     title: "Test Recipe",
//     description: "A test recipe",
//     ingredients: ["Ingredient 1", "Ingredient 2"],
//     instructions: "1. Do this. 2. Do that.",
//   };

//   it("should upload a recipe and return a success message", async () => {
//     const response = await request(app)
//       .post("/upload-recipe")
//       .field("title", testRecipe.title)
//       .field("description", testRecipe.description)
//       .field("instructions", testRecipe.instructions)
//       .field("ingredients", testRecipe.ingredients[0])
//       .field("ingredients", testRecipe.ingredients[1])
//       .attach("image", "test/image.jpg");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: "Recipe uploaded successfully." });
//   });

//   it("should return an error message if the recipe upload fails", async () => {
//     const response = await request(app)
//       .post("/upload-recipe")
//       .field("title", testRecipe.title)
//       .field("description", testRecipe.description)
//       .field("instructions", testRecipe.instructions)
//       .field("ingredients", testRecipe.ingredients[0])
//       .field("ingredients", testRecipe.ingredients[1]);

//     expect(response.status).toBe(500);
//     expect(response.body).toEqual({ error: "Failed to Upload Recipe" });
//   });
// });