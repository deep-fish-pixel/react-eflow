/**
 * Created by mawei on 17/8/11.
 */
import React, {Component} from 'react'
import {wrapComponent} from '../../../src/eflow'
import someStore from '../store/SomeStore'

@wrapComponent([someStore.doSomeThing])
class SomeComponent extends Component {
  constructor(props){
    super(props);
    //调用someStore.doSomeThing
    let doSomeThing = someStore.doSomeThing();
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

export default SomeComponent;