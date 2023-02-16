# 算法

## 斐波那契数列

**后面的值，等于前两个值之和**

斐波那契数列（兔子序列）1、1、2、3、5、8、13，21…

```js
//利用递归函数求:用户输入一个数字n就可以求出这个数字对应的兔子序列值
//我们只需要知道用户输入的n的前面两项（n-1 n-2）就可以计算出n对应的序列值
function fn(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fn(n - 1) + fn(n - 2);
}
console.log(fn(3)); //2
console.log(fn(6)); //8
```

## 文档

[参考](https://blog.csdn.net/Better_Xing/article/details/114937915)
