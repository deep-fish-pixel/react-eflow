'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('./types');

var _pubSub = require('./pubSub');

var _pubSub2 = _interopRequireDefault(_pubSub);

var _method = require('./method');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mawei on 17/8/11.
 */
var emptyObject = require('fbjs/lib/emptyObject');
var ReactNoopUpdateQueue = require('react/lib/ReactNoopUpdateQueue');

/*
* 重新定义ReactComponent组件,
* 添加对store的初始化操作
* */
function ReactComponent(props, context, updater) {
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
  if (props && props._eflowInit) {
    props._eflowInit(this);
    //delete props._eflowInit;
  }
  props = initProps(props);
  this.props = props;
}
Object.assign(ReactComponent.prototype, _react.Component.prototype);
_react2.default.Component = ReactComponent;

function initProps(props) {
  var newProps = {};
  for (var name in props) {
    if (name != '_eflowInit') {
      newProps[name] = props[name];
    }
  }
  return newProps;
}

exports.default = ReactComponent;