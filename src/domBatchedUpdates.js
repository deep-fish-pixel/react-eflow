/**
 * author: mawei
 */
export default function (Store) {
  /*let unstable_batchedUpdates = require('react-dom').unstable_batchedUpdates;
  let ReactBatchingStrategy;
  var react = require('react');
  if(react.version > '0.14.7'){
    ReactBatchingStrategy = require('react-dom/lib/ReactDefaultBatchingStrategy');
  }else{
    ReactBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');
  }

  let dispatch = Store.prototype.dispatch;
  Store.prototype.dispatch = function () {
    if(ReactBatchingStrategy.isBatchingUpdates){
      dispatch.apply(this, Array.prototype.slice.apply(arguments));
    }
    else{
      unstable_batchedUpdates(()=>{
        dispatch.apply(this, Array.prototype.slice.apply(arguments))
      });
    }
  }*/
};