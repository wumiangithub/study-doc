# 运算题

## ['1', '2', '3'].map(parseInt)

[1, NaN, NaN]

```
parseInt(string, radix)
接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

了解这两个函数后，我们可以模拟一下运行情况

1. parseInt('1', 0) //radix 为 0 时，且 string 参数不以“0x”和“0”开头时，按照 10 为基数处理。这个时候返回 1
2. parseInt('2', 1) //基数为 1（1 进制）表示的数中，最大值小于 2，所以无法解析，返回 NaN
3. parseInt('3', 2) //基数为 2（2 进制）表示的数中，最大值小于 3，所以无法解析，返回 NaN

```

[参考](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4)

## class 是会提升的

class 是会提升的，但不会初始化赋值, 其表现与 let、const 类似，Foo 进入暂时性死区。
看下例：如果没有提升，foo 会是块作用域外的 Foo 实例。但是由于提升的关系，块作用域内的 Foo 遮蔽了外层的同名函数。

```js
var Foo = function () {
  this.foo = 21;
};

{
  const foo = new Foo(); // ReferenceError: Foo is not defined
  class Foo {
    constructor() {
      this.foo = 37;
    }
  }
}
```

## 微任务运算题

### 多个点 then，算一个微任务循环

```js
// 运算结果: 1 、2 、3、4、5、6、7、8
console.log(1);

setTimeout(function () {
  console.log(8);
}, 0);

const p = new Promise((resolve, reject) => {
  console.log(2);
  resolve(5);
  console.log(3);
});

p.then((data) => {
  console.log(data);
})
  .then((data) => {
    console.log(6);
  })
  .then((data) => {
    console.log(7);
  });

console.log(4);
```

## 多个 promise，先执行 promise 内部 promise 中的点 then

```js
// 运算结果: 4、9、3、2、1

new Promise((resolve, reject) => {
  console.log(4);
  resolve(1);

  new Promise((resolve, reject) => {
    console.log(9);
    resolve(2);
  }).then((data) => {
    console.log(data); //2
  });
}).then((data) => {
  console.log(data); //1
});

console.log(3);
```

### await 后面的方法属于同一个循环先执行，await 下一步，等同于.then 要下一个循环

```js
//请写出输出内容
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

## Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

promise 构造函数是同步执行的，then 方法是异步执行的

```js
// 执行结果是：1243

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
```

## forEach 终止循环

forEach 无法通过正常流程(如 break)终止循环，但可通过抛出异常的方式实现终止循环

```js
var arr = [1, 2, 3, 4, 5, 6];
try {
  arr.forEach((item) => {
    if (item === 3) {
      throw new Error("End Loop");
    }
    console.log(item);
  });
} catch (e) {
  if (e.message === "End Loop") throw e;
}
//将只输出 1 2
```

可使用 return 语句跳出本次循环，执行下一次循环

```js
var arr = [1, 2, 3, 4, 5, 6];
arr.forEach((item) => {
  if (item === 3) {
    return;
  }
  console.log(item);
});
//将输出 1 2 4 5 6，3不会输出
```

## for 循环中的 continue, break, return

```js
for (let i = 0; i < 3; i++) {
  console.log(i); //0 1 2
}
```

### continue （停顿后）继续走:

```js
for (let i = 0; i < 3; i++) {
  if (i == 1) {
    continue;
  }
  console.log(i); //0  2
}
```

### break 结束 for 循环

当双层 for 循环的时候，只结束内层 for 循环，外层 for 循环不受影响

```js
for (let i = 0; i < 3; i++) {
  if (i == 1) {
    break;
  }
  console.log(i); //0
}
```

### return 结束 for 循环

当双层 for 循环的时候，内层外层 for 循环都能结束

```js
//  不能直接出现在for循环中，return要出现在函数体内
for (let i = 0; i < 3; i++) {
  if (i == 1) {
    return; //Uncaught SyntaxError: Illegal return statement
  }
  console.log(i);
}
```

```js
function test() {
  for (let i = 0; i < 3; i++) {
    if (i == 1) {
      return;
    }
    console.log(i); //0
  }
}
test();
```
