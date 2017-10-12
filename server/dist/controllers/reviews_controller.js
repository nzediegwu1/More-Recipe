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

var validator = new _validator2.default('reviews');

var Reviews = function () {
    function Reviews() {
        _classCallCheck(this, Reviews);
    }

    _createClass(Reviews, [{
        key: 'postReview',
        value: function postReview(req, res) {
            var verify = validator.verify(req, res);
            var check = validator.confirmParams(req, res);
            if (check) {
                if (validator.success) {
                    return _models2.default.Reviews.create({
                        UserId: req.decoded.id,
                        content: req.body.content,
                        RecipeId: req.params.id
                    }).then(function (review) {
                        return res.status(201).json({ success: { status: review } });
                    }).catch(function (error) {
                        return res.status(500).json({ error: { message: error } });
                    });
                }
                return validator.verificationError;
            }
            return validator.invalidParameter;
        }
    }]);

    return Reviews;
}();

exports.default = Reviews;