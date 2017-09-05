'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var dispatchDecorator = function dispatchDecorator(target, property, desc, otherProperty) {
  var propertyFunc = desc.value || target[property];
  otherProperty = otherProperty || property;

  desc.value = function dispatchDecorator() {
    var args = Array.prototype.slice.apply(arguments),
        otherPropertyFunc = this[otherProperty];

    process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(otherPropertyFunc, '%s没有方法 %s, 请检查装饰参数对应的方法名称是否存在', this.id, otherProperty);
    process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(otherPropertyFunc.dispatch, '%s方法 %s 没有dispatch方法, 请检查该方法是否为原型方法', this.id, otherProperty);

    args.unshift(otherPropertyFunc.dispatch);
    propertyFunc.apply(this, args);
  };
  desc.value.displayName = otherProperty + 'DispatchDecorator';
  return desc;
}; /**
    * author: mawei
    * dispatch装饰
    */
exports['default'] = dispatchDecorator;