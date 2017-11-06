/*
 * author: mawei
 * 包装用户组件,绑定store后能自动更新数据
 * */
import React, {Component} from 'react';
import invariant from 'invariant';
import shallowEqual from 'shallowequal';
import {isFunction, isArray} from './types';
import pubSub from './pubSub';
import Store from './Store';
import {getPrototypeMethods} from './prototype';
import {getOriginalMethodName, getMethodName} from './method';
import {replaceElement} from './Array';

/*
* 根据当前组件绑定的store获取相关state数据
* @param {Store} store 商店类对象
* @param {String} propsKey 更新器名称
* @param {Function} updater 更新器
* @param {Function} customPropsMapping 用户自定义映射
* @param {Boolean} forceUpdate 是否需要设置组件的state, 使state起作用
* */
function getState(store, propsKey, updater, customPropsMapping, forceUpdate) {
  let state = this.state;
  if(propsKey && updater){
    state[propsKey] = store.data(updater);
  }
  if(customPropsMapping){
    Object.assign(state, customPropsMapping(state, this.props));
  }
  if(forceUpdate){
    //强制更新标识
    this.__stateShouldUpdate = true;
    this.setState(state, ()=> {
      this.__stateShouldUpdate = false;
    });
  }

  return state;
}

/*
 * 执行Store初始化
 * */
function execInitStores(component, customPropsMapping) {
  let state = getState.call(component, null, null, null, customPropsMapping);
  Object.assign(component.state, state);
}
/*
* 包装用户组件, 包装后的组件绑定stores并初始化stores,
* 把相关state值更新到被包装组件props中
* */
let wrapComponent = function(_Component, updaters, customPropsMapping){
  //装饰方式处理
  if(_Component == null || isArray(_Component)){
    customPropsMapping = updaters;
    updaters = _Component;
    _Component = null;
    return function (target) {
      return createWrapComponent(target);
    }
  }
  return createWrapComponent(_Component);

  function createWrapComponent(_Component) {
    if((!updaters || !updaters.length) && !customPropsMapping){
      return _Component;
    }
    class WrapComponent extends Component{
      constructor(props){
        super(props);
        this.state = {};
        this.bindUpdater();
      }

      componentWillUnmount(){
        this.off();
        this.__stateShouldUpdate = null;
      }

      shouldComponentUpdate(nextProps, nextState){
        return this.__stateShouldUpdate
          || !shallowEqual(this.props, nextProps)
          || !shallowEqual(this.state, nextState);
      }

      /*
       * 绑定相关组件的更新
       * */
      bindUpdater(){
        let self= this,
          event = this.event = {},
          store,
          state = this.state;
        if(updaters && updaters.length){
          let isMethod,
            propsKey,
            _eflowKey,
            updater,
            originUpdater;
          //遍历updaters, 处理updater的绑定事件
          for(let i = 0; i < updaters.length; i++){
            updater = updaters[i];
            process.env.NODE_ENV !== 'production'
            && invariant(updater, 'wrapComponent(%s) 方法中, 参数updaters数组的第%s元素为undefined, 该元素的类型必须为方法。', getMethodName(_Component), i + 1);
            if(updater instanceof Store){
              updaters = replaceElement(updaters, i, getPrototypeMethods(updater));
              i--;
              continue;
            }

            isMethod = isFunction(updater);
            originUpdater = updater;
            updater = isMethod ? updater : updater.updater;
            propsKey = isMethod
              ? updater.stateKey
              : originUpdater.propsKey
            || updater.stateKey;
            _eflowKey = updater._eflowKey;
            store = updater.owner;
            let update = getState.bind(this, store, propsKey, updater, customPropsMapping);
            event[_eflowKey] = function callUpdate() {
              update(true);
            };
            pubSub.sub(_eflowKey, event[_eflowKey], 1);

            //初始化该方法对应的state值
            Object.assign(state, getState.call(this, store, propsKey, updater));
          }
        }
        //最后初始化customPropsMapping
        execInitStores(this, customPropsMapping);
      }
      /*
       * 卸载相关绑定更新
       * */
      off(){
        if(updaters && updaters.length){
          let event = this.event,
            _eflowKey;
          updaters.forEach(function(updater){
            updater = isFunction(updater) ? updater : updater.updater;
            _eflowKey = updater._eflowKey;
            pubSub.off(_eflowKey, event[_eflowKey]);
          });
          this.event = null;
        }
      }

      getProps(){
        var curProps = {}, props = this.props;
        for(var propName in props){
          if(propName === 'innerRef' && props.innerRef){
            curProps.ref = props.innerRef;
          }
          else{
            curProps[propName] = props[propName];
          }
        }
        return curProps;
      }

      render(){
        let state = this.state;
        return <_Component {...state} {...this.getProps()}/>
      }
    }

    WrapComponent.displayName = 'WrapComponent(' + getMethodName(_Component) + ')';

    return WrapComponent;
  }
};

export default wrapComponent;