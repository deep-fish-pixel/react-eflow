'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDispatchMethodName = setDispatchMethodName;
exports.decoratorComposite = decoratorComposite;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _types = require('../../types');

var _handleError = require('../../handleError');

var _method = require('../../method');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* 透传指定方法的invoke, 用来发布返回值
* */
function setDispatchMethodName(desc, wrapFunc, returnDispatchName) {
  var dispatchName = returnDispatchName || wrapFunc.returnDispatchName;
  if (dispatchName) {
    desc.value.returnDispatchName = dispatchName;
  }
}

function decoratorComposite(target, property, desc, otherProperty, descNames, decoratorName, decoratorArguments, needInvoke) {
  if ((0, _types.isString)(target) || decoratorArguments.length <= 1) {
    process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(!!decoratorArguments[0], '装饰器' + (0, _handleError.getDecoratorUsedName)(decoratorName, decoratorArguments) + '的参数必须传字符串,且不能为空字符串');
    process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])((0, _types.isString)(target), '装饰器' + (0, _handleError.getDecoratorUsedName)(decoratorName, decoratorArguments) + '的参数只能为字符串类型');
    process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(decoratorArguments.length === 1, '装饰器' + (0, _handleError.getDecoratorUsedName)(decoratorName, decoratorArguments) + '的参数数量只能有1个');
    var invokeMethodName = target;
    return function decoratorComposite(target, property, desc) {
      var propertyFunc = desc.value;
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(target[invokeMethodName], '装饰器%s中,%s没有%s方法, 该方法可能已被覆盖', (0, _handleError.getDecoratorUsedName)(decoratorName, decoratorArguments), (0, _method.getMethodName)(target.constructor), invokeMethodName);

      desc.value = bindInvoke;
      function bindInvoke() {
        this[property][decoratorName + 'Default'] = invokeMethodName;
        return propertyFunc.apply(this, Array.prototype.slice.apply(arguments));
      };

      bindInvoke.displayName = decoratorName + 'BindInvoke(' + invokeMethodName + ')';
    };
  } else {
    var _decoratorComposite = function _decoratorComposite() {
      var args = Array.prototype.slice.apply(arguments),
          otherPropertyFunc = this[otherProperty],
          decoratorNameMethod = otherPropertyFunc[decoratorName];

      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(decoratorNameMethod, '%s方法 %s 没有%s方法, 该方法可能已被覆盖', this.id, otherProperty, decoratorName);

      args.unshift(needInvoke ? decoratorNameMethod() : decoratorNameMethod);
      return propertyFunc.apply(this, args);
    };

    //透传指定方法


    var propertyFunc = desc.value || target[property];
    otherProperty = otherProperty || property;

    (0, _handleError.storeHasMethodError)(target, otherProperty, descNames ? descNames[0] : decoratorName);

    desc.value = _decoratorComposite;
    _decoratorComposite.displayName = decoratorName + 'DecoratorComposite(' + otherProperty + ')';
    setDispatchMethodName(desc, propertyFunc);

    return desc;
  }
}