/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {wrapComponent} from '../../../src/eflow';
import todoStore from '../store/TodoStore';
import TodoItem from './TodoItem';

@wrapComponent([todoStore.filterTodos])
class TodoList extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }

  render(){
    let filterTodos = this.props.aliasFilterTodos;
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

export default TodoList;