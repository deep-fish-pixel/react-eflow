
#### Store
 
1. initState(inits) 

    初始化state数据 inits为对象类型配置

    ```
    this.initState({
          todos: []
        });
    ``` 

2. getState() 

    获取当前store的state全数据,主要用于查看state状态

3. dispatch(method?, value)
    
    发布方法对应的数据更新,method参数类型为方法。
    内部会对value进行合并前后值比较,判断是否需要发布操作
    
    ```
    this.dispatch({
       todos: []
    });
        
    this.dispatch(this.todos, {
      todos: []
    });
        
    ``` 
4. contextDispatch(value)
    
    作用等同于dispatch, 只能对本方法数据发布,不能通过装饰更改
    
5. bindDispatch(method)
    
    获取指定方法的dispatch,快捷写法
    
6. data(method?, value)
   method参数可选，无method参数，默认 获取/设置 当前方法的数据
   只有1个参数时, 获取该方法对应的store值。注意getState为store的全值
   有2个参数时,设置该方法对应的store值。注意此方法只设置值,不进行发布操作。
   同时有多个操作时, 此方法进行批量操作,注意最后要dispatch触发数据发布。

    ```
    this.data({
      todos: []
    });
        
    this.data(this.todos, {
      todos: []
    });
    
    ...
    this.dispatch();
    或
    this.todos.dispatch();        
    ``` 
7. contextData(value)
     
     作用等同于data, 只能对本方法数据更新获取,不能通过装饰更改
     
6. pub(method)
    
   强制发布方法对应的数据, 推荐使用dispatch发布数据
   
7. destory()
       
   销毁处理
  
    
#### store.method

1. store.method.dispatch(value)
    
    推荐使用dispatch装饰代替该功能。
    发布该方法对应的值,等同于 store.dispatch(store.method, value)
    
2. store.method.data(value)
   推荐使用data装饰代替该功能。
   无参数时,获取该方法的值
   有参数时,设置该方法的值
   等同于 store.data(store.data, value)
  
3. store.method.flowFrom(source)
   
   推荐使用flowFrom装饰代替该功能。
   指定该方法跟随source方法同步更新
   不同方法之间的更新绑定,
   既可以同一store之间方法绑定,也可不同的store方法绑定
   
#### wrapComponent

1. wrapComponent(_Component, updaters, customPropsMapping)
    
   推荐使用wrapComponent装饰代替该功能。
   包装用户自定义组件, updaters主要用于把Store更新数据自动通知Component的props中。
   
   通过 updaters的propsKey进行数据的绑定的名称修改。
   
    ```
    export default wrapComponent(TodoList, [{
      //此时todoFilterStore.filterTodos对应的state值在组件TodoList的props中对应名称即为todos
      propsKey: 'todos',
      updater: todoFilterStore.filterTodos
    }]);
        
    ``` 
    
    
    通过customPropsMapping方法,可对数据进行简单处理后,通过返回值绑定到Component的props中。
  
    ```
    export default wrapComponent(Link, [filterStore.filter], function (state, oldProps) {
      return {
        //此时返回值值在组件Link的props中对应名称即为active和onClick
        active: state.filter === oldProps.filter,
        onClick: function () {
          filterStore.filter(oldProps.filter);
        }
      }
    });
        
    ``` 
      

