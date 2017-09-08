/**
 * author: mawei
 * data装饰
 */
import invariant from 'invariant';
import {storeHasMethodError} from '../handleError';

const dataDecorator = function (target, property, desc, otherProperty, descNames) {
  let propertyFunc = desc.value || target[property];
  otherProperty = otherProperty || property;

  storeHasMethodError(target, otherProperty, descNames ? descNames[0] : 'data');

  desc.value = function dataDecorator() {
    let args = Array.prototype.slice.apply(arguments),
      otherPropertyFunc = this[otherProperty];

    process.env.NODE_ENV !== 'production'
    && invariant(otherPropertyFunc.data, '%s方法 %s 没有data方法, 该方法可能被覆盖', this.id, otherProperty);

    args.unshift(otherPropertyFunc.data());
    propertyFunc.apply(this, args);
  };

  return desc;
}


export default dataDecorator;