### 泛型(generic)

```js
function identity<T>(arg: T): T {
  return arg;
}
let output = identity < string > "myString";
let output = identity("myString");
```
