import Store from '../src/Store'

class TestStore extends Store{
  constructor(options){
    super(options);
  }

  add(map){
    let dispatch = this.add.dispatch;
    dispatch(map);
  }
}

let testStore = new TestStore();

describe('测试 Set', () => {
  test('初始化Set', () => {
    let set = new Set();
    set.add('1');
    testStore.add(set);
    expect(testStore.add.data().has('1')).toBe(true);
  });
  test('设置Set', () => {
    let set = new Set();
    set.add('2');
    testStore.add(set);
    expect(testStore.add.data().has('1')).toBe(false);
    expect(testStore.add.data().has('2')).toBe(true);
  });
});