/**
 * author: mawei
 * param装饰
 */
import {getMethodName} from '../method';
import {storeHasMethodError, getDecoratorUsedName} from '../handleError';


const flowFromDecorator = function () {
  const flowFromKeys = Array.prototype.slice.apply(arguments);
  return function (target, property, desc) {
    let method = target[property],
      decoratorName = getDecoratorUsedName('flowFrom', flowFromKeys);
    storeHasMethodError(
      target,
      property,
      decoratorName
    );

    let methodName = property || getMethodName(method),
      FlowFroms = target.constructor.FlowFroms,
      flows;
    //初始化FlowFroms
    if(!FlowFroms){
      FlowFroms = target.constructor.FlowFroms = {};
    }
    if(!FlowFroms[methodName]){
      FlowFroms[methodName] = [];
    }
    flows = FlowFroms[methodName];

    flowFromKeys.forEach(function (flowFromKey) {
      if(flows.indexOf(flowFromKey) === -1){
        flows.push(flowFromKey);
      }
    });
    flows.decoratorName = decoratorName;

    return desc;
  }
};


export default flowFromDecorator;