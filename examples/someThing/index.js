import React from 'react'
import { render } from 'react-dom'
import SomeComponent from './component/SomeComponent'


render((
  <SomeComponent ref={function(wrap) {
    console.log(wrap);
  }} innerRef={function(inner) {
    console.log(inner);
  }}/>
), document.getElementById('app'))
