# umi

## umi

- 一个可插拔的企业级 react 应用框架
- umi 是蚂蚁金服的底层前端框架
- 开箱即用，内置 react、react-router 等
- dva 目前是纯粹的数据流, 个人觉得 umi + dva 是比较搭的

## 开始

需要

- node
- umi
- serve : 一个本地 node 静态网页服务器，将打包好的 dist 文件，可以直接使用 serve 跑起来 example : server ./dist
  还有一个类似的库 anywhere 
- now: 一个服务器，可以使用外网访问
  - now 在 2020 年 12 月 31 日停止跟新，使用 vercel 代替 npm i -g vercel
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

## 文档

[umi 官网](https://v2.umijs.org/zh/)
