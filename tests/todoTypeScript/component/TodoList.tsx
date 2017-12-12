/**
 * Created by mawei on 17/8/11.
 */
import * as React from "react";
import {wrapComponent} from '../../../src/eflow';
import todoStore from '../store/TodoStore';
import TodoItem from './TodoItem';

interface Props {
  filterTodos?: object[];
}

@wrapComponent([todoStore.filterTodos], function aaa() {
    return {}
})
class TodoList extends React.Component<Props, object> {
  constructor(props: { filterTodos: null | object[] }){
    super(props);
  }
  componentWillMount(){
  }

  render(){
    let filterTodos = this.props.filterTodos;
    let todoViews = filterTodos && filterTodos.map(function (todo: {completed: boolean, id: number, text: string}) {
      return (
        <TodoItem todo={todo} key={todo.id}/>
      );
    });
    return (
      <ul>
        {todoViews}
      </ul>
    );
  }
}

//export default wrapComponent(TodoList, [todoStore.filterTodos]);
export default TodoList;