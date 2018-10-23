# react-eflow
##### eflow 通过使用默认配置策略来管理数据流，所以使用起来高效简单。

1. 使用Store管理所有数据，通过Store的方法调用，Store内部既可以dispatch又能reduce。Store的方法有2个作用，既可以用于处理相关业务数据，又可通过该方法的dispatch发布数据，数据存在Store中(state)，属性名称与该方法同名，起到reduce功能。
2. 通过wrapComponent包装用户组件 `wrapComponent(SomeComponent, [xxxStore.doSomething])`
在SomeComponent的props.doSomething中则自动绑定xxxStore在doSomething方法中dispatch的参数合集数据
![](./assets/eflow.jpeg)

### 安装

```
npm install --save react-eflow 
```

### 使用介绍

##### 1. 新建Store子类，并实例化

```
import {Store} from 'react-eflow'
class SomeStore extends Store{
  constructor(options){
    super(options);
  }
  
  @stateKey('someThing')//对doSomeThing默认存储key值doSomeThing转换成someThing
  @dispatch
  doSomeThing(dispatch) {
      //获取该方法的dispatch
      //发布相关数据，发布后在该对象内部state的doSomeThing属性包含发布值
      setTimeout(()=>{
        dispatch({request: true});
      }, 1000);
  }
//实例化
export default new SomeStore();
```

##### 2. 调用Store并同步Store数据到组件

```
import {wrapComponent} from 'react-eflow'
import someStore from '../store/SomeStore'

@wrapComponent([someStore.doSomeThing])
class SomeComponent extends Component {
  constructor(props){
    super(props);
    //调用someStore.doSomeThing
    someStore.doSomeThing();
    //调用完成后，someStore内部state值： {someThing:{request: true}}
  }
  render(){
    {/*在this.props.someThing中则会有{request: true} 对象*/}
    let request = this.props.someThing.request;
    return (
      <div>
        request: {request ? 'true' : 'false'}
      </div>
    );
  }
}
```
### 其他文档
#### [Api介绍](./docs/Api.md)
#### [Store使用介绍](./docs/Store.md)
#### [wrapComponent使用介绍](./docs/wrapComponent.md)
#### [Store装饰使用说明](./docs/StoreDecorator.md)
#### [wrapComponent装饰使用说明](./docs/wrapComponentDecorator.md)





