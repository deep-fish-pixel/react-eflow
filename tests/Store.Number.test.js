import Store from '../src/Store'
import './preHandleEnv';

class TestStore extends Store{
  constructor(options){
    super(options);
  }

  testNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(false);
  }
  testZeroNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(0);
  }
  testNegativeNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(-1);
  }
  testPozitiveNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(1);
  }
  testNumberToFalse(){
    let dispatch = this.testNumber.dispatch;
    dispatch(false);
  }
  testNumberToString(){
    let dispatch = this.testNumber.dispatch;
    dispatch('');
  }
  testNumberToArray(){
    let dispatch = this.testNumber.dispatch;
    dispatch([]);
  }
  testNumberToArrayToNumber(){
    let dispatch = this.testNumber.dispatch;
    dispatch(1);
  }
}

let testStore = new TestStore();

describe('测试 数字类型 转换', () => {
  test('未初始化值时, 为对象', () => {
    expect(testStore.testNumber.data()).toEqual({});
  });
  test('设置值为0', () => {
    testStore.testZeroNumber();
    expect(testStore.testNumber.data()).toBe(0);
  });
  test('获取store', () => {
    expect(testStore.getState()).toEqual({testNumber: 0});
  });
  test('设置值为-1', () => {
    testStore.testNegativeNumber();
    expect(testStore.testNumber.data()).toBe(-1);
  });
  test('设置值为1', () => {
    testStore.testPozitiveNumber();
    expect(testStore.testNumber.data()).toBe(1);
  });
  test('数字转布尔值', () => {
    testStore.testNumberToFalse();
    expect(testStore.testNumber.data()).toBeFalsy();
    testStore.testZeroNumber();
  });
  test('数字转字符串', () => {
    testStore.testNumberToString();
    expect(testStore.testNumber.data()).toBe('');
    testStore.testNumber();
  });
  test('数字转数组', () => {
    testStore.testNumberToArray();
    expect(testStore.testNumber.data()).toEqual([]);
    expect(testStore.testNumber.data()).toHaveLength(0);
  });
  test('数组转数字,类型仍然数组', () => {
    testStore.testNumberToArrayToNumber();
    expect(testStore.testNumber.data()).toEqual([]);
    expect(testStore.testNumber.data()).toHaveLength(0);
  });
});