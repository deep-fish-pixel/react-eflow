/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {wrapComponent} from '../../../src/eflow';
import todoFilterStore from '../store/TodoFilterStore';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }

  render(){
    let filterTodos = this.props.filterTodos;
    let todoViews = filterTodos && filterTodos.map(function (todo) {
      return (
        <TodoItem key={todo.id} todo={todo}/>
      );
    });
    return (
      <ul>
        {todoViews}
      </ul>
    );
  }
}

export default wrapComponent(TodoList, [todoFilterStore.filterTodos]);

/*export default wrapComponent(TodoList, [todoStore.todos, {
 propsKey: 'todos2',
  updater: todoStore.todos
}]);*/