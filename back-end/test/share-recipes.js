//const chai = require('chai');
//const chaiHttp = require('chai-http');
//const app = require('../app');
// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('POST /upload-recipe', () => {
//   it('should upload a recipe successfully', (done) => {
//     chai.request(app)
//       .post('/api/upload-recipe')
//       .set('content-type', 'multipart/form-data')
//       .field('title', 'Test Recipe')
//       .field('description', 'This is a test recipe')
//       .field('instructions', 'Step 1: Do this. Step 2: Do that.')
//       .field('ingredients', 'Ingredient 1, Ingredient 2')
//       .attach('image', Buffer.from('image-data'), 'test-image.jpg')
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body).to.have.property('message').to.equal('Recipe uploaded successfully.');
//         done();
//       });
//   });
// });

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

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const fs = require('fs');
// const path = require('path');

// const app = require('../app');

// chai.use(chaiHttp);

// describe('upload-recipe', () => {
//   const uploadrecipeFilePath = path.join(__dirname, '../tmp_data/upload-recipe.txt');
//   const testRecipe = {
//     title: 'Test Recipe',
//     description: 'This is a test recipe',
//     instructions: 'Test instruction',
//     ingredients: 'Test ingredient',
//   };
//   const testImage = {
//     fieldname: 'image',
//     originalname: 'test.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     buffer: fs.readFileSync(path.join(__dirname, 'test.jpg'))
//   };

//   beforeEach(() => {
//     fs.writeFileSync(uploadrecipeFilePath, '', 'utf8');
//   });

//   afterEach(() => {
//     fs.unlinkSync(uploadrecipeFilePath);
//   });

//   it('should upload recipe without image', async () => {
//     const res = await chai
//       .request(app)
//       .post('/upload-recipe')
//       .send(testRecipe);

//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property('message', 'Recipe uploaded successfully.');

//     const fileContent = fs.readFileSync(uploadrecipeFilePath, 'utf8');
//     const recipes = JSON.parse(fileContent);
//     expect(recipes).to.have.lengthOf(1);
//     expect(recipes[0]).to.deep.include(testRecipe);
//     expect(recipes[0]).to.not.have.property('image');
//   });

//   it('should upload recipe with image', async () => {
//     const res = await chai
//       .request(app)
//       .post('/upload-recipe')
//       .field('title', testRecipe.title)
//       .field('description', testRecipe.description)
//       .field('instructions', testRecipe.instructions)
//       .field('ingredients', testRecipe.ingredients)
//       .attach('image', testImage.buffer, testImage.originalname);

//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property('message', 'Recipe uploaded successfully.');

//     const fileContent = fs.readFileSync(uploadrecipeFilePath, 'utf8');
//     const recipes = JSON.parse(fileContent);
//     expect(recipes).to.have.lengthOf(1);
//     expect(recipes[0]).to.deep.include(testRecipe);
//     expect(recipes[0]).to.have.property('image').that.is.a('string').with.lengthOf.greaterThan(0));
//   });
// });

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); //assuming the app is exported in app.js
const fs = require('fs');
const path = require('path');

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /share-recipes', () => {
  it('should upload a recipe', (done) => {
    chai.request(app)
      .post('/share-recipes')
      .set('content-type', 'multipart/form-data')
      .field('title', 'Test Recipe')
      .field('description', 'This is a test recipe')
      .field('instructions', 'Test instructions')
      .field('ingredients', 'Test ingredients')
      .attach('image', fs.readFileSync(path.join(__dirname, 'test-image.jpg')), 'test-image.jpg')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Recipe successfully uploaded');
        done();
      });
  });
});

