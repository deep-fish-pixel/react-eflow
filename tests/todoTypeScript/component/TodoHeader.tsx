/**
 * Created by mawei on 17/8/11.
 */
import * as React from "react";
import todoStore from '../store/TodoStore';
interface P{
  addTodo?: string
}
class TodoHeader extends React.Component<P> {
  state: {
    value: string
  }
  constructor(props: object){
    super(props);

    this.enterDown = this.enterDown.bind(this);
    this.change = this.change.bind(this);
    this.state = {
      value: ''
    };
  }

  simulateEnterDown(value: string){
    if(value){
      todoStore.addTodo(value);
      this.setState({
        value: ''
      });
    }
  }

  enterDown(event: {keyCode: number}){
    let value = this.state.value;
    if(event.keyCode === 13 && value){
      todoStore.addTodo(value);
      this.setState({
        value: ''
      });
    }
  }
  change(event: {target: {value: string}}){
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

