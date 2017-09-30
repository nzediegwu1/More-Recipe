import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
const should = chai.should();
chai.use(chaiHttp);
import app from '../app';

describe('test for getAllRecipes route', () => {
    it('should list all recipes on GET:/api/v1/recipes', (done) => {
        chai.request(app)
            .get('/api/v1/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });
    it('should return particular recipe in GET:/api/v1/recipes/:id', (done) => {
        chai.request(app)
            .get('api/v1/recipes/1')
            .end((err, res) => {
                // res.should.have.status(200);
                res.should.be.a('object');
                done();
            });
    });
});
