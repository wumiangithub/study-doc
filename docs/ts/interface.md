# interface

```js
interface SquareConfig {
  color?: string;
  width?: number;
  gg?: number | string;
  (source: string, subString: string): boolean; //函数类型
  [i: number]: number[]; //字符串索引签名
  [propName: string]: any; //字符串索引签名
  readonly x: number; //只读属性
}
```

readonly vs const
最简单判断该用 readonly 还是 const 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用 readonly。

```js
interface StringArray {
  [index: number]: unknown; //可索引的类型
}

let myArray: StringArray;
myArray = ["Bob", "Fred", 5555];

let myStr: unknown = myArray[0];
```

## TypeScript 中的 implements 和 extends

### implements实现
```js

```

### extends继承
```js

```