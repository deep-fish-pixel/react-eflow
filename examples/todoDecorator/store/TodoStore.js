import {Store, dispatch, data, param} from '../../../src/eflow';

class TodoStore extends Store{
  constructor(options){
    super(options);
    this.count = 0;
    this.filterTodos.flowFrom(this.todos);
    this.filterTodos.flowFrom(this.filter);
    this.initState({
      todos: [],
      filterTodos: [],
      filter: 'All'
    });
  }

  @dispatch
  addTodo(dispatch, text){
    dispatch({request: true});
    setTimeout(() => {
      dispatch({request: false});
      this.todos({
        text: text,
        id: ++ this.count
      });
    }, 1000);
  }

  @param(param.dispatch, param.data)
  todos(dispatch, data, todo){
    data.push(todo);
    dispatch(data);
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

  showAll(){
    this.filter('All');
  }

  showActive(){
    this.filter('Active');
  }

  showCompleted(){
    this.filter('Completed');
  }

  @dispatch
  filter(dispatch, filter){
    dispatch(filter);
  }

  @param('dispatch', 'filter.data', 'todos.data')
  filterTodos(dispatch, filter, todos){
    let filterTodos = this.getTodos(todos, filter);
    dispatch(filterTodos);
  }

  getTodos(todos, filter){
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

}

export default new TodoStore();
