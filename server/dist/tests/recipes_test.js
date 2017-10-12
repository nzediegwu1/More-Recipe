'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);


describe('test for getAllRecipes route', function () {
    it('should list all recipes on GET:/api/v1/recipes', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        });
    });
    /* it('should return particular recipe in GET:/api/v1/recipes/:id', (done) => {
         chai.request(app)
             .get('api/v1/recipes/1')
             .end((err, res) => {
                 // res.should.have.status(200);
                 res.should.be.a('object');
                 done();
             });
     });*/
});