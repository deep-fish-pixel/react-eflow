
import invariant from 'invariant';
import {isString} from '../../types';
import {storeHasMethodError, getDecoratorUsedName} from '../../handleError';
import {getMethodName} from '../../method';

/*
* 透传指定方法的invoke, 用来发布返回值
* */
export function setDispatchMethodName(desc, wrapFunc, returnDispatchName) {
  let dispatchName = returnDispatchName || wrapFunc.returnDispatchName;
  if(dispatchName){
    desc.value.returnDispatchName = dispatchName;
  }
}


export function decoratorComposite(target, property, desc, otherProperty, descNames, decoratorName, decoratorArguments, needInvoke) {
  if(isString(target) || decoratorArguments.length <= 1){
    process.env.NODE_ENV !== 'production'
    && invariant(!!decoratorArguments[0], '装饰器' + getDecoratorUsedName(decoratorName, decoratorArguments) + '的参数必须传字符串,且不能为空字符串');
    process.env.NODE_ENV !== 'production'
    && invariant(isString(target), '装饰器' + getDecoratorUsedName(decoratorName, decoratorArguments) + '的参数只能为字符串类型');
    process.env.NODE_ENV !== 'production'
    && invariant(decoratorArguments.length === 1, '装饰器' + getDecoratorUsedName(decoratorName, decoratorArguments) + '的参数数量只能有1个');
    let invokeMethodName = target;
    return function decoratorComposite(target, property, desc) {
      let propertyFunc = desc.value;
      process.env.NODE_ENV !== 'production'
      && invariant(target[invokeMethodName], '装饰器%s中,%s没有%s方法, 该方法可能已被覆盖', getDecoratorUsedName(decoratorName, decoratorArguments), getMethodName(target.constructor), invokeMethodName);

      desc.value = bindInvoke;
      function bindInvoke() {
        this[property][decoratorName + 'Default'] = invokeMethodName;
        return propertyFunc.apply(this, Array.prototype.slice.apply(arguments));
      };

      bindInvoke.displayName = invokeMethodName
        + decoratorName.replace(/^[\w_]/, function(value){return value.toUpperCase();})
        + 'BindInvoke';
    }
  }
  else{
    let propertyFunc = desc.value || target[property];
    otherProperty = otherProperty || property;

    storeHasMethodError(target, otherProperty, descNames ? descNames[0] : decoratorName);

    desc.value = function decoratorComposite() {
      let args = Array.prototype.slice.apply(arguments),
        otherPropertyFunc = this[otherProperty],
        decoratorNameMethod = otherPropertyFunc[decoratorName];

      process.env.NODE_ENV !== 'production'
      && invariant(decoratorNameMethod, '%s方法 %s 没有%s方法, 该方法可能已被覆盖', this.id, otherProperty, decoratorName);

      args.unshift(needInvoke ? decoratorNameMethod() : decoratorNameMethod);
      return propertyFunc.apply(this, args);
    };

    //透传指定方法
    setDispatchMethodName(desc, propertyFunc);

    return desc;
  }
}