'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceElement = replaceElement;

var _types = require('./types');

/*
* 把对应下标元素替换内容是数据,然后返回新数组
* @param {Array} array 被替换内容的数据
* @param {Number} index 数组下标位置
* @param {Array | Object} insert 被插入的内容
*
* */
function replaceElement(array, index, insert) {
  var replacedArray = array.slice(0, index);
  if ((0, _types.isArray)(insert)) {
    replacedArray = replacedArray.concat(insert);
  } else {
    replacedArray.push(insert);
  }
  return replacedArray.concat(array.slice(index + 1));
}