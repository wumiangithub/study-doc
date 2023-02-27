# web 知识点

## attachShadow

ShadowDOM 最大的用处应该是隔离外部环境用于封装组件  
我们可以轻松地封装一个组件然后可以跨项目共享这个组件。  
样式也被封装，我们甚至可以不用写 CSS 样式完全在我们的组件中，这样就防止开发人员随意修改样式

```js
// let shodowDOM = document.getElementById('shadow').attachShadow({mode: "closed"});
let shodowDOM = shadow.attachShadow({ mode: "closed" }); //直接这样，不用getElementById居然也是可以的
let shadowDom = shadow.attachShadow({ mode: "open" });
let pElem = document.createElement("p");
let styleElem = document.createElement("style");

styleElem.innerHTML = "p{color:red}";
pElem.innerHTML = "hello shadow";

shadowDom.appendChild(pElem);
// 外部样式影响不了影子节点内部样式
document.body.appendChild(styleElem);

console.log(document.getElementById("shadow").firstChild); // 返回null
console.log(document.getElementById("shadow").shadowRoot.firstChild);
// 返回影子节点
```

## BFF 项目

BFF——服务于前端的后端(Back-end For Front-end)  
如：graphql

## preventDefault stopPropagation stopImmediatePropagation

### stopImmediatePropagation() 和 stopPropagation()的区别

后者只会阻止冒泡或者是捕获。 但是前者除此之外还会阻止该元素的其他事件发生，但是后者就不会阻止其他事件的发生。

[参考](https://zhuanlan.zhihu.com/p/389150328)

## 微服务

### 什么是微前端

- 微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。

#### 微前端架构具备以下几个核心价值：

- 技术栈无关

  - 主框架不限制接入应用的技术栈，微应用具备完全自主权

- 独立开发、独立部署

  - 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

- 增量升级

  - 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

- 独立运行时
  - 每个微应用之间状态隔离，运行时状态不共享-

### qiankun.js

- import { registerMicroApps, start, loadMicroApp } from 'qiankun';
- qiankun 是一个基于 single-spa 的微前端实现库
  [qiankun 官网](https://qiankun.umijs.org/zh/)

总结一下，qiankun 一共有 3 种沙箱：

- SnapshotSandbox：记录 window 对象，每次 unmount 都要和微应用的环境进行 Diff
- LegacySandbox：在微应用修改 window.xxx 时直接记录 Diff，将其用于环境恢复
- ProxySandbox：为每个微应用分配一个 fakeWindow，当微应用操作 window 时，其实是在 fakeWindow 上操作
  要和这些沙箱结合起来使用，qiankun 会把要执行的 JS 包裹在立即执行函数中，通过绑定上下文和传参的方式来改变 this 和 window 的值，让它们指向 window.proxy 沙箱对象，最后再用 eval 来执行这个函数。

### ProxySandbox 沙箱原理

```
前面两种沙箱都是 单例模式 下使用的沙箱。也即一个页面中只能同时展示一个微应用，而且无论是 set 还是 get 依然是直接操作 window 对象。

在这样单例模式下，当微应用修改全局变量时依然会在原来的 window 上做修改，因此如果在同一个路由页面下展示多个微应用时，依然会有环境变量污染的问题。

为了避免真实的 window 被污染，qiankun 实现了 ProxySandbox。它的想法是：

把当前 window 的一些原生属性（如document, location等）拷贝出来，单独放在一个对象上，这个对象也称为 fakeWindow

之后对每个微应用分配一个 fakeWindow

当微应用修改全局变量时：如果是原生属性，则修改全局的 window

如果是原生属性，则修改 fakeWindow 里的内容

微应用获取全局变量时：如果是原生属性，则从 window 里拿

如果不是原生属性，则优先从 fakeWindow 里获取

这样一来连恢复环境都不需要了，因为每个微应用都有自己一个环境，当在 active 时就给这个微应用分配一个 fakeWindow，当 inactive 时就把这个 fakeWindow 存起来，以便之后再利用。
```

[沙箱原理：参考](https://www.ezd.cc/zs/30565.html)

### wujie.js

### [single-spa](https://zh-hans.single-spa.js.org/docs/getting-started-overview/)

### MicroApp 京东提供

[MicroApp 官网](https://zeroing.jd.com/)

### Why Not Iframe

**iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决**

- UI 不同步，DOM 结构不共享
- iframe 通信不方便, 内存变量不共享
- 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程
- url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用

## Iframe 通信

iframe 通信方式：

- 同域直接通过 iframe 的 contentWindow 和 parent 去操作相应的窗口内的 window.document....
- 主域不同，设置 document.domain 就可以如上操作
- 跨域及不跨均可应用：window.name、location.hash、postMessage 和 onmessage

[Iframe 通信: 参考](https://blog.csdn.net/CamilleZJ/article/details/128056333)
