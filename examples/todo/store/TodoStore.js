import {Store, dispatch, data, param, stateKey, flowFrom} from '../../../src/eflow';

class TodoStore extends Store{
  constructor(options){
    super(options);
    this.count = 0;
    this.initState({
      todos: [],
      filterTodos: [],
      filterName: 'All'
    });
  }

  @flowFrom('todos', 'setFilter')
  @param(param.dispatch, 'todos.data', 'setFilter.data')
  filterTodos(dispatch, todos, filter){
    let filterTodos = getTodos(todos, filter);
    dispatch(filterTodos);
  }

  @dispatch
  addTodo(dispatch, text){
    setTimeout(() => {
      dispatch({request: false});
      this.todos({
        text: text,
        id: ++ this.count
      });
    }, 1000);
    return {request: true};
  }

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

  @param('todos.data')
  @dispatch.return('todos')
  toggleTodo(todos, id){
    todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    });
    return todos;
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

export default new TodoStore();
