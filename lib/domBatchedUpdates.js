'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Store) {
  var unstable_batchedUpdates = require('react-dom').unstable_batchedUpdates;
  var ReactBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');
  var dispatch = Store.prototype.dispatch;
  Store.prototype.dispatch = function () {
    var _this = this,
        _arguments = arguments;

    if (ReactBatchingStrategy.isBatchingUpdates) {
      dispatch.apply(this, Array.prototype.slice.apply(arguments));
    } else {
      unstable_batchedUpdates(function () {
        dispatch.apply(_this, Array.prototype.slice.apply(_arguments));
      });
    }
  };
};

; /**
   * Created by mawei on 17/8/11.
   */