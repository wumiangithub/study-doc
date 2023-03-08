# 微信小程序

## 发展

### 微信小程序的上线时间为 2017 年 1 月 9 日

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

[参考:WXS](https://blog.csdn.net/m0_61490399/article/details/127132767)

### 注意

- WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。

## 小程序的主包&分包&独立分包&分包异步化

- 加载分包会加载主包吗？  
  答：会的，普通分包会，但是独立分包不会。

- 主包最大是多少？

  - 整个小程序所有分包大小不超过 20M
  - 单个分包/主包大小不能超过 2M

- 独立分包  
  开发者通过在 app.json 的**subpackages**字段中对应的分包配置项中定义**independent:true**字段声明对应分包为独立分包。一个小程序中可以有多个独立分包

- 分包预下载  
  开发者可以通过配置，在进入小程序某个页面时，由框架自动预下载可能需要的分包，提升进入后续分包页面时的启动速度。对于独立分包，也可以预下载主包  
  同一个分包中的页面享有共同的预下载大小限额 2M，限额会在工具中打包时校验。  
  通过 **preloadRule** 去配置分包预下载

- 分包异步化  
   默认情况，分包不能使用其他分包的资源，只可以会用主包和分包内的资源，但是分包异步化解决了这个问题。  
   **1、跨分包自定义组件引用: 通过占位符实现**

  ```js
  // subPackageA/pages/index.json
  {
  "usingComponents": {
    "button": "../../commonPackage/components/button",
    "list": "../../subPackageB/components/full-list",
    "simple-list": "../components/simple-list"
  },
  "componentPlaceholder": {
    "button": "view",
    "list": "simple-list"
  }
  }

  ```

  **2、跨分包 JS 代码引用: 通过异步函数实现**

  ```js
  // subPackageA/index.js
  // 使用回调函数风格的调用
  require("../subPackageB/utils.js", (utils) => {
    console.log(utils.whoami); // Wechat MiniProgram
  }, ({ mod, errMsg }) => {
    console.error(`path: ${mod}, ${errMsg}`);
  });
  // 或者使用 Promise 风格的调用
  require
    .async("../commonPackage/index.js")
    .then((pkg) => {
      pkg.getPackageName(); // 'common'
    })
    .catch(({ mod, errMsg }) => {
      console.error(`path: ${mod}, ${errMsg}`);
    });
  ```

[参考：分包](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)

## 微信小程序中页面栈最多十层

以前是 5 层，后面改成 10 层
首先微信小程序的跳转方法有

1. wx.navigateTo(Object object) 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
2. wx.navigateBack(Object object) 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
3. wx.redirectTo(Object object) 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

通过 getCurrentPages 获取当前页面栈，到十层的时候可以用 redirectTo 代替 navigateTo

## 怎么突破每个包只有 2M 的大小限制

**使用 webview**

## 小程序和 webview 怎么通信

## 目录中的 miniprogram_npm 和 node-modules 什么关系

- node-modules 是你使用 npm 安装第三方包时候，包的源码
- miniprogram_npm : 安装了第三方包并不能直接使用，需要: 点击工具->构建 npm，会生成 miniprogram_npm 目录

## wx:for

- 使用 wx:for-item 可以指定数组当前元素的变量名: 默认就是 item
- 使用 wx:for-index 可以指定数组当前下标的变量名: 默认就是 index

```js
<switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>

<switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;"> {{item}} </switch>

data: {
  objectArray: [
    {id: 5, unique: 'unique_5'},
    {id: 4, unique: 'unique_4'},
    {id: 3, unique: 'unique_3'},
    {id: 2, unique: 'unique_2'},
    {id: 1, unique: 'unique_1'},
    {id: 0, unique: 'unique_0'},
  ],
  numberArray: [1, 2, 3, 4]
}
```

[参考 w3c:wx:for](https://www.w3cschool.cn/weixinapp/weixinapp-list.html)

## wxss 中引入图片资源

- background-image 不支持本地图片
- background-image 支持网络图片和 base64 格式

## image 设置图片之后还可以设置背景色

```
<image src="../../images/index_time_2.png" mode="" class="line"/>
.line{
background: #F2F5FC;
}
```

## 小程序父子组件传值

### 子组件通过 properties

### 父组件直接赋值到子组件上

## 小程序组件需要在 json 文件中申明 "component": true,

组件中可以将方法写在 methods 中

```js
// components/xingcheng-feiyong/xingcheng-feiyong.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mingxi: { type: Array, value: [] },
    title: { type: String, value: "" },
    total: { type: String, value: "" },
  },

  /**
   * 组件的初始数据
   */
  data: {
    fold: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFold() {
      this.setData({
        fold: !this.data.fold,
      });
    },
  },
});
```

## 微信小程序第三方组件库

- @vant/weapp

## 微信小程序学习文档

[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
