/*
 * author: mawei
 * 错误相关处理
 * */
import invariant from 'invariant';
import {getMethodName} from './method';

/*
* 获取使用装饰的展示
* */
export function getDecoratorUsedName(decoratorName, params) {
  params = Array.prototype.slice.apply(params);
  return [decoratorName + '(' + params.map(function (value) {
      return "'" + value + "'";
    }).join(',') + ')'];
  
}

export function storeHasMethodError(target, property, decoratorName) {
  process.env.NODE_ENV !== 'production'
  && invariant(target[property], '%s装饰器 %s 存在错误: %s原型中不存在%s方法',
    getMethodName(target.constructor) + '.' +property + '方法的',
    '@' + decoratorName,
    getMethodName(target.constructor),
    property);
}

/*export function updaterHasMethodError(target, property, otherPropertyFunc.data, methodName) {
  process.env.NODE_ENV !== 'production'
  && invariant(otherPropertyFunc.data, '%s方法 %s 没有data方法, 该方法可能被覆盖', this.id, otherProperty);
}*/

