# 前端常见面试题-理论-1

## 设计模式

[参考：菜鸟](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)

- 单例模式 ：  
   一个类(单例类)只能有一个实例，并且这个实例可以供所有其他对象使用。比如打印机，可能很多台电脑同时连接的同一台打印机。
  单例模式属于创建型模式

- 原型模式：  
  这种模式是实现了一个原型接口，该接口用于创建当前对象的克隆 性能佳

- 工厂模式
  工厂模式是我们最常用的实例化对象模式了，是用工厂方法代替 new 操作的一种模式
  虽然这样做，可能多做一些工作，但会给你系统带来更大的可扩展性和尽量少的修改量。

- 观察者模式  
  定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。  
  **观察者模式和发布订阅模式很相似，区别就是 发布订阅者模式会有一个调度中心去互相联系，而观察者模式 只有观察者和被观察者有直系的联系**

- 发布订阅模式  
  定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，通知订阅中心一条消息，订阅中心收到消息后在通知订阅了这条消息的对象  
  **观察者模式和发布订阅模式很相似，区别就是 发布订阅者模式会有一个调度中心去互相联系，而观察者模式 只有观察者和被观察者有直系的联系**

- 策略模式

- 代理模式  
  代理模式的定义：为其他对象提供一种代理以控制对这个对象的访问。在某些情况下，一个对象不适合或者不能直接引用另一个对象，而代理对象可以在客户端和目标对象之间起到中介的作用。

## 什么是函数式编程

- 纯函数 : 一个函数的返回结果只依赖于它的参数，并且在执行过程中没有副作用
- 函数颗粒化
- 高阶函数 : 输入函数， 输出的也是函数
- 闭包
- 函数可以赋值给变量或作为参数传递给其他函数，这是函数式编程的典型特征

## 闭包

**闭包就是函数嵌套函数, 一个函数访问另一个函数的作用域内的变量成为闭包**

## 进程(process)、线程(thread)、 协程（coroutine）和纤程（fiber）

- 一个进程可以有很多线程
- 协程（coroutine）和纤程（fiber）的主要区别点在于：调度； 本质上没有区别,一般将程序语言提供的纤程支持称为协程。

## location

http://localhost:1234/web/zhishi.html#a

| 属性     | 结果                                    | 注释                                |
| :------- | :-------------------------------------- | :---------------------------------- |
| protocol | http                                    | 协议                                |
| hostname | localhost                               | 域名                                |
| port     | 1234                                    | 端口                                |
| pathname | /web/zhishi.html                        | 页面路径                            |
| hash     | #a                                      | #后面的内容,包括#在内               |
| host     | localhost:1234                          | 域名 + 端口                         |
| origin   | http://localhost:1234                   | 协议+ 域名 + 端口                   |
| href     | http://localhost:1234/web/zhishi.html#a | 协议+ 域名 + 端口 + 页面路径 + hash |

https://www.qibi.work/project/152/menu/task

| 属性     | 结果                                        | 注释                                |
| :------- | :------------------------------------------ | :---------------------------------- |
| protocol | https                                       | 协议                                |
| hostname | www.qibi.work                               | 域名                                |
| port     | ""                                          | 端口                                |
| pathname | /project/152/menu/task                      | 页面路径                            |
| hash     | ""                                          | #后面的内容,包括#在内               |
| host     | www.qibi.work                               | 域名 + 端口                         |
| origin   | https://www.qibi.work                       | 协议+ 域名 + 端口                   |
| href     | https://www.qibi.work/project/152/menu/task | 协议+ 域名 + 端口 + 页面路径 + hash |

## 浏览器同源策略

<font color="#3eaf7c">协议、一级域名、二级域名、端口</font> 都相同才同源

下表给出了与 URL http://store.company.com/dir/page.html 的源进行对比的示例：
| URL | 结果 | 原因 |
| :----- | :----- | :----- |
| http://store.company.com/dir2/other.html | 同源 | 只有路径不同 |
| https://store.company.com/secure.html | 失败 |协议不同 |
| http://store.company.com:81/dir/etc.html | 失败 | 端口不同 ( http:// 默认端口是 80) |
| http://news.company.com/dir/other.html | 失败 | 一级域名不同 |
| http://m.store.company.com/dir/other.html | 失败 | 二级域名不同 |

为了能让不同源中文档进行交流，可以使用 **window.postMessage**。

[参考:mozilla](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
