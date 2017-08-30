'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeyByWords = getKeyByWords;
exports.createUniqueMethodKey = createUniqueMethodKey;
exports['default'] = initProperties;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _prototype = require('./prototype');

var _method = require('./method');

var _pubSub = require('./pubSub');

var _pubSub2 = _interopRequireDefault(_pubSub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * author: mawei
 * 添加Store实例的方法功能
 * */
var methodCount = 0;

function getKeyByWords() {
  var words = [];
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) words.push(arguments[i]);
  }
  return words.join('.');
}

function createUniqueMethodKey() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.push(++methodCount);
  return getKeyByWords.apply(null, args);
}
/*
* 初始化store,为store的每个方法添加key及回调
* */
function initProperties(obj, id) {
  (0, _prototype.forEachPrototype)(obj, function (method, methodName) {
    if (methodName !== 'constructor') {
      /*
      * 当store有id标识时,所有原形方法转化为实例方法
      * 主要用于同一Store子类的实例
      * */
      if (method.displayName) {
        var protoMethod = method;
        method = obj[methodName] = function () {
          return protoMethod.apply(this, Array.prototype.slice.apply(arguments));
        };
        method.displayName = getKeyByWords(id, methodName);
      } else {
        method.displayName = methodName;
      }

      var extend = {
        //获取key名称
        _eflowKey: createUniqueMethodKey('_eflow_' + (0, _method.getMethodName)(obj.constructor), methodName || 'method', id),
        dispatch: obj.bind(method),
        data: obj.data.bind(obj, method),
        ref: obj,
        flows: {},
        //指定该方法跟随source方法同步更新
        flowFrom: function flowFrom(source) {
          var _eflowKey = source._eflowKey;
          process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(_eflowKey, '%s.%s 方法, _eflowKey值为空', (0, _method.getMethodName)(source.ref.constructor), (0, _method.getMethodName)(source) || 'method');
          process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(!this.flows[_eflowKey], '%s.%s 已同步 %s.%s', (0, _method.getMethodName)(this.ref.constructor), (0, _method.getMethodName)(this) || 'method', (0, _method.getMethodName)(source.ref.constructor), (0, _method.getMethodName)(source) || 'method');
          this.flows[_eflowKey] = function sync() {
            obj[methodName]();
          };
          _pubSub2['default'].sub(_eflowKey, this.flows[_eflowKey]);
        },
        destory: function destory() {
          var flows = this.flows;
          for (var _eflowKey in flows) {
            _pubSub2['default'].off(_eflowKey, flows[_eflowKey]);
          }
          Object.assign(method, {
            _eflowKey: null,
            ref: null,
            flows: null,
            flowFrom: null,
            destory: null
          });
        }
      };
      Object.assign(method, extend);
    }
  });
}