/**
 * author: mawei
 */
import shallowEqual from 'shallowequal';
import invariant from 'invariant';
import {forEachPrototype} from './prototype';
import initProperties from './initProperties';
import {isArray, isObject} from './types';
import {getMethodName, getOriginalMethodName} from './method';
import pubSub from './pubSub';
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
function assign(target, propName, mergeValue) {
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
  }

  /*
   * 获取state
   * */
  getState(){
    let clone = {},
        state = this.state;
    for(var name in state){
      if (state.hasOwnProperty(name)){
        clone[name] = assign(state, name, state[name]);
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
    if(method){
      let state = this.state,
        name = getOriginalMethodName(method);

      process.env.NODE_ENV !== 'production'
      && invariant(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性在构造函数中进行初始化', getMethodName(this), name || 'method');
      this.change(state, name, value, method);
    }
    this.updateQueue.exec((name, nextValue, method)=>{
      this.pub(method);
    });
  }

  /*
  * 检查value是否有变更,若果有就加入队列
  * */
  change(state, name, value, method) {
    let curValue = state[name],
      nextValue,
      shouldUpdate;
    nextValue = assign(state, name, value);

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

    if (shouldUpdate || !shallowEqual(curValue, nextValue)) {
      this.updateQueue.push(method, curValue, nextValue);
      state[name] = nextValue;
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
      this.change(this.state, name, value, method)
    }
    else {
      let state = this.state,
        curValue = state[name],
        newValue;
      if(isObject(curValue) && !isArray(curValue)){
        newValue =  {};
        for(let propName in curValue){
          if (curValue.hasOwnProperty(propName)){
            newValue[propName] = assign(curValue, propName);
          }
        }
        return newValue;
      }
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
  /*
  * 销毁处理
  * */
  destory(){
    this.state = null;
    this.options = null;
    this.updateQueue = null;
    forEachPrototype(this, function (method, methodName) {
      method.destory();
    })
  }
}



export default Store;