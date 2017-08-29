## Store
 
#### 1. 继承Store来处理具体业务 

```
class TodoStore extends Store
```

#### 2. Store内部会自动初始化方法对应的值，值为无属性的对象。但如果该值类型为数组或其他基本类型或该值不符合要求，需在constructor中使用initState方法进行初始化

```
this.initState({
      todos: []
    });
``` 

#### 3. 实例化Store，同一类型的Store需要多次实例化。第一个实例化推荐使用无id配置，第二个实例化，需要提供不同的id配置。


```
new TodoStore()
new TodoStore({id: 'xxx'})
```

#### 4. 通过this.method.data()获取相关数据, 参数类型是store对应的方法，尽量不要使用store.state或store.getState()获取数据

```
todos = this.todos.data();
```

#### 5. 需要保存数据并把该变化通知给相关组件，使用该方法的dispatch进行发布

```
this.todos.dispatch(todos);
```

#### 6. 需要保存数据但不需要发布出去时，使用this.method.data保存,此方法必须传参,否则当成数据获取。

```
this.todos.data(todos)
```

#### 7. 在Store中一个方法可调用另一个方法，但数据更新通知发出最终看哪些方法调用了dispatch

```
editTodo(_todo){
    let todos = this.todos.data();

    todos.some(function(todo){
      if(_todo.id == todo.id){
        todo.text = _todo.text;
        return true;
      }
    });
    //在editTodo内部，只有todos.dispatch调用，因此更新器应该设置为store.todos,而非store.editTodo
    this.todos.dispatch(todos);
  }
```

#### 8. 注意数组的元素或对象的属性是对象（嵌套对象）,且属性值发生改变,需替换该对象。在原对象中修改不会有数据更新

```
todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    })
```

#### 9. 对于未初始化的数据,默认会获取一个DefaultObject实例,使用dispatch后该对象可被扩展,也可覆盖成其他任意类型.

```
let someobj = this.some.data();//someobj类型为DefaultObject
this.some.data('some'); 
someobj = this.some.data();//someobj类型为字符串
this.some.data(1); 
someobj = this.some.data();//someobj类型为数字
this.some.data(false); 
someobj = this.some.data();//someobj类型为布尔
this.some.data({}); 
someobj = this.some.data();//someobj类型为对象
```

#### 10. this.method.dispatch可直接保存数据类型: 基本数据类型,字符串,对象,数组,其他类型.
对于已覆盖或初始化后的数据类型, dipatch不同数据类型，规则如下:

| 当前数据类型 | 未初始化的数据类型 | 可扩展 | 可覆盖 | 数据类型可变化 |
| :-: | :-: | :-: | :-: | :-: |
| 对象 | DefaultObject | 是 | 否 | 否 |
| 数组 | DefaultObject | 否 | 是，只能被数组类型覆盖 | 否 |
| 字符串 | DefaultObject | 否 | 是 | 是 |
| 数字 | DefaultObject | 否 | 是 | 是 |
| 布尔 | DefaultObject | 否 | 是 | 是 |
| 其他类型 | DefaultObject | 否 | 是 | 是 |

#### 11. 保存业务数据, 推荐使用动作数据方法跟存储数据方法分离.动作方法调用存储方法完成数据更新.

```
addTodo(todo){
    ...
    this.todos(todo);
}
editTodo(id){
    ...
    this.todos(todos);
}
deleteTodo(id){
    ...
    this.todos(todos);
}
todos(todo){
    let dispatch = this.todos.dispatch,
        todos = this.todos.data();

    todos.push(todo);
    dispatch(todos);
}
```

#### 12. 保存复杂的嵌套数据时,需要把数据扁平化处理.嵌套对象等于或超多2层时,检测不到该数据变化.

```
错误的写法:
let notice = {
   notice: {list: [{}, {}]}
};
this.notice.dispatch({
    notice
});
正确的写法:
this.notice.dispatch({
    list: [notice.list]
});
```


#### 13. 可以对Store进行拆分，如果不同Store方法有关联处理，需要同步更新操作。需要constructor中进行flowFrom绑定，注意数据的上下游顺序

```
class TodoFilterStore extends Store{
  constructor(options){
    super(options);
    this.initState({
      filterTodos: []
    });
  //filterTodos数据依赖todoStore.todos
  this.filterTodos.flowFrom(todoStore.todos);
   // filterTodos数据依赖filterStore.filter
   this.filterTodos.flowFrom(filterStore.filter);
  }
}
```
