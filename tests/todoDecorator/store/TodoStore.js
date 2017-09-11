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
    return {request: false};
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

  @stateKey('aliasTodos')
  @param(param.data)
  todos(data, todo){
    data.push(todo);
    return data;
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

  @param('todos.dispatch', 'todos.data')
  toggleTodo(dispatch, todos, id){
    todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    });
    dispatch(todos);
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
  @param(param.dispatch, 'todos.data', 'setFilter.data')
  filterTodos(dispatch, todos, filter){
    let filterTodos = getTodos(todos, filter);
    dispatch(filterTodos);
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

export {
  todoStore1,
  todoStore2,
  todoStore3
}


export default new TodoStore();
