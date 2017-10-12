'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _validator = require('./validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validator = new _validator2.default('recipes');

var RecipesController = function () {
    function RecipesController() {
        _classCallCheck(this, RecipesController);
    }

    _createClass(RecipesController, [{
        key: 'getAllRecipes',
        value: function getAllRecipes(req, res) {
            var sort = req.query.sort;
            var order = req.query.order;
            // query string must contain sort='upvote'
            // before the sort is considered
            if (sort !== 'upvote') {
                return _models2.default.Recipes.findAll({ include: [_models2.default.Reviews] }).then(function (allRecipes) {
                    res.status(200).json({ success: { status: allRecipes } });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
                // if sort=upvote and order=des
            } else if (order === 'des') {
                return _models2.default.Recipes.findAll({
                    order: [['upvotes', 'DESC']],
                    include: [_models2.default.Reviews]
                }).then(function (allRecipes) {
                    res.status(200).json({ success: { status: allRecipes } });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
                // if sort=upvote and order=asc
            } else if (order === 'asc') {
                return _models2.default.Recipes.findAll({
                    order: [['upvotes', 'ASC']],
                    include: [_models2.default.Reviews]
                }).then(function (allRecipes) {
                    res.status(200).json({ success: { status: allRecipes } });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
            }
            res.status(400).json({ error: { message: 'invalid sort parameter' } });
        }
    }, {
        key: 'getRecipe',
        value: function getRecipe(req, res) {
            var check = validator.confirmParams(req, res);
            if (check) {
                return _models2.default.Recipes.findById(req.params.id, { include: [_models2.default.Reviews] }).then(function (recipe) {
                    return res.status(200).json({ success: { status: recipe } });
                }).catch(function (error) {
                    return res.status(400).json({ error: { message: error } });
                });
            }
            return validator.invalidParameter;
        }
    }, {
        key: 'postRecipe',
        value: function postRecipe(req, res) {
            var verify = validator.verify(req, res);
            if (validator.success) {
                return _models2.default.Recipes.create({
                    title: req.body.title,
                    ingredients: req.body.ingredients,
                    description: req.body.description,
                    upvotes: req.body.upvotes,
                    downvotes: req.body.downvotes,
                    UserId: req.decoded.id
                }).then(function (created) {
                    return res.status(200).json({ success: { status: created } });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
            }
            return validator.verificationError;
        }
    }, {
        key: 'updateRecipe',
        value: function updateRecipe(req, res) {
            // get recipe with same index as parameter and change the value
            var check = validator.confirmParams(req, res);
            var verify = validator.verify(req, res);
            if (check) {
                if (validator.success) {
                    return _models2.default.Recipes.update({
                        title: req.body.title,
                        ingredients: req.body.ingredients,
                        description: req.body.description,
                        upvotes: req.body.upvotes,
                        downvotes: req.body.downvotes,
                        UserId: req.decoded.id
                    }, { where: { id: req.params.id, UserId: req.decoded.id } }).then(function (updatedRecipe) {
                        if (updatedRecipe[0] === 1) {
                            return res.status(200).json({ success: { status: 'Update successful' } });
                        }
                        return res.status(404).json({ error: { message: 'Cannot modify recipe' } });
                    }).catch(function (error) {
                        return res.status(404).json({ error: { message: error } });
                    });
                }
                return validator.verificationError;
            }
            return validator.invalidParameter;
        }
    }, {
        key: 'deleteRecipe',
        value: function deleteRecipe(req, res) {
            // get recipe where index is same as id parameter and delete
            var check = validator.confirmParams(req, res);
            if (check) {
                return _models2.default.Recipes.destroy({ where: { id: req.params.id, UserId: req.decoded.id } }).then(function (destroyed) {
                    if (destroyed) {
                        return res.status(204).json({ success: { status: 'Successfully deleted' } });
                    }
                    return res.status(404).json({ error: { message: 'No recipe deleted' } });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
            }
            return validator.invalidParameter;
        }
    }]);

    return RecipesController;
}();

exports.default = RecipesController;