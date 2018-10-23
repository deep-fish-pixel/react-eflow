/**
 * author: mawei
 * data装饰
 */

import {decoratorComposite} from './utils/decoratorUtil';
import {Method} from '../constants';

const dataDecorator = function (target, property, desc, otherProperty, descNames) {
  return decoratorComposite(target, property, desc, otherProperty, descNames, Method.data, Array.prototype.slice.apply(arguments), true);
}

export default dataDecorator;