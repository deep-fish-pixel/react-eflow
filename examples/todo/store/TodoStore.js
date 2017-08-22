import {Store} from '../../../src/eflow';

class TodoStore extends Store{
  constructor(options){
    super(options);
    this.count = 0;
    this.initState({
      todos: []
    });
  }

  addTodo(text){
    var dispatch = this.addTodo.dispatch;

    dispatch({request: true});
    var self = this;
    setTimeout(function () {
      dispatch({request: false});
      self.todos({
        text: text,
        id: ++ self.count
      });
    }, 1000);
  }

  todos(todo){
    let dispatch = this.todos.dispatch,
        todos = this.todos.data();

    todos.push(todo);
    dispatch(todos);
  }

  editTodo(_todo){
    let todos = this.todos.data();

    todos.some(function(todo){
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

    todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    });
    dispatch(todos);
  }

  toggleTodos(){
    let dispatch = this.todos.dispatch,
      todos = this.todos.data();

    todos = todos.map(function(todo){
      return {...todo, completed: !todo.completed};
    });
    dispatch(todos);
  }

  deleteTodo(id){
    let dispatch = this.todos.dispatch,
      todos = this.todos.data();

    todos = todos.filter(function(todo){
      return todo.id !== id;
    });
    dispatch(todos);
  }

}

export default new TodoStore();