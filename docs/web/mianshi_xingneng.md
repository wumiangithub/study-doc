# 前端常见面试题-性能优化

## 性能优化

- 使用 Chrome Performance 查找性能瓶颈

- 减少 http 请求，合并 http 请求(浏览器同域名请求的最大并发数限制 6，不同浏览器版本限制不一样)

- 合理使用浏览器缓存

- 启用 GZip 压缩：前后端都要开启

- CSS Sprites：合并 CSS 图片，减少请求数的又一个好办法。

- LazyLoad Images：在页面刚加载的时候可以只加载第一屏，当用户继续往后滚屏的时候才加载后续的图片

- CSS 放在页面最上部，javascript 放在页面最下面：让浏览器尽快下载 CSS 渲染页面

- 减少 cookie 传输 静态资源使用独立域名访问，避免请求静态资源时发送 cookie，减少 cookie 传输次数

- 减少 DOM 嵌套层数

- CSS 选择符优化。css 解析是从右到左的。 不要写成 #box .li p 直接写成 .p

- CDN 加速 将通用的库从 vendor 进行抽离

- 懒加载，按需加载

- 服务端渲染 :服务端渲染只支持 beforCreate 和 created 两个钩子函数 react 只会执行到 componentDidMount 之前的生命周期钩子

- 离线包

- webpack-bundle-analyzer 可视化分析

- 预渲染: 借助:prerender-spa-plugin

- 提取公共代码，封装公共组件

- 减少 ES6 转为 ES5 的冗余代码

- Webpack 对图片进行压缩, 或者使用远程 cdn 图片

- 可以用事件委托 避免大量绑定导致内存占用过多

- SourceMap

  - 开发环境适合使用
    - eval
    - eval-source-map 第一次启动项目很慢，但是开发更新很快
    - cheap-eval-source-map
    - cheap-module-eval-source-map
  - 生产环境适合使用

    - 不使用 devtool
    - source-map 你应该将你的服务器配置为，不允许普通用户访问 source map 文件！
    - nosources-source-map
    - hidden-source-map

## VUE 性能优化

- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景, watch 适合做一些异步耗时工作, computed 做一些逻辑计算
- 合理正确使用 key

### defineAsyncComponent

```
import { defineAsyncComponent } from 'vue';
const Richtext = defineAsyncComponent(() => import(/_ webpackChunkName: "Richtext" _/ './Richtext.vue'));
export default Richtext;
```

## REACT 性能优化

- ImmutableJS  
  facebook 提供了 immutable-js 这个库，ImmutableJS 提供了不可变的数据，  
   即要让数据改变只能通过创建新数据的方式，而不能直接修改，这很大程度的降低了前后两个数据比较时的复杂度。  
   seamless-immutable  
   由于 Immutable 库比较大，所以如果在 React 中引用该库也是比较大的负担，有一个 Immutablejs 库的简易版叫做 seamless-immutable，  
   该库只支持 Map,Set,List 三种数据类型，但相对 Immutable 来说较小，对应用的负担也小。  
   redux-immutable  
   [参考](https://segmentfault.com/a/1190000017294051)  
   [官网](https://immutable-js.github.io/immutable-js)

### @loadable

```
import Loadable from '@loadable/component';
export const File = Loadable(() => import(/* webpackChunkName: 'Component.File' */ 'components/base/File'));
```

## 微信小程序性能优化

- 长列表优化：绑定 key  
   采用二维数组，优化长列表  
   that.setData({
  ["productList[" + currentPage + "]"]: listData,
  currentPage: currentPage
  });  
   如果还要优化，那就是。监听滚动, 只渲染部分。  
   对于滚动的优化，可以做函数节流操作

## 骨架屏原理：

引入插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

## 图片懒加载怎么用 js 去实现：

getBoundingClientRect()//获取元素的大小及位置

## 服务端渲染：

简单理解是将组件或页面通过服务器生成 html 字符串，再发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序

不使用的话，body 里面是空的，使用的话，发起请求 body 里面直接就有 html 内容了，然后浏览器结合 css 渲染就可以

**优势：**
有利于 SEO：由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
有利于加快首屏渲染速度

**缺陷：**
服务器压力大
在服务端渲染中，只会执行到 componentDidMount 之前的生命周期钩子
只有 beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用。

**服务端渲染框架：**

- vue 使用 Nuxt.js
- react 使用 next.js

**服务器端渲染 vs 预渲染 (SSR vs Prerendering)**

如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。
无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。
优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。

如果你使用 webpack，你可以使用 prerender-spa-plugin 轻松地添加预渲染。它已经被 Vue 应用程序广泛测试 - 事实上，作者是 Vue 核心团队的成员。

## webpack 预加载

```
webpackPrefetch:true

利用 import 按需引入
document.getElementById("app").onclick = function () {
import(/_ webpackChunkName: 'test'_/"./test").then((result) => {

        })

}

在加上 webpackPrefetch:true 就变成了预加载
document.getElementById("app").onclick = function () {
import(/_ webpackChunkName: 'test', webpackPrefetch:true _/"./test").then((result) => {

        })

}

正常加载，可以认为是并行加载（同一时间加载多个文件）预加载 prefetch 等其他资源加载完毕，浏览器空闲了在偷偷加载资源

预加载只有高版本浏览器支持
```

## dns-prefetch

```
会在空闲时间，去将域名解析到对应的ip地址

<link rel="dns-prefetch" href="//www.qibi.work" />


DNS Prefetch 应该尽量的放在网页的前面，推荐放在 <meta charset="UTF-8"> 后面。具体使用方法如下：
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//www.zhix.net">
<link rel="dns-prefetch" href="//api.share.zhix.net">
<link rel="dns-prefetch" href="//bdimg.share.zhix.net">


如果需要禁止隐式的 DNS Prefetch，可以使用以下的标签：
<meta http-equiv="x-dns-prefetch-control" content="off">

DNS解析就是将域名解析到对应ip地址
大致时间在20-120ms
```

## prefetch

```
空闲时间加载一张图片 ，只是不渲染
<link rel="prefetch" href="/images/test.jpg"/>


在 Chrome 下，我们可以用 link标签声明特定文件的预加载：

XML/HTML Code

<link rel='subresource' href='critical.js'>
<link rel='subresource' href='main.css'>
<link rel='prefetch' href='secondary.js'>
在 Firefox 中或用 meta 标签声明：

XML/HTML Code

<meta http-equiv="Link" content="<critical.js>; rel=prefetch">


rel='subresource' 表示当前页面必须加载的资源，应该放到页面最顶端先加载，有最高的优先级。
rel='prefetch' 表示当 subresource 所有资源都加载完后，开始预加载这里指定的资源，有最低的优先级。
注意：只有可缓存的资源才进行预加载，否则浪费资源！
```

## prerender

```
XML/HTML Code

<link rel='prerender' href='http://www.pagetoprerender.com'>
rel='prerender' 表示浏览器会帮我们渲染但隐藏指定的页面，一旦我们访问这个页面，则秒开了！
在 Firefox 中或用 rel='next' 来声明

XML/HTML Code

<link rel="next" href="http://www.pagetoprerender.com">
```

```
不是所有的资源都可以预加载
当资源为以下列表中的资源时，将阻止预渲染操作：
1.URL 中包含下载资源
2.页面中包含音频、视频
3.POST、PUT 和 DELETE 操作的 ajax 请求
4.HTTP 认证(Authentication)
5.HTTPS 页面
6.含恶意软件的页面
7.弹窗页面
8.占用资源很多的页面
9.打开了 chrome developer tools 开发工具

手动触发预渲染操作
在 head 中强势插入 link[rel='prerender'] 即可：

JavaScript Code

var hint =document.createElement("link")
hint.setAttribute(“rel”,”prerender”)
hint.setAttribute(“href”,”next-page.html”)
document.getElementsByTagName(“head”)[0].appendChild(hint)
```

## createDocumentFragment

createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。

当需要添加多个 dom 元素时，如果先将这些元素添加到 DocumentFragment 中，再统一将 DocumentFragment 添加到页面，会减少页面渲染 dom 的次数，效率会明显提升。

```js
// 传统
var ul = document.getElementById("ul");
for (var i = 0; i < 20; i++) {
  var li = document.createElement("li");
  li.innerHTML = "index: " + i;
  ul.appendChild(li);
}

// 高效
var ul = document.getElementById("ul");
var fragment = document.createDocumentFragment();
for (var i = 0; i < 20; i++) {
  var li = document.createElement("li");
  li.innerHTML = "index: " + i;
  fragment.appendChild(li);
}
ul.appendChild(fragment);
```

```js
function getFragment(el) {
  const f = document.createDocumentFragment();
  let firstChild;
  while ((firstChild = el.firstChild)) {
    //通过while循环firstChild可以拿到所有子节点
    f.appendChild(firstChild);
  }

  return f;
}
let root = document.getElementById("app");
let fragment = getFragment(root); //将所有dom转为文档碎片
root.appendChild(fragment); //将碎片重新添加到dom中      没哟这一步的话，页面是空白的
console.log(fragment);
```

## for 循环阻塞主线程

for 循环是会阻塞 主线程的  
但是 for 循环里面做的事情可以是异步的，比如定时器

```js
console.log("start");
for (let i = 0; i < 1000; i++) {
  console.log(i);
  setTimeout(() => {
    console.log("setTimeout", i); //0-999   换成var的话拿到的全是1000
  }, 1000);
}
console.log("end", i); //for 循环执行完之后，才会执行     i is not defined    换成var的话拿到的是1000
```

```js
// for循环睡眠方法
function sleep(delay) {
  //delay:传入等待秒数
  var start = new Date().getTime(); //获取函数刚开始秒数
  for (; new Date().getTime() - start < delay; ) {
    //当当前时间减去函数刚开始时间小于等待秒数时，循环一直进行
  }
}
```

```js
/* 
死亡睡眠方法，直接终端浏览器所有功能
*/
function sleepSync(numberMillis) {
  let exitTime = Date.now() + numberMillis;
  while (numberMillis) {
    if (Date.now() > exitTime) return;
  }
}

/* 
异步睡眠方法  推荐
*/
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
```

## Web Worker

```
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。
```

> [参考](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

## requestAnimationFrame

```
【1】requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率

【2】在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量

【3】requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销
```

## requestIdleCallback

```
通过上图可看到，一帧内需要完成如下六个步骤的任务：

处理用户的交互
JS 解析执行
帧开始。窗口尺寸变更，页面滚去等的处理
requestAnimationFrame(rAF)
布局
绘制
requestIdleCallback
上面六个步骤完成后没超过 16 ms，说明时间有富余，此时就会执行 requestIdleCallback 里注册的任务。

timeout。表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲。
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
```

> [参考](https://www.jianshu.com/p/2771cb695c81)

## IntersectionObserver

```
网页开发时，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它
传统的实现方法是，监听到scroll事件后，调用目标元素（绿色方块）的getBoundingClientRect()方法，
得到它对应于视口左上角的坐标，再判断是否在视口之内。
这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成性能问题。


目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。
由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。


IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。

规格写明，IntersectionObserver的实现，应该采用requestIdleCallback()，
即只有线程空闲下来，才会执行观察器。
这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。
```

> [参考-阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

## getBoundingClientRect

```
getBoundingClientRect   可返回元素距离页面顶部的距离
let box = document.getElementById("box");
    console.log(document.getElementById("li11").getBoundingClientRect())
    box.addEventListener("scroll",function (e) {
            // console.log(e);
            // console.log(document.getElementById("box").getBoundingClientRect())
            console.log(document.getElementById("li11").getBoundingClientRect())
    })
```
