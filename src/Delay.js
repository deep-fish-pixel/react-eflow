/*
 * author: mawei
 * 延迟处理
 * */
import invariant from 'invariant';
import {isFunction} from './types'

export default class Delay{
  constructor(delays){
    this.delays = delays || [];
  }
  /*
  * 添加延迟方法
  * */
  add(delay){
    process.env.NODE_ENV !== 'production'
    && invariant(isFunction(delay), '延迟执行器的类型只能为方法');
    this.delays.push(delay);
  }
  /*
   * 执行延迟方法
   * */
  execute(){
    this.delays.forEach(function (delay) {
      try{
        delay();
      }
      catch (e){
        console.error(e);
      }
    });
    this.delays = [];
  }
}



