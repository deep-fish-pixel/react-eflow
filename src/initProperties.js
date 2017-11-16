/*
 * author: mawei
 * 添加Store实例的方法功能
 * */
import invariant from 'invariant';
import {forEachPrototype} from './prototype';
import {getMethodName, getOriginalMethodName} from './method';
import pubSub from './pubSub';
import {isString, isFunction} from './types';
import handleDynamic from './handleDynamic';
import Delay from './Delay';
import {Method} from './constants';

let methodCount = 0;
export function getKeyByWords() {
	let words = [];
	for(let i = 0; i < arguments.length; i++){
		if(arguments[i])words.push(arguments[i]);
	}
	return words.join('.');
}

export function createUniqueMethodKey(...args) {
	args.push(++ methodCount);
	return getKeyByWords.apply(null, args);
}
/*
* 初始化store,为store的每个方法添加key及回调
* */
export default function initProperties(obj, id) {
	let construtor = obj.constructor,
		originalDispatch = obj.dispatch,
		originalContextDispatch = obj.contextDispatch,
		originalData = obj.data,
		originalContextData = obj.contextData;
	const stateKeys = construtor.StateKeys || {};
	const flowFroms = construtor.FlowFroms || {};
	const delay = new Delay();
	
	forEachPrototype(obj, function (method, methodName) {
		if(methodName !== 'constructor'){
			let coreMethod = method;
			function innerMethod() {
				let returnDispatchName =  coreMethod.returnDispatchName || methodName;
				let returnValue = coreMethod.apply(this, Array.prototype.slice.apply(arguments));
				if(returnValue !== undefined){
					this[returnDispatchName].dispatch(returnValue);
				}
				return returnValue;
			};
			
			construtor.prototype[methodName] = innerMethod;
			innerMethod.displayName = 'innerMethod(' + methodName + ')';
			
			innerMethod = construtor.prototype[methodName];
			method = getWrapInnerMethod(
				obj,
				method,
				methodName,
				innerMethod,
				originalDispatch,
				originalContextDispatch,
				originalData,
				originalContextData
			);

			let extend = {
				//获取key名称
				_eflowKey: createUniqueMethodKey(
					'_eflow_' + getMethodName(construtor),
					methodName || 'method',
					id
				),
				stateKey: stateKeys[methodName] || methodName,
				dispatch: obj.bindDispatch(method),
				data: obj.data.bind(obj, method),
				owner: obj,
				flows: {},
				//指定该方法跟随source方法同步更新
				flowFrom: function (source) {
					let _eflowKey = source._eflowKey;
					process.env.NODE_ENV !== 'production'
					&& invariant(
						_eflowKey,
						'%s.%s 方法, _eflowKey值为空',
						getMethodName(source.owner.constructor),
						getOriginalMethodName(source) || 'method'
					);
					process.env.NODE_ENV !== 'production'
					&& invariant(
						!this.flows[_eflowKey],
						'%s.%s 已同步 %s.%s',
						getMethodName(this.owner.constructor),
						getOriginalMethodName(this) || 'method',
						getMethodName(source.owner.constructor),
						getOriginalMethodName(source) || 'method'
					);
					this.flows[_eflowKey] = function flow() {
						obj[methodName]();
					};
					pubSub.sub(_eflowKey, this.flows[_eflowKey]);
				},
				destory: function () {
					let flows = this.flows;
					for(let _eflowKey in flows){
						pubSub.off(_eflowKey, flows[_eflowKey]);
					}
					Object.assign(method, {
						_eflowKey: null,
						owner: null,
						flows: null,
						flowFrom: null,
						destory: null
					})
				}
			};
			Object.assign(method, extend);
      delay.add(function () {
        //初始化各个方法的flowFrom
        initFlowFroms(obj, method, flowFroms[methodName]);
      });
		}
	});

  delay.execute();
}

/*
* 包装innerMethod
* */
function getWrapInnerMethod(target,
                            method,
                            methodName,
                            innerMethod,
                            originalDispatch,
                            originalContextDispatch,
                            originalData,
                            originalContextData
) {

	wrapInnerMethod.displayName = 'wrapInnerMethod(' + methodName + ')';
	method = target[methodName] = wrapInnerMethod.bind(target);
	method.displayName = 'wrapInnerMethod(' + methodName + ')';
	return method;
	
	function wrapInnerMethod() {
		//用于dispatch、data的方法控制
		return handleDynamic(this,
			[
				[
					Method.dispatch,
					originalDispatch
				],
				[
					Method.contextDispatch,
					originalContextDispatch
				],
				[
					Method.data,
					originalData
				],
				[
					Method.contextData,
					originalContextData
				],
				[
					Method.setData,
					originalData,
					Method.data
				],
			],
			methodName,
			innerMethod,
			Array.prototype.slice.apply(arguments)
		);
	}
}

/*
* 初始化flows
* */
function initFlowFroms(store, method, methodFlowFroms) {
	if(!methodFlowFroms){
		return;
	}
	methodFlowFroms.forEach(function (flowFrom) {
		const targetClassName = getMethodName(store.constructor);
		if(isString(flowFrom)){
			process.env.NODE_ENV !== 'production'
			&& invariant(
				store[flowFrom],
				'%s.%s的装饰器 %s 存在错误: 绑定的%s.%s方法不存在, 该类原型上没有%s方法',
				targetClassName,
				getOriginalMethodName(method),
				methodFlowFroms.decoratorName,
				targetClassName,
				flowFrom,
				flowFrom
			);
			method.flowFrom(store[flowFrom]);
		}
		else if(isFunction(flowFrom)){
			process.env.NODE_ENV !== 'production'
			&& invariant(
				flowFrom.owner,
				'%s.%s的装饰器 %s 存在错误: 绑定的对象.%s方法不存在, 该方法可能被覆盖',
				targetClassName,
				getOriginalMethodName(method),
				methodFlowFroms.decoratorName,
				getOriginalMethodName(method)
			);
			method.flowFrom(flowFrom);
		}
	})
}


