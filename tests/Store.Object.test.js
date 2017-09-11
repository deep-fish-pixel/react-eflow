import Store from '../src/Store'
import './preHandleEnv';

class TestStore extends Store{
  constructor(options){
    super(options);
  }

  testObject(){
    let dispatch = this.testObject.dispatch;
    dispatch({});
  }
  testObjectListNumber(){
    let dispatch = this.testObject.dispatch;
    dispatch({
      list: 1
    });
  }
  testObjectListString(){
    let dispatch = this.testObject.dispatch;
    dispatch({
      list: ''
    });
  }
  testObjectListObject(){
    let dispatch = this.testObject.dispatch;
    dispatch({
      list: {}
    });
  }
  testObjectListObjectExtend(){
    let dispatch = this.testObject.dispatch;
    dispatch({
      list: {
        extend: 'test'
      }
    });
  }
  testObjectListArray(){
    let dispatch = this.testObject.dispatch;
    dispatch({
      list: []
    });
  }
  testObjectListArrayPush(){
    let dispatch = this.testObject.dispatch;
    dispatch({
      list: [1, 2]
    });

  }
  testObjectToNumber(){
    let dispatch = this.testObject.dispatch;
    dispatch(0);
  }
  testObjectToBoolean(){
    let dispatch = this.testObject.dispatch;
    dispatch(false);
  }
  testObjectToString(){
    let dispatch = this.testObject.dispatch;
    dispatch('');
  }
}

let testStore = new TestStore();

describe('测试 对象类型 转换', () => {
  test('设置值{}', () => {
    testStore.testObject();
    expect(testStore.testObject.data()).toEqual({});
  });
  test('获取store', () => {
    expect(testStore.getState()).toEqual({testObject: {}});
  });
  test('设置list值1', () => {
    testStore.testObjectListNumber();
    expect(testStore.testObject.data()).toEqual({list: 1});
  });
  test('设置list值空串', () => {
    testStore.testObjectListString();
    expect(testStore.testObject.data()).toEqual({list: ''});
  });
  test('设置list值对象', () => {
    testStore.testObjectListObject();
    expect(testStore.testObject.data()).toEqual({list: {}});
  });
  test('设置list值对象并扩展', () => {
    testStore.testObjectListObjectExtend();
    expect(testStore.testObject.data()).toEqual({list: {extend: 'test'}});
  });
  test('设置list值[]', () => {
    testStore.testObjectListArray();
    expect(testStore.testObject.data()).toEqual({list: []});
  });
  test('设置list值[1,2]', () => {
    testStore.testObjectListArrayPush();
    expect(testStore.testObject.data()).toEqual({list: [1, 2]});
    testStore.testObjectListObject();
  });
  test('对象类型转数字', () => {
    testStore.testObjectToNumber();
    expect(testStore.testObject.data()).toEqual({list: {}});
  });
  test('对象类型转布尔', () => {
    testStore.testObjectToBoolean();
    expect(testStore.testObject.data()).toEqual({list: {}});
  });
  test('对象类型转字符串', () => {
    testStore.testObjectToString();
    expect(testStore.testObject.data()).toEqual({list: {}});
  });
});