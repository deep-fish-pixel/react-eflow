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

var _setDataDecorator = require('./setDataDecorator');

var _setDataDecorator2 = _interopRequireDefault(_setDataDecorator);

var _method = require('../method');

var _handleError = require('../handleError');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var paramDecorator = function paramDecorator() {
  var values = Array.prototype.slice.apply(arguments),
      decoratorStack = [(0, _handleError.getDecoratorUsedName)(_constants.Method.param, values)],
      names = void 0,
      onlyOne = void 0;

  return function (target, property, desc) {
    return values.reduce(function (desc, value, values) {
      names = value.split('.'), onlyOne = names.length == 1;
      switch (onlyOne ? names[0] : names[1]) {
        case _constants.Method.dispatch:
          decoratorStack.push(_constants.Method.dispatch);
          decoratorStack.push(property);
          return (0, _dispatchDecorator2['default'])(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        case _constants.Method.data:
          decoratorStack.push(_constants.Method.data);
          decoratorStack.push(property);
          return (0, _dataDecorator2['default'])(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        case _constants.Method.setData:
          decoratorStack.push(_constants.Method.setData);
          decoratorStack.push(property);
          return (0, _setDataDecorator2['default'])(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        default:
          process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(false, '%s装饰器 %s 存在错误: %s没有%s方法, 应该是 %s、 %s、%s 之一', (0, _method.getMethodName)(target.constructor), decoratorStack[0], (0, _method.getMethodName)(target.constructor || 'Store实例'), onlyOne ? names[0] : names[1], _constants.Method.dispatch, _constants.Method.data, _constants.Method.setData);
      }
    }, desc);
  };
};

//注入dispatch
/**
 * author: mawei
 * param装饰
 */
paramDecorator.dispatch = _constants.Method.dispatch;
//注入data
paramDecorator.data = _constants.Method.data;

exports['default'] = paramDecorator;