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
