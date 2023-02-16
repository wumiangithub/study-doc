# 数组

## 普通数组去重

```js
function uniqueArr(arr) {
  var newArr = [...new Set(arr)]; //利用了Set结构不能接收重复数据的特点

  return newArr;
}
```

## 对象数组去重

```js
export function uniqueObjArr(arr, key = "id") {
  const res = new Map();
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1));
}
```

## 数组 sort 排序

```js
let arr = ["A", "C", "B", "D"];
arr.sort();
console.log(arr); // ['A','B','C','D']
```

```js
let arr = [15, 8, 25, 3];
arr.sort();
console.log(arr); // [3,8,15,25]
```

```js
let arr = [15, 8, 25, 3];
arr.sort((x, y) => x - y); // 正序
console.log(arr); // [3,8,15,25]
arr.sort((x, y) => y - x); // 倒序
```

```js
let person = [
  { name: "zs", age: 22 },
  { name: "ls", age: 20 },
  { name: "ww", age: 28 },
];
// 如果我们需要按照对象中的age属性进行数组排序
person.sort((a, b) => {
  return a.age - b.age;
});
```

### localeCompare 中文排序

```js
// 根据id值的首字母进行排序
let arr = [
  { id: "sh", name: "上海" },
  { id: "bj", name: "北京" },
  { id: "gz", name: "广东" },
  { id: "sz", name: "深圳" },
];
// 根据中文首字母排序
let arr1 = ["上海", "北京", "广州", "深圳"];
// 根据id值的首字母排序
arr.sort((a, b) => a["id"].localeCompare(b["id"]));
// 根据中文的首字母排序
arr1.sort((a, b) => a.localeCompare(b));
```

## 数组其他排序

### 选择排序、冒泡排序、插入排序和快速排序

也被问道了，需要去看

[数组其他排序：参考](https://blog.csdn.net/weixin_55992854/article/details/116849789)
