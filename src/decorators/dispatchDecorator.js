/**
 * author: mawei
 * dispatch装饰
 */
import invariant from 'invariant';
import {storeHasMethodError} from '../handleError';


const dispatchDecorator = function (target, property, desc, otherProperty, descNames) {
  let propertyFunc = desc.value || target[property];
  otherProperty = otherProperty || property;

  storeHasMethodError(target, otherProperty, descNames ? descNames[0] : 'dispatch');

  desc.value = function dispatchDecorator() {
    let args = Array.prototype.slice.apply(arguments),
      otherPropertyFunc = this[otherProperty];

    process.env.NODE_ENV !== 'production'
    && invariant(otherPropertyFunc.dispatch, '%s方法 %s 没有dispatch方法, 该方法可能被覆盖', this.id, otherProperty);

    args.unshift(otherPropertyFunc.dispatch);
    propertyFunc.apply(this, args);
  };

  return desc;
}


export default dispatchDecorator;