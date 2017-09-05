## Store使用装饰注入相关参数
 
#### 1. 直接注入该方法的dispatch, 使用装饰器dispatch

```
  import {dispatch} from 'eflow';

  @dispatch
  addTodo(dispatch, text){
    dispatch({request: true});
  }
```

#### 2. 获取该方法对应的data值, 使用装饰器data

```
  @data
  todos(data, todo){
    data.push(todo);
  }
``` 

#### 3. 同时获取该方法的dispatch和data, 需要使用param装饰器

```
  @param(param.dispatch, param.data)
  todos(dispatch, data, todo){
    data.push(todo);
    dispatch(data);
  }
```

#### 4. 使用param装饰器指定 方法名称.dispatch, 实现在一个方法中, 获取另外一个方法的dispatch,

```
  @param('todos.dispatch', 'todos.data')
  toggleTodo(dispatch, todos, id)
```

#### 5. param装饰器可以实现一个方法中,既包含本方法的dispatch, 又包含其他方法的dispatch或数据

```
  @param('dispatch', 'filter.data', 'todos.data')
  filterTodos(dispatch, filter, todos)
```
