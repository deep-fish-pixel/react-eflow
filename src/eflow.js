/*
 * author: mawei
 * eflow入口引用
 * */
import wrapComponent from './wrapComponent';
import Store from './Store';
import dispatch from './decorators/dispatchDecorator';
import data from './decorators/dataDecorator';
import setData from './decorators/setDataDecorator';
import param from './decorators/paramDecorator';
import stateKey from './decorators/stateKeyDecorator';
import flowFrom from './decorators/flowFromDecorator';
import {Method} from './constants';

export {
  //包装组件,管理组件的更新
  wrapComponent,
  //商店类,管理数据
  Store,
  //dispatch装饰器
  dispatch,
  //data装饰器
  data,
  //setData装饰器
  setData,
  //params装饰器
  param,
  //stateKey装饰器
  stateKey,
  //flowFrom装饰器
  flowFrom,

  Method
}
