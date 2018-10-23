'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * pub/sub工具
 * */
var pubSub = {
  _events: {},
  /*
   * 根据name 绑定事件
   * @param {String} name 事件名称
   * @param {Function} callback 事件回调
   * @return {Object}
   * */
  sub: function sub(name, callback) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (name) {
      if (!this._events[name]) {
        this._events[name] = [];
      }
      if (!callback) return;
      var events = this._events[name],
          insertIndex = events.length;
      while (insertIndex) {
        if (level > events[insertIndex - 1].level) {
          insertIndex--;
        } else {
          break;
        }
      }
      /*node取消注册事件*/
      if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) !== 'object' || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && !global.process) {
        events.splice(insertIndex, 0, {
          name: name,
          callback: callback,
          level: level
        });
      }
    }
    return this;
  },
  /*
   * 根据name 触发事件
   * @param {String} name 事件名称
   * @return {undefined}
   * */
  pub: function pub(name) {
    var eventers = this._events[name] || [],
        eventer,
        callback,
        ret;
    var length = eventers.length;
    for (var i = 0; i < length; i++) {
      eventer = eventers[i];
      callback = eventer.callback;
      if (callback) {
        ret = callback.apply(this, Array.prototype.slice.call(arguments, 1));
        if (ret === true) {
          return ret;
        }
      }
    }
  },
  /*
   * 根据name 销毁事件绑定
   * @param {String} name 事件名称
   * @param {[Function]} callback 事件回调
   * @return {Object}
   * */
  off: function off(name, callback) {
    if (name) {
      var eventers = this._events[name],
          eventer,
          eventCallback;
      if (eventers) {
        var length = eventers.length;
        while (length--) {
          eventer = eventers[length];
          eventCallback = eventer.callback;
          if (callback === eventCallback || !callback) {
            if (eventers.length <= 1) {
              delete this._events[name];
            } else {
              this._events[name] = eventers = eventers.slice(0, length).concat(eventers.slice(length + 1));
            }
          }
        }
      }
    }
    return this;
  }
};
exports['default'] = pubSub;