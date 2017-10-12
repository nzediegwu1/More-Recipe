'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.set('port', process.env.PORT || 3000);

_models2.default.sequelize.sync().then(function () {
    var server = _app2.default.listen(_app2.default.get('port'), function () {
        console.log('Express server listening on port  ' + server.address().port);
    });
});