# webpack

## HMR 热更新

HMR Hot Module Replacement

## sideEffects

- webpack4 新增了一个 sideEffects 新特性，它允许我们通过配置的方式，去标识我们的代码是否有副作用，从而为 Tree-shaking 提供更大的压缩空间。
- 这里的副作用指的是模块执行时除了导出成员之外所做的事情。
- sideEffects 一般用于 npm 包标记是否有副作用。
- 像在 window 对象上挂载了 x 字段，就是一种副作用

```
sideEffects 支持两种写法，一种是 false，一种是数组

false 为了告诉 webpack 我这个 npm 包里的所有文件代码都是没有副作用的
数组则表示告诉 webpack 我这个 npm 包里指定文件代码是没有副作用的
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
        sideEffects: false || [],
      },
    ],
  },
};
```

```js
// package.json
{
    "sideEffects": false
}
// antd package.json
{
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*"
  ]
}
```

[参考](https://zhuanlan.zhihu.com/p/41795312)  
[参考](https://blog.csdn.net/weixin_45047039/article/details/110387613)

## 文档

[webpack 官网](https://www.webpackjs.com/)
