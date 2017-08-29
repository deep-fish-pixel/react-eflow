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
    let todos = this.props.todos;
    let todoViews = todos && todos.map(function (todo) {
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

//export default wrapComponent(TodoList, [todoFilterStore.filterTodos]);

export default wrapComponent(TodoList, [{
  //此时todoFilterStore.filterTodos对应的state值在组件TodoList的props中对应名称即为todos
  propsKey: 'todos',
  updater: todoFilterStore.filterTodos
}], function (state, oldProps) {
  return {
    itemLength: state.todos.length
  }
});