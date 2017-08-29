/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react';
import Link from './Link';
import {wrapComponent} from '../../../src/eflow';
import todoFilterStore from '../store/TodoFilterStore';

class TodoFooter extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let itemLength = this.props.itemLength;
    return (
      <div>
        <span style={{marginRight: 10}}
              data-length={itemLength}>
          {itemLength > 1 ? itemLength + ' items' : itemLength + ' item'}
        </span>
        Show:
        <Link
          filter="All">
          All
        </Link>,
        <Link
          filter="Active">
          Active
        </Link>,
        <Link
          filter="Completed">
          Complete
        </Link>
      </div>
    );
  }
}


export default wrapComponent(TodoFooter, [{
  //此时todoFilterStore.filterTodos对应的state值在组件TodoList的props中对应名称即为todos
  propsKey: 'todos',
  updater: todoFilterStore.filterTodos
}], function (state, oldProps) {
  return {
    itemLength: state.todos.length
  }
});