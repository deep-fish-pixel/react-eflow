/**
 * author: mawei
 * dispatch装饰
 */
import {storeHasMethodError} from '../handleError';
import {setDispatchMethodName, decoratorComposite} from './utils/decoratorUtil';
import {Method} from '../constants';


const dispatchDecorator = function (target, property, desc, otherProperty, descNames) {
  return decoratorComposite(target, property, desc, otherProperty, descNames, Method.dispatch, Array.prototype.slice.apply(arguments));
};

dispatchDecorator.return = function (dispatchMethodName) {
  return function (target, property, desc) {
    let method = target[property];
    storeHasMethodError(target, property, Method.dispatch + '.return(' + dispatchMethodName + ')');
    setDispatchMethodName(desc, method, dispatchMethodName);
    return desc;
  }
};


export default dispatchDecorator;