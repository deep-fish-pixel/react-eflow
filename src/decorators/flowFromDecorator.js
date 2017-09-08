/**
 * author: mawei
 * param装饰
 */
import {getMethodName} from '../method';
import {storeHasMethodError} from '../handleError';


const flowFromDecorator = function () {
  const flowFromKeys = Array.prototype.slice.apply(arguments);
  return function (target, property, desc) {
    let method = target[property],
      decoratorName = '@flowFrom(' + flowFromKeys.map(function (value) {
                        return "'" + value + "'";
                      }).join(',') + ')';
    storeHasMethodError(
      target,
      property,
      decoratorName
    );

    let methodName = getMethodName(method),
      FlowFroms = target.constructor.FlowFroms,
      flows;
    if(!FlowFroms){
      FlowFroms = target.constructor.FlowFroms = {};
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