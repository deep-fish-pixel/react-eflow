##wrapComponent
 
#### 组件只调用store的接口，不需要wrapComponent

```
import someStore from '../store/SomeStore'
class SomeComponent extends Component{
...
someMethod(){
    someStore.doSomething({id:1}});
}
...
```

#### 但当组件需要store提供数据更新时，需要wrapComponent，并提供相关方法获取数据

```
import someStore from '../store/SomeStore'
class SomeComponent extends Component{
...
render(){
    return (<div>{this.props.doSomething}</div>)
}
...
export default wrapComponent(SomeComponent, [someStore.doSomething]);
``` 
#### 需要对数据绑定属性名称进行修改，配置propsKey

```
import someStore from '../store/SomeStore'
class SomeComponent extends Component{
...
render(){
    return (<div>{this.props.doSomething2}</div>)
}
...
export default wrapComponent(SomeComponent, [{
 propsKey: 'doSomething2',
  updater: someStore.doSomething
}])
```

#### 需要对映射的数据进行扩展处理，还可提供wrapComponent的第三参数，该类型为方法，wrapComponent通过该方法的返回值进行组件的props绑定

```
import someStore from '../store/SomeStore'
class SomeComponent extends Component{
...
render(){
    return (
       <div 
         onClick={e => {
           this.props.onClick()
         }}
       >
         {this.props.isActive}
       </div>
     )
}
...
export default wrapComponent(SomeComponent, [someStore.doSomething], function (state, oldProps) {
//state为所有Store提供的数据合集
//oldProps为当前组件的属性
  return {
    isActive: state.doSomething?'active':'deactive',
    onClick: function () {
      someStore.doSomething(!state.doSomething);
    }
  }
});
```

#### wrapComponent组件后,通过 innerRef获取内部组件,使用方式与ref相同

```
<SomeComponent ref={function(wrap) {
    console.log(wrap);
  }} innerRef={function(inner) {
    console.log(inner);
  }}/>
```


