/*
 * author: mawei
 * 添加Store实例的方法功能
 * */
import invariant from 'invariant';
import {forEachPrototype} from './prototype';
import {getMethodName} from './method';
import pubSub from './pubSub';
import {isString, isFunction} from './types';

let methodCount = 0;

export function getKeyByWords() {
  let words = [];
  for(let i = 0; i < arguments.length; i++){
    if(arguments[i])words.push(arguments[i]);
  }
  return words.join('.');
}

export function createUniqueMethodKey(...args) {
  args.push(++ methodCount);
  return getKeyByWords.apply(null, args);
}
/*
* 初始化store,为store的每个方法添加key及回调
* */
export default function initProperties(obj, id) {
  const stateKeys = obj.constructor.StateKeys || {};
  const flowFroms = obj.constructor.FlowFroms || {};

  forEachPrototype(obj, function (method, methodName) {
    if(methodName !== 'constructor'){
      /*
      * 当store有id标识时,所有原形方法转化为实例方法
      * 主要用于同一Store子类的实例
      * */
      if(method.displayName){
        let protoMethod = method;
        method = obj[methodName] = function () {
          return protoMethod.apply(this, Array.prototype.slice.apply(arguments));
        };
        method.displayName = getKeyByWords(id, methodName);
      }
      else{
        method.displayName = methodName;
      }

      let extend = {
        //获取key名称
        _eflowKey: createUniqueMethodKey(
          '_eflow_' + getMethodName(obj.constructor),
          methodName || 'method',
          id
        ),
        stateKey: stateKeys[methodName] || methodName,
        dispatch: obj.bind(method),
        data: obj.data.bind(obj, method),
        owner: obj,
        flows: {},
        //指定该方法跟随source方法同步更新
        flowFrom: function (source) {
          let _eflowKey = source._eflowKey;
          process.env.NODE_ENV !== 'production'
          && invariant(
            _eflowKey,
            '%s.%s 方法, _eflowKey值为空',
            getMethodName(source.owner.constructor),
            getMethodName(source) || 'method'
          );
          process.env.NODE_ENV !== 'production'
          && invariant(
            !this.flows[_eflowKey],
            '%s.%s 已同步 %s.%s',
            getMethodName(this.owner.constructor),
            getMethodName(this) || 'method',
            getMethodName(source.owner.constructor),
            getMethodName(source) || 'method'
          );
          this.flows[_eflowKey] = function flow() {
            obj[methodName]();
          };
          pubSub.sub(_eflowKey, this.flows[_eflowKey]);
        },
        destory: function () {
          let flows = this.flows;
          for(let _eflowKey in flows){
            pubSub.off(_eflowKey, flows[_eflowKey]);
          }
          Object.assign(method, {
            _eflowKey: null,
            owner: null,
            flows: null,
            flowFrom: null,
            destory: null
          })
        }
      };
      Object.assign(method, extend);
      //初始化各个方法的flowFrom
      initFlowFroms(obj, method, flowFroms[methodName]);
    }
  });
}

function initFlowFroms(store, method, methodFlowFroms) {
  if(!methodFlowFroms){
    return;
  }
  methodFlowFroms.forEach(function (flowFrom) {
    const targetClassName = getMethodName(store.constructor);
    if(isString(flowFrom)){
      process.env.NODE_ENV !== 'production'
      && invariant(
        store[flowFrom],
        '%s.%s的装饰器 %s 存在错误: 绑定的%s.%s方法不存在, 该类原型上没有%s方法',
        targetClassName,
        getMethodName(method),
        methodFlowFroms.decoratorName,
        targetClassName,
        flowFrom,
        flowFrom
      );
      method.flowFrom(store[flowFrom]);
    }
    else if(isFunction(flowFrom)){
      process.env.NODE_ENV !== 'production'
      && invariant(
        flowFrom.owner,
        '%s.%s的装饰器 %s 存在错误: 绑定的对象.%s方法不存在, 该方法可能被覆盖',
        targetClassName,
        getMethodName(method),
        methodFlowFroms.decoratorName,
        getMethodName(method)
      );
      method.flowFrom(flowFrom);
    }
  })
}


