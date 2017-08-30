'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = exports.wrapComponent = undefined;

var _wrapComponent = require('./wrapComponent');

var _wrapComponent2 = _interopRequireDefault(_wrapComponent);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * author: mawei
 * eflow入口引用
 * */
exports.wrapComponent = _wrapComponent2['default'];
exports.Store = _Store2['default'];