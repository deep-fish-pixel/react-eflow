'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flowFrom = exports.stateKey = exports.param = exports.setData = exports.data = exports.dispatch = exports.Store = exports.wrapComponent = undefined;

var _wrapComponent = require('./wrapComponent');

var _wrapComponent2 = _interopRequireDefault(_wrapComponent);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _dispatchDecorator = require('./decorators/dispatchDecorator');

var _dispatchDecorator2 = _interopRequireDefault(_dispatchDecorator);

var _dataDecorator = require('./decorators/dataDecorator');

var _dataDecorator2 = _interopRequireDefault(_dataDecorator);

var _setDataDecorator = require('./decorators/setDataDecorator');

var _setDataDecorator2 = _interopRequireDefault(_setDataDecorator);

var _paramDecorator = require('./decorators/paramDecorator');

var _paramDecorator2 = _interopRequireDefault(_paramDecorator);

var _stateKeyDecorator = require('./decorators/stateKeyDecorator');

var _stateKeyDecorator2 = _interopRequireDefault(_stateKeyDecorator);

var _flowFromDecorator = require('./decorators/flowFromDecorator');

var _flowFromDecorator2 = _interopRequireDefault(_flowFromDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * author: mawei
 * eflow入口引用
 * */
exports.wrapComponent = _wrapComponent2['default'];
exports.Store = _Store2['default'];
exports.dispatch = _dispatchDecorator2['default'];
exports.data = _dataDecorator2['default'];
exports.setData = _setDataDecorator2['default'];
exports.param = _paramDecorator2['default'];
exports.stateKey = _stateKeyDecorator2['default'];
exports.flowFrom = _flowFromDecorator2['default'];