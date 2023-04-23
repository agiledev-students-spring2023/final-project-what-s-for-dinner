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
        utensil_title: 'Test Utensil'
      };
      chai.request(app)
        .post('/utensils')
        .send(utensil)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('utensil_title').eql(utensil.utensil_title);
          done();
        });
    });
  });
});
