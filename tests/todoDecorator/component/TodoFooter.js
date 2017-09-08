/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react';
import Link from './Link';
import {wrapComponent} from '../../../src/eflow';
import todoStore from '../store/TodoStore';

function customPropsMapping(state, oldProps) {
  return {
    itemLength: state.aliasFilterTodos.length
  }
}

@wrapComponent([todoStore.filterTodos], customPropsMapping)
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
        Show:&nbsp;
        <Link
          filterName="All">
          All
        </Link>,&nbsp;
        <Link
          filterName="Active">
          Active
        </Link>,&nbsp;
        <Link
          filterName="Completed">
          Complete
        </Link>
      </div>
    );
  }
}

export default TodoFooter;