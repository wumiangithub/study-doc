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

## 类数组转化为数组的几种方式

1. Array.from(arrayLike);
2. Array.prototype.slice.call(arrayLike);
3. Array.prototype.splice.call(arrayLike, 0);
4. Array.prototype.concat.apply([], arrayLike);
5. 循环遍历类数组对象，push 到新创建的数组对象里

[参考](https://blog.csdn.net/strongestegg/article/details/110059642)

## slice(start,end)返回新数组

**注意：slice() 方法不会改变原始数组**  
**返回值: 可从已有的数组中返回选定的元素**  
**slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。**

```js
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1, 3); //[Orange,Lemon]
var myBest = fruits.slice(-3, -1); // 截取倒数第三个（包含）到倒数第一个（不包含）的两个元素
var myBest = fruits.slice(-3); // 截取最后三个元素

var str = "www.runoob.com!";
document.write(str.slice(4) + "<br>"); // 从第 5 个字符开始截取到末尾
document.write(str.slice(4, 10)); // 从第 5 个字符开始截取到第10个字符
```

[slice 参考：runoob](https://www.runoob.com/jsref/jsref-slice-array.html)

## splice() 方法用于添加或删除数组中的元素。

**注意：这种方法会改变原始数组**  
**返回值: 如果删除一个元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组**

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi"); //Banana,Orange,Lemon,Kiwi,Apple,Mango
```

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 1, "Lemon", "Kiwi"); //Banana,Orange,Lemon,Kiwi,Mango
```

[splice 参考：runoob](https://www.runoob.com/jsref/jsref-splice.html)

## shift 删除数组第一项

**shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。**

**shift() 方法会改变原始数组。**

## pop 删除数组最后一项

**pop() 方法会改变原始数组。**

## 数组求和

```js
/** es6 */
// prev:上次调用函数的返回值
// current：当前元素
// index：当前元素的索引
// arr：当前被遍历的数组
var arraySumEqual = function (arr) {
  // 详细写法
  return arr.reduce((prev, current, index, arr) => {
    return prev + current;
  });
  // 简洁写法
  // return arr.reduce((a, b) => a + b);
};

console.log(arraySumEqual([1, 2, 4])); //7
```

## push

**push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。**

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi", "Lemon", "Pineapple"); //Banana,Orange,Apple,Mango,Kiwi,Lemon,Pineapple
```
