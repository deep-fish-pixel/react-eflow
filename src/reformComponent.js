/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {isFunction} from './types';
import pubSub from './pubSub';
import {getOriginalMethodName} from './method';
var emptyObject = require('fbjs/lib/emptyObject')
var ReactNoopUpdateQueue = require('react/lib/ReactNoopUpdateQueue');

/*
* 重新定义ReactComponent组件,
* 添加对store的初始化操作
* */
function ReactComponent(props, context, updater) {
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
  if(props && props._eflowInit){
    props._eflowInit(this);
    //delete props._eflowInit;
  }
  props = initProps(props);
  this.props = props;

}
Object.assign(ReactComponent.prototype, Component.prototype);
React.Component = ReactComponent;

function initProps(props){
  let newProps = {};
  for(let name in props){
    if(name != '_eflowInit'){
      newProps[name] = props[name];
    }
  }
  return newProps;
}


export default ReactComponent;










