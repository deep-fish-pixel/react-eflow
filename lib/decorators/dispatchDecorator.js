'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleError = require('../handleError');

var _decoratorUtil = require('./utils/decoratorUtil');

var _constants = require('../constants');

var dispatchDecorator = function dispatchDecorator(target, property, desc, otherProperty, descNames) {
  return (0, _decoratorUtil.decoratorComposite)(target, property, desc, otherProperty, descNames, _constants.Method.dispatch, Array.prototype.slice.apply(arguments));
}; /**
    * author: mawei
    * dispatch装饰
    */


dispatchDecorator['return'] = function (dispatchMethodName) {
  return function (target, property, desc) {
    var method = target[property];
    (0, _handleError.storeHasMethodError)(target, property, _constants.Method.dispatch + '.return(' + dispatchMethodName + ')');
    (0, _decoratorUtil.setDispatchMethodName)(desc, method, dispatchMethodName);
    return desc;
  };
};

exports['default'] = dispatchDecorator;