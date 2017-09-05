/**
 * author: mawei
 * dispatch装饰
 */
import invariant from 'invariant';


const dispatchDecorator = function (target, property, desc, otherProperty) {
  let propertyFunc = desc.value || target[property];
  otherProperty = otherProperty || property;

  desc.value = function dispatchDecorator() {
    let args = Array.prototype.slice.apply(arguments),
      otherPropertyFunc = this[otherProperty];

    process.env.NODE_ENV !== 'production'
    && invariant(otherPropertyFunc, '%s没有方法 %s, 请检查装饰参数对应的方法名称是否存在', this.id, otherProperty);
    process.env.NODE_ENV !== 'production'
    && invariant(otherPropertyFunc.dispatch, '%s方法 %s 没有dispatch方法, 请检查该方法是否为原型方法', this.id, otherProperty);

    args.unshift(otherPropertyFunc.dispatch);
    propertyFunc.apply(this, args);
  };
  desc.value.displayName = otherProperty + 'DispatchDecorator';
  return desc;
}


export default dispatchDecorator;