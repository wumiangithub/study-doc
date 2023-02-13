# 数组

## 对象数组去重

```js
export function uniqueObjArr(arr, key = "id") {
  const res = new Map();
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1));
}
```
