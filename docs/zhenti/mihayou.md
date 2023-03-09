# 米哈游

## 预处理语言怎么使用

[自己笔记：less](/web/less.html)  
[自己笔记：scss](/web/scss.html)

## 如何阻止样式穿透

scoped, 或者设置样式前缀

## vue 解决样式冲突与样式穿透

- 使用 scoped 解决样式冲突
- 样式穿透的写法有三种：>>>、/deep/、::v-deep
  - 如果项目使用的是 css 原生样式，那么可以直接使用 >>> 穿透修改
  - 项目中用到了预处理器 scss 、sass、less 操作符 >>> 可能会因为无法编译而报错 。可以使用 /deep/
    注意：vue-cli3 以上版本不可以

```less
/*  用法：  */
div >>> .cla {
  color: red;
}

/*  用法：  */
div /deep/ .cla {
  color: red;
}

/*  用法：  */
div ::v-deep .cla {
  color: red;
}
```

```less
<style lang="less" scoped>
  /deep/ .title {
    color: aqua;
  }
</style>
```

**scoped 原理是给每个组件的样式增加唯一的[data-v-xxxx]属性**
**用了样式穿透后，在 deep 之后的选择器最后就不会加上标识。**

[参考 vue 样式穿透](https://blog.csdn.net/weixin_45272449/article/details/123083687)

## 组件懒加载

- npm install vue-lazyload --save 图片懒加载
- component: resolve=>(require(["@/components/HelloWorld"],resolve)) } ] })
- component: () => import(/_ webpackChunkName: "con" _/ './xxx.vue') 配合 SplitChunksPlugin 代码分割插件默认只处理异步 chunk
- runtime 分包 : 配置方法：entry.runtime (webpack5) 或 optimization.runtimeChunk

## es6 的新特征

[自己笔记 es6：参考](/web/es6.html)  
[自己笔记 es6 前十特性：参考](/web/mianshi1.html#es6-排名前十的最佳特性)

## Vue 生命周期

## vue3 中异步请求还没结束，组件销毁了，数据应该办？处理不？怎么处理？

数据还会继续请求，应该给它终止了。

### 解决思路

方法：利用 axios 的 CancelToken 取消还没执行完毕的异步请求，由路由守卫做处理，使用 pnia 将要取消的请求放入全局进行状态管理。

## $attrs

除了 props 和 style 和 class 定义的东西，可以通过 v-bind="$attrs" 将父组件传递的东西，传给子组件

- inheritAttrs: false 的含义是不希望本组件的根元素继承父组件的 attribute，默认是 true. 同时父组件传过来的属性（没有被子组件的 props 接收的属性），也不会显示在子组件的 dom 元素上，但是在组件里可以通过其$attrs 可以获取到没有使用的注册属性, `inheritAttrs: false`是不会影响 style 和 class 的绑定

## $listeners

包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

- 移除 $listeners ($listeners 对象在 Vue 3 中已被移除。事件监听器现在是 $attrs 的一部分：)

- $attrs和$listeners 在配合 inheritAttrs: false, // 默认是 true 就可以将属性不挂到 html 上

- $attrs/$listeners 也可以适合隔代组件通信

- 组件传值时使用： 爷爷在父亲组件传递值，父亲组件会通过$attrs获取到不在父亲props里面的所有属性，父亲组件通过在孙子组件上绑定$attrs 和 $listeners 使孙组件获取爷爷传递的值并且可以调用在爷爷那里定义的方法；

```
在中间组件parent:<\child v-bind="$attrs" v-on="$listeners"><\/child>
在child组件直接props获取爷爷传递的值并且可以调用在爷爷那里定义的方法
在爷爷组件直接:像引用子组件一样调用孙组件$emit方法
```

```
provide/inject 父组件给孙子组件传值 需要传递对象类型，不然不是响应式的。
provide 写在祖先上，在孙组件上直接 inject
```

## $slots,

在渲染函数中，可以通过 this.$slots 来访问插槽：

```js
export default {
  props: ["message"],
  render() {
    return [
      // <div><slot /></div>
      h("div", this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        "div",
        this.$slots.footer({
          text: this.message,
        })
      ),
    ];
  },
};
```

```js
// <div><slot /></div>
<div>{this.$slots.default()}</div>

// <div><slot name="footer" :text="message" /></div>
<div>{this.$slots.footer({ text: this.message })}</div>

```

## slot 使用,

定义插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

使用插槽

<!-- v-slot 有对应的简写 #，因此 <template v-slot:header> 可以简写为 <template #header> -->

```html
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

```html
<BaseLayout>
  <template #header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

## watch、computed 区别与场景,

## promise 状态、使用,

**Promise 的三种状态**

1. pending ：等待状态，比如正在进行网络请求。
2. fulfil： 满足状态，当我们主动回调了 resolve()时，接口调用成功，就处于该状态，并且会回调.then()
3. rejcet： 拒绝状态,当我们主动回调了 reject()时，接口调用失败，就处于该状态，并且会回调.catch()

## v-if 从 true 到 false 的过程，

- v-show 由 false 变为 true 的时候不会触发组件的生命周期。是控制 css 的 display 是否为 none 来隐藏或展示
- v-if 由 false 变为 true 的时候，触发组件的 beforeCreate、create、beforeMount、mounted 钩子，
- 由 true 变为 false 时触发组件的 beforeDestory、destoryed 方法。
- v-if 有更高的切换消耗，v-show 有更高的初始渲染消耗。

## 实现浅拷贝/深拷贝方法？每个方法怎么实现的？

[自己笔记:深浅拷贝](/web/mianshi.html#js-深拷贝浅拷贝有哪几种方式)

## 事件委托原理？场景？

**原理：**
事件委托就是基于 js 的事件流产生的，事件委托是利用事件冒泡，将事件加在父元素或者祖先元素上，触发该事件

```html
<ul id="ul">
  <li data-id="a">1</li>
  <li data-id="b">2</li>
  <li data-id="c">3</li>
  <li data-id="d">4</li>
</ul>
```

```js
let ul = document.getElementById("ul");
ul.onclick = function (event) {
  console.log(
    event,
    event.target,
    event.target.dataset,
    event.target.dataset.id
  );
};
```

## webpack 的 loader 和 plugin 有啥区别

[参考自己笔记:webpack](/webpack/mianshi.html#loader-和-plugin-的区别是什么)

## 事件循环

## vue 组件传值

## git 命令

- git rebase -i 合并多个 commit

## vue 响应式原理

## 改变 this 指向 call apply bind

[自己笔记:参考](/web/mianshi.html#改变-this-指向-call-apply-bind)

## 怎么样通过 JS 去阻止冒泡

- stopPropagation
- stopImmediatePropagation
- preventDefault

[自己笔记:参考](/web/zhishi.html#preventdefault-与-stoppropagation-与-stopimmediatepropagation)

## 箭头函数和 function 函数区别

## 箭头函数 this 指向的工作流程

## 堆、栈

[自己笔记: 堆、栈](/suanfa/#堆、栈、队列之间的区别是)

## let const var 区别

- var 会提升变量的声明到作用域的顶部，但 let 和 const 不会
- var 允许重复声明，let、const 不允许
- const 声明的变量不能修改，否则会报错
- let、const 有块级作用限制，可能会出现暂时性死区
  [自己笔记: let const var](/web/es6.html#var-let)

## CSS 定位 pisition-5 种

- static: 默认值 元素不会受到 top, bottom, left, right 影响
- relative: 相对定位元素的定位是相对其正常位置
- fixed: 对于浏览器窗口是固定位置, 即使窗口是滚动的它也不会移动
- absolute: 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于 html:
- sticky: 粘性定位, 指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
  - 页面滚动超出目标区域时,固定在目标位置

[CSS 定位:pisition:菜鸟](https://www.runoob.com/css/css-positioning.html)

## positive 的 static 属性是否可以设置 z-index

不可以设置无效

## flex 常用属性

### 父元素属性

```css
.parent {
  display: flex;
  justify-content: center; //水平方向布局
  align-items: center; //垂直方向布局 (侧轴单行使用)
  flex-direction: row; //设置主轴的方向
  flex-wrap: wrap; //是否允许换行
  align-content: center; // 设置侧轴的子元素的排列方式（多行才生效）
}
```

- justify-content:水平方向布局

  - center:水平居中;
  - flex-start:靠左;
  - flex-end:靠右；
  - space-between:两边的向两边靠，中间等分；
  - space-around:环绕，完美的平均分配

- align-items:垂直方向布局(也被称为侧轴方向); （单行）

  - center:垂直居中、
  - flex-start：至顶、
  - flex-end:至底、
  - space-between:两边的向两边靠，中间等分；
  - space-around:环绕，完美的平均分配

- flex-direction://设置主轴的方向

  - row:从左到右，
  - row-reverse:从右向左
  - column:从上向下的排列，
  - column-reverse:从下向上

- flex-wrap 是否允许换行

  - warp 允许换行： 从上往下
  - nowarp 不允许换行: 默认值
  - wrap-reverse 允许换行： 从下往上

- align-content: 设置侧轴的子元素的排列方式（多行才生效）

  - center:垂直居中、
  - flex-start：至顶、
  - flex-end:至底、
  - space-between:两边的向两边靠，中间等分；
  - space-around:环绕，完美的平均分配
  - stretch: 默认值。元素被拉伸以适应容器。
  - [在线测试](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=stretch)

- flex-flow:复合属性，相当于同时设置了 flex-direction 和 flex-wrap

### align-content 和 align-items 区别

- align-items 适用于单行情况下，只有上对齐、下对齐居中和拉伸
- align-content 适应于换行(多行)的情况下(单行情况下无效)，可以设置上对齐、下对齐、 居中、拉伸以及平均分配剩余空间等属性值。
- 总结就是单行找 align-items 多行找 align-content

### 子元素属性

```css
.child {
  flex: 1;
}

.item:nth-child(2) {
  align-self: center; //属性允许单个项目有与其他项目不一样的对齐方式,可覆盖align-items属性。
}
```

- flex:1 //flex:1 === flex:1 1 0%

  - flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。
  - flex-grow 变大 => 0 不允许变大
  - flex-shrink 缩小 => 0 不允许缩小
  - flex-basis 原本大小

- align-self
  - 默认值为 auto ,表示继承父元素的 align-items 属性,如果没有父元素,则等同于 stretch.
  - center 元素位于容器的中心
  - flex-start 元素位于容器的开头。
  - flex-end 元素位于容器的结尾。
  - baseline 元素位于容器的基线上。
- order
  - 数值越小,排列越靠前,默认为 0。

[阮一峰:参考](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## flex:1 和 flex auto 的区别

```
flex:none;   // flex : 0,0,auto;
flex:auto;  // flex : 1,1,auto;
flex:1;    //  flex : 1,1,0%;
```

- flex:1 和 flex:auto 的区别主要是在于 flex-basis
- flex:1 不管内容多少，一般都是平分空间，空间大小都一致, 设置的 width 无效
- flex:auto 是根据内容的大小来分，不是平分的，原本大的多分，原本小的少分（除非内容都是一样，才平分）

## Flex 具体含义

- Flex 是 Flexible Box 的缩写，意为”弹性布局”
- 是一种布局方式，类似于 block，inline-block 等。

## promise.all 成功返回的是什么

- 都成功的话，返回的是一个 promise 成功数组
- 只要有一个失败，代码就会报错，终止执行，可以加.catch(() => "error")来解决。 返回的就是 catch 中返回的，没有返回就是 undefined

```js
async init() {
      let p1 = new Promise((resolve, reject) => {
        resolve("成功了");
      });

      let p2 = new Promise((resolve, reject) => {
        resolve("success");
      });

      let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("失败");
        }, 3000);
      });

      let a = await Promise.all([p1, p2]);

      console.log(a);//['成功了', 'success']

      let b = await Promise.all([p1, p3, p2]);
      //3s后会报错，不会在往下走，所以Promise.all建议使用.then  和.catch
      console.log(b);
    },
```

## promise.race( )

Promise.race 是赛跑的意思，也就是说 Promise.race([p1, p2, p3])里面的结果哪个获取的快，就返回哪个结果，不管结果本身是成功还是失败

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([p1, p2]).then(function (value) {
  console.log(value); // "two"
  // 两个都完成，但 p2 更快
});
```

[参考 mdn:promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

## css 实现元素居中的 5 种方法

```html
<div class="parent">
  <div class="child"></div>
</div>
```

### 一：父元素设置 display:flex,子元素 margin: auto

```css
<style>
    .parent {
      width: 300px;
      height: 200px;
      background: rebeccapurple;
      display: flex;
    }
    .child {
      width: 50px;
      height: 50px;
      background: red;
      margin: auto;
    }
  </style>

```

### 二：父元素设置 relative,子元素 absolute,加 margin: auto

```css
.parent {
      width: 300px;
      height: 200px;
      background: pink;
      position: relative;
    }
    .child {
      width: 50px;
      height: 50px;
      background: gold;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
```

### 三：定位配合 css3 位移 transform: translate(-50%,-50%);

```css
 .parent {
      width: 300px;
      height: 200px;
      background: rgb(203, 192, 255);
      position: relative;
    }
    .child {
      width: 50px;
      height: 50px;
      background: rgb(221, 201, 73);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
```

### 四：弹性盒模型 display:flex justify-content: center

```css
.parent {
  width: 300px;
  height: 200px;
  background: rgb(203, 192, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}
.child {
  width: 50px;
  height: 50px;
  background: rgb(62, 57, 24);
}
```

### 五：网格布局 Grid

```css
.parent {
  width: 300px;
  height: 200px;
  background: green;
  display: grid;
  justify-content: center;
  align-items: center;
}
.child {
  width: 50px;
  height: 50px;
  background: rebeccapurple;
}
```

[参考:css 居中](https://blog.csdn.net/chaoPerson/article/details/126987151)

## HTTP 协议

- HTTP 协议：是 W3C 制定的一种超文本传输协议。

### 包含三个部分组成

- 第一部分：请求方式（7 种
- 第二部分：URI
- HTTP 版本协议号 请求头等

## post 请求和 get 请求区别

### get 请求

- get 请求：发送数据的时候，数据会挂在 URI 的后面
- get 请求：只能发送普通的字符串。并且发送的字符串长度有限制(一般在 2kb-8kb)
- get 请求支持缓存
  - get 请求里面的 response header: cache-control 和 expires 设置配置强缓存
  - 根据请求头中的 If-Modifed-Match 与文件的 mtime 时间进行比较 设置协商缓存
- get 请求：在 W3C 中是这样说的：get 请求比较适合从服务端获取数据
  - 像一些静态资源，图片 css 等

[express 配置强缓存和协商缓存](https://blog.csdn.net/Dpl0216/article/details/128142840)

### post 请求

- post 请求：可以发送任何类型的数据，包括普通字符串，流媒体等信息：视频、声音、图片。
- post 请求：可以发送大数据量，理论上没有长度限制。
- post 请求不支持缓存
- post 请求：在 W3C 中是这样说的：post 请求比较适合从服务端传送数据

## nginx 属性

[参考自己：nginx 笔记](/node/nginx.html)

## 在 created 怎么获取 dom 的

this.$nextTick()在下次 DOM 更新循环之后执行的延迟回调。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

## async await 出现 reject 会不会往下执行

不会, 因为会直接报错

### 解决办法

1. try/catch
2. 后面接一个.catch()
3. 外层包装一层 promise 处理

```js
const p = async () => {
  try {
    let aaa = await timeout(1);
    console.log(aaa);
  } catch {
    console.log("error");
  }
};
```

```js
const p = async () => {
  let aaa = await timeout(1).catch((_) => "error");
  console.log(aaa);
};
```

## 浏览器同源策略

- 是浏览器的一种安全机制，服务端之间是不存在跨域的
- 浏览器的同源策略会导致，和不同源的客户端无法通信
- 浏览器的同源策略会导致，和不同源的服务器也无法通信
  [参考自己笔记: 同源策略](/web/mianshi_lilun1.html#浏览器同源策略)

## 跨域产生的原因 解决方法

### 1、跨域的原因

- 跨域是是因为浏览器的同源策略限制，是浏览器的一种安全机制，服务端之间是不存在跨域的。

- 所谓同源指的是两个页面具有相同的协议、主机和端口，三者有任一不相同即会产生跨域。

### 2、跨域的解决办法

#### 1、跨域资源共享 cors 解决跨域

- Access-Control-Allow-Origin 设置白名单
- 注意：如果要发送 cookie，Access-Control-Allow-Origin 的值不能为 \* ，只能是具体的域名。

#### 2、Jsonp 是一种跨域解决方案。

- Jsonp 跨域其实是利用了 src 的属性特点, img，script 都有 src 属性。利用标签中的 src 属性，不受到跨域限制的特点。可以拿到外部资源。
- 就是利用 script 标签，可以跨域请求云端的资源。并且把云端的资源请求到本地。把资源作为脚本来运行
- JSONP 仅支持 get 请求，并且需要后端的支持。

#### 3、nignx 反向代理

nignx 反向代理: 暴露的是代理服务器地址，隐藏了真实服务器 IP 地址

```js
server {
        listen       9001;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

		location ~ /hosp/ {
			proxy_pass http://localhost:8201;
		}

		location ~ /cmn/ {
			proxy_pass http://localhost:8202;
		}

```

#### 4、websocket

利用 websocket，实现浏览器与服务器的全双工通信，同时允许跨域通讯。

#### 5、iframe

iframe 搭配 document.domain、location.hash、window.name 三种方式实现跨域。

#### 6、node 作为中间件代理

启用一个本地的 node 服务器充当中间件，进行跨域处理。

代理服务器，需要做以下几个步骤：

1. 接受客户端请求 。

2. 将请求 转发给服务器。

3. 拿到服务器 响应 数据。

4. 将 响应 转发给客户端

[跨域参考:必看](https://blog.csdn.net/weixin_43831204/article/details/109633953)

## 跨域时浏览器是否携带 cookie，

- 默认情况下是跨域是不会携带 cookie 的
- 如果需要携带，则需要做一下配置

## 怎么在跨域的情况下把 cookie 送出去

**前端配置**

- XMLHttpRequest 发请求需要设置 withCredentials=true
- fetch 发请求需要设置 credentials = include

**服务端配置**

- Access-Control-Allow-Credentials: true

- Access-Control-Allow-Origin: [特定域名] // 不可以是\*

```
因为最新版本谷歌浏览器 samesite 属性默认是 lax，lax 模式在很多情况都是不允许跨域携带 cookie，
所以必须要把 samesite 设置为 none，
但是设置为 none 有一个要求，就是必须 secure 属性为 true，也就是必须使用 https 。

设置 cookie 增加配置
sameSite: 'none'
secure: true
```

## 客户端之间非同源跨域怎么通信

### 1、postMessage 解决客户端之间的跨域

postMessage 是 HTML5 XMLHttpRequest Level 2 中的 API，且是为数不多可以跨域操作的 window 属性之一，它可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递

- 多窗口之间消息传递

- 页面与嵌套的 iframe 消息传递

### 2、location.hash + iframe

### 3、document.domain + iframe

### 4、window.name + iframe

## 跨域代理的实现原理

同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。

## 服务端和服务端交互会不会产生跨域

不会

## 简单请求和非简单请求

非简单请求, 请求之前会发送一次 options 预检请求

### 工作中比较常见的简单请求：

- 请求方法为：HEAD、GET、POST 中的一种。
- HTTP 请求头中字段不超过：Accept、Accept-Language、Content-Language、Last-Event-ID
- Content-Type 字段值为 application/x-www-form-urlencoded、multipart/form-data、text/plain 中的一种。
  满足以上条件的即为简单请求，否则即为非简单请求。

### 工作中常见的非简单请求：

- 请求方法为 put、delete.
- 发送 JSON 格式的 ajax 请求。
- http 中带自定义请求头

## 运算题

```js
new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3);
  reject(4);
  console.log(5);
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); //1 3 5 2
```
