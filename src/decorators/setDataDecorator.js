/**
 * author: mawei
 * data装饰
 */

import {decoratorComposite} from './utils/decoratorUtil';
import {Method} from '../constants';

const setDataDecorator = function (target, property, desc, otherProperty, descNames) {
  return decoratorComposite(target, property, desc, otherProperty, descNames, Method.data, Array.prototype.slice.apply(arguments));
};

export default setDataDecorator;