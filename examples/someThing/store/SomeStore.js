import {Store} from '../../../src/eflow';

class SomeStore extends Store {
  constructor(options) {
    super(options);
  }

  doSomeThing() {
    //通过this.doSomeThing获取该方法的dispatch
    var dispatch = this.doSomeThing.dispatch;
    //发布相关数据，发布后在该对象内部state的doSomeThing属性包含发布值
    setTimeout(()=>{
      dispatch({request: true});
    }, 1000);

  }
}
//实例化
export default new SomeStore();