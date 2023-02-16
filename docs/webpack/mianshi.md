# 面试

## loader 从下往上从右往左解析

```
函数组合
先介绍一个概念，函数组合：函数组合是函数式编程中非常重要的思想，它的实现的思路也没有特别复杂。

函数组合的两种形式(JavaScript函数式编程之函数组合函数compose和pipe的实现)
有两种函数组合的方式，一种是pipe，另一种是compose

webpack采用的是compose
```

## Vite 跟 Webpack 的区别？

Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。

- 依赖 大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。

Vite 将会使用 esbuild 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

- 源码 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。

**Vite 以 原生 ESM 方式提供源码。**  
这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理

### **原理对比**

- Webpack 启动的时候，要根据 entry 找到所有的依赖模块，然后对代码进行编译、打包、压缩的。所以 Webpack 是 bundle based dev server

- Vite 的核心思想是：利用浏览器的能力，将解析依赖和获取 JS 模块的工具交给浏览器去做。本地服务器支队模块进行基本的 transform，减少了分析依赖跟源码打包的成本。因此，Vite 的原理是 Native ESM based dev server

### **Vite 就一定比 Webpack 快吗？**

并不是！以下是开发模式下的对比：

- Vite 启动非常快，因为他是 Native ESM based dev server 的原理，把部分在 webpack 启动时做的工作，交给了浏览器去做了。

- Vite 首次启动加载慢。因为模块以 ES6 原生的模块加载机制的方式被浏览器加载，没有对代码进行打包跟压缩处理，因此请求数会更多，下载文件也会更大。

Vite 是牺牲了页面首次加载时间来加快项目启动时间，但是仅仅是首次！Vite 的第二次启动是会有缓存的。

## loader 和 plugin 的区别是什么

- loader: webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到 loader。
- plugin 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

常见的 loader 和 plugin 插件

Loader:

1. 样式：style-loader、css-loader、less-loader、sass-loader 等
2. 文件：raw-loader、file-loader 、url-loader 等

Plugin:

1. webpack 内置 UglifyJsPlugin，压缩和混淆代码,通过 UglifyES 压缩 ES6 代码。
2. webpack 内置 CommonsChunkPlugin，提取公共代码,提高打包效率，将第三方库和业务代码分开打包
3. ProvidePlugin：自动加载模块，代替 require 和 import
4. html-webpack-plugin 可以根据模板自动生成 html 代码，并自动引用 css 和 js 文件
5. extract-text-webpack-plugin 将 js 文件中引用的样式单独抽离成 css 文件
6. define-plugin 定义环境变量
