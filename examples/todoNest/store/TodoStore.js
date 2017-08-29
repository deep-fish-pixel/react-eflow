import {Store} from '../../../src/eflow';

class TodoStore extends Store{
  constructor(options){
    super(options);
    this.count = 0;
    this.initState({
      todos: {
        list: []
      }
    });
  }

  addTodo(text){
    var dispatch = this.addTodo.dispatch;

    dispatch({request: true});
    var self = this;
    dispatch({request: false});
    self.todos({
      text: text,
      id: ++ self.count
    });
  }

  todos(todo){
    let dispatch = this.todos.dispatch,
        todos = this.todos.data();

    todos.list.push(todo);
    dispatch(todos);
  }

  operateTodos(prevDispatchCallback, dispatchCallback){
    let dispatch = this.todos.dispatch,
      data = this.todos.data,
      todos = this.todos.data(),
      length = todos.list.length;
    this.addTodo.data({request: true});
    this.addTodo.data({request: false});
    this.addTodo.data({request: true});
    for(var i = 0; i < length; i++){
      if(i < length / 2){
        todos.list[i] = {...todos[i], completed: !todos[i].completed};
        data(todos);
      }
      else{
        todos.list.pop();
        data(todos);
      }
    }
    prevDispatchCallback && prevDispatchCallback.call(this, this.updateQueue, todos);
    dispatch(todos);
    dispatchCallback && dispatchCallback.call(this, this.updateQueue, todos);
  }

  editTodo(_todo){
    let todos = this.todos.data();

    todos.list.some(function(todo){
      if(_todo.id == todo.id){
        todo.text = _todo.text;
        return true;
      }
    });
    this.todos.dispatch(todos);
  }

  toggleTodo(id){
    let dispatch = this.todos.dispatch,
      todos = this.todos.data();

    todos.list.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos.list[index] = {...todo, completed: !todo.completed};
        return true;
      }
    });
    dispatch(todos);
  }

  toggleTodos(){
    let dispatch = this.todos.dispatch,
      todos = this.todos.data();

    todos.list = todos.list.map(function(todo){
      return {...todo, completed: !todo.completed};
    });
    dispatch(todos);
  }

  deleteTodo(id){
    let dispatch = this.todos.dispatch,
      todos = this.todos.data();

    todos.list = todos.list.filter(function(todo){
      return todo.id !== id;
    });
    dispatch(todos);
  }

}

export default new TodoStore();