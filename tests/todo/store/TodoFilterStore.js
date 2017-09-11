import {Store, flowFrom} from '../../../src/eflow';
import todoStore from './TodoStore'
import filterStore from './FilterStore'

class TodoFilterStore extends Store{
  constructor(options){
    super(options);
    this.initState({
      filterTodos: []
    });
  }

  @flowFrom(todoStore.todos, filterStore.filter)
  filterTodos(){
    let dispatch = this.filterTodos.dispatch,
      todos = todoStore.data(todoStore.todos),
      filter = filterStore.data(filterStore.filter);

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

let todoFilterStoreTest = new TodoFilterStore({id: 'todoFilterStore2'});
export {
  todoFilterStoreTest
};
export default new TodoFilterStore();