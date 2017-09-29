/**
 * author: mawei
 * param装饰
 */
import invariant from 'invariant';
import dispatchDecorator from './dispatchDecorator';
import dataDecorator from './dataDecorator';
import setDataDecorator from './setDataDecorator';
import {getMethodName} from '../method';
import {getDecoratorUsedName} from '../handleError';
import {Method} from '../constants';


const paramDecorator = function () {
  let values = Array.prototype.slice.apply(arguments),
    decoratorStack = [getDecoratorUsedName(Method.param, values)],
    names,
    onlyOne;

  return function (target, property, desc) {
    return values.reduce(function (desc, value, values) {
      names = value.split('.'),
      onlyOne = names.length == 1;
      switch (onlyOne ? names[0] : names[1]){
        case Method.dispatch:
          decoratorStack.push(Method.dispatch);
          decoratorStack.push(property);
          return dispatchDecorator(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        case Method.data:
          decoratorStack.push(Method.data);
          decoratorStack.push(property);
          return dataDecorator(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        case Method.setData:
          decoratorStack.push(Method.setData);
          decoratorStack.push(property);
          return setDataDecorator(target, property, desc, onlyOne ? null : names[0], decoratorStack) || desc;
        default:
          process.env.NODE_ENV !== 'production'
          && invariant(false, '%s装饰器 %s 存在错误: %s没有%s方法, 应该是 %s、 %s、%s 之一',
            getMethodName(target.constructor),
            decoratorStack[0],
            getMethodName(target.constructor || 'Store实例'),
            onlyOne ? names[0] : names[1],
            Method.dispatch,
            Method.data,
            Method.setData
          );
      }
    }, desc);
  }
}

//注入dispatch
paramDecorator.dispatch = Method.dispatch;
//注入data
paramDecorator.data = Method.data;

export default paramDecorator;