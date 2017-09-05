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
    this.todos({
      text: text,
      id: ++ this.count
    });
    dispatch({request: false});
  }

  @param('dispatch', 'data')
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

  operateTodos(prevDispatchCallback, dispatchCallback){
    let dispatch = this.todos.dispatch,
      data = this.todos.data,
      todos = this.todos.data(),
      length = todos.length;
    this.addTodo.data({request: true});
    this.addTodo.data({request: false});
    this.addTodo.data({request: true});
    for(var i = 0; i < length; i++){
      if(i < length / 2){
        todos[i] = {...todos[i], completed: !todos[i].completed};
        data(todos);
      }
      else{
        todos.pop();
        data(todos);
      }
    }
    prevDispatchCallback && prevDispatchCallback.call(this, this.updateQueue, todos);
    dispatch(todos);
    dispatchCallback && dispatchCallback.call(this, this.updateQueue, todos);
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
