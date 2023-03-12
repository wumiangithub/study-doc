# 前端常见面试题 - 1

## ES6 排名前十的最佳特性

[参考](https://blog.csdn.net/u012860063/article/details/62218564)

- 1.  Default Parameters（默认参数） in ES6
- 2.  模板字符串`${a}`
- 3.  async await
- 4.  Destructuring Assignment （解构赋值）in ES6
- 5.  扩展运算符
- 6.  Arrow Functions （箭头函数）in ES6
- 7.  Promises in ES6 ☑️
- 8.  Block-Scoped Constructs Let and Const（块作用域构造 Let and Const）
- 9.  Classes（类） in ES6 ☑️
- 10. Modules（模块） in ES6
- 11. 函数参数的默认值

## 箭头函数和 function 函数区别

- this 指向不一样
- 由于箭头函数没有自己的 this，所以当然也就不能用 call()、apply()、bind()这些方法去改变 this 的指向
- 除了 this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

### 箭头函数中的 this

- 1、箭头函数中的 this 是定义函数的时候绑定，而不是在执行函数的时候绑定。
- 2、箭头函数中，this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this，导致内部的 this 就是外层代码块的 this。正是因为它没有 this，所以也就不能用作构造函数。
- 3、箭头函数中的 this 是在定义函数的时候绑定：指向定义时的上下文

```js
var x = 11;
var obj = {
  x: 22,
  say: () => {
    console.log(this.x); //this指向windows  11
  },
};
```

```js
var x = 11;
var obj = {
  x: 22,
  say: function () {
    console.log(this.x); //this指向obj  11
  },
};
obj.say();
```

```js
var obj = {
  birth: 1993,
  getAge: function () {
    var b = this.birth; //1993
    var fn = () => new Date().getFullYear() - this.birth; //this指向obj对象
    return fn();
  },
};
console.log(obj.getAge()); //动态计算出每年的年龄
```

[参考](https://blog.csdn.net/weixin_44806635/article/details/119777219)

## 解构赋值，取出数组中指定下标的值

```js
let a = ["a", "b", "c", "d"];
let { 1: i } = a;
console.log(i); //b
```

## HTML5 的十大新特性

[参考](http://www.cnblogs.com/vicky1018/p/7705223.html)

- (1)语义标签
- (2)增强型表单
- (3)视频和音频
- (4)Canvas 绘图
- (5)SVG 绘图
- (6)地理定位
- (7)拖放 API
- (8)Web Worker
- (9)Web Storage
- (10)WebSocket

## 7 种基本数据类型

1.  undefined
2.  null
3.  object
4.  string
5.  number
6.  boolean
7.  symbol  
    **es6 新增 表示唯一的值**

    ```js
    let s = Symbol();

    typeof s;
    // "symbol"
    ```

## import 和 require 区别

- require 是运行时调用，所以 require 理论上可以运用在代码的任何地方
- import 是编译时调用，所以必须放在文件开头

- import 引入的对象被修改时，源对象也会被修改，相当于浅拷贝，
- require 引入的对象被修改时，源对象不会被修改，官网称值拷贝，我们可以理解为深拷贝。
- import 有利于 tree-shaking（移除 JavaScript 上下文中未引用的代码），require 对 tree-shaking 不友好。

## import 和 import() 函数

- import()函数它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。
- import()类似于 Node 的 require 方法，区别主要是前者是异步加载，后者是同步加载。
