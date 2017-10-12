/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import todoStore from '../store/TodoStore';

class TodoIndex extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <TodoHeader/>
        <TodoList/>
        <TodoFooter ref={function(wrap) {
	        console.log(wrap);
	        todoStore.setRef(true);
        }} innerRef={function(inner) {
	        console.log(inner);
	        todoStore.setInnerRef(true);
        }}/>
      </div>
    )
  }
}



export default TodoIndex;