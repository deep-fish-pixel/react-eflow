'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decoratorUtil = require('./utils/decoratorUtil');

var _constants = require('../constants');

/**
 * author: mawei
 * data装饰
 */

var dataDecorator = function dataDecorator(target, property, desc, otherProperty, descNames) {
  return (0, _decoratorUtil.decoratorComposite)(target, property, desc, otherProperty, descNames, _constants.Method.data, Array.prototype.slice.apply(arguments), true);
};

exports['default'] = dataDecorator;