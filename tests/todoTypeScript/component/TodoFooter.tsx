/**
 * Created by mawei on 17/8/11.
 */
import * as React from "react";
import Link from './Link';
import {wrapComponent} from '../../../src/eflow';
import todoStore from '../store/TodoStore';

function customPropsMapping(state: {filterTodos: {}[]}, oldProps: {}) {
  return {
    itemLength: state.filterTodos.length
  }
}
interface P{
    itemLength?: number
}

@wrapComponent([todoStore.filterTodos], customPropsMapping)
class TodoFooter extends React.Component<P> {
  constructor(props: object){
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
            Active
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

export default TodoFooter;