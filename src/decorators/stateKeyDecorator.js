/**
 * author: mawei
 * param装饰
 */
import {getMethodName} from '../method';
import {storeHasMethodError} from '../handleError';


const stateKeyDecorator = function (stateKey) {
  return function (target, property, desc) {
    let method = target[property];

    storeHasMethodError(target, property, 'stateKey(' + stateKey + ')');

    let methodName = getMethodName(method),
      stateKeys = target.constructor.StateKeys;
    if(!stateKeys){
      stateKeys = target.constructor.StateKeys = {};
    }
    stateKeys[methodName] = stateKey;

    return desc;
  }
};


export default stateKeyDecorator;