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
import DefaultObject from './DefaultObject';
import UpdateQueue from './UpdateQueue';

const emptyObject = {};
Object.freeze(emptyObject);
/*
 * 属性合并, 并获取新对象
 * @param {Array | Object} target 合并的对象容器
 * @param {Array | Object} propName 合并容器的属性名称
 * @param {Array | Object} mergeValue 被合并的值
 * @return {Array | Object}
 * */
function assign(target, propName, mergeValue, className, methodName) {
  let curValue = target[propName], nextValue;
  //数组类型值只可替换为新数组,所以数据类型不能转化
  if(isArray(curValue)){
    if(arguments.length >= 3 && isArray(mergeValue)){
      nextValue = [...mergeValue];
    }
    if(!nextValue){
      nextValue = [...curValue];
    }
  }
  //对象类型值不可覆盖只可扩展,所以数据类型不能转化
  else if(isObject(curValue)){
    mergeValue = mergeValue || emptyObject;
    nextValue = {...curValue, ...mergeValue};
  }
  else{
    //其他类型如基本类型,值可被覆盖但不可扩展,所以数据类型可以转化
    if(arguments.length >= 3){
      if(isArray(mergeValue)){
        nextValue = [...mergeValue];
      }
      else if(isObject(mergeValue)){
        nextValue = {...(mergeValue || emptyObject)};
      }
      else{
        nextValue = mergeValue;
      }
    }
    else{
      nextValue = curValue;
      //无初始值,获取属性为默认类的对象,该值可以被覆盖也可被扩展,所以数据类型可以转化
      if(curValue === undefined && !target.hasOwnProperty(propName)){
        nextValue = new DefaultObject();
      }
    }
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
    this.updateQueue = new UpdateQueue();
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
      clone[name] = assign(state, name, state[name]);
    }
    return clone;
  }
  /*
  * 发布方法对应的数据更新, 注意method为方法,另外该方法如果值为空,有一个对象的默认值
  *
  * @param {Function} method store实例的属性方法
  * @param {Object} value 对应的数值
  * */
  dispatch(method, value){
    if(method){
      let state = this.state,
        name = getOriginalMethodName(method),
        curValue = state[name],
        nextValue;

      process.env.NODE_ENV !== 'production'
      && invariant(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性在构造函数中进行初始化', getMethodName(this), name || 'method');
      nextValue = assign(state, name, value);
      this.updateQueue.push(method, curValue, nextValue);
      state[name] = nextValue;
    }
    this.updateQueue.exec((name, nextValue, method)=>{
      this.pub(method);
    });
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
      let state = this.state,
        curValue = state[name];
      let nextValue = assign(state, name, value);
      if(!shallowEqual(curValue, nextValue)){
        this.updateQueue.push(method, curValue, nextValue);
        state[name] = nextValue;
      }
    }
    else {
      return assign(this.state, name);
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