# vue2

#### vue 2.0 是什么时候正式发布？

`2016年10月1日`
https://github.com/vuejs/vue/releases?page=12

#### 动态路由

`router.addRoutes(routes: Array<RouteConfig>)`

## 自定义指令的 5 钩子函数

一个指令定义对象可以提供如下 5 钩子函数 (均为可选)：

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

我们会在稍后讨论渲染函数时介绍更多 VNodes 的细节。

- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- unbind：只调用一次，指令与元素解绑时调用。

## SSR 服务端渲染

服务端渲染只支持 beforCreate 和 created 两个钩子函数  
ssr 不支持 beforeMount 、mounted 钩子函数，所以 ajax 请求放在 created 中有助于一致性；

## Vue 的父组件和子组件生命周期钩子函数执行顺序？

```
Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：


加载渲染过程
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted


子组件更新过程
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated


父组件更新过程
父 beforeUpdate -> 父 updated


销毁过程
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed


```

## 父组件可以监听到子组件的生命周期吗？

### 方式一：子组件通过$emit 触发

```js
// Parent.vue
<Child @mounted="doSomething"/>

// Child.vue
mounted() {
  this.$emit("mounted");
}
```

### 方式二：通过@hook 监听。

```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

## v-model 的原理？

v-model 本质上不过是语法糖

```js
<input v-model='something'>

相当于

<input v-bind:value="something" v-on:input="something = $event.target.value">
```

## vue-router 路由模式有几种？

**3 种**

其中，3 种路由模式的说明如下：

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；

- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；

- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

## 能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

### hash

- 基于 location.hash 来实现的
- location.hash 的值就是 URL 中 # 后面的内容
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

### history

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；

## 监听浏览器 url 变化

### popstate

```js
/*
popstate可以监听到
window.history.go();
window.history.back();
window.history.forward();
浏览器中点击后退和前进按钮也会触发popstate事件
*/
window.addEventListener("popstate", function (event) {
  console.log(event);
});
```

### replaceState 和 pushState

```js
// History.replaceState和pushState确实不会触发popstate事件
// 需要在加上这两个监听
window.addEventListener("replaceState", function (e) {
  console.log("THEY DID IT AGAIN! replaceState 111111");
});
window.addEventListener("pushState", function (e) {
  console.log("THEY DID IT AGAIN! pushState 2222222");
});
```

### 监听 hash 的改变

```js
window.onhashchange = function (event) {
  console.log(event);
};
//或者
window.addEventListener("hashchange", function (event) {
  console.log(event);
});
```

## Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？

我们阅读以上源码可知，vm.$set 的实现原理是：

如果目标是数组，直接使用数组的 splice 方法触发相应式；

如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

## watch 和 computed 的原理

**watch 是观察者**  
**computed 是惰性求值的订阅者**

computed 的值有缓存  
computed 内部实现了一个惰性的 watcher,也就是 computedWatchers  
computed 本质是一个惰性求值的订阅者

### 为什么 computed 有缓存功能？

因为当计算属性经过计算后，内部的标志位会表明已经计算过了，再次访问时会直接读取计算后的值；
其内部通过 this.dirty 属性标记计算属性是否需要重新求值

### 观察者模式和发布订阅模式区别

观察者模式和发布订阅模式很相似，区别就是 发布订阅者模式会有一个调度中心去互相联系，而观察者模式 只有观察者和被观察者有直系的联系

### watch 和 computed 的使用区别

- 简单计算使用 computed

- 异步耗时操作，或者需要那新老值的时候使用 watch

[参考](https://juejin.cn/post/6844903926819454983)

## nextTick 原理

**nextTick 的原理是利用事件循环**

- 在下次 DOM 更新结束之后执行的延迟回调。
- 在修改数据之后立即使用这个方法，获取更新后的 DOM

- 在 created()钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作并无作用，而在 created()里使用 this.$nextTick()可以等待 dom 生成以后再来获取 dom 对象

## 文档

> [vue2 官网](https://v2.cn.vuejs.org/)  
> [面试题](https://juejin.cn/post/6844903918753808398)
