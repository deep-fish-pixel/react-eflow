'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * author: mawei
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 缓存更新的队列
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _method = require('./method');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UpdateQueue = function () {
  function UpdateQueue() {
    _classCallCheck(this, UpdateQueue);

    this.queue = {};
  }

  _createClass(UpdateQueue, [{
    key: 'push',
    value: function push(method, value, nextValue) {
      var name = (0, _method.getOriginalMethodName)(method),
          queue = this.queue,
          prevUpdate = queue[name];
      if (prevUpdate) {
        //2次操作后结果是改回原值,删除队列
        if ((0, _shallowequal2['default'])(prevUpdate.value, nextValue)) {
          delete queue[name];
        } else {
          queue[name] = {
            value: prevUpdate.value,
            nextValue: nextValue,
            method: method
          };
        }
      } else {
        queue[name] = {
          value: value,
          nextValue: nextValue,
          method: method
        };
      }
    }
  }, {
    key: 'exec',
    value: function exec(callback) {
      var queue = this.queue,
          update;
      for (var name in queue) {
        if (callback) {
          update = queue[name];
          callback(name, update.nextValue, update.method);
        }
        delete queue[name];
      }
    }
  }]);

  return UpdateQueue;
}();

exports['default'] = UpdateQueue;