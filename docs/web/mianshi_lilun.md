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

## 谈谈你对 TCP 三次握手和四次挥手的理解

### 三次握手讲解

- 客户端发送位码为 syn ＝ 1,随机产生 seq number=1234567 的数据包到服务器，服务器由 SYN=1 知道客户端要求建立联机（客户端：我要连接你）
- 服务器收到请求后要确认联机信息，向 A 发送 ack number=(客户端的 seq+1),syn=1,ack=1,随机产生 seq=7654321 的包（服务器：好的，你来连吧）
- 客户端收到后检查 ack number 是否正确，即第一次发送的 seq number+1,以及位码 ack 是否为 1，若正确，客户端会再发送 ack number=(服务器的 seq+1),ack=1，服务器收到后确认 seq 值与 ack=1 则连接建立成功。（客户端：好的，我来了）

### 为什么 http 建立连接需要三次握手，不是两次或四次?

答：三次是最少的安全次数，两次不安全，四次浪费资源；

### 4 次挥手

```
TCP 是全双工信道，何为全双工就是客户端与服务端建立两条通道，
通道 1:客户端的输出连接服务端的输入；
通道 2:客户端的输入连接服务端的输出。
两个通道可以同时工作：客户端向服务端发送信号的同时服务端也可以向客户端发送信号。
所以关闭双通道的时候就是这样：

客户端：我要关闭输入通道了。
服务端：好的，你关闭吧，我这边也关闭这个通道。

服务端：我也要关闭输入通道了。
客户端：好的你关闭吧，我也把这个通道关闭。
```

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
   2）重排(回流)：当渲染树中的一部分因为元素的规模尺寸，布局，隐藏等改变而需要重新构建
   3）重排必定会引发重绘，但重绘不一定会引发重排
```

- 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间，这也是为什么要避免使用 table 布局的原因之一。

> [html 页面渲染过程](https://www.cnblogs.com/bear-blogs/p/9903936.html)  
> [重绘&回流](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)

## 减少重绘与回流

### css

- 使用 transform 替代 top

- 使用 visibility 替换 display: none ，因为前者只会引起重绘，后者会引发回流（改变了布局

- 避免使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局

- 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 requestAnimationFrame

- CSS3 硬件加速（GPU 加速）

### css3 硬件加速

- 触发硬件加速的属性
- will-change： 哪一个属性即将发生变化，进而进行优化
- transform
- opacity
- filter

### JavaScript

- 避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性。
- 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## js 的冒泡和捕获事件

**所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件**

### 事件冒泡

从里到外触发  
click 事件默认是事件冒泡

### 事件捕获

从外到里触发

### addEventListener

通过 EventTarget.addEventListener() 来给元素绑定事件。

1. 第一个参数是事件的名称（如 ‘click’ ）。
2. 第二个参数是触发对应事件执行的回调函数。
3. 第三个参数是个布尔值，定义了元素邦定事件是在冒泡阶段还是捕获阶段执行:

当值为 false 时，事件在冒泡阶段执行，false 为默认值。  
当值为 true 时，事件在捕获阶段执行

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

- 当前调用栈中执行的代码成为宏任务
- 当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务,可以理解为回调事件,叫做微任务

6. **同步任务异步任务 Event Loop**

   **总结：简单讲就是，js 事件分为同步任务和异步任务，**

   1. 同步任务都在主线程上执行，形成一个执行栈(调用栈),

   2. 异步任务执行完成后，放入任务队列,

   3. 当执行栈中清空后，就会去任务队列中拿任务放入执行栈中执行。

   4. 重复上面的 3 步

7. **宏任务微任务 Event Loop**

第一次事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。  
`执行一个宏任务(先执行同步代码)-->执行所有微任务-->UI render-->执行下一个宏任务-->执行所有微任务-->UI render-->.....`

**补充：定时器**

定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。

定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。

## 宏任务微任务包括

**宏任务 包括**：script(整体代码), setTimeout, setInterval, requestAnimationFrame, I/O, UI rendering, UI 交互事件, postMessage, MessageChannel, setImmediate(Node.js 环境) 。

**微任务 包括**：Promises, async/await, Object.observe, process.nextTick, MutationObserver。

> [JS 浏览器事件循环机制](https://www.cnblogs.com/yqx0605xi/p/9267827.html)

## node 事件循环机制

1. timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
2. I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
3. idle, prepare 阶段：仅 node 内部使用
4. poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
5. check 阶段：执行 setImmediate() 的回调
6. close callbacks 阶段：执行 socket 的 close 事件回调

[参考](https://www.muzhuangnet.com/show/51554.html)

## 单线程的 JavaScript 是怎么实现异步的?

### JavaScript Runtime

- 也就是 JavaScript 代码运行的地方

- chrome 与 node 都是 JavaScript Runtime

### JavaScript Runtime 主要包括 Js Engine 与 WebAPI 等内容

- JavaScript 是在 Js Engine 中运行
- JavaScript Runtime 也提供了 WebAPI 供 JS 代码调用

### WebAPI 提供了网络请求，定时器，事件监听等多种能力

JS Runtime 并不是单线程的，而是持有一个线程池，因此 WebAPI 中的代码是运行在其他线程的，自然也就提供了异步的能力  
[参考](https://juejin.cn/post/7083286147920560158)

## HTTP 协议：http1.0 http1.1 http2.0 https

**HTTP 协议：客户端可服务端数据交互的一种协议**

### 一：http 1.x 2.0 主要区别

    1.  采用二进制格式而不是文本格式
    新的二进制格式（Binary Format），HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，
    文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。
    基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。

    2.  多路复用
    多路复用（MultiPlexing），即连接共享，
    同域名下所有通信都在单个TCP连接上完成, 多个请求可以公用一个 TCP 链接

    3.  header 压缩
    在 HTTP/1 中，我们使用文本的形式传输 header，在 header 携带 cookie 的情况下，可能每次都需要重复传输几百到几千的字节。

    在 HTTP / 2 中，使用了 HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。
    并在两端维护了索引表，用于记录出现过的 header ，后面在传输过程中就可以传输已经记录过的 header 的键名，
    对端收到数据后就可以通过键名找到对应的值

    4. 服务端推送
    服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能

### 二：HTTPS 与 HTTP 的一些区别

      1、HTTPS协议需要到CA申请证书 => SSL 证书，

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

## 简单讲解一下 http2 的多路复用

多个请求可以公用一个 TCP 链接

## SSL 证书与 CA 证书是同一种东西吗？SSL 证书与 CA 证书有什么区别？

CA 机构属于一个主体，比如：Gworg CA 机构，然而 CA 机构可以颁发各种数字证书，其中包括 SSL 证书、邮件证书、加密证书、软件数字证书等等。所以 SSL 证书也是 CA 证书的一种。https 需要的其实就是 SSL 证书

[SSL 证书与 CA 证书:参考](https://blog.csdn.net/qq_36445861/article/details/119785787)

## ssl 怎么实现的

- SSL（Secure Socket Layer）安全套接层是 Netscape 公司率先采用的网络安全协议。它是在传输通信协议（TCP/IP）上实现的一种安全协议，采用公开密钥技术。

- 公开密钥加密技术
  - l976 年，Diffie 和 Hellman 首次提出公开密钥加密体制，即每个人都有一对密钥，其中一个为公开的，一个为私有的。
  - 也就是非对称加密
  - 发送信息时用对方的公开密钥加密，收信者用自己的私用密钥进行解密。公开密钥加密算法的核心是运用一种特殊的数学函数一单向陷门函数，即从一个方向求值是容易的。但其逆向计算却很困难，从而在实际上成为不可行的。公开密钥加密技术它不仅保证了安全性又易于管理。其不足是加密和解密的时间长。

## TLS 和 SSL 的差异

- SSL（Secure Sockets Layer）是网景公司（Netscape）设计的主要用于 Web 的安全传输协议。
- 这种协议在 Web 上获得了广泛的应用。IETF 将 SSL 作了标准化，即 RFC2246，并将其称为 TLS（Transport Layer Security），其最新版本是 RFC5246,版本 1.2。
- 从技术上讲，TLS1.0 与 SSL3.0 的差异非常微小

## SSL、SSH、SSR

- SSL 主要用在 Browser 和 Server 通信，比如 HTTPS=HTTP+SSL , 端口 443
- SSH 是由客户端和服务端的软件组成的，用于 computer 之间通信，比如我们通过 SSH 登录远端服务器。端口 22
- SSR 指的是服务端渲染（Server-side Rendering）

[SSL、SSH:参考](https://zhuanlan.zhihu.com/p/109746532)

## webRTC

- WebRTC 是一组 JAVAScript API，可以在两个浏览器之间建立点对点连接， 实现音频和视频等数据的传输，也可以用它创建有语音/视频通话功能的应用程序。

- WebRTC 的特别之处是：一旦建立了连接，就可以直接在浏览器之间实时传输数据，不需要借助服务器，因此降低了延迟，所以用户都喜欢用 webRTC 直接传输音视频。

## webSocket

- WebSocket 是一种实时技术，可通过持久的单套接字 socket 连接在 Web 客户端和 Web 服务器之间实现全双工、双向通信。

- WebSocket 连接以 HTTP 请求/响应握手开始。 如果此初始握手成功，则客户端和服务器已同意使用为 HTTP 请求建立的现有 TCP 连接作为 WebSocket 连接。 只要需要，这个连接就会一直保持活跃状态，允许服务器和客户端全双工的发送数据。

- WebSocket 在 TCP 上工作，而 WebRTC 主要在 UDP 上。

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

### android 使用 addJavascriptInterface 申明方法

```js
// android申明app_hide_welcomeImg方法
webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void app_hide_welcomeImg() {
                Log.i("webView", "JS调用了Android的app_hide_welcomeImg方法");
                hide_welcomeImg();
            }
}, "$App");
// js调用android申明的app_hide_welcomeImg方法
window.$App.app_hide_welcomeImg();
```

### android 使用 evaluateJavascript 调用 js 申明的方法

```js
public void callJS(final String type) {
        webView.post(new Runnable() {
            @RequiresApi(api = Build.VERSION_CODES.KITKAT)
            @Override
            public void run() {
                switch (type) {
                    case "js_get_wx_code":
//               方式一  传递对象的方式给js
                        JSONObject js = new JSONObject();
                        try {
                            js.put("os", "android");
                            js.put("wx_code", Constants.wx_code);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        webView.evaluateJavascript("javascript:js_get_wx_code(" + js + ")", new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String value) {
                                Constants.wx_code = null;
                            }
                        });

//                     方式二  传递多个参数给js   目前ios不好传递对象给js。所以为了保持统一，尽量用方式二
                       /* JSONObject js = new JSONObject();
                        try {
                            js.put("os", "android");
                            js.put("wx_code", Constants.wx_code);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        webView.evaluateJavascript("javascript:js_get_wx_code('" + js + "','"+ Constants.wx_code +"')", new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String value) {
                                Constants.wx_code = null;
                            }
                        });*/
                        break;
                    default:
                        break;
                }
            }
        });
    }
```

### ios 使用 addScriptMessageHandler 申明方法

```js
// ios使用addScriptMessageHandler申明方法，提供给js调用
[self.webView.configuration.userContentController addScriptMessageHandler:self name:@"app_hide_welcomeImg"];

//js 调用 ios
window.webkit.messageHandlers.showMessage.postMessage({ type: "h5-callOc" });
```

### ios 使用 evaluateJavascript 调用 js

```js
[self.wkWebView evaluateJavaScript:@"changeBGColor()" completionHandler:^(id _Nullable obj, NSError * _Nullable error) {
}];
```

- ios 还可以使用 JavaScriptCore 库来实现交互

如 JavaScriptCore 不支持 iOS7 以下，addJavascriptInterface 在 4.2 以前有风险漏洞
当然了，时至今日，这些低版本造成的影响已经慢慢不再

> [参考](https://www.jianshu.com/p/477ea20b1ece)

## 浏览器缓存

浏览器缓存过程： 强缓存，协商缓存。

浏览器缓存位置一般分为四类： Service Worker-->Memory Cache-->Disk Cache-->Push Cache。

[深入理解浏览器的缓存机制：参考](https://www.jianshu.com/p/54cc04190252)

### 强缓存：

利用 http 头的 expires 与 cache-control 来控制，普通刷新会忽略它，不会清除，需要强制刷新。强制刷新时会带上 cache-control：no-cache；pragma：no-cache。

### 协商缓存

- 由服务器端确定缓存资源是否可用，设置一个标识符 Etag 来判断。
- 根据请求头中的 If-Modifed-Match 与文件的 mtime 时间进行比较 设置协商缓存

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
> [强缓存，协商缓存](https://www.ngui.cc/el/3159070.html)
