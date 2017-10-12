'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var Authenticate = function Authenticate() {
    var _this = this;

    _classCallCheck(this, Authenticate);

    this.key = process.env.SECRET_KEY;
    // method inherits the req, res and next parameters of the router without being
    // explicitly passed upon in invocation or instantiation, dont know why
    this.Verify = function (req, res, next) {
        var token = req.body.token || req.headers['x-token'] || req.query.token;
        if (!token) {
            return res.status(401).json({ error: { message: 'Unauthorized' } });
        }
        _jsonwebtoken2.default.verify(token, _this.key, function (error, decoded) {
            if (error) {
                return res.status(403).json({ error: {
                        message: 'Token could not be authenticated' } });
            }
            req.decoded = decoded;
            next();
        });
    };
};

exports.default = Authenticate;