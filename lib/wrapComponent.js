'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _types = require('./types');

var _pubSub = require('./pubSub');

var _pubSub2 = _interopRequireDefault(_pubSub);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _prototype = require('./prototype');

var _method = require('./method');

var _Array = require('./Array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * author: mawei
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 包装用户组件,绑定store后能自动更新数据
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */


/*
* 根据当前组件绑定的store获取相关state数据
* @param {Store} store 商店类对象
* @param {String} propsKey 更新器名称
* @param {Function} updater 更新器
* @param {Function} customPropsMapping 用户自定义映射
* @param {Boolean} forceUpdate 是否需要设置组件的state, 使state起作用
* */
function getState(store, propsKey, updater, customPropsMapping, forceUpdate) {
  var _this = this;

  var state = this.state;
  if (propsKey && updater) {
    state[propsKey] = store.data(updater);
  }
  if (customPropsMapping) {
    Object.assign(state, customPropsMapping(state, this.props));
  }
  if (forceUpdate) {
    //强制更新标识
    this.__stateShouldUpdate = true;
    this.setState(state, function () {
      _this.__stateShouldUpdate = false;
    });
  }

  return state;
}

/*
 * 执行Store初始化
 * */
function execInitStores(component, customPropsMapping) {
  var state = getState.call(component, null, null, null, customPropsMapping);
  Object.assign(component.state, state);
}
/*
* 包装用户组件, 包装后的组件绑定stores并初始化stores,
* 把相关state值更新到被包装组件props中
* */
var wrapComponent = function wrapComponent(_Component, updaters, customPropsMapping) {
  //装饰方式处理
  if (_Component == null || (0, _types.isArray)(_Component)) {
    customPropsMapping = updaters;
    updaters = _Component;
    _Component = null;
    return function (target) {
      return createWrapComponent(target);
    };
  }
  return createWrapComponent(_Component);

  function createWrapComponent(_Component) {
    if ((!updaters || !updaters.length) && !customPropsMapping) {
      return _Component;
    }

    var WrapComponent = function (_Component2) {
      _inherits(WrapComponent, _Component2);

      function WrapComponent(props) {
        _classCallCheck(this, WrapComponent);

        var _this2 = _possibleConstructorReturn(this, (WrapComponent.__proto__ || Object.getPrototypeOf(WrapComponent)).call(this, props));

        _this2.state = {};
        _this2.bindUpdater();
        return _this2;
      }

      _createClass(WrapComponent, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.off();
          this.__stateShouldUpdate = null;
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          return this.__stateShouldUpdate || !(0, _shallowequal2['default'])(this.props, nextProps) || !(0, _shallowequal2['default'])(this.state, nextState);
        }

        /*
         * 绑定相关组件的更新
         * */

      }, {
        key: 'bindUpdater',
        value: function bindUpdater() {
          var _this3 = this;

          var self = this,
              event = this.event = {},
              store = void 0,
              state = this.state;
          if (updaters && updaters.length) {
            var isMethod = void 0,
                propsKey = void 0,
                _eflowKey = void 0,
                updater = void 0,
                originUpdater = void 0;
            //遍历updaters, 处理updater的绑定事件

            var _loop = function _loop(_i) {
              updater = updaters[_i];
              process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(updater, 'wrapComponent(%s) 方法中, 参数updaters数组的第%s元素为undefined, 该元素的类型必须为方法。', (0, _method.getMethodName)(_Component), _i + 1);
              if (updater instanceof _Store2['default']) {
                updaters = (0, _Array.replaceElement)(updaters, _i, (0, _prototype.getPrototypeMethods)(updater));
                _i--;
                return 'continue';
              }

              isMethod = (0, _types.isFunction)(updater);
              originUpdater = updater;
              updater = isMethod ? updater : updater.updater;
              propsKey = isMethod ? updater.stateKey : originUpdater.propsKey || updater.stateKey;
              _eflowKey = updater._eflowKey;
              store = updater.owner;
              var update = getState.bind(_this3, store, propsKey, updater, customPropsMapping);
              event[_eflowKey] = function callUpdate() {
                update(true);
              };
              _pubSub2['default'].sub(_eflowKey, event[_eflowKey], 1);

              //初始化该方法对应的state值
              Object.assign(state, getState.call(_this3, store, propsKey, updater));
              i = _i;
            };

            for (var i = 0; i < updaters.length; i++) {
              var _ret = _loop(i);

              if (_ret === 'continue') continue;
            }
          }
          //最后初始化customPropsMapping
          execInitStores(this, customPropsMapping);
        }
        /*
         * 卸载相关绑定更新
         * */

      }, {
        key: 'off',
        value: function off() {
          if (updaters && updaters.length) {
            var event = this.event,
                _eflowKey = void 0;
            updaters.forEach(function (updater) {
              updater = (0, _types.isFunction)(updater) ? updater : updater.updater;
              _eflowKey = updater._eflowKey;
              _pubSub2['default'].off(_eflowKey, event[_eflowKey]);
            });
            this.event = null;
          }
        }
      }, {
        key: 'getProps',
        value: function getProps() {
          var curProps = {},
              props = this.props;
          for (var propName in props) {
            if (propName === 'innerRef' && props.innerRef) {
              curProps.ref = props.innerRef;
            } else {
              curProps[propName] = props[propName];
            }
          }
          return curProps;
        }
      }, {
        key: 'render',
        value: function render() {
          var state = this.state;
          return _react2['default'].createElement(_Component, _extends({}, state, this.getProps()));
        }
      }]);

      return WrapComponent;
    }(_react.Component);

    WrapComponent.displayName = 'WrapComponent(' + (0, _method.getMethodName)(_Component) + ')';

    return WrapComponent;
  }
};

exports['default'] = wrapComponent;