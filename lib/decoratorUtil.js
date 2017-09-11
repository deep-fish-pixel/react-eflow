"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDispatchMethodName = setDispatchMethodName;
/*
* 透传指定方法的dispatch, 用来发布返回值
* */
function setDispatchMethodName(desc, wrapFunc, returnDispatchName) {
  var dispatchName = returnDispatchName || wrapFunc.returnDispatchName;
  if (dispatchName) {
    desc.value.returnDispatchName = dispatchName;
  }
}