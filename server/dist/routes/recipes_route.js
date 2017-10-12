'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipes_controller = require('../controllers/recipes_controller');

var _recipes_controller2 = _interopRequireDefault(_recipes_controller);

var _reviews_controller = require('../controllers/reviews_controller');

var _reviews_controller2 = _interopRequireDefault(_reviews_controller);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipes = new _recipes_controller2.default();
var reviews = new _reviews_controller2.default();
var router = _express2.default.Router();
var Auth = new _middleware2.default();

router.get('/', recipes.getAllRecipes);
router.get('/:id', recipes.getRecipe);
router.post('/', Auth.Verify, recipes.postRecipe);
router.put('/:id', Auth.Verify, recipes.updateRecipe);
router.delete('/:id', Auth.Verify, recipes.deleteRecipe);
router.post('/:id/reviews', Auth.Verify, reviews.postReview);

exports.default = router;