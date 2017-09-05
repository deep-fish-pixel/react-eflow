'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _dispatchDecorator = require('./dispatchDecorator');

var _dispatchDecorator2 = _interopRequireDefault(_dispatchDecorator);

var _dataDecorator = require('./dataDecorator');

var _dataDecorator2 = _interopRequireDefault(_dataDecorator);

var _method = require('../method');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * author: mawei
 * param装饰
 */
var paramDecorator = function paramDecorator() {
  var values = Array.prototype.slice.apply(arguments),
      names = void 0,
      onlyOne = void 0;
  return function (target, property, desc) {
    return values.reduce(function (desc, value) {
      names = value.split('.'), onlyOne = names.length == 1;
      switch (onlyOne ? names[0] : names[1]) {
        case 'dispatch':
          return (0, _dispatchDecorator2['default'])(target, property, desc, onlyOne ? null : names[0]) || desc;
        case 'data':
          return (0, _dataDecorator2['default'])(target, property, desc, onlyOne ? null : names[0]) || desc;
        default:
          process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(false, '%s没有此方法 %s, 参数值应该是 dispatch和data 之一', (0, _method.getMethodName)(target.constructor || 'Store实例'), onlyOne ? names[0] : names[1]);
      }
    }, desc);
  };
};

//注入dispatch
paramDecorator.dispatch = 'dispatch';
//注入data
paramDecorator.data = 'data';

exports['default'] = paramDecorator;