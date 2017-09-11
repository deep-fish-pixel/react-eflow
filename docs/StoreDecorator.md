## Store使用装饰器注入相关参数
 
#### 1. 使用装饰器dispatch, 默认注入该方法的dispatch

```
  import {dispatch, data, param} from 'eflow';

  @dispatch
  addTodo(dispatch, text){
    dispatch({request: true});
  }
```

#### 2. 使用装饰器data来获取该方法对应的data值

```
  @data
  todos(data, todo){
    data.push(todo);
  }
``` 

#### 3. 使用param装饰器同时获取该方法的dispatch和data

```
  @param(param.dispatch, param.data)
  todos(dispatch, data, todo){
    data.push(todo);
    dispatch(data);
  }
```

#### 4. 使用param装饰器可以指定获取某个方法的setData,格式: 方法名称.setData

```
  @param('todos.setData', 'todos.data')
  toggleTodo(setData, todos, id)
```

#### 5. 使用param装饰器可以指定获取某个方法的dispatch,格式: 方法名称.dispatch

```
  @param('todos.dispatch', 'todos.data')
  toggleTodo(dispatch, todos, id)
```

#### 6. param装饰器实现 既包含本方法的dispatch, 又包含其他方法的dispatch或数据等

```
  @param(param.dispatch, 'todos.data', 'filter.data')
  filterTodos(dispatch, todos, filter){
    let filterTodos = this.getTodos(todos, filter);
    dispatch(filterTodos);
  }
```

#### 7. 可通过dispatch.return装饰器对结果进行指定方法的dispatch发布

```
  @param('todos.data')
  @dispatch.return('todos')
  toggleTodo(todos, id){
    ...
    return todos;
  }
```

#### 8. 通过stateKey,很方便配置方法映射到state的key值

```
  @dispatch
  @stateKey('filterName')
  setFilter(dispatch, filter){
    dispatch(filter);
  }
```
