/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {wrapComponent} from '../../../src/eflow';
import todoStore from '../store/TodoStore';

@wrapComponent([todoStore.addTodo])
class TodoHeader extends Component {
  constructor(props){
    super(props);

    this.enterDown = this.enterDown.bind(this);
    this.change = this.change.bind(this);
    this.state = {value: ''};
  }

  simulateEnterDown(value){
    if(value){
      todoStore.addTodo(value);
      this.setState({
        value: ''
      });
    }
  }

  enterDown(event){
    let value = this.state.value;
    if(event.keyCode === 13 && value){
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
    let request = this.props.addTodo.request;
    return (
      <div>
        <input
          value={this.state.value}
          onKeyDown={this.enterDown}
          onChange={this.change}
        />

        {request + ''}
      </div>
    );
  }
}

export default TodoHeader;

