import React from 'react';
import todoStore from '../store/TodoStore';
import {wrapComponent} from '../../../src/eflow';

const Link = ({ active, children, onClick}) => {
  console.log('Link render');
  if (active) {
    return <span>{children}</span>
  }

  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

function customPropsMapping(state, oldProps) {
  return {
    //此时返回值值在组件Link的props中对应名称即为active和onClick
    active: state.filterName === oldProps.filterName,
    onClick: function () {
      todoStore.setFilter(oldProps.filterName);
    }
  }
}


export default wrapComponent(Link, [todoStore.setFilter], customPropsMapping);
