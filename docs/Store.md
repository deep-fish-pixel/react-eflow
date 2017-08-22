##Store
 
#### 继承Store来处理具体业务 

```
class TodoStore extends Store
```

#### Store内部会自动初始化方法对应的值，值为无属性的对象。但如果该值类型为数组或其他基本类型或该值不符合要求，需在constructor中使用initState方法进行初始化

```
this.initState({
      todos: []
    });
``` 
#### 实例化Store，同一类型的Store需要多次实例化。第一个实例化推荐使用无id配置，第二个实例化，需要提供不同的id配置。


```
new TodoStore()
new TodoStore({id: 'xxx'})
```

#### 只能通过this.method.data()获取相关数据, 参数类型是store对应的方法，尽量不要使用store.state或store.getState()获取数据

```
todos = this.todos.data();
```

#### 需要保存数据并把该变化通知给相关组件，使用该方法的dispatch进行发布

```
this.todos.dispatch(todos);
```

#### 需要保存数据但不需要发布出去时，使用this.method.data保存,此方法必须传参,否则当成数据获取。

```
this.todos.data(todos)
```

#### 在Store中一个方法可调用另一个方法，但数据更新通知发出最终看哪些方法调用了dispatch

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
#### 注意数组的某个数据或对象的某个属性对象更新（嵌套对象），应新建该条数据并替换，在原对象中修改不会有数据更新


```
todos.some(function(todo, index){
      if(id == todo.id){
        //注意替换新值
        todos[index] = {...todo, completed: !todo.completed};
        return true;
      }
    })
```

#### 可以对Store进行拆分，如果不同Store方法有关联处理，需要同步更新操作。需要constructor中进行flowFrom绑定，注意数据的上下游顺序

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



