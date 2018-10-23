import Store from '../src/Store'
import './preHandleEnv';

class TestStore extends Store{
  constructor(options){
    super(options);
  }

  testBoolean(){
    let dispatch = this.testBoolean.dispatch;
    dispatch(false);
  }
  testBooleanTrue(){
    let dispatch = this.testBoolean.dispatch;
    dispatch(true);
  }
  testBooleanToNumber(){
    let dispatch = this.testBoolean.dispatch;
    dispatch(0);
  }
  testBooleanToString(){
    let dispatch = this.testBoolean.dispatch;
    dispatch('');
  }
  testBooleanToObject(){
    let dispatch = this.testBoolean.dispatch;
    dispatch({test: true});
  }
  testBooleanToObjectToBoolean(){
    let dispatch = this.testBoolean.dispatch;
    dispatch(true);
  }

  testNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(0);
  }
  testPositiveNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(1);
  }
  testNegativeNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(-1);
  }
  testNegativeNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(-1);
  }
  testNegativeNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(-1);
  }
}

let testStore = new TestStore();

describe('测试 布尔类型 转换', () => {
  test('未初始化值时, 为对象', () => {
    expect(testStore.testBoolean.data()).toEqual({});
  });
  test('设置值为false', () => {
    testStore.testBoolean();
    expect(testStore.testBoolean.data()).toBeFalsy();
  });
  test('获取store', () => {
    expect(testStore.getState()).toEqual({testBoolean: false});
  });
  test('设置值为true', () => {
    testStore.testBooleanTrue();
    expect(testStore.testBoolean.data()).toBeTruthy();
  });
  test('布尔值转数字', () => {
    testStore.testBooleanToNumber();
    expect(testStore.testBoolean.data()).toBe(0);
    testStore.testBoolean();
  });
  test('布尔值转字符串', () => {
    testStore.testBooleanToString();
    expect(testStore.testBoolean.data()).toBe('');
    testStore.testBoolean();
  });
  test('布尔值转对象', () => {
    testStore.testBooleanToObject();
    expect(testStore.testBoolean.data()).toEqual({test: true});
  });
  test('对象转布尔,类型仍然对象', () => {
    testStore.testBooleanToObjectToBoolean();
    expect(testStore.testBoolean.data()).toEqual({test: true});
  });
});