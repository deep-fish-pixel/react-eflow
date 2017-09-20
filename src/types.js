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
      (window.Map ? !(obj instanceof window.Map) : true)
      && (window.Set ?  !(obj instanceof window.Set) : true)
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
