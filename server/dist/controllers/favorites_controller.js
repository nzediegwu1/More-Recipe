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

var validator = new _validator2.default('favorites');

var Favorites = function () {
    function Favorites() {
        _classCallCheck(this, Favorites);
    }

    _createClass(Favorites, [{
        key: 'addFavorite',
        value: function addFavorite(req, res) {
            var verify = validator.verify(req, res);
            if (validator.success) {
                return _models2.default.Favorites.create({
                    UserId: req.decoded.id,
                    RecipeId: req.body.RecipeId
                }).then(function (addedFavorite) {
                    return res.status(201).json({ success: { status: addedFavorite } });
                }).catch(function (error) {
                    return res.status(500).json({ error: { message: error } });
                });
            }
            return validator.verificationError;
        }
    }, {
        key: 'getFavorites',
        value: function getFavorites(req, res) {
            // req.params.UserId is mere formality since not to be used for security reasons
            return _models2.default.Favorites.findAll({ where: { UserId: req.decoded.id } }).then(function (favoriteRecipes) {
                return res.status(200).json({ success: { status: favoriteRecipes } });
            }).catch(function (error) {
                return res.status(401).json({ error: { message: error } });
            });
        }
    }]);

    return Favorites;
}();

exports.default = Favorites;