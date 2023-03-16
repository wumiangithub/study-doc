# 太美医疗

## semi.design 抖音

- Semi Design 是由抖音前端团队，MED 产品设计团队设计、开发并维护的设计系统
- Semi Design 整体采用 Foundation/Adapter 架构
- 支持将设计稿直接转代码
- 目前只支持 react 版本

[semi.design 官网:参考](https://semi.design/zh-CN/start/introduction)

## arco.design 字节

- ArcoDesign 主要服务于字节跳动旗下中后台产品的体验设计和技术实现
- vue 和 react 版本都有

[arco.design 官网:参考](https://arco.design/)

## tdesign 腾讯

- TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系。
- 支持 PC、移动端、小程序、vue 、react

[tdesign 官网:参考](https://tdesign.tencent.com/)

## antd5

- 蚂蚁集团的企业级产品

[antd5-react:官网](https://ant.design/docs/react/introduce-cn)  
[antd-vue:官网](https://2x.antdv.com/docs/vue/introduce-cn)

## material

## mui

## headless

- Headless UI 目前社区还在探索实践阶段，这里我对它做了个简单定义：Headless UI 一套基于 React Hooks 的组件开发设计理念，强调只负责组件的状态及交互逻辑，而不管标签和样式。 其本质思想其实就是关注点分离：将组件的“状态及交互逻辑”和“UI 展示层”实现解耦。
- 从实体上看，Headless UI 组件就是一个 React Hook。
- 我目前看到的比较不错的实践就是 [Chakra-UI](https://chakra-ui.com/getting-started) 组件库

[参考] (https://juejin.cn/post/7160223720236122125)

## 组件 API 设计规范/原则

- class 统一前缀, 支持主题配置
- UI 风格统一
- 低耦合
- 输入输出明确
- 功能单一
- 单项数据流
- 语义化
- 隐藏内部细节，通过 props 控制组件
- 可扩展

## react18 兼容性

- createRoot 取代 render

```jsx
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
```

```jsx
ReactDOM.render(<App />, rootElement);
```

- 自动批处理以减少渲染
  - 可以使用 ReactDOM.flushSync()选择退出批处理

## 基于 lerna

- lerna 是多 package 代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题
- 未使用 lerna 之前，想要调试一个本地的 npm 模块包，需要使用 npm link 来进行调试，但是在 lerna 中可以直接进行模块的引入和调试

```js
// lerna.json
"npmClient": "yarn",  // 指定 npmClent 为 yarn
 "useWorkspaces": true // 将 useWorkspaces 设置为 true
```

```js
// package.json
{
 "name": "root",
 "private": true,
 "workspaces": [
   "packages/*"
 ],
 "devDependencies": {
   "lerna": "^4.0.0"
 }
}
```

### 一个基本的 Lerna 管理的仓库结构如下：

![](https://oscimg.oschina.net/oscnet/cbf3ca2fc2bdc28777cea860d4ab220c949.jpg)

```
npm i -g lerna
lerna init
lerna create package1
lerna create package1
```

[lerna:参考 1](https://juejin.cn/post/6980541487683469349)  
[lerna:参考 2](https://my.oschina.net/vivotech/blog/3089030)

## npm-local-development

- lerna link 项目包建立软链，类似 npm link

## 组件库：单包&多包

- 每个组件都没有 package.json，不能单独发布到 npm，每次改动都需要一起打包发布，也不能单独下载，这个是单包架构。

- 每个组件都有 package.json，可以单独发布到 npm，这个是多包架构。

- 基于 Lerna 的多包管理架构

## 单包组件库支持按需引入

- 对于单包组件库项目，支持按需加载需要满足：组件库以 es6 模块化方式导出
  ```
  import { xxx } from 'xxx'
  import yyy from yyy
  export default zzz;
  export { a, b, c };
  ```
- gulp 天然支持

- 我们知道 webpack 有多种导出模式（libraryTarget），但是 webpack 却没有支持导出 ES 模块的模式。大家通常都会选择的'umd'导出模式，它的导出文件也是一个立即执行函数，一点都不符合 es6 模块化方式。

  - element-ui 就专门开发了 babel 插件 **babel-plugin-component**来支持按需导出

  ```js
  entry: {
  'hello': './src/components/Hello/index.js',
  'test': './src/components/Test/index.js',
  'my-lib': './src/index.js'
  },
  output: {
  path: path.join(__dirname,"/lib"),
  filename: '[name].js',
  libraryTarget: 'umd',
  library: '[name]',
  libraryExport: 'default'
  },
  ```

  - 多入口，多出口导出
  - webpack5 已经在支持 libraryTarget: 'module'(es)(还未完全支持)
  - libraryTarget: commonjs2、umd、global、this、amd、commonjs、window
    - 请使用 output.library.type 代理  
      [libraryTarget 各个参数含义:参考](https://juejin.cn/post/6844904144864559117)

- 开发组件库也可以使用 rollup.js 来打包，它能很好地支持 ES Module，tree-shaking 也是 rollup.js 先提出的，实现组件库地按需加载就简单很多

[单包组件库支持按需引入:参考](https://juejin.cn/post/6932736907830886413)

## 算法树

## 状态管理

## webpack 插件

## webpack 生命周期

## 浏览器缓存，页面资源不更新
