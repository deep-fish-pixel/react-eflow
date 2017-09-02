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
    console.log('TodoList render');
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
  //此时todoFilterStore.filterTodos对应的state值在组件TodoList的props中对应名称即为todos
  propsKey: 'todos',
  updater: todoFilterStore.filterTodos
}]);*/