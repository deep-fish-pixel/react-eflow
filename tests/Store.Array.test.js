import Store from '../src/Store'
import './preHandleEnv';

class TestStore extends Store{
  constructor(options){
    super(options);
  }

  testArray(){
    let dispatch = this.testArray.dispatch;
    dispatch([]);
  }
  testArrayListNumber(){
    let dispatch = this.testArray.dispatch;
    dispatch([1]);
  }
  testArrayListString(){
    let dispatch = this.testArray.dispatch;
    dispatch(['']);
  }
  testArrayListArray(){
    let dispatch = this.testArray.dispatch;
    dispatch([{list: []}]);
  }
  testArrayListArrayExtend(){
    let dispatch = this.testArray.dispatch;
    dispatch([{
      list: {
        extend: 'test'
      }
    }]);
  }
  testArrayListArrayPush(){
    let dispatch = this.testArray.dispatch;
    dispatch([{
      list: [1, 2]
    }]);

  }
  testArrayToNumber(){
    let dispatch = this.testArray.dispatch;
    dispatch(0);
  }
  testArrayToBoolean(){
    let dispatch = this.testArray.dispatch;
    dispatch(false);
  }
  testArrayToString(){
    let dispatch = this.testArray.dispatch;
    dispatch('');
  }
}

let testStore = new TestStore();

describe('测试 数组类型 转换', () => {
  test('设置值{}', () => {
    testStore.testArray();
    expect(testStore.testArray.data()).toEqual([]);
  });
  test('获取store', () => {
    expect(testStore.getState()).toEqual({testArray: []});
  });
  test('设置list值1', () => {
    testStore.testArrayListNumber();
    expect(testStore.testArray.data()).toEqual([1]);
  });
  test('设置list值空串', () => {
    testStore.testArrayListString();
    expect(testStore.testArray.data()).toEqual(['']);
  });
  test('设置list值数组', () => {
    testStore.testArrayListArray();
    expect(testStore.testArray.data()).toEqual([{list: []}]);
  });
  test('设置list值数组并扩展', () => {
    testStore.testArrayListArrayExtend();
    expect(testStore.testArray.data()).toEqual([{list: {extend: 'test'}}]);
  });
  test('设置list值[]', () => {
    testStore.testArrayListArray();
    expect(testStore.testArray.data()).toEqual([{list: []}]);
  });
  test('设置list值[1,2]', () => {
    testStore.testArrayListArrayPush();
    expect(testStore.testArray.data()).toEqual([{list: [1, 2]}]);
  });
  test('数组类型转数字', () => {
    testStore.testArrayToNumber();
    expect(testStore.testArray.data()).toEqual([{"list": [1, 2]}]);
  });
  test('数组类型转布尔', () => {
    testStore.testArrayToBoolean();
    expect(testStore.testArray.data()).toEqual([{"list": [1, 2]}]);
  });
  test('数组类型转字符串', () => {
    testStore.testArrayToString();
    expect(testStore.testArray.data()).toEqual([{"list": [1, 2]}]);
  });
});