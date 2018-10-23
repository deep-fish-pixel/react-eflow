/**
 * author: mawei
 */
import shallowEqual from 'shallowequal';
import invariant from 'invariant';
import clone from 'clone';
import {forEachPrototype} from './prototype';
import initProperties from './initProperties';
import {isArray, isObject, isString, isNumber, isBoolean, isFunction} from './types';
import {getMethodName, getOriginalMethodName} from './method';
import pubSub from './pubSub';
import DefaultObject from './DefaultObject';
import UpdateQueue from './UpdateQueue';
import {Method} from './constants';



const emptyObject = {};
Object.freeze(emptyObject);
/*
 * 属性合并, 并获取新对象
 * @param {Array | Object} target 合并的对象容器
 * @param {Array | Object} propName 合并容器的属性名称
 * @param {Array | Object} mergeValue 被合并的值
 * @return {Array | Object}
 * */
function assign(store, target, propName, mergeValue) {
  let curValue = target[propName], nextValue;
  //数组类型值只可替换为新数组,所以数据类型不能转化
  if(isArray(curValue)){
    if(arguments.length >= 4){
      let array = isArray(mergeValue);
      if(array){
        nextValue = [...mergeValue];
      }
      mergeValue && process.env.NODE_ENV !== 'production'
      && invariant(array, '%s实例的state, 其属性 %s 对应的值类型为数组,不可存非数组类型: %s', getMethodName(store.constructor), propName, mergeValue);
    }

    if(!nextValue){
      nextValue = [...curValue];
    }
  }
  //对象类型值不可覆盖只可扩展,所以数据类型不能转化
  else if(isObject(curValue)){
    mergeValue = mergeValue || emptyObject;

    process.env.NODE_ENV !== 'production'
    && invariant(
      !isArray(mergeValue)
      && !isString(mergeValue)
      && !isNumber(mergeValue)
      && !isBoolean(mergeValue)
      && !isFunction(mergeValue)
      && window.Map ? !(mergeValue instanceof window.Map) : true
      && window.Set ?  !(mergeValue instanceof window.Set) : true,
      '%s实例的state, 属性 %s 对应的值类型为对象,不可存非对象类型: %s', getMethodName(store.constructor), propName, mergeValue);

    nextValue = {...curValue, ...mergeValue};
  }
  else{
    //其他类型如基本类型,值可被覆盖但不可扩展,所以数据类型可以转化
    if(arguments.length >= 4){
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

let storeNames = {
  names: {},
  getName: function (store) {
    if(store instanceof Store){
      let name = getMethodName(store.constructor) || 'store',
          names = this.names[name];
      if(!names){
        names = this.names[name] = [];
      }
      //首字母小写
      name = name.replace(/\b\w+\b/g, function(word) {
        return word.substring(0,1).toLowerCase() +  word.substring(1);
      });
      let storeName = name + '_' + (names.length + 1);
      names.push(storeName);
      return storeName;
    }
  }
}

/*
* 商店基类,实现基本的状态管理
* */
class Store {
  static plugin = function () {
    for(let i = 0; i < arguments.length; i++){
      arguments[i](Store);
    }
  };

  constructor(options = {}){
    this.state = {};
    this.options = options;
    this.updateQueue = new UpdateQueue();
    this.id = options.id || storeNames.getName(this);
    initProperties(this, this.id);
  }

  /*
  * 初始化state
  * */
  initState(data){
    let state = this.state;
    for(let name in data){
      if (data.hasOwnProperty(name)){
        state[name] = data[name];
      }
    }

    this._cloneState = clone(state);
  }

  /*
   * 重置为初始化状态
   * */
  reset(){
    this.state = clone(this._cloneState || {});
  }

  /*
   * 获取state
   * */
  getState(){
    let clone = {},
        state = this.state;
    for(var name in state){
      if (state.hasOwnProperty(name)){
        clone[name] = assign(this, state, name, state[name]);
      }
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
    if(arguments.length == 1 && isFunction(method)){
      return this.bindDispatch(method);
    }
    this._dispatch(method, value, Method.dispatch);
  }
  /*
   * 当前方法获取/设置并发布数据
   * */
  contextDispatch(method, value){
    if(arguments.length == 1 && isFunction(method)){
      return this.bindDispatch(method);
    }
    this._dispatch(method, value, Method.contextDispatch);
  }
  /*
   * 方法获取/设置并发布数据
   * */
  _dispatch(method, value, invokeName){
    if(method){
      process.env.NODE_ENV !== 'production'
      && invariant(isFunction(method), '调用%s.%s 方法, method参数类型不是方法, 请检查this.' + invokeName + '使用方式是否正确, 如上下文环境切换导致或首个参数类型需为方法', getMethodName(this.constructor), invokeName);

      let state = this.state,
        stateKey = method.stateKey;

      process.env.NODE_ENV !== 'production'
      && invariant(stateKey, '调用%s.%s 方法, 参数值%s 的stateKey为空, stateKey属性在构造函数中进行初始化, 应该是非原型方法', getMethodName(this.constructor), invokeName, getOriginalMethodName(method) || 'method');

      this.change(state, stateKey, value, method);
    }
    this.updateQueue.exec((stateKey, nextValue, method)=>{
      this.pub(method);
    });
  }

  /*
  * 检查value是否有变更,若果有就加入队列
  * */
  change(state, stateKey, value, method) {
    let curValue = state[stateKey],
      nextValue,
      shouldUpdate;
    nextValue = assign(this, state, stateKey, value);

	  //如果value是对象,进行深度检测
    if (isObject(value)) {
	    if (shallowEqual(curValue, nextValue)) {
        for (let propName in value) {
          if (value.hasOwnProperty(propName)
            && !shallowEqual(curValue[propName], value[propName])) {
            shouldUpdate = true;
            break;
          }
        }
      }
      else {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate
      || !shallowEqual(curValue, nextValue)
      || (window.Map ? (nextValue instanceof window.Map) : false)
      || (window.Set ? (nextValue instanceof window.Set) : false)
    ) {
      this.updateQueue.push(method, curValue, nextValue);
      state[stateKey] = nextValue;
    }
  }
  /*
   * 绑定method对应dispatch, 内部通过method的name或displayName来标识key
   * @param {Function} method Store继承类的方法
   * @return {Function}
   * */
  bindDispatch(method){
    let name = getOriginalMethodName(method);
    process.env.NODE_ENV !== 'production'
    && invariant(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性已在构造函数中进行初始化', getOriginalMethodName(this.constructor), name || 'method');
    return this.dispatch.bind(this, method);
  }
  /*
   * 获取method对应store中的值,内部通过method的name或displayName来标识key
   * 该值为空时,返回的默认值为{}
   * @param {Function} method Store继承类的方法
   * @return {Array | Object}
   * */
  data(method, value){
    return this._data(Array.prototype.slice.apply(arguments, [0, 2]), Method.data);
  }

  /*
  * 当前方法获取/设置数据
  * */
  contextData(method, value){
    return this._data(Array.prototype.slice.apply(arguments, [0, 2]), Method.contextData);
  }

  /*
   * 方法获取/设置数据
   * */
  _data(invokerArguments, invokeName){
    let method = invokerArguments[0],
      value = invokerArguments[1];
    if(!method){
      process.env.NODE_ENV !== 'production'
      && invariant(method, `${invokeName}方法的第一个参数值不能为空, 该值应该是方法类型`);
    }
    const stateKey = method.stateKey;
    process.env.NODE_ENV !== 'production'
    && invariant(isFunction(method), '调用%s.%s 方法, method参数类型不是方法, 请检查this.' + invokeName + '使用是否正确, 如上下文环境切换导致或首个参数类型需为方法', getMethodName(this.constructor), invokeName);

    process.env.NODE_ENV !== 'production'
    && invariant(stateKey, '调用%s.%s 方法, 参数值%s 的stateKey为空, stateKey属性在构造函数中进行初始化, 应该是非原型方法', getMethodName(this), invokeName, getOriginalMethodName(method) || 'method');
    if(invokerArguments.length >= 2){
      this.change(this.state, stateKey, value, method)
    }
    else {
      let state = this.state,
        curValue = state[stateKey],
        newValue;
      if(isObject(curValue) && !isArray(curValue)){
        newValue =  {};
        for(let propName in curValue){
          if (curValue.hasOwnProperty(propName)){
            newValue[propName] = assign(this, curValue, propName);
          }
        }
        return newValue;
      }
      return assign(this, this.state, stateKey);
    }
  }

  /*
  * 发布method对应值,内部通过method的内部属性_eflowKey来标识key
  * @param {Function} method Store继承类的方法
  * */
  pub(method){
    let key = method._eflowKey;
    process.env.NODE_ENV !== 'production'
    && invariant(key, '调用%s.pub 方法, 参数值%s 的_eflowKey为空, 该属性已在构造函数中进行初始化', getMethodName(this), getOriginalMethodName(method) || 'method');
    try{
      pubSub.pub(key);
    }catch(e) {
      if(process.env.NODE_ENV !== 'production'){
        throw e;
      }
    }

  }
  /*
  * 销毁处理
  * */
  destory(){
    this.state = null;
    this.options = null;
    this.updateQueue = null;
    forEachPrototype(this, function (method, methodName) {
      method.destory && method.destory();
    })
  }
}



export default Store;
