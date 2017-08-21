import invariant from 'invariant';
import {forEachPrototype} from './prototype';
import {getMethodName} from './method';
import pubSub from './pubSub';

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
  forEachPrototype(obj, function (method, methodName) {
    if(methodName !== 'constructor'){
      /*
      * 当store有id标识时,所有原形方法转化为实例方法
      * 主要用于同一Store子类的实例
      * */
      if(id){
        let protoMethod = method;
        method = obj[methodName] = function (...args) {
          protoMethod.apply(this, args);
        };
        method.displayName = getKeyByWords(id, methodName);
      }

      let extend = {
        //获取key名称
        _eflowKey: createUniqueMethodKey(
          '_eflow_' + getMethodName(obj.constructor),
          methodName || 'method',
          id
        ),
        dispatch: obj.bind(method),
        ref: obj,
        flows: {},
        //指定该方法跟随flower方法同步更新
        flowFrom: function (flower) {
          let _eflowKey = flower._eflowKey;
          process.env.NODE_ENV !== 'production'
          && invariant(
            _eflowKey,
            '%s.%s 方法, _eflowKey值为空',
            getMethodName(flower.ref.constructor),
            getMethodName(flower) || 'method'
          );
          process.env.NODE_ENV !== 'production'
          && invariant(
            !this.flows[_eflowKey],
            '%s.%s 已同步 %s.%s',
            getMethodName(this.ref.constructor),
            getMethodName(this) || 'method',
            getMethodName(flower.ref.constructor),
            getMethodName(flower) || 'method'
          );
          this.flows[_eflowKey] = function sync() {
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
            ref: null,
            flows: null,
            flowFrom: null,
            destory: null
          })
        }
      };
      Object.assign(method, extend);
    }
  });
}


