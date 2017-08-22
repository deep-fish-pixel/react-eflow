/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {wrapComponent} from '../../../src/eflow'
import someStore from '../store/SomeStore'

class SomeComponent extends Component {
  constructor(props){
    super(props);
    //调用someStore.doSomeThing
    someStore.doSomeThing();
    //调用完成后，someStore内部state值： {doSomeThing:{request: true}}
  }
  render(){
    {/*在this.props.doSomeThing中则会有{request: true} 对象*/}
    let request = this.props.doSomeThing.request;
    return (
      <div>
        request: {request ? 'true' : 'false'}
      </div>
    );
  }
}

//需要先包装SomeComponent组件，再绑定someStore.doSomeThing方法，
//使someStore.doSomeThing.dispatch触发后自动更新数据到SomeHeader组件的props.doSomeThing属性上
//在render内部通过props即可获取request值
export default wrapComponent(SomeComponent, [someStore.doSomeThing]);