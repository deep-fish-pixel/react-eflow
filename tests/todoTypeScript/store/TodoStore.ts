import {Store, dispatch, data, param, setData, flowFrom, stateKey, Method} from '../../../src/eflow';

interface Props {
}
interface Todo{
  id: number,
  text: string,
  completed: boolean,
}


class TodoStore extends Store<Props>{
  count: number;
  testTodosDone: boolean;

  constructor(options?: Props){
    super(options);
    this.count = 0;
    this.initState({
      todos: [],
      filterTodos: [],
      filter: 'All'
    });
  }

  addTodo(text: string){
    let dispatch = this.dispatch;
    this.dispatch({request: true});
    dispatch({request: false});
    this.todos({
      text: text,
      id: ++ this.count,
      completed: false
    });


  }

  todos(todo: Todo){
    let todos = this.data()
    todos.push(todo);
    this.dispatch(todos);
  }

  editTodo(_todo: Todo){
    let todos: Todo[] = this.data();
    todos.some(function(todo){
      if(_todo.id == todo.id){
        todo.text = _todo.text;
        return true;
      }
    });
    this.dispatch(todos);
  }

  @data('todos')
  @dispatch('todos')
  toggleTodo(id: number){
    let todos: Todo[] = this.data();
    todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    });
    this.dispatch(todos);
  }

  //@data('todos')
  //@dispatch('todos')
  deleteTodo(id: number){
    let todos: Todo[] = this.data(this.todos);
    todos = todos.filter(function(todo){
      return todo.id !== id;
    });
    let dispatch = this.dispatch(this.todos);
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

  filter(filter: string){
    this.dispatch(filter);
  }

  @data('todos')
  @param('todos.data')
  @dispatch
  @flowFrom('filter', 'todos')
  filterTodos(dispatch: Function, _todos: Todo[]){
    let todos: Todo[] = this.data();
    let filter: string = this.data(this.filter);
    let filterTodos = this.getTodos(todos, filter);
    this.dispatch(filterTodos);
  }

  @data('todos')
  @flowFrom('filter', 'todos')
  testTodos(_todos: Todo[]){
    this.testTodosDone = true;
    let todos: Todo[] = this.data();
    let filter: string = this.data(this.filter);
    let filterTodos = this.getTodos(todos, filter);
    this.dispatch(filterTodos);
  }

  getTodos(todos: Todo[], filter: string){
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

  @dispatch('todos')
  operateTodos(prevDispatchCallback: Function, dispatchCallback: Function){
    let dispatch = this.dispatch(this.todos),
      data = this.data,
      todos: Todo[] = this.data(this.todos),
      length = todos.length;
    this.data(this.addTodo, {request: true});
    this.data(this.addTodo, {request: false});
    this.data(this.addTodo, {request: true});
    for(var i = 0; i < length; i++){
      if(i < length / 2){
        todos[i] = {...todos[i], completed: !todos[i].completed};
        data(this.todos, todos);
      }
      else{
        todos.pop();
        data(this.todos, todos);
      }
    }
    prevDispatchCallback && prevDispatchCallback.call(this, this.updateQueue, todos);
    this.dispatch(todos);
    dispatchCallback && dispatchCallback.call(this, this.updateQueue, todos);
  }

  @dispatch('todos')
  testDispatchUsedParam(){
    this.dispatch([{
      text: 'testDispatchUsedParam',
      id: ++ this.count
    }]);
  }

  testObject(){
    let dispatch = this.dispatch;
    dispatch({});
  }


}

let todoStore1 = new TodoStore();

let todoStore2 = new TodoStore();

let todoStore3 = new TodoStore();


let todoStore4 = new TodoStore();
todoStore4.testDispatchUsedParam();
todoStore4.testObject();
todoStore4.getState()

export {
  todoStore1,
  todoStore2,
  todoStore3,
  todoStore4
}


export default new TodoStore();
