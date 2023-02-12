# 微信小程序

## wxss VS css

- **在微信小程序中使用的是 wxss 代替 css，单位用的是 rpx。**
- **rpx 是微信提供自适应各种尺寸屏幕的，建议设计稿使用 iphone6 设计 375px 750 像素**
- **750rpx = 375px = 750 物理像素**

## WXS

**WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。**  
**可以简单理解为是另一种 js**

```
// page.js
Page({
  data: {
    array: [1, 2, 3, 4, 5, 1, 2, 3, 4]
  }
})

//wxml
<!-- 下面的 getMax 函数，接受一个数组，且返回数组中最大的元素的值 -->
<wxs module="m1">
var getMax = function(array) {
  var max = undefined;
  for (var i = 0; i < array.length; ++i) {
    max = max === undefined ?
      array[i] :
      (max >= array[i] ? max : array[i]);
  }
  return max;
}

module.exports.getMax = getMax;
</wxs>

<!-- 调用 wxs 里面的 getMax 函数，参数为 page.js 里面的 array -->
<view> {{m1.getMax(array)}} </view>
```

### 注意

- WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。

## 小程序的主包和分包

- 加载分包会加载主包吗？

- 主包最大是多少？

[参考](https://blog.csdn.net/m0_61490399/article/details/127132767)

## 微信小程序学习文档
