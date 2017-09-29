import {isFunction} from './types';
/*
* 处理动态方法
*
* */
function handleDynamic(target, dynamicConfigs, innerMethodName, innerMethod, innerMethodArguments) {
  //用于dynamicMethodName的动态控制
  dynamicConfigs.forEach(function (dynamicConfig) {
	  let dynamicMethodName = dynamicConfig[0],
		  originalMethod = dynamicConfig[1],
		  lastDispatch,
		  dynamicMethodMapName,
		  dynamicMethodDefaults,
		  dynamicMethodKeyName;
	  if(!dynamicConfig[2]){
		  dynamicConfig.push(dynamicMethodName);
	  }
	  dynamicMethodMapName = dynamicConfig[2];
    lastDispatch = target[dynamicMethodMapName];
	  dynamicMethodKeyName = dynamicMethodName + 'Default';
	  let dispatch;
	  
	  function dynamicMethod(method, value) {
	  	//使用堆栈控制保存动态方法进度
		  let originalMethodArguments = [];
		  if (!isFunction(method)) {
			  value = method;
			  let innerMethod = this[innerMethodName];
			  method = this[innerMethod[dynamicMethodKeyName] || innerMethodName];
		  }
		  originalMethodArguments.push(method);
		  if(value !== undefined){
			  originalMethodArguments.push(value);
		  }
		  return originalMethod.apply(this, originalMethodArguments);
	  };
		dynamicMethod.displayName = dynamicMethodName + 'DynamicMethod';



		if(dynamicMethodMapName === dynamicMethodName) {
		  target[dynamicMethodMapName] = dynamicMethod.bind(target);
	  }
	  dispatch = target[dynamicMethodMapName];
		dynamicConfig.push(dispatch);

    dynamicMethodDefaults = lastDispatch[dynamicMethodKeyName];
    if (dynamicMethodDefaults) {
      dispatch[dynamicMethodKeyName] = dynamicMethodDefaults;
    }
    else if (!dispatch[dynamicMethodKeyName]) {
      dynamicMethodDefaults = dispatch[dynamicMethodKeyName] = [];
    }
    dynamicMethodDefaults.push(dispatch);
  });

  let result;
  try {
    result = innerMethod.apply(target, innerMethodArguments);
  }
  finally {
    dynamicConfigs.forEach(function (dynamicConfig) {
	    let dynamicMethodName = dynamicConfig[0],
		    dynamicMethodMapName = dynamicConfig[2],
		    lastDispatch = dynamicConfig[3],
		    dynamicMethodKeyName = dynamicMethodName + 'Default',
		    dynamicMethodDefaults = lastDispatch[dynamicMethodKeyName];

      dynamicMethodDefaults.pop();
      lastDispatch = dynamicMethodDefaults[dynamicMethodDefaults.length - 1];
      if(lastDispatch){
        target[dynamicMethodMapName] = lastDispatch;
      }
      else{
        delete target[dynamicMethodMapName];
      }
    });

  }

  return result;
};

export default handleDynamic;