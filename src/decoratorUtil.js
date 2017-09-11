/*
* 透传指定方法的dispatch, 用来发布返回值
* */
export function setDispatchMethodName(desc, wrapFunc, returnDispatchName) {
  let dispatchName = returnDispatchName || wrapFunc.returnDispatchName;
  if(dispatchName){
    desc.value.returnDispatchName = dispatchName;
  }
}