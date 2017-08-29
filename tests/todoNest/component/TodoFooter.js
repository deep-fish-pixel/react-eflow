/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react';
import Link from './Link';
class TodoFooter extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
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

export default TodoFooter;