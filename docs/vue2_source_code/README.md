# vue2 源码分析

## Watcher 观察者模式

**1、function initWatch**

内部调用 createWatcher

**2、function createWatcher**

内部调用 vm.$watch

**3、vm.$watch === ue.prototype.$watch**

内部调用 new Watcher

**4、function Watcher**
将 watch 放入 vm.watchers 观察者队列

### watcht 中的 deep 属性

如果有 deep 属性，则执行 traverse 方法：

## Computed 发布订阅模式

initComputed

vm.computedWatchers

defineComputed

createComputedGetter

## VUE2 中的 Proxy 有那些作用

```js
//第一个使用的地方
config.keyCodes = new Proxy();

//第二个使用的地方
if (hasProxy) {
  // determine which proxy handler to use
  vm._renderProxy = new Proxy(vm, handlers);
} else {
  vm._renderProxy = vm;
}
```

## 文档

[逐行解析 github: 参考](https://github.com/qq281113270/vue/blob/master/vue.js)  
[架构解析: 参考](https://zhuanlan.zhihu.com/p/419896443)
