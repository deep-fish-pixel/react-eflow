'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDecoratorUsedName = getDecoratorUsedName;
exports.storeHasMethodError = storeHasMethodError;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _method = require('./method');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* 获取使用装饰的展示
* */
/*
 * author: mawei
 * 错误相关处理
 * */
function getDecoratorUsedName(decoratorName, params) {
  params = Array.prototype.slice.apply(params);
  return [decoratorName + '(' + params.map(function (value) {
    return "'" + value + "'";
  }).join(',') + ')'];
}

function storeHasMethodError(target, property, decoratorName) {
  process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(target[property], '%s装饰器 %s 存在错误: %s原型中不存在%s方法', (0, _method.getMethodName)(target.constructor) + '.' + property + '方法的', '@' + decoratorName, (0, _method.getMethodName)(target.constructor), property);
}

/*export function updaterHasMethodError(target, property, otherPropertyFunc.data, methodName) {
  process.env.NODE_ENV !== 'production'
  && invariant(otherPropertyFunc.data, '%s方法 %s 没有data方法, 该方法可能被覆盖', this.id, otherProperty);
}*/