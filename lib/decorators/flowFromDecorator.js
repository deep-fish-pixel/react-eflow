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
var flowFromDecorator = function flowFromDecorator() {
  var flowFromKeys = Array.prototype.slice.apply(arguments);
  return function (target, property, desc) {
    var method = target[property],
        decoratorName = '@flowFrom(' + flowFromKeys.map(function (value) {
      return "'" + value + "'";
    }).join(',') + ')';
    (0, _handleError.storeHasMethodError)(target, property, decoratorName);

    var methodName = property || (0, _method.getMethodName)(method),
        FlowFroms = target.constructor.FlowFroms,
        flows = void 0;
    if (!FlowFroms) {
      FlowFroms = target.constructor.FlowFroms = {};
      FlowFroms[methodName] = [];
    }
    flows = FlowFroms[methodName];
    flowFromKeys.forEach(function (flowFromKey) {
      if (flows.indexOf(flowFromKey) === -1) {
        flows.push(flowFromKey);
      }
    });
    flows.decoratorName = decoratorName;

    return desc;
  };
};

exports['default'] = flowFromDecorator;