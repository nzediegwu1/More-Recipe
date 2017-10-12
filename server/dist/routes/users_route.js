'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users_controller = require('../controllers/users_controller');

var _users_controller2 = _interopRequireDefault(_users_controller);

var _favorites_controller = require('../controllers/favorites_controller');

var _favorites_controller2 = _interopRequireDefault(_favorites_controller);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = new _users_controller2.default();
var favorites = new _favorites_controller2.default();
var router = _express2.default.Router();
var Auth = new _middleware2.default();

router.post('/signup', user.signUp);
router.post('/signin', user.signIn);
router.get('/', Auth.Verify, user.getUsers);
router.post('/:UserId/recipes', Auth.Verify, favorites.addFavorite);
router.get('/:UserId/recipes', Auth.Verify, favorites.getFavorites);

exports.default = router;