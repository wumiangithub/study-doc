### 泛型(generic)

```js
function identity<T>(arg: T): T {
  return arg;
}
// 调用方式一
let output = identity < string > "myString";

// 调用方式二
let output = identity("myString");
```
