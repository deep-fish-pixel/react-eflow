'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _handleError = require('../handleError');

var _decoratorUtil = require('../decoratorUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var setDataDecorator = function setDataDecorator(target, property, desc, otherProperty, descNames) {
  var propertyFunc = desc.value || target[property];
  otherProperty = otherProperty || property;

  (0, _handleError.storeHasMethodError)(target, otherProperty, descNames ? descNames[0] : 'data');

  desc.value = function setDataDecorator() {
    var args = Array.prototype.slice.apply(arguments),
        otherPropertyFunc = this[otherProperty];

    process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(otherPropertyFunc.data, '%s方法 %s 没有data方法, 该方法可能被覆盖', this.id, otherProperty);

    args.unshift(otherPropertyFunc.data);
    return propertyFunc.apply(this, args);
  };

  //透传指定方法的data
  (0, _decoratorUtil.setDispatchMethodName)(desc, propertyFunc);

  return desc;
}; /**
    * author: mawei
    * data装饰
    */
exports['default'] = setDataDecorator;