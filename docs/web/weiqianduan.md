## 微前端

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

## qiankun.js

- import { registerMicroApps, start, loadMicroApp } from 'qiankun';
- qiankun 是一个基于 single-spa 的微前端实现库

### registerMicroApps 在主应用中路由模式注册微应用

```js
import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: "react app", // app name registered
    entry: "//localhost:7100",
    container: "#yourContainer",
    activeRule: "/yourActiveRule",
  },
  {
    name: "vue app",
    entry: { scripts: ["//localhost:7100/main.js"] },
    container: "#yourContainer2",
    activeRule: "/yourActiveRule2",
  },
]);

start();
```

### loadMicroApp:如果微应用不是直接跟路由关联的时候，你也可以选择手动加载微应用的方式

```js
import { loadMicroApp } from "qiankun";

loadMicroApp({
  name: "app",
  entry: "//localhost:7100",
  container: "#yourContainer",
});
```

## 微应用生命周期

**微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。**

```js
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  ReactDOM.render(
    <App />,
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}
```

## 微应用 webpack 配置导出 umd 格式

- 1. 新增 public-path.js 文件，用于修改运行时的 publicPath
- 2. 微应用建议使用 history 模式的路由，需要设置路由 base，值和它的 activeRule 是一样的
- 3. 在入口文件最顶部引入 public-path.js，修改并导出三个生命周期函数。
- 4. 修改 webpack 打包，允许开发环境跨域和 umd 打包。

```js
const packageName = require("./package.json").name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

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
