/*
* author: mawei
* 提供默认对象的类
* */

class DefaultObject{
  toString(){
    /*var names = Object.getOwnPropertyNames(this);
     if(names.length){
     return '[object Object]';
     }*/
    return '这个是 [DefaultObject] 类型, 你可能需要初始化该属性';
  }
}

export default DefaultObject;