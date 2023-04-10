//unit test for utensils
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Utensils', () => {
  describe('GET /utensils', () => {
    it('should return all utensils', (done) => {
      chai.request(app)
        .get('/utensils')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /utensils', () => {
    it('should add a new utensil', (done) => {
      const utensil = {
        recipe_title: 'Test Utensil',
        country: 'Test Country',
        price: '$5.00',
        recipe_description: 'Test description'
      };
      chai.request(app)
        .post('/utensils')
        .send(utensil)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('recipe_title').eql(utensil.recipe_title);
          res.body.should.have.property('country').eql(utensil.country);
          res.body.should.have.property('price').eql(utensil.price);
          res.body.should.have.property('recipe_description').eql(utensil.recipe_description);
          done();
        });
    });
  });
});
