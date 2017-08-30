/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {wrapComponent} from '../../../src/eflow';
import todoFilterStore, {todoFilterStoreTest} from '../store/TodoFilterStore';
import TodoItem from './TodoItem';
import shallowequal from 'shallowequal';
import {isNumber} from '../../../src/types';

class TodoList extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }

  render(){
    let todos = this.props.todos,
      todos2 = this.props.todos2,
      itemLength = this.props.itemLength,
      itemLength2 = this.props.itemLength2;
    let todoViews = todos && todos.map(function (todo) {
      return (
        <TodoItem key={todo.id} todo={todo}/>
      );
    });
    return (
      <ul>
        {todos && todos2 && shallowequal(todos2, todos)
          && isNumber(itemLength) && isNumber(itemLength2)
          && itemLength === itemLength2
          ? todoViews : 'customPropsMapping|Updaters|TodoFilterStoreTest error'
        }
      </ul>
    );
  }
}

//export default wrapComponent(TodoList, [todoFilterStore.filterTodos]);

export default wrapComponent(TodoList, [{
  //此时todoFilterStore.filterTodos对应的state值在组件TodoList的props中对应名称即为todos
  propsKey: 'todos',
  updater: todoFilterStore.filterTodos
},{
  propsKey: 'todos2',
  updater: todoFilterStoreTest.filterTodos
}], function (state, oldProps) {
  return {
    itemLength: state.todos && state.todos.length,
    itemLength2: state.todos2 && state.todos2.length
  }
});