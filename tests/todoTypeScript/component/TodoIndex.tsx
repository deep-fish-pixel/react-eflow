/**
 * Created by mawei on 17/8/11.
 */
import * as React from "react";
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

class TodoIndex extends React.Component {
  constructor(props: object){
    super(props);
  }

  render(){
    return (
        <div>
          <TodoHeader/>
          <TodoList/>
          <TodoFooter/>
        </div>
    )
  }
}



export default TodoIndex;