'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _recipes_route = require('./routes/recipes_route');

var _recipes_route2 = _interopRequireDefault(_recipes_route);

var _users_route = require('./routes/users_route');

var _users_route2 = _interopRequireDefault(_users_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/api/v1/recipes', _recipes_route2.default);
app.use('/api/v1/users', _users_route2.default);

exports.default = app;