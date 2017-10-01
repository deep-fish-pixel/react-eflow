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

var _types = require('./types');

var _handleDynamic = require('./handleDynamic');

var _handleDynamic2 = _interopRequireDefault(_handleDynamic);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var methodCount = 0; /*
                      * author: mawei
                      * 添加Store实例的方法功能
                      * */
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
  var construtor = obj.constructor,
      originalDispatch = obj.dispatch,
      originalContextDispatch = obj.contextDispatch,
      originalData = obj.data,
      originalContextData = obj.contextData;
  var stateKeys = construtor.StateKeys || {};
  var flowFroms = construtor.FlowFroms || {};

  (0, _prototype.forEachPrototype)(obj, function (method, methodName) {
    if (methodName !== 'constructor') {
      var wrapInnerMethod = function wrapInnerMethod() {
        //用于dispatch、data的方法控制
        return (0, _handleDynamic2['default'])(this, [[_constants.Method.dispatch, originalDispatch], [_constants.Method.contextDispatch, originalContextDispatch], [_constants.Method.data, originalData], [_constants.Method.contextData, originalContextData], [_constants.Method.setData, originalData, _constants.Method.data]], methodName, innerMethod, Array.prototype.slice.apply(arguments));
      };

      /*
      * 当store有id标识时,所有原形方法转化为实例方法
      * 主要用于同一Store子类的实例
      * */
      if (!method.displayName) {
        var _innerMethod = function _innerMethod() {
          var returnDispatchName = coreMethod.returnDispatchName || methodName;
          var returnValue = coreMethod.apply(this, Array.prototype.slice.apply(arguments));
          if (returnValue !== undefined) {
            this[returnDispatchName].dispatch(returnValue);
          }
          return returnValue;
        };

        var coreMethod = method;
        ;

        construtor.prototype[methodName] = _innerMethod;
        _innerMethod.displayName = 'innerMethod(' + methodName + ')';
      }
      var innerMethod = construtor.prototype[methodName];

      wrapInnerMethod.displayName = 'wrapInnerMethod(' + methodName + ')';
      method = obj[methodName] = wrapInnerMethod.bind(obj);
      method.displayName = 'wrapInnerMethod(' + methodName + ')';

      var extend = {
        //获取key名称
        _eflowKey: createUniqueMethodKey('_eflow_' + (0, _method.getMethodName)(construtor), methodName || 'method', id),
        stateKey: stateKeys[methodName] || methodName,
        dispatch: obj.bindDispatch(method),
        data: obj.data.bind(obj, method),
        owner: obj,
        flows: {},
        //指定该方法跟随source方法同步更新
        flowFrom: function flowFrom(source) {
          var _eflowKey = source._eflowKey;
          process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(_eflowKey, '%s.%s 方法, _eflowKey值为空', (0, _method.getMethodName)(source.owner.constructor), (0, _method.getOriginalMethodName)(source) || 'method');
          process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(!this.flows[_eflowKey], '%s.%s 已同步 %s.%s', (0, _method.getMethodName)(this.owner.constructor), (0, _method.getOriginalMethodName)(this) || 'method', (0, _method.getMethodName)(source.owner.constructor), (0, _method.getOriginalMethodName)(source) || 'method');
          this.flows[_eflowKey] = function flow() {
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
            owner: null,
            flows: null,
            flowFrom: null,
            destory: null
          });
        }
      };
      Object.assign(method, extend);
      //初始化各个方法的flowFrom
      initFlowFroms(obj, method, flowFroms[methodName]);
    }
  });
}

function initFlowFroms(store, method, methodFlowFroms) {
  if (!methodFlowFroms) {
    return;
  }
  methodFlowFroms.forEach(function (flowFrom) {
    var targetClassName = (0, _method.getMethodName)(store.constructor);
    if ((0, _types.isString)(flowFrom)) {
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(store[flowFrom], '%s.%s的装饰器 %s 存在错误: 绑定的%s.%s方法不存在, 该类原型上没有%s方法', targetClassName, (0, _method.getOriginalMethodName)(method), methodFlowFroms.decoratorName, targetClassName, flowFrom, flowFrom);
      method.flowFrom(store[flowFrom]);
    } else if ((0, _types.isFunction)(flowFrom)) {
      process.env.NODE_ENV !== 'production' && (0, _invariant2['default'])(flowFrom.owner, '%s.%s的装饰器 %s 存在错误: 绑定的对象.%s方法不存在, 该方法可能被覆盖', targetClassName, (0, _method.getOriginalMethodName)(method), methodFlowFroms.decoratorName, (0, _method.getOriginalMethodName)(method));
      method.flowFrom(flowFrom);
    }
  });
}