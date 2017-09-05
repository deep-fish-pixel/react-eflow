/*
 * author: mawei
 * eflow入口引用
 * */
import wrapComponent from './wrapComponent';
import Store from './Store';
import dispatch from './decorators/dispatchDecorator';
import data from './decorators/dataDecorator';
import param from './decorators/paramDecorator';

export {
  //包装组件,管理组件的更新
  wrapComponent,
  //商店类,管理数据
  Store,
  //dispatch装饰器
  dispatch,
  //data装饰器
  data,
  //params装饰器
  param
}
