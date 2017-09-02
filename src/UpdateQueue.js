/**
 * author: mawei
 * 缓存更新的队列
 */
import shallowEqual from 'shallowequal';
import {getOriginalMethodName} from './method';

class UpdateQueue{
  constructor(){
    this.queue = {};

  }

  push(method, value, nextValue){
    var name = getOriginalMethodName(method),
      queue = this.queue,
      prevUpdate = queue[name];
    if(prevUpdate){
      //2次操作后结果是改回原值,删除队列
      if(shallowEqual(prevUpdate.value, nextValue)){
        delete queue[name];
      }
      else{
        queue[name] = {
          value: prevUpdate.value,
          nextValue,
          method
        };
      }
    }
    else{
      queue[name] = {
        value,
        nextValue,
        method
      };
    }
  }

  exec(callback){
    var queue = this.queue,
      update;
    for(let name in queue){
      if(callback){
        update = queue[name];
        delete queue[name];
        callback(name, update.nextValue, update.method);
      }
    }
  }

}

export default UpdateQueue;