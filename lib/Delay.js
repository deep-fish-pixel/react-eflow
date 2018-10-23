'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * author: mawei
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 延迟处理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */


var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Delay = function () {
  function Delay(delays) {
    _classCallCheck(this, Delay);

    this.delays = delays || [];
  }
  /*
  * 添加延迟方法
  * */


  _createClass(Delay, [{
    key: 'add',
    value: function add(delay) {
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])((0, _types.isFunction)(delay), '延迟执行器的类型只能为方法');
      this.delays.push(delay);
    }
    /*
     * 执行延迟方法
     * */

  }, {
    key: 'execute',
    value: function execute() {
      this.delays.forEach(function (delay) {
        try {
          delay();
        } catch (e) {
          console.error(e);
        }
      });
      this.delays = [];
    }
  }]);

  return Delay;
}();

exports['default'] = Delay;