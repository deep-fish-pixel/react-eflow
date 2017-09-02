/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import todoStore from '../store/TodoStore';

class TodoItem extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let props = this.props,
      todo = props.todo,
      completed = todo.completed;
    return (
      <li>
        <span
          style={{'textDecoration': completed ? 'line-through' : 'none'}}
          onClick={()=>{
          todoStore.toggleTodo(todo.id);
        }}>
          {todo && todo.text}
        </span>
        <span style={{marginLeft: 10}} onClick={()=>{
          todoStore.deleteTodo(todo.id);
        }}>
          delete
        </span>
      </li>
    );
  }
}



export default TodoItem;