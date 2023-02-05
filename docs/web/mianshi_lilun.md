# 前端常见面试题-理论

## seo 常用手段

- title 页面的标题
- meta name="description" content="前端学习笔记、前端面试题、vue 面试题、react 面试题"
- 语义化标签，h1 footer header
- 主要是 html 不是 js
- SSR 服务端渲染，或者使用预渲染

## 浏览器输入 url 按下回车后发生了什么-7 步

1.  一：输入地址。
2.  二：DNS 解析。 DNS 解析的过程就是寻找哪台机器上有你需要资源的过程
3.  三：TCP 连接。 主机浏览器通过 DNS 解析得到了目标服务器的 IP 地址后，与服务器建立 TCP 连接。(TCP 会触发 3 次握手)
4.  四：发送 http 请求。
5.  五：返回 http 响应。
6.  六：浏览器解析渲染页面。
7.  七：断开连接。(TCP 会触发 4 次挥手)
    > [浏览器输入 url 按下回车后发生了什么](https://zhuanlan.zhihu.com/p/78677852)

## html 页面渲染过程-4 步

1. 解析 html 文件，创建 DOM 树

```
自上而下解析，遇到任何样式（link、style）和脚本（script）都会阻塞
   1）css 加载不会阻塞 html 文件的解析，但会阻塞 dom 的渲染
   2）css 加载会阻塞后面 js 语句的执行
   3）js 会阻塞 html 的解析和渲染
   4）没有 defer 和 async 标签的 script 会立即加载并执行
   5）有 async 标签的 js，js 的加载执行和 html 的解析和渲染并行
   6）有 defer 标签的 js，js 的加载和 html 的解析和渲染并行，但会在 html 解析完成后执行,在触发 DOMContentLoaded 前执行
   7）DOMContentLoaded 和 onload 的区别：DOMContentLoaded 在 html 解析完毕后执行，loload 在页面完全加载完成后执行（包括样式和图片）
```

2. 解析 css，生成 CSSOM，css 对象模型
3. dom 和 css 合并，构建渲染树（Render Tree）
4. 布局（Layout）和绘制（Paint），重绘（repaint）和重排（reflow/回流）

```
   1）重绘：根据元素的新属性重新绘制，使元素呈现新的外观
   2）重排：当渲染树中的一部分因为元素的规模尺寸，布局，隐藏等改变而需要重新构建
   3）重排必定会引发重绘，但重绘不一定会引发重排
```

> [html 页面渲染过程](https://www.cnblogs.com/bear-blogs/p/9903936.html)

## JS 浏览器事件循环机制

### 进程、线程

- 进程是系统分配的独立资源，是 CPU 资源分配的基本单位，进程是由一个或者多个线程组成的。
- 线程是进程的执行流，是 CPU 调度和分派的基本单位，同个进程之中的多个线程之间是共享该进程的资源的。
- 浏览器是多进程的，浏览器每一个 tab 标签都代表一个独立的进程，一个进程可以有多个线程。
- js 是单线程的，js 通过事件驱动实现异步。

JavaScript 事件循环机制分为浏览器和 Node 事件循环机制，两者的实现技术不一样，
浏览器 Event Loop 是 HTML 中定义的规范，
Node Event Loop 是由 libuv 库实现。这里主要讲的是浏览器部分。

1.  **主线程**  
    Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。
2.  **JS 调用栈-后进先出(同步任务)**  
    JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。
3.  **任务队列(消息队列)-先进先出(异步任务)**  
    任务队列是先进先出的数据结构。

4.  **同步任务、异步任务**
    JavaScript 单线程中的任务分为同步任务和异步任务。
    同步任务会在调用栈中按照顺序排队等待主线程执行，
    异步任务则会在异步有了结果后册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。

5.  **宏任务(macro-task)、微任务(micro-task)**

除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。

macro-task 包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering, requestAnimationFrame 。

micro-task 包括：process.nextTick, Promises, Object.observe, MutationObserver。

7. **同步任务异步任务 Event Loop**  
   调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环。

8. **宏任务微任务 Event Loop**

第一次事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。  
`执行一个宏任务(先执行同步代码)-->执行所有微任务-->UI render-->执行下一个宏任务-->执行所有微任务-->UI render-->.....`

**补充：定时器**

定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。

定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。

> [JS 浏览器事件循环机制](https://www.cnblogs.com/yqx0605xi/p/9267827.html)

## HTTP 协议：http1.0 http1.1 http2.0 https

**HTTP 协议：客户端可服务端数据交互的一种协议**

### 一：http 1.x 2.0 主要区别

    1.  采用二进制格式而不是文本格式
    新的二进制格式（Binary Format），HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，
    文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。
    基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。

    2.  多路复用
    多路复用（MultiPlexing），即连接共享，即每一个 request 都是是用作连接共享机制的。
    一个 request 对应一个 id，这样一个连接上可以有多个 request，每个连接的 request 可以随机的混杂在一起，
    接收方可以根据 request 的 id 将 request 再归属到各自不同的服务端请求里面。

    3.  header 压缩
    header 压缩，如上文中所言，对前面提到过 HTTP1.x 的 header 带有大量信息，
    而且每次都要重复发送，HTTP2.0 使用 encoder 来减少需要传输的 header 大小，通讯双方各自 cache 一份 header fields 表，
    既避免了重复 header 的传输，又减小了需要传输的大小。

    4. 服务端推送
    服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能

### 二：HTTPS 与 HTTP 的一些区别

      1、HTTPS协议需要到CA申请证书，

      2、HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。

      3、HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

      4、HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。

      5、内网中用http传输速度更快

### 三：HTTP1.0 和 HTTP1.1 的一些区别区别

     HTTP1.1 也是当前使用最为广泛的 HTTP 协议

     1、缓存处理
              在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
     2、带宽优化及网络连接的使用    可以断点传输。
             HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
     3、错误通知的管理，
             在HTTP1.1中新增了24个错误状态响应码
     4、Host头处理
             1.0中没有Host头域   1.1加了因为一台主机上可能又多个虚拟主机共享一个IP地址
     5、长连接
             在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

### 四：HTTP 的基本优化

      影响一个 HTTP 网络请求的因素主要有两个：带宽和延迟。可以从这两个方面去优化

      宽度：
      不用多说，你家的宽带是多少M的呢

      延迟：

      1、浏览器阻塞（HOL blocking）：浏览器会因为一些原因阻塞请求。浏览器对于同一个域名，同时只能有 6 个连接（这个根据浏览器内核不同可能会有所差异），超过浏览器最大连接数限制，后续请求就会被阻塞。

      2、DNS 查询（DNS Lookup）：浏览器需要知道目标服务器的 IP 才能建立连接。将域名解析为 IP 的这个系统就是 DNS。这个通常可以利用DNS缓存结果来达到减少这个时间的目的。

      3、建立连接（Initial connection）：HTTP 是基于 TCP 协议的，浏览器最快也要在第三次握手时才能捎带 HTTP 请求报文，达到真正的建立连接，但是这些连接无法复用会导致每次请求都经历三次握手和慢启动。三次握手在高延迟的场景下影响较明显，慢启动则对文件类大请求影响较大

### 五：http 的各种常见状态码

```
一、1 开头的状态码(信息类)

100，接受的请求正在处理，信息类状态码
```

```
二、2 开头的状态码(成功类)
2xx(成功)表示成功处理了请求的状态码
200(成功)服务器已成功处理了请求。
```

```
三、3 开头的状态码(重定向)
3xx(重定向)表示要完成请求，需要进一步操作。通常这些状态代码用来重定向。
301，永久性重定向，表示资源已被分配了新的 URL
302，临时性重定向，表示资源临时被分配了新的 URL
303，表示资源存在另一个 URL，用 GET 方法获取资源
304，(未修改)自从上次请求后，请求网页未修改过。服务器返回此响应时，不会返回网页内容
```

```
四、4 开头的状态码(客户端错误)
4xx(请求错误)这些状态码表示请求可能出错，妨碍了服务器的处理
400(错误请求)服务器不理解请求的语法
401 表示发送的请求需要有通过 HTTP 认证的认证信息
403(禁止)服务器拒绝请求
404(未找到)服务器找不到请求网页
```

```
五、5 开头的状态码(服务器错误)
5xx(服务器错误)这些状态码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求的错误
500，(服务器内部错误)服务器遇到错误，无法完成请求
503，表示服务器处于停机维护或超负载，无法处理请求
```

## 原型链

```
 一句话解释就是：原型链查找就是通过 __proto__ 查找，查找至值为 null （也就是 Object.prototype）时结束

 结论：
__proto__ 是原型链查询中实际用到的，它总是指向 prototype；
prototype 在定义构造函数时自动创建，它总是被 __proto__ 所指

从上面两点我们还可以推出 prototype 只能作为构造函数的属性，而 __proto__ 可以作为任意对象的属性。
Foo.prototype.constructor === Foo; // true

举例：有构造函数Foo，
每当我们通过 new Foo(x) 创建对象时，JavaScript 内部会首先创建一个新的对象，
将其 __proto__ 属性指向 Foo 的原型，也就是 Foo.prototype，
然后将构造函数中的 this 指向刚刚创建的新对象，最后再执行构造函数中的代码：

一：let b = new Foo()
b.__proto__ === Foo.prototype;

二：Foo作为Function的实例对象。所以
  Foo.__proto__ === Function.prototype;

三：因为最后都要指向对象
  Function.prototype.__proto__ === Object.prototype

四：最后直到指向null
  Object.prototype.__proto__   //null

   function Foo() {};

   let b = new Foo();
   console.log(b.__proto__ === Foo.prototype);//true
   console.log(Foo.__proto__ === Function.prototype);//true
   console.log(Function.prototype.__proto__ === Object.prototype);//true
   console.log(Foo.prototype.__proto__ === Object.prototype);//true
   console.log(Foo.prototype.__proto__ === Function.prototype);//false
   console.log(Object.prototype.__proto__)//null
```

## h5 和 native 交互原理

- Hybrid 架构的核心就是 JSBridge 交互
- 原生和前端的交互有两种方式：url scheme 以及 JavaScriptCore（在 Android 中是 addJavascriptInterface 中申明被调用的方法，并暴露一个接口$App）

```
一：
            url scheme适用于所有的系统设备（低版本Android和低版本iOS都适用）

            但是url scheme毕竟是通过url拦截实现的，在大量数据传输，以及效率上都有影响

            具体为,由前端页面通过某种方式触发scheme(如用iframe.src),
            然后Native用某种方法捕获对应的url触发事件,然后拿到当前的触发url,
            根据定义好的协议,分析当前触发了那种方法,然后根据定义来执行等
```

```
二：
如 JavaScriptCore 不支持 iOS7 以下，addJavascriptInterface 在 4.2 以前有风险漏洞
当然了，时至今日，这些低版本造成的影响已经慢慢不再

具体操作：
android：
js 调用 android
webView.addJavascriptInterface(new Object() {
   @JavascriptInterface
   public void handshake(String value) {
      System.out.println("JS 调用了 Android 的 hello 方法");
      button.setText(value);
   }
}, "$App");

android 调用 js
webView.evaluateJavascript("javascript:callJS(" + js + ")", new ValueCallback<\String>() {
   @Override
   public void onReceiveValue(String value) {
      button.setText(value);
   }
});

ios：
js 调用 ios
window.webkit.messageHandlers.showMessage.postMessage({type:"h5-callOc"});

ios 调用 js
[self.wkWebView evaluateJavaScript:@"changeBGColor()" completionHandler:^(id _Nullable obj, NSError * _Nullable error) {
}];

```

> [参考](https://www.jianshu.com/p/477ea20b1ece)

## 浏览器缓存

浏览器缓存过程： 强缓存，协商缓存。

浏览器缓存位置一般分为四类： Service Worker-->Memory Cache-->Disk Cache-->Push Cache。

### 1、缓存方案，目前的项目大多使用这种缓存方案的：

- HTML: 协商缓存；

- css、js、图片：强缓存，文件名带上 hash。

### 2、强缓存与协商缓存的区别

- 强缓存不发请求到服务器，所以有时候资源更新了浏览器还不知道，但是协商缓存会发请求到服务器，所以资源是否更新，服务器肯定知道。
- 大部分 web 服务器都默认开启协商缓存。

### 3、刷新对于强缓存和协商缓存的影响

- 当 ctrl+f5 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存。
- 当 f5 刷新网页时，跳过强缓存，但是会检查协商缓存。
- 浏览器地址栏中写入 URL，回车 浏览器发现缓存中有这个文件了，不用继续请求了，直接去缓存拿。（最快）

> [浏览器缓存](https://juejin.cn/post/6947936223126093861)