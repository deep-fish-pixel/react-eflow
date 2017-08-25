import React from 'react';
import filterStore from '../store/FilterStore';
import {wrapComponent} from '../../../src/eflow';

const Link = ({ active, children, onClick}) => {
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
    active: state.filter === oldProps.filter,
    onClick: function () {
      filterStore.filter(oldProps.filter);
    }
  }
});
