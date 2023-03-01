# umi

## umi

- 一个可插拔的企业级 react 应用框架
- umi 是蚂蚁金服的底层前端框架
- 开箱即用，内置 react、react-router 等
- Umi 内置了约定式路由、构建、部署、测试等
- dva 目前是纯粹的数据流, 个人觉得 umi + dva 是比较搭的

## 开始

需要

- node
- umi
- serve : 一个本地 node 静态网页服务器，将打包好的 dist 文件，可以直接使用 serve 跑起来 example : server ./dist
  还有一个类似的库 anywhere
- now: 一个服务器，可以使用外网访问
  - now 在 2020 年 12 月 31 日停止跟新，使用 vercel 代替 npm i -g vercel
  - 有人说 vercel 不适合国内，没试过不知道
    [vercel 官网](https://vercel.com/docs)

```
yarn global add umi serve now
或者
npm install umi serve now
```

```
umi g  命令生成page
umi g  page index   在pages下生成index.js文件和index.css文件

并且，page下的所有页面都将被自动解析为路由
```

## 新建 global.d.ts 文件

```ts
declare module "react";
declare module "umi";
declare module "*.less";

declare module "*.module.less" {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
}
```

## 新建 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "noImplicitAny": false, // 是否在表达式和声明上有隐含的any类型时报错
    "jsx": "react" //无法使用 JSX，除非提供了 "--jsx" 标志。ts(17004)
  }
}
```

## 文档

[umi2 官网](https://v2.umijs.org/zh/)
[umi3 官网](https://v3.umijs.org/)
[umi 官网](https://umijs.org/docs/tutorials/getting-started)
