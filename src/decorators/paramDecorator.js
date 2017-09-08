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
    decoratorStack = ['@param(' + values.map(function (value) {
      return "'" + value + "'";
    }).join(',') + ')'],
    names,
    onlyOne;

  return function (target, property, desc) {
    return values.reduce(function (desc, value, values) {
      names = value.split('.'),
      onlyOne = names.length == 1;
      switch (onlyOne ? names[0] : names[1]){
        case 'dispatch':
          decoratorStack.push('dispatch');
          decoratorStack.push(property);
          return dispatchDecorator(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        case 'data':
          decoratorStack.push('data');
          decoratorStack.push(property);
          return dataDecorator(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        default:
          process.env.NODE_ENV !== 'production'
          && invariant(false, '%s装饰器 %s 存在错误: %s没有%s方法, 方法应该是 dispatch 和 data 之一',
            getMethodName(target.constructor),
            decoratorStack[0],
            getMethodName(target.constructor || 'Store实例'),
            onlyOne ? names[0] : names[1]);
      }
    }, desc);
  }
}

//注入dispatch
paramDecorator.dispatch = 'dispatch';
//注入data
paramDecorator.data = 'data';

export default paramDecorator;