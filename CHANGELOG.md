## 1.2.1 (2017.09.29)

**对typescript进行支持, 增加eflow.d.ts声明文件

### Store
* 增加 this.dispatch的动态调用及相关装饰[详见StoreDecorator.md第1、2条](./docs/StoreDecorator.md)
* 增加 this.contextDispatch 当前方法的动态调用[详见Api.md第4条](./docs/Api.md)
* 增加 this.data的动态调用及相关装饰[详见StoreDecorator.md第3、4条](./docs/StoreDecorator.md)
* 增加 this.contextData的动态调用[详见Api.md第7条](./docs/Api.md)


## 1.0.16 (2017.09.11)

**增强部分基础功能、增加装饰功能等

### Store
* 增加 wrapComponent装饰器 [详见wrapComponentDecorator 1-2条](./docs/wrapComponentDecorator.md)
* 修改 bind为bindDispatch, 增加名称准确度
* 增加 store方法的bind处理, 可单独引用方法。[详见Store第4条](./docs/Store.md)
* 增加 store方法的返回值对非undefined值可自动dispatch处理
* 增加 装饰器dispatch.return处理返回值的指定方法的dispatch[详见StoreDecorator第7条](./docs/StoreDecorator.md)
* 增加 对Store的StateKeys静态属性支持, 实现方法与state属性key名称的映射[详见Store第16条](./docs/Store.md)
* 增加 装饰器stateKey 对Store的StateKeys静态属性支持[详见StoreDecorator第8条](./docs/StoreDecorator.md)
* 增加 装饰器setData, 方便获取data方法
* 增加 装饰器flowFrom


## 1.0.19 (2017.09.19)

**修改发布订阅顺序执行、增加Map和Set处理、增加类型转换报错提示
