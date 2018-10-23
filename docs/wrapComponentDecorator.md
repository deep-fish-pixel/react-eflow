## wrapComponent使用装饰器包装组件

wrapComponent既可以直接包装组件,也可以作为装饰器使用, 注意装饰器只能包装class组件, 不能包装纯组件。
 
#### 1. 使用wrapComponent装饰器添加updater

```
  import {wrapComponent} from 'react-eflow';
  
  @wrapComponent([todoStore.filterTodos])
  class TodoList extends Component {
    ...
  }
  
  export default TodoList;
```

#### 2. 使用wrapComponent装饰器添加customPropsMapping

```
  import {wrapComponent} from 'react-eflow';
    
    function customPropsMapping(state, oldProps) {
      return {
        active: true
      }
    }
    @wrapComponent([todoStore.filterTodos], customPropsMapping)
    class TodoList extends Component {
      ...
    }
    
    export default TodoList;
``` 

