# 前端常见面试题-理论-1

## 设计模式

[参考：菜鸟](https://www.runoob.com/design-pattern/design-pattern-tutorial.html)

- 单例模式 ：  
   一个类(单例类)只能有一个实例，并且这个实例可以供所有其他对象使用。比如打印机，可能很多台电脑同时连接的同一台打印机。
  单例模式属于创建型模式

  ```js
  let createLoginWindow = function (title) {
    this.title = title;
    this.init();
  };
  createLoginWindow.prototype.init = function () {
    // some code
  };
  let proxySingleton = (function () {
    var instance;
    return function (title) {
      if (!instance) {
        instance = new createLoginWindow(title);
      }
      return instance;
    };
  })();
  let windowA = new proxySingleton("login1");
  let windowB = new proxySingleton("login2");

  console.log(windowA === windowB); // true
  ```

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

## 手写发布订阅

**核心思想就是利用一个 map 或者一个对象存储**

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, fn) {
    if (this.events[name]) {
      this.events[name].push(fn);
    } else {
      this.events[name] = [fn];
    }
  }
  off(name, fn) {
    this.events[name] = this.events[name].filter((event) => event != fn);
  }
  once(name, fn) {
    let one = (...args) => {
      fn(...args);
      this.off(name, one);
    };
    this.on(name, one);
  }
  emit(name, ...args) {
    this.events[name].forEach((event) => {
      event.apply(this, args);
    });
  }
}

let ev = new EventEmitter();

let func = function () {
  console.log("我是小刘");
};

ev.on("name", func);

ev.once("name1", function () {
  console.log("我是小李");
});
ev.emit("name1");

ev.emit("name");
// 注销对应的事件
ev.off("name", func);
// 触发对应的事件
ev.emit("name");
```

## 手写观察者模式

```js
// 被观察的目标，即发布者：Dep
class Dep {
  constructor() {
    // 记录所有的观察者，即订阅者
    this.subs = [];
  }
  // 添加新的观察者
  addSub(sub) {
    // 该订阅者存在且有update方法,就将其添加到subs数组中
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 移除观察者
  removeSub(sub) {
    if (this.subs.length) {
      let index = this.subs.indexOf(sub);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }
  // 发布更新通知
  notify() {
    this.subs.forEach((item) => {
      item.update();
    });
  }
}

// 观察者，即订阅者
class Watcher {
  update() {
    console.log("****更新相关数据****");
  }
}

let dep = new Dep();
let watcher1 = new Watcher();
let watcher2 = new Watcher();

// 添加新的观察者
dep.addSub(watcher1);
dep.addSub(watcher2);
dep.removeSub(watcher2);
// 发布
dep.notify();
```

[手写观察者模式/发布订阅参考](https://blog.csdn.net/liu19721018/article/details/125494633)

## 什么是函数式编程

- 纯函数 : 一个函数的返回结果只依赖于它的参数，并且在执行过程中没有副作用
- 函数颗粒化
- 高阶函数 : 输入函数， 输出的也是函数
- 闭包
- 函数可以赋值给变量或作为参数传递给其他函数，这是函数式编程的典型特征

## 面向对象

面向对象由三部分组成：(封装、继承、多态) 有人说四部分：还有一个就是抽象  
封装：类是一种封装，方法是一种封装  
继承：子类继承父类  
多态：父类定义一个方法，没有具体实现。需要子类重写父类中的方法，这样不同的子类实例调用同样的方法会有不同的效果

## 闭包

**闭包就是函数嵌套函数, 一个函数访问另一个函数的作用域内的变量成为闭包**

## 闭包常用的场景

- 节流、防抖
- vue 的响应式
- react 的 fiber
- 函数颗粒化

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

## 高阶函数定义

高阶函数英文叫 Higher-order function。高阶函数是对其他函数进行操作的函数，操作可以是将它们作为参数，或者返回它们。简单总结为高阶函数是一个接收函数作为参数或者将函数作为返回输出的函数。

## 浏览器的垃圾回收机制

- Javascript 具有自动垃圾回收机制，**会定期**对那些不再使用的变量、对象所占用的内存进行释放，原理就是找到不再使用的变量，然后释放掉其占用的内存。
- js 的回收机制目前分为两种方式：1.标记清除（各大浏览器主流算法）2.引用技术

```
一： 标记清除
　　　　这种算法的思想是给当前不使用的值加上标记，然后再回收其内存

算法流程：

1.浏览器再运行的时候会给存储再内存中的所有变量都加上标记

2.去掉环境中的变量以及被环境中引用的变量的标记

3.如果还有变量有标记，就会被视为准备删除的变量

4.垃圾回收机制完成内存的清除工作，销毁那些带标记的变量，并回收他们所占用的内存空间
```

```
二：引用计数
　　　　这种算法的思想是跟踪记录所有值被引用的次数。
        javaScript 引擎目前都不再使用这种算法，
        但再 IE 中访问非原生 JavaScriopt 对象（如 DOM 元素）时，这种算法任然可能会导致问题

当代码中存在循环引用现象时，引用计数算法就会导致问题

解除变量的引用不仅可以帮于消除循环引用现象（一个变量使用完之后赋值为 null），而且对垃圾收集也有好处。
为了确保有效的回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用

算法流程：

1.声明了一个变量并将一个引用类型的值赋值给这个变量，这个引用类型值引用次数就是 1

2.同一个值又被赋值另一个变量，这个引用类型的值引用次数加 1

3.当包含这个引用类型值得变量又被赋值另一个值了，那么这个引用类型的值的引用次数减一

4.当引用次数变成 0 时， 说明这个值需要解除引用

5.当垃圾回收机制下次运行时，它就会释放引用次数为 0 的值所占用的内存
```
