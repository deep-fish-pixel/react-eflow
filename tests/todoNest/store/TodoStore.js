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
    this.todos({
      text: text,
      id: ++ this.count
    });
    return {request: true};
  }

  todos(todo){
    let todos = this.todos.data();
    todos.list.push(todo);
    return (todos);
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