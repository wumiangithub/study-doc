## 申明类型的多种方式

### : 申明

```js
let isDone: boolean = false;
let decLiteral: number = 6;
const a: string = "我我我";
enum Color {Red = 1, Green = 2, Blue = 4};
let c: Color = Color.Green;
let unusable: void = undefined; //声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

// 返回never的函数必须  存在  无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

### 申明数组的多种方式

```js
// 各元素的类型相同
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
// 元组 Tuple  各元素的类型不必相同
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
// 任意类型可以使用unknown
let list: unknown[] = [1, 2, 3, "3"];

// interface中使用可索引的类型  实现多种类型，甚至是任意类型
interface StringArray {
  [index: number]: number | string; //可索引的类型
}

let myArray: StringArray;
myArray = ["Bob", "Fred", 5555];

let myStr: unknown = myArray[0];
```

### typeof

```js
// 定义一个对象并从中推断出它的键。
const persons = [
  { name: "John", age: 12 },
  { name: "Ben", age: 20 },
];

const fun = (info: typeof persons) => {
  //You will get intellisense here
  console.log(info[0].name);
};
```

### <> 的使用

**用作泛型**

```js
function identity<T>(arg: T): T {
  return arg;
}
```

**类型断言**

```js
let strLength: number = (<string>someValue).length;
```

**包裹 interface**

```js
// 如果希望对象具有固定键，则可以使用类型和接口。
interface IPerson {
  id?: string; // ID is optional (use of ? operator)
  name: string; // Name is Required
  age: number;
}

const persons: Array<IPerson> = [
  { name: "John", age: 12 },
  { name: "Ben", age: 20 },
];

// Both are same: Array<IPerson> === IPerson[]
const fun = (info: Array<IPerson>) => {
  //You will get intellisense here
  console.log(info[0].name);
};
```

```js
// 您希望对象具有固定键，并且需要提供部分信息。
interface IPerson {
  id?: string; // ID is optional (use of ? operator)
  name: string; // Name is Required
  age: number;
}

// Partial代表部分的，意思就是IPerson中的属性哪怕是没有?的也可以不传
const persons: Array<Partial<IPerson>> = [
  { name: "John" }, // You can do it.
  { name: "Ben", age: 20 },
];

// Both are same: Array<IPerson> === IPerson[]
const fun = (info: Partial<IPerson>[]) => {
  //You will get intellisense here
  console.log(info[0].name);
};
```

**注意：Partial 代表部分的，意思就是 interface 中的属性哪怕是没有?的也可以不传**

## 特殊类型

```js
any;
unkonw;
never;
void;
Null;
Undefined
```

## html 中使用类型

```js
const button = document.querySelector('button) as HTMLButtonElement;
const button:HTMLButtonElement | null = document.querySelector('button);
const tableRow:HTMLTableRowElement = document.createElement('tr);
```

```?
HTMLButtonElement;
HTMLTableRowElement;
```

## 高级类型

> [参考文档](https://blog.csdn.net/YangJing17/article/details/124343627)

```?
交叉类型  &
联合类型  |
索引类型  keyof
映射类型  Readonly
条件类型
```

## 元组类型 Tuple

**当数组中每个元素的类型不一样的时候，就可以定义一个元组类型**

```js
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

## Partial

**注意：Partial 代表部分的，意思就是 interface 中的属性哪怕是没有?的也可以不传**

## keyof 类型操作符

[参考](https://juejin.cn/post/7032974613608923167)

**keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型**

```js
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number
```

**常用的工具方法都是通过 type 实现的**

```js
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```
