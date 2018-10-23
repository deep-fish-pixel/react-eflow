'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _method = require('../method');

var _handleError = require('../handleError');

/**
 * author: mawei
 * param装饰
 */
var stateKeyDecorator = function stateKeyDecorator(stateKey) {
  return function (target, property, desc) {
    var method = target[property];

    (0, _handleError.storeHasMethodError)(target, property, 'stateKey(' + stateKey + ')');
    var methodName = property || (0, _method.getMethodName)(method),
        stateKeys = target.constructor.StateKeys;
    if (!stateKeys) {
      stateKeys = target.constructor.StateKeys = {};
    }
    stateKeys[methodName] = stateKey;

    return desc;
  };
};

exports['default'] = stateKeyDecorator;