import {Store, dispatch, data, setData, param, stateKey, flowFrom} from '../../../src/eflow';

class TodoStore extends Store{
  /*static StateKeys = {
    setFilter: 'filterName',
    todos: 'aliasTodos',
    filterTodos: 'aliasFilterTodos',
  };*/

  constructor(options){
    super(options);
    this.count = 0;
    this.initState({
      aliasTodos: [],
      aliasFilterTodos: [],
      filterName: 'All'
    });
  }

  addTodo(text){
    this.todos({
      text: text,
      id: ++ this.count
    });
    this.dispatch({request: false});
  }

  @param('addTodo.setData', 'todos.setData', 'todos.data')
  operateTodos(setData, todosSetData, todos, prevDispatchCallback, dispatchCallback){
    let dispatch = this.todos.dispatch,
      length = todos.length;
    setData({request: true});
    setData({request: false});
    setData({request: true});
    for(var i = 0; i < length; i++){
      if(i < length / 2){
        todos[i] = {...todos[i], completed: !todos[i].completed};
        todosSetData(todos);
      }
      else{
        todos.pop();
        todosSetData(todos);
      }
    }

    prevDispatchCallback && prevDispatchCallback.call(this, this.updateQueue, todos);
    dispatch(todos);
    dispatchCallback && dispatchCallback.call(this, this.updateQueue, todos);
  }

  @param('addTodo.setData')
  @setData('todos')
  @data('todos')
  @dispatch('todos')
  operateTodosTypeScript(addTodoSetData, prevDispatchCallback, dispatchCallback){
    let todos = this.data(),
      length = todos.length;
    addTodoSetData({request: true});
    addTodoSetData({request: false});
    addTodoSetData({request: true});
    for(var i = 0; i < length; i++){
      if(i < length / 2){
        todos[i] = {...todos[i], completed: !todos[i].completed};
        this.data(todos);
      }
      else{
        todos.pop();
        this.data(todos);
      }
    }

    prevDispatchCallback && prevDispatchCallback.call(this, this.updateQueue, todos);
    this.dispatch(todos);
    dispatchCallback && dispatchCallback.call(this, this.updateQueue, todos);
  }

  @stateKey('aliasTodos')
  @param(param.data)
  @dispatch('todos')
  todos(todos, todo){
    todos.push(todo);
	  this.dispatch(todos);
  }

  @param('todos.dispatch', 'todos.data')
  editTodo(dispatch, data, _todo){
    todos.some(function(todo){
      if(_todo.id == todo.id){
        todo.text = _todo.text;
        return true;
      }
    });
    dispatch(todos);
  }


  @data('todos')
  @dispatch('todos')
  toggleTodo(id){
    let todos = this.data();
    todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    });
    this.dispatch(todos);
  }

  @param('todos.dispatch', 'todos.data')
  toggleTodos(dispatch, todos){
    todos = todos.map(function(todo){
      return {...todo, completed: !todo.completed};
    });
    dispatch(todos);
  }

  @param('todos.dispatch', 'todos.data')
  deleteTodo(dispatch, todos, id){
    todos = todos.filter(function(todo){
      return todo.id !== id;
    });
    dispatch(todos);
  }

  @dispatch
  @stateKey('filterName')
  setFilter(dispatch, filter){
    dispatch(filter);
  }

  @flowFrom('todos', 'setFilter')
  @stateKey('aliasFilterTodos')
  @param('todos.data', 'setFilter.data')
  filterTodos(todos, filter){
    let filterTodos = getTodos(todos, filter);
    this.dispatch(filterTodos);
  }

  @dispatch('todos')
  testDispatchUsedParam(){
    this.dispatch([{
      text: 'testDispatchUsedParam',
      id: ++ this.count
    }]);
  }
  
	testObject(){
		let dispatch = this.testObject.dispatch;
		dispatch({});
	}
}

function getTodos(todos, filter){
  switch (filter) {
    case 'All':
      return todos;
    case 'Completed':
      return todos.filter(t => t.completed);
    case 'Active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

let todoStore1 = new TodoStore();

let todoStore2 = new TodoStore();

let todoStore3 = new TodoStore();
let todoStore4 = new TodoStore();
todoStore4.testDispatchUsedParam();
todoStore4.testObject();
todoStore4.testObject.data();
todoStore4.getState()
export {
  todoStore1,
  todoStore2,
  todoStore3,
  todoStore4
}

export default new TodoStore();

/*let cacheOperates;
todoStore4.operateTodosTypeScript(function (updateQueue, todos) {
  cacheOperates = Object.getOwnPropertyNames(updateQueue.queue);
  console.log(cacheOperates.length)
}, function (updateQueue, todos) {
  cacheOperates = Object.getOwnPropertyNames(updateQueue.queue, todos);
  console.log(cacheOperates.length)
});*/
