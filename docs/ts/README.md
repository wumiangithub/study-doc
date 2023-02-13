# typescript

```js
npm install -g typescript   //全局安装

npm install -D typescript   //当前项目安装

tsc init   //tsconfig.json

tsc a.ts   //编译  会生成一个同名的js文件

tsc -w     //每当文件保存就会自动编译
```

## any unknown never void

- any  
   any 表示 任意类型。  
   它是任意类型的父类，任意类型的值都可以赋予给 any 类型

- unknown  
   unknown 可以认为是 类型更安全的 any。  
   如果要使用，需要用 as 来进行显式的类型断言。

```js
 declare const user: known;
// 报错，unknown 不能被使用
user.toLowerCase();

// 开发者认为 user 是个字符串
// 使用 as 进行类型推断才能使用
(user as string).toLowerCase();
```

- never  
  never 表示一个 无法被观测的类型  
  一个无法走到 return 返回值的函数，比如一定会抛出错误或死循环

```js
// 这里的 never 表示无法执行到函数返回它的返回值
function foo(): never {
  throw new Error("something wrong!");
}
```

- void  
  void 用于表示一个 函数没有返回值。

```js
function sayHi(): void {
  console.log("Hi!");
}
```

[参考](https://blog.csdn.net/fe_watermelon/article/details/128140804)

## interface 和 type 的区别

1. type 声明的对象类型自带索引签名，而 interface 必须声明索引类型
2. type 可以为基本类型、联合类型或元祖类型定义别名，而接口不行
3. type 通过 & 交叉运算符来扩展，interface 通过 extends 关键字来扩展
4. interface 会创建新的类型名，type 只是创建类型别名，并没有新创建类型
5. 同名接口会自动合并，而类型别名不会

## interface 和 type 的相同点

1. 都可以用来描述对象或函数
2. 都支持扩展

[参考:interface 和 type](https://www.jianshu.com/p/30325ff0b058)

# 学习文档

> [TypeScript 中文手册](https://typescript.bootcss.com/)

> [TypeScript 在线运行](https://c.runoob.com/compile/5577/)

> [TypeScript 在线编译](https://www.typescriptlang.org/play?#code/DYUwLgBMCWDOYC4IFcB2BrVB7A7qg2gLoQC8E+AjADQQBMNAzDQOQPOEDcQA)
