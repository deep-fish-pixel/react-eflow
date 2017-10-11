import {Store, dispatch, stateKey} from '../../../src/eflow';

class SomeStore extends Store {
  constructor(options) {
    super(options);
  }

  @stateKey('someThing')//对doSomeThing默认存储key值doSomeThing转换成someThing
  @dispatch
  doSomeThing(dispatch) {
    //获取该方法的dispatch
    //发布相关数据，发布后在该对象内部state的doSomeThing属性包含发布值
    setTimeout(()=>{
      dispatch({request: true});
    }, 1000);
  }
}
//实例化
export default new SomeStore();