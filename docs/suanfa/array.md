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

### 数组 sort 排序原理

**注意： 这种方法会改变原始数组！。**

**sort() 方法用原地算法对数组的元素进行排序，**

### 原地算法

在计算机科学中，一个原地算法（in-place algorithm，也称“就地算法”）是基本上不需要借助额外的数据结构就能对输入的数据进行变换的算法。不过，分配少量空间给部分辅助变量是被允许的。算法执行过程中，**输入的数据往往会被输出结果覆盖**。原地算法只能通过替换或交换元素的方式来修改原始的输入。不满足“原地”原则的算法也被称为非原地（not-in-place）算法或异地（out-of-place）算法。

### 常见原地算法

- 冒泡排序
- 梳排序
- 选择排序
- 插入排序
- 堆排序
- 希尔排序

[原地算法:参考](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)

## 数组其他排序算法

### 选择排序

1. 首先在未排序数组中找到最小(大)元素，存放在数组的起始位置。
2. 再从剩余数组元素中继续寻找最小(大)元素，返回放在已排序数组的末尾
3. 重复第二步，直到所有元素都排序完成

总结：从剩余的数据里选择出最大或最小值，放入挑选出的列表末尾

### 冒泡排序、

1. 比较相邻的两个元素，找出最大值，大的冒出来往后移动，继续和相邻的比较
2. 继续比较相邻的两个元素，但是最后比较过得元素就无需在比较了

总结：比较相邻的两个元素，大的冒出来，继续和后面的比较

### 插入排序

1.  将数组第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
2.  从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。
3.  如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。

总结：将剩余的数据依次和挑选出的数据挨个比较，直到介于两者之间，就停止比较直接插入。

### 快速排序(依托递归函数)

1. 在已知数据集合中随便去一个基准(pivot)
2. 将其余数据以基准为中心，大于分放右边，小于的放左边
3. 将左右两个子集重复以上两个步骤

被多次问到了，需要去看

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

## reduce数组求和

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

## flat 将数组平铺

flat 中的参数，代表数组嵌套了几层，可以给一个大值，不能比实际嵌套层数小

```js
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// console.log(arr.flat(4));
console.log(arr.flat(40));
// console.log(arr.flat(Infinity));
```

[参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

## 将数组平铺、去重、排序

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

### 方式一：利用 Array.flat

```js
var old_arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];

// 数组拍平
var level_arr = old_arr.flat(4);

//数组去重
var Distinct = Array.from(new Set(level_arr));

// 排序
var sort = Distinct.sort((a, b) => a - b);

console.log("new arr", sort);
```

### 方式二：利用 Array.toString

```js
var old_arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
let new_arr = old_arr
  .toString() //1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10
  .split(",") // ['1', '2', '2', '3', '4', '5', '5', '6', '7', '8', '9', '11', '12', '12', '13', '14', '10']
  .sort((a, b) => {
    return a - b;
  }) //['1', '2', '2', '3', '4', '5', '5', '6', '7', '8', '9', '10', '11', '12', '12', '13', '14']
  .map(Number); //[1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 14]
new_arr = Array.from(new Set(new_arr)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
console.log(new_arr);
```
