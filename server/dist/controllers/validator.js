'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function Validator(model) {
    var _this = this;

    _classCallCheck(this, Validator);

    this.model = model;
    this.invalidParameter = {};
    this.verificationError = {};
    this.success = false;
    this.errorMessage = function (msg, res) {
        return res.status(400).json({ error: { message: msg } });
    };
    this.verify = function (req, res, context) {
        switch (_this.model) {
            case 'users':
                _this.usersVerifier(req, res, context);
                break;
            case 'recipes':
                _this.recipeVerifier(req, res);
                break;
            case 'favorites':
                _this.favoriteVerifier(req, res);
                break;
            case 'reviews':
                _this.reviewVerifier(req, res);
                break;
            case 'upvotes':
                _this.upvoteVerifier(req, res);
                break;
            default:
                _this.downvoteVerifier(req, res);
                break;
        }
    };
    this.confirmParams = function (req, res) {
        if (isNaN(req.params.id)) {
            _this.invalidParameter = _this.errorMessage('invalid parameter', res);
            return _this.invalidParameter;
        }
        return true;
    };
    this.recipeVerifier = function (req, res) {
        if (req.body.title !== undefined) {
            if (req.body.ingredients !== undefined) {
                if (req.body.description !== undefined) {
                    if (typeof req.body.title === 'string' && req.body.title.trim().length !== 0) {
                        if (typeof req.body.ingredients === 'string' && req.body.ingredients.trim().length !== 0) {
                            if (typeof req.body.description === 'string' && req.body.description.trim().length !== 0) {
                                _this.success = true;
                                return _this.success;
                            }
                            _this.verificationError = _this.errorMessage('Recipe content must be text', res);
                            return _this.verificationError;
                        }
                        _this.verificationError = _this.errorMessage('Recipe ingredients must be text', res);
                        return _this.verificationError;
                    }
                    _this.verificationError = _this.errorMessage('Recipe title must be text', res);
                    return _this.verificationError;
                }
                _this.verificationError = _this.errorMessage('Recipe has no content', res);
                return _this.verificationError;
            }
            _this.verificationError = _this.errorMessage('Recipe has no ingredient', res);
            return _this.verificationError;
        }
        _this.verificationError = _this.errorMessage('Recipe has no title', res);
        return _this.verificationError;
    };
    this.userVerifier = function (req, res, context) {
        if (context === 'signin') {
            return _this.signinVerifier(req, res);
        }
        return _this.signupVerifier(req, res);
    };
    this.signinVerifier = function (req, res) {
        if (req.body.username !== undefined) {
            if (req.body.password !== undefined) {
                if (typeof req.body.username === 'string' && req.body.username.trim().length !== 0) {
                    if (typeof req.body.password === 'string' && req.body.password.trim().length >= 6) {
                        _this.success = true;
                        return _this.success;
                    }
                    var message = 'Password must be text of 6 digits or higher';
                    _this.verificationError = _this.errorMessage(message, res);
                    return _this.verificationError;
                }
                _this.verificationError = _this.errorMessage('Username must be text', res);
                return _this.verificationError;
            }
            _this.verificationError = _this.errorMessage('Please enter password', res);
            return _this.verificationError;
        }
        _this.verificationError = _this.errorMessage('Please enter username', res);
        return _this.verificationError;
    };
    this.signupVerifier = function (req, res) {
        if (req.body.username !== undefined) {
            if (req.body.fullname !== undefined) {
                if (req.body.email !== undefined) {
                    if (req.body.password !== undefined) {
                        if (typeof req.body.username === 'string' && req.body.username.trim().length !== 0) {
                            if (typeof req.body.fullname === 'string' && req.body.fullname.trim().length !== 0) {
                                if (typeof req.body.email === 'string' && req.body.email.trim().length !== 0) {
                                    if (typeof req.body.password === 'string' && req.body.password.trim().length >= 6) {
                                        _this.success = true;
                                        return _this.success;
                                    }
                                    var message = 'Password must be text of 6 digits or higher';
                                    _this.verificationError = _this.errorMessage(message, res);
                                    return _this.verificationError;
                                }
                                _this.verificationError = _this.errorMessage('Email must be text', res);
                                return _this.verificationError;
                            }
                            _this.verificationError = _this.errorMessage('Fullname must be text', res);
                            return _this.verificationError;
                        }
                        _this.verificationError = _this.errorMessage('Username must be text', res);
                        return _this.verificationError;
                    }
                    _this.verificationError = _this.errorMessage('Please enter your password', res);
                    return _this.verificationError;
                }
                _this.verificationError = _this.errorMessage('Please enter your email', res);
                return _this.verificationError;
            }
            _this.verificationError = _this.errorMessage('Please enter your fullname', res);
            return _this.verificationError;
        }
        _this.verificationError = _this.errorMessage('Please enter username', res);
        return _this.verificationError;
    };
    this.favoriteVerifier = function (req, res) {
        if (req.body.RecipeId !== undefined) {
            if (isNaN(req.body.RecipeId)) {
                _this.verificationError = _this.errorMessage('RecipeId must be a number', res);
                return _this.verificationError;
            }
            _this.success = true;
            return _this.success;
        }
        _this.verificationError = _this.errorMessage('No RecipeId selected', res);
        return _this.verificationError;
    };
    this.reviewVerifier = function (req, res) {
        if (req.body.content !== undefined) {
            if (typeof req.body.content === 'string' && req.body.content.trim().length !== 0) {
                _this.success = true;
                return _this.success;
            }
            _this.verificationError = _this.errorMessage('Review content must be text', res);
            return _this.verificationError;
        }
        _this.verificationError = _this.errorMessage('No Review content', res);
        return _this.verificationError;
    };
};

exports.default = Validator;