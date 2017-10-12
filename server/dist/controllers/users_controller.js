'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validator = require('./validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();


var key = process.env.SECRET_KEY;
var validator = new _validator2.default('users');

var Users = function () {
    function Users() {
        _classCallCheck(this, Users);
    }

    _createClass(Users, [{
        key: 'signUp',
        value: function signUp(req, res) {
            // if username doesnt already exist and email doesnt already exist
            var verify = validator.userVerifier(req, res, 'signup');
            if (validator.success) {
                return _models2.default.Users.findAll().then(function (members) {
                    if (Object.keys(members).length !== 0) {
                        for (var item in members) {
                            if (members[item].username === req.body.username || members[item].email === req.body.email) {
                                // forbidden
                                return res.status(403).json({ error: { message: 'User already exists' } });
                            }
                        }
                    }
                    // created
                    _models2.default.Users.create({
                        fullname: req.body.fullname,
                        username: req.body.username,
                        email: req.body.email,
                        password: _bcryptjs2.default.hashSync(req.body.password, 10) }).then(function (createdUser) {
                        return res.status(201).json({ success: { status: createdUser } });
                    });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
            }
            return validator.validationError;
        }
    }, {
        key: 'signIn',
        value: function signIn(req, res) {
            var verify = validator.userVerifier(req, res, 'signin');
            if (validator.success) {
                return _models2.default.Users.findOne({ where: { username: req.body.username } }).then(function (loggedInUser) {
                    if (_bcryptjs2.default.compareSync(req.body.password, loggedInUser.password)) {
                        var token = _jsonwebtoken2.default.sign({ id: loggedInUser.id }, key, {
                            expiresIn: 60 * 60 * 24 });
                        return res.status(202).json({ success: { status: {
                                    User: loggedInUser,
                                    Token: token } }
                        });
                    }
                    return res.status(401).json({ error: { message: 'Invalid Login Details' } });
                }).catch(function (error) {
                    return res.status(401).json({ error: { message: 'User not found' } });
                });
            }
            return validator.validationError;
        }
    }, {
        key: 'getUsers',
        value: function getUsers(req, res) {
            // gets all users' details excluding password
            return _models2.default.Users.findAll({ attributes: { exclude: ['password'] } }).then(function (allusers) {
                return res.status(200).json({ success: { status: allusers } });
            }).catch(function (error) {
                return res.status(401).json({ error: { message: 'Unauthorized' } });
            });
        }
    }]);

    return Users;
}();

exports.default = Users;