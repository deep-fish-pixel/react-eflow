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
  return typeof obj === 'object'
    && obj != null
    && (
      (typeof Map !== 'undefined' ? !(obj instanceof Map) : true)
      && (typeof Set !== 'undefined' ?  !(obj instanceof Set) : true)
    );
}

export function isNumber(obj) {
  return typeof obj === 'number';
}

export function isString(obj) {
  return typeof obj === 'string';
}

export function isBoolean(obj) {
  return typeof obj === 'boolean';
}
