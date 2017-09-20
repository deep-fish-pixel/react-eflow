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

describe('测试 Map', () => {
  test('初始化Map', () => {
    let map = new Map();
    map.set('xxx', '1');
    testStore.add(map);
    expect(testStore.add.data().get('xxx')).toBe('1');
  });
  test('设置Map', () => {
    let map = new Map();
    map.set('xxx', '2');
    testStore.add(map);
    expect(testStore.add.data().get('xxx')).toBe('2');
  });
});