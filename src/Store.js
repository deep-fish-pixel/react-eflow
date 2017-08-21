/**
 * Created by mawei on 17/8/11.
 */
import shallowEqual from 'shallowequal';
import invariant from 'invariant';
import initProperties from './initProperties';
import {isArray, isObject} from './types';
import {getMethodName, getOriginalMethodName} from './method';
import pubSub from './pubSub';
import domBatchedUpdates from './domBatchedUpdates';

const emptyObject = {};
Object.freeze(emptyObject);
/*
 * 把参数列表属性合并后, 并获取新对象
 * @param {Array | Object} curValue 第一个对象
 * @param {Array | Object} mergeValue 第二个对象
 * @return {Array | Object}
 * */
function assign(curValue, mergeValue, className, methodName, keyName) {
  let nextValue;
  if(isArray(curValue)){
    if(mergeValue){
      process.env.NODE_ENV !== 'production'
      && invariant(isArray(mergeValue), '调用%s.%s 方法, 参数值%s 的值类型不是数组', className, methodName, keyName);
      nextValue = [...mergeValue];
    }
    else{
      nextValue = [...curValue];
    }
  }
  else if(isObject(curValue)){
    mergeValue = mergeValue || emptyObject;
    process.env.NODE_ENV !== 'production'
    && invariant(isObject(mergeValue), '调用%s.%s 方法, 参数值%s 的值类型不是对象', className, methodName, keyName);
    nextValue = {...curValue, ...mergeValue};
  }
  else if(curValue === null || curValue === undefined){
    nextValue =  {...(mergeValue || emptyObject)};
  }
  else{
    nextValue = mergeValue || curValue;
  }
  return nextValue;
}
/*
* 商店基类,实现基本的状态管理
* */
class Store {
  static plugin = function () {
    for(let i = 0; i < arguments.length; i++){
      arguments[i](Store);
    }
  }
  constructor(options){
    this.state = {};
    this.options = options;
    initProperties(this, options && options.id);
  }

  initState(inits){
    let state = this.state;
    for(let name in inits){
      state[name] = inits[name];
    }
  }

  getState(){
    let clone = {},
        state = this.state;
    for(var name in state){
      clone[name] = assign(state[name]);
    }
    return clone;
  }
  /*
  * 发布每个方法对应的数据, 注意method为方法,另外该方法如果值为空,有一个对象的默认值
  *
  * @param {Function} method store实例的属性方法
  * @param {Object} data 对应的数值
  * */
  dispatch(method, data){
    let state = this.state,
        name = getOriginalMethodName(method),
        curValue = state[name],
        nextValue;

    process.env.NODE_ENV !== 'production'
    && invariant(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性在构造函数中进行初始化', getMethodName(this), name || 'method');
    nextValue = assign(curValue, data);
    if(!shallowEqual(curValue, nextValue, getMethodName(this), getMethodName(this.dispatch), name || 'method')){
      state[name] = nextValue;
      this.pub(method);
    }
  }
  /*
   * 绑定method对应dispatch, 内部通过method的name或displayName来标识key
   * @param {Function} method Store继承类的方法
   * @return {Function}
   * */
  bind(method){
    let name = getOriginalMethodName(method);
    process.env.NODE_ENV !== 'production'
    && invariant(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性已在构造函数中进行初始化', getMethodName(this), name || 'method');
    return this.dispatch.bind(this, method);
  }
  /*
   * 获取method对应store中的值,内部通过method的name或displayName来标识key
   * 该值为空时,返回的默认值为{}
   * @param {Function} method Store继承类的方法
   * @return {Array | Object}
   * */
  data(method, value){
    let name = getOriginalMethodName(method);
    process.env.NODE_ENV !== 'production'
    && invariant(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性已在构造函数中进行初始化', getMethodName(this), getMethodName(method) || 'method');
    if(arguments.length >= 2){
      this.state[name] = assign(this.state[name], value);
    }
    else {
      return assign(this.state[name]);
    }
  }

  /*
  * 发布method对应值,内部通过method的内部属性_eflowKey来标识key
  * @param {Function} method Store继承类的方法
  * */
  pub(method){
    let key = method._eflowKey;
    process.env.NODE_ENV !== 'production'
    && invariant(key, '调用%s.pub 方法, 参数值%s 的_eflowKey为空, 该属性已在构造函数中进行初始化', getMethodName(this), getMethodName(method) || 'method');
    pubSub.pub(key);
  }
}

//自动添加批处理功能
if(typeof window === 'object' && window.document){
  Store.plugin(domBatchedUpdates);
}

export default Store;