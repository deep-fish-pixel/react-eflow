/**
 * author: mawei
 * param装饰
 */
import invariant from 'invariant';
import dispatchDecorator from './dispatchDecorator';
import dataDecorator from './dataDecorator';
import {getMethodName} from '../method';


const paramDecorator = function () {
  let values = Array.prototype.slice.apply(arguments),
    names, onlyOne;
  return function (target, property, desc) {
    return values.reduce(function (desc, value) {
      names = value.split('.'),
      onlyOne = names.length == 1;
      switch (onlyOne ? names[0] : names[1]){
        case 'dispatch':
          return dispatchDecorator(target, property, desc, onlyOne ? null : names[0]) || desc;
        case 'data':
          return dataDecorator(target, property, desc, onlyOne ? null : names[0]) || desc;
        default:
          process.env.NODE_ENV !== 'production'
          && invariant(false, '%s没有此方法 %s, 参数值应该是 dispatch和data 之一', getMethodName(target.constructor || 'Store实例'), onlyOne ? names[0] : names[1]);
      }
    }, desc);
  }
}

//注入dispatch
paramDecorator.dispatch = 'dispatch';
//注入data
paramDecorator.data = 'data';

export default paramDecorator;