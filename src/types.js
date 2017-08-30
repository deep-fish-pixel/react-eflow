/*
 * author: mawei
 * 类型相关处理
 * */
export function isFunction(method) {
  return typeof method === 'function';
}

export function isArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
}

export function isObject(obj) {
  return typeof obj === 'object' && obj != null;
}

export function isNumber(obj) {
  return typeof obj === 'number';
}

export function isString(obj) {
  return typeof obj === 'string';
}
