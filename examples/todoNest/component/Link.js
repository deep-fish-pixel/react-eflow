import React from 'react';
import filterStore from '../store/FilterStore';
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

export default wrapComponent(Link, [filterStore.filter], function (state, oldProps) {
  return {
    //此时返回值值在组件Link的props中对应名称即为active和onClick
    active: state.filter === oldProps.filter,
    onClick: function () {
      filterStore.filter(oldProps.filter);
    }
  }
});
