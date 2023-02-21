# 算法

## 斐波那契数列

**后面的值，等于前两个值之和**

斐波那契数列（兔子序列）1、1、2、3、5、8、13，21…

```js
//利用递归函数求:用户输入一个数字n就可以求出这个数字对应的兔子序列值
//我们只需要知道用户输入的n的前面两项（n-1 n-2）就可以计算出n对应的序列值
function fn(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fn(n - 1) + fn(n - 2);
}
console.log(fn(3)); //2
console.log(fn(6)); //8
```

## 递归太多怎么优化

### 一: 时间复杂度的优化

是否重复计算：在递归的过程，很多时候一些子问题是被重复计算的
**优化方法**

- 我们可以将计算的结果保存起来，就可以避免重复进行计算。
- 可以用数组或者是哈希表进行存储，通过查表判断是否有重新计算过，如果有则无需再算。

### 二: 空间复杂度的优化

1. 尾递归
   尾递归，顾名思义，就是在函数体的尾部再进行递归（调用自己）。
2. 在函数体内多次递归

[递归太多怎么优化:参考](https://blog.csdn.net/Mutonix6/article/details/115910658)

## js 实现 new

```js
function Animal(name, type) {
  this.name = name;
  this.type = type;
}
let Tom = new Animal("Tom", "Cat");

console.log(Tom); //Animal {name: 'Tom', type: 'Cat'}
```

### 方式一: 推荐

```js
function _new(constructor, ...args) {
  // 1.构造函数类型合法判断
  if (typeof constructor !== "function") {
    throw new Error("constructor must be a function");
  }
  // 2.新建空对象实例
  let obj = new Object();
  // 将构造函数的原型绑定到新创的对象实例上
  obj.__proto__ = Object.create(constructor.prototype);
  // 3.调用构造函数,并将this指向创建的空对象obj, 从而继承构造函数
  let res = constructor.apply(obj, args);
  let isObject = typeof res === "object" && res !== null;
  let isFunction = typeof res === "function";
  // 4.如果有返回值且返回值是对象类型，那么就将它作为返回值，否则就返回之前新建的对象
  return isObject || isFunction ? res : obj;
}

let Tom = _new(Animal, "Tom", "Cat");
console.log(Tom); //Animal {name: 'Tom', type: 'Cat'}
```

### 方式二

```js
function _new1() {
  //1、通过参数shift方法取到Constructor
  let Constructor = Array.prototype.shift.call(arguments);
  ///2、在内存中定义一个新对象
  let obj = {};
  obj._proto_ = Constructor.prototype; // 新对象的_proto_指针指向构造函数的prototype属性
  // 3、this指向新对象，并执行构造函数代码
  let res = Constructor.apply(obj, arguments);
  //4、如果有返回值且返回值是对象类型，那么就将它作为返回值，否则就返回之前新建的对象
  return typeof res === "object" ? res : obj;
}

let Tom = _new1(Animal, "Tom", "Cat");
console.log(Tom); //Window {name: 'Tom', type: 'Cat'}
```

## 闭包

**闭包就是函数嵌套函数, 一个函数访问另一个函数的作用域内的变量成为闭包**

```js
function a() {
  var n = 0;
  console.log(this); //指代a这个对象
  this.b = function () {
    n++;
    console.log(n);
  };
}
var c = new a();
c.b(); //控制台输出1
c.b(); //控制台输出2
```

## 函数颗粒化

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}
add(1)(2); //3
```

```js
function addCurry() {
  let arr = [...arguments];
  let fn = function () {
    if (arguments.length === 0) {
      return arr.reduce((a, b) => a + b);
    } else {
      arr.push(...arguments);
      return fn;
    }
  };
  return fn;
}

console.log(addCurry(1)(2)(3)()); //6
console.log(addCurry(1, 2)(2)(3)()); //8
```

[参考](https://juejin.cn/post/7147454421822078984)

## 防抖

```js
// 防抖：频繁操作中只触发最后一次操作
function debounce(fn, delay) {
  delay = delay || 200;
  let timer = null;
  return function () {
    let arg = arguments;
    // 每次操作时，清除上次的定时器
    clearTimeout(timer);
    timer = null;
    // 定义新的定时器，一段时间后进行操作
    timer = setTimeout(function () {
      fn.apply(this, arg);
    }, delay);
  };
}

var count = 0;
window.onscroll = debounce(function (e) {
  console.log(e.type, ++count); // scroll
}, 500);
```

## 节流

### 写法一

```js
// 函数节流，频繁操作中间隔 delay 的时间才处理一次
function throttle(fn, delay) {
  delay = delay || 200;
  let timer = null;
  // 每次滚动初始的标识
  let timestamp = 0;
  return function () {
    let arg = arguments;
    let now = Date.now();
    // 设置开始时间
    if (timestamp === 0) {
      timestamp = now;
    }
    clearTimeout(timer);
    timer = null;
    // 已经到了delay的一段时间，进行处理
    if (now - timestamp >= delay) {
      fn.apply(this, arg);
      timestamp = now;
    }
    // 添加定时器，确保最后一次的操作也能处理
    else {
      timer = setTimeout(function () {
        fn.apply(this, arg);
        // 恢复标识
        timestamp = 0;
      }, delay);
    }
  };
}

var count = 0;
window.onscroll = throttle(function (e) {
  console.log(e.type, ++count); // scroll
}, 500);
```

### 写法二

```js
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => {
      // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}
function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener("resize", throttle(sayHi));
```

## 封装 fetch api 要求超时报错，并且取消执行的 promise

## 堆、栈、队列之间的区别是？

- 栈 (Stack)：就是一个桶，后放进去的先拿出来，它下面本来有的东西要等它出来之后才能出来。（后进先出）

  - 栈：后进先出 如 js 调用栈

- 堆 (Heap)：是在程序运行时，而不是在程序编译时，申请某个大小的内存空间。即动态分配内存，对其访问和对一般内存的访问没有区别。

- 队列：只能在队头做删除操作,在队尾做插入操作.而栈只能在栈顶做插入和删除操作。（先进先出）

### 不同场景下，堆与栈代表不同的含义

#### （1）程序内存布局场景下，堆与栈表示两种内存管理方式；

- 栈由操作系统自动分配释放
- 堆由开发人员分配和释放， 若开发人员不释放，程序结束时由 OS 回收

#### （2）数据结构场景下，堆与栈表示两种常用的数据结构。

- 栈是一种运算受限的**线性表**，其限制是指只仅允许在表的一端进行插入和删除操作，（后进先出）
- 堆是一种常用的树形结构，是一种特殊的**完全二叉树**，当且仅当满足所有节点的值总是不大于或不小于其父节点的值的完全二叉树被称之为堆。

[堆、栈:参考](https://blog.csdn.net/m0_37145844/article/details/109321620)

## 文档

[前端面试常见算法: 参考](https://blog.csdn.net/Better_Xing/article/details/114937915)
