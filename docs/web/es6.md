# ES6

## var let

- var 命令会发生“变量提升”现象，即变量可以在声明之前使用，值为 undefined

### 暂时性死区

```js
var tmp = 123;

if (true) {
  tmp = "abc"; // ReferenceError
  let tmp;
}
```

## 块级作用域

## Set 和 Map 数据结构

### Set

Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

- WeakSet 的成员只能是对象，而不能是其他类型的值
- 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用

### Map

Map。它类似于对象，但是它的 key 不仅仅局限于字符串  
Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，

```js
const map = new Map([
  ["name", "张三"],
  ["title", "Author"],
]);
```

### WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是，WeakMap 与 Map 的区别有两点

- WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
- WeakMap 的键名所指向的对象，不计入垃圾回收机制

## Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程

## Reflect

Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API

## 文档

[阮一峰:es6 入门](https://es6.ruanyifeng.com/)
