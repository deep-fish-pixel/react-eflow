export function forEachPrototype(obj, callback) {
  var names = Object.getOwnPropertyNames(getPrototype(obj))
  names.forEach(function (name) {
    callback(obj[name], name);
  })
}
/*
* 获取原型对象所有方法
* @param {Object} obj 普通对象
* @return {Array} 方法组成的数组
* */
export function getPrototypeMethods(obj) {
  var methods = [];
  forEachPrototype(obj, function(method, methodName){
    if(methodName !== 'constructor'){
      methods.push(method);
    }
  });
  return methods;
}

export function somePrototype(obj, callback) {
  var names = Object.getOwnPropertyNames(getPrototype(obj));
  names.some(function (name) {
    return callback(obj[name], name);
  })
}

export default function getPrototype(obj) {
  return obj.__proto__ || Object.getPrototypeOf(obj);
}


