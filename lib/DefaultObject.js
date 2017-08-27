'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* author: mawei
* 提供默认对象的类
* */

var DefaultObject = function () {
  function DefaultObject() {
    _classCallCheck(this, DefaultObject);
  }

  _createClass(DefaultObject, [{
    key: 'toString',
    value: function toString() {
      /*var names = Object.getOwnPropertyNames(this);
       if(names.length){
       return '[object Object]';
       }*/
      return '这个是 [DefaultObject] 类型, 你可能需要初始化该属性';
    }
  }]);

  return DefaultObject;
}();

exports['default'] = DefaultObject;