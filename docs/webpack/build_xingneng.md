# 优化打包构建速度

## oneOf

```
多个 loader，但是每个文件只能匹配一个 loader，被一个 loader 处理，因此可以使用 oneOf 唯一匹配，
不需要每个文件把所有的 loader 都询问一遍，可以提高 loader 的执行效率
```

## babel 缓存: 使用 cacheDirectory 开启 babel 缓存

```
正因为babel-loader在解析转换上耗时太长，所以我们希望能缓存每次执行的结果。
webpack的loader中刚好有 cacheDirectory 的选项，默认为false 开启后将使用缓存的执行结果，打包速度明显提升。

// webpack.base.js
module.exports = {
    module: {
        rules: [
            {
            test: /\.js$/,
            include: [resolve('src')],
            use: {
              loader: 'babel-loader?cacheDirectory',
            },
        },]
    }
}
```

## externals 结合 cdn 公共库就不要每次打包了

```
不需要打包编译的插件库换成全局<script>标签引入的方式

比如jQuery插件，react, react-dom等，代码量是很多的，打包起来可能会很耗时

可以直接用标签引入，然后在webpack配置里使用 expose-loader  或 externals 或 ProvidePlugin  提供给模块内部使用相应的变量


// @1
use: [{
                loader: 'expose-loader',
                options: '$'
            }, {
                loader: 'expose-loader',
                options: 'jQuery'
            }]


// @2
externals: {
        jquery: 'jQuery'
    },


// @3
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
-->
```

## 提取公共代码

- dll 技术 DLLPlugin 和 DLLReferencePlugin 结合 manifest json 提取公共代码
- 使用 CommonsChunkPlugin 提取公共的模块，可以减少文件体积，也有助于浏览器层的文件缓存，还是比较推荐的
  <br>

```
使用 DllPlugin 和 DllReferencePlugin
这种方式其实和externals是类似的，主要用于有些模块没有可以在script标签中引入的资源（纯npm包）
Dll 是动态链接库的意思，实际上就是将这些 npm 打包生成一个 JSON 文件，
这个文件里包含了 npm 包的路径对应信息 这两个插件要一起用
```

## 多进程打包 thread-loader

## 使用 fast-sass-loader 代替 sass-loader

## terser-webpack-plugin 代替自带的 UglifyJsPlugin 插件

## exclude、排除不需要解析的模块 exclude: /node_modules/,

## include 指定需要解析的目录

## 使用 noParse

```

webpack 打包的时候，有时不需要解析某些模块的依赖（这些模块并没有依赖，或者并根本就没有模块化），我们可以直接加上这个参数，直接跳过这种解析

module: {
noParse: /node_modules\/(jquey\.js)/
}

```

## 使用 HappyPack 来加速构建

```
要注意的第一点是，它对file-loader和url-loader支持不好，
所以这两个loader就不需要换成happypack了，其他loader可以类似地换一下
```

## 参考文档

[参考](https://www.cnblogs.com/imwtr/p/7801973.html)
