import Store from '../src/Store'

class TestStore extends Store{
  constructor(options){
    super(options);
  }

  testObj(){
    let dispatch = this.testObj.dispatch;
    let testData = this.testObj.data;
  }
}

let testStore = new TestStore();

describe('first group test', () => {
  test('testStore.testObj.dispatch exist', () => {
    expect(!testStore.testObj.dispatch).toBeFalsy();
  });
  test('testStore.testObj.data exist', () => {
    expect(!testStore.testObj.data).toBeFalsy();
  });
});