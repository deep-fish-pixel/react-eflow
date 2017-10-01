/*
 * author: mawei
 * 方法相关处理
 * */
/*
* 获取方法名称
* */
export function getMethodName(method) {
  return method.displayName || method.name;
}
/*
 * 方法包含.符号时, 获取方法的最后非点的名称
 * */
export function getOriginalMethodName(method) {
  return (method.displayName || method.name).match(/[\w\_\-]+$|[\w\_\-]+(?=\))/)[0];
}



