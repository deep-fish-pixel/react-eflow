/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import todoStore from '../store/TodoStore';

class TodoHeader extends Component {
  constructor(props){
    super(props);
    this.enterDown = this.enterDown.bind(this);
    this.change = this.change.bind(this);
    this.simulateEnterDown = this.simulateEnterDown.bind(this);
    this.state = {value: ''};
  }

  enterDown(event){
    let value = this.state.value;
    if(event.keyCode === 13 && value){
      todoStore.addTodo(value);
      this.setState({
        value: ''
      });
      todoStore.operateTodos();
    }
  }

  simulateEnterDown(value){
    if(value){
      todoStore.addTodo(value);
      this.setState({
        value: ''
      });
    }
  }
  change(event){
    this.setState({
      value: event.target.value
    });
  }

  render(){
    let request = this.props.addTodo;
    return (
      <div>
        <input
          value={this.state.value}
          onKeyDown={this.enterDown}
          onChange={this.change}
        />
      </div>
    );
  }
}

export default TodoHeader;

