'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _prototype = require('./prototype');

var _initProperties = require('./initProperties');

var _initProperties2 = _interopRequireDefault(_initProperties);

var _types = require('./types');

var _method = require('./method');

var _pubSub = require('./pubSub');

var _pubSub2 = _interopRequireDefault(_pubSub);

var _DefaultObject = require('./DefaultObject');

var _DefaultObject2 = _interopRequireDefault(_DefaultObject);

var _UpdateQueue = require('./UpdateQueue');

var _UpdateQueue2 = _interopRequireDefault(_UpdateQueue);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * author: mawei
                                                                                                                                                                                                     */


var emptyObject = {};
Object.freeze(emptyObject);
/*
 * 属性合并, 并获取新对象
 * @param {Array | Object} target 合并的对象容器
 * @param {Array | Object} propName 合并容器的属性名称
 * @param {Array | Object} mergeValue 被合并的值
 * @return {Array | Object}
 * */
function assign(store, target, propName, mergeValue) {
  var curValue = target[propName],
      nextValue = void 0;
  //数组类型值只可替换为新数组,所以数据类型不能转化
  if ((0, _types.isArray)(curValue)) {
    if (arguments.length >= 4) {
      var array = (0, _types.isArray)(mergeValue);
      if (array) {
        nextValue = [].concat(_toConsumableArray(mergeValue));
      }
      mergeValue && process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(array, '%s实例的state, 其属性 %s 对应的值类型为数组,不可存非数组类型: %s', (0, _method.getMethodName)(store.constructor), propName, mergeValue);
    }

    if (!nextValue) {
      nextValue = [].concat(_toConsumableArray(curValue));
    }
  }
  //对象类型值不可覆盖只可扩展,所以数据类型不能转化
  else if ((0, _types.isObject)(curValue)) {
      mergeValue = mergeValue || emptyObject;

      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(!(0, _types.isArray)(mergeValue) && !(0, _types.isString)(mergeValue) && !(0, _types.isNumber)(mergeValue) && !(0, _types.isBoolean)(mergeValue) && !(0, _types.isFunction)(mergeValue) && window.Map ? !(mergeValue instanceof window.Map) : true && window.Set ? !(mergeValue instanceof window.Set) : true, '%s实例的state, 属性 %s 对应的值类型为对象,不可存非对象类型: %s', (0, _method.getMethodName)(store.constructor), propName, mergeValue);

      nextValue = _extends({}, curValue, mergeValue);
    } else {
      //其他类型如基本类型,值可被覆盖但不可扩展,所以数据类型可以转化
      if (arguments.length >= 4) {
        if ((0, _types.isArray)(mergeValue)) {
          nextValue = [].concat(_toConsumableArray(mergeValue));
        } else if ((0, _types.isObject)(mergeValue)) {
          nextValue = _extends({}, mergeValue || emptyObject);
        } else {
          nextValue = mergeValue;
        }
      } else {
        nextValue = curValue;
        //无初始值,获取属性为默认类的对象,该值可以被覆盖也可被扩展,所以数据类型可以转化
        if (curValue === undefined && !target.hasOwnProperty(propName)) {
          nextValue = new _DefaultObject2['default']();
        }
      }
    }
  return nextValue;
}

var storeNames = {
  names: {},
  getName: function getName(store) {
    if (store instanceof Store) {
      var name = (0, _method.getMethodName)(store.constructor) || 'store',
          names = this.names[name];
      if (!names) {
        names = this.names[name] = [];
      }
      //首字母小写
      name = name.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1);
      });
      var storeName = name + '_' + (names.length + 1);
      names.push(storeName);
      return storeName;
    }
  }

  /*
  * 商店基类,实现基本的状态管理
  * */
};
var Store = function () {
  function Store() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    this.state = {};
    this.options = options;
    this.updateQueue = new _UpdateQueue2['default']();
    this.id = options.id || storeNames.getName(this);
    (0, _initProperties2['default'])(this, this.id);
  }

  /*
  * 初始化state
  * */


  _createClass(Store, [{
    key: 'initState',
    value: function initState(data) {
      var state = this.state;
      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          state[name] = data[name];
        }
      }
    }

    /*
     * 获取state
     * */

  }, {
    key: 'getState',
    value: function getState() {
      var clone = {},
          state = this.state;
      for (var name in state) {
        if (state.hasOwnProperty(name)) {
          clone[name] = assign(this, state, name, state[name]);
        }
      }
      return clone;
    }
    /*
    * 发布方法对应的数据更新, 注意method为方法,另外该方法如果值为空,有一个对象的默认值
    *
    * @param {Function} method store实例的属性方法
    * @param {Object} value 对应的数值
    * */

  }, {
    key: 'dispatch',
    value: function dispatch(method, value) {
      if (arguments.length == 1 && (0, _types.isFunction)(method)) {
        return this.bindDispatch(method);
      }
      this._dispatch(method, value, _constants.Method.dispatch);
    }
    /*
     * 当前方法获取/设置并发布数据
     * */

  }, {
    key: 'contextDispatch',
    value: function contextDispatch(method, value) {
      if (arguments.length == 1 && (0, _types.isFunction)(method)) {
        return this.bindDispatch(method);
      }
      this._dispatch(method, value, _constants.Method.contextDispatch);
    }
    /*
     * 方法获取/设置并发布数据
     * */

  }, {
    key: '_dispatch',
    value: function _dispatch(method, value, invokeName) {
      var _this = this;

      if (method) {
        process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])((0, _types.isFunction)(method), '调用%s.%s 方法, method参数类型不是方法, 请检查this.' + invokeName + '使用方式是否正确, 如上下文环境切换导致或首个参数类型需为方法', (0, _method.getMethodName)(this.constructor), invokeName);

        var state = this.state,
            stateKey = method.stateKey;

        process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(stateKey, '调用%s.%s 方法, 参数值%s 的stateKey为空, stateKey属性在构造函数中进行初始化, 应该是非原型方法', (0, _method.getMethodName)(this.constructor), invokeName, (0, _method.getOriginalMethodName)(method) || 'method');

        this.change(state, stateKey, value, method);
      }
      this.updateQueue.exec(function (stateKey, nextValue, method) {
        _this.pub(method);
      });
    }

    /*
    * 检查value是否有变更,若果有就加入队列
    * */

  }, {
    key: 'change',
    value: function change(state, stateKey, value, method) {
      var curValue = state[stateKey],
          nextValue = void 0,
          shouldUpdate = void 0;
      nextValue = assign(this, state, stateKey, value);

      //如果value是对象,进行深度检测
      if ((0, _types.isObject)(value)) {
        if ((0, _shallowequal2['default'])(curValue, nextValue)) {
          for (var propName in value) {
            if (value.hasOwnProperty(propName) && !(0, _shallowequal2['default'])(curValue[propName], value[propName])) {
              shouldUpdate = true;
              break;
            }
          }
        } else {
          shouldUpdate = true;
        }
      }

      if (shouldUpdate || !(0, _shallowequal2['default'])(curValue, nextValue) || (window.Map ? nextValue instanceof window.Map : false) || (window.Set ? nextValue instanceof window.Set : false)) {
        this.updateQueue.push(method, curValue, nextValue);
        state[stateKey] = nextValue;
      }
    }
    /*
     * 绑定method对应dispatch, 内部通过method的name或displayName来标识key
     * @param {Function} method Store继承类的方法
     * @return {Function}
     * */

  }, {
    key: 'bindDispatch',
    value: function bindDispatch(method) {
      var name = (0, _method.getOriginalMethodName)(method);
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(name, '调用%s.data 方法, 参数值%s 的name或displayName为空, displayName属性已在构造函数中进行初始化', (0, _method.getOriginalMethodName)(this.constructor), name || 'method');
      return this.dispatch.bind(this, method);
    }
    /*
     * 获取method对应store中的值,内部通过method的name或displayName来标识key
     * 该值为空时,返回的默认值为{}
     * @param {Function} method Store继承类的方法
     * @return {Array | Object}
     * */

  }, {
    key: 'data',
    value: function data(method, value) {
      return this._data(Array.prototype.slice.apply(arguments, [0, 2]), _constants.Method.data);
    }

    /*
    * 当前方法获取/设置数据
    * */

  }, {
    key: 'contextData',
    value: function contextData(method, value) {
      return this._data(Array.prototype.slice.apply(arguments, [0, 2]), _constants.Method.contextData);
    }

    /*
     * 方法获取/设置数据
     * */

  }, {
    key: '_data',
    value: function _data(invokerArguments, invokeName) {
      var method = invokerArguments[0],
          value = invokerArguments[1],
          stateKey = method.stateKey;
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])((0, _types.isFunction)(method), '调用%s.%s 方法, method参数类型不是方法, 请检查this.' + invokeName + '使用是否正确, 如上下文环境切换导致或首个参数类型需为方法', (0, _method.getMethodName)(this.constructor), invokeName);

      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(stateKey, '调用%s.%s 方法, 参数值%s 的stateKey为空, stateKey属性在构造函数中进行初始化, 应该是非原型方法', (0, _method.getMethodName)(this), invokeName, (0, _method.getOriginalMethodName)(method) || 'method');
      if (invokerArguments.length >= 2) {
        this.change(this.state, stateKey, value, method);
      } else {
        var state = this.state,
            curValue = state[stateKey],
            newValue = void 0;
        if ((0, _types.isObject)(curValue) && !(0, _types.isArray)(curValue)) {
          newValue = {};
          for (var propName in curValue) {
            if (curValue.hasOwnProperty(propName)) {
              newValue[propName] = assign(this, curValue, propName);
            }
          }
          return newValue;
        }
        return assign(this, this.state, stateKey);
      }
    }

    /*
    * 发布method对应值,内部通过method的内部属性_eflowKey来标识key
    * @param {Function} method Store继承类的方法
    * */

  }, {
    key: 'pub',
    value: function pub(method) {
      var key = method._eflowKey;
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(key, '调用%s.pub 方法, 参数值%s 的_eflowKey为空, 该属性已在构造函数中进行初始化', (0, _method.getMethodName)(this), (0, _method.getOriginalMethodName)(method) || 'method');
      try {
        _pubSub2['default'].pub(key);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          throw e;
        }
      }
    }
    /*
    * 销毁处理
    * */

  }, {
    key: 'destory',
    value: function destory() {
      this.state = null;
      this.options = null;
      this.updateQueue = null;
      (0, _prototype.forEachPrototype)(this, function (method, methodName) {
        method.destory();
      });
    }
  }]);

  return Store;
}();

Store.plugin = function () {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i](Store);
  }
};

exports['default'] = Store;