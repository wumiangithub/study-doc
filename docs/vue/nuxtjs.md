# nuxtjs

## 有两种构建方式

### 一：使用 Nuxt.js 团队创建的脚手架工具 create-nuxt-app。

### 二：从头开始新建项目

## 怎么判断是客户端还是服务端

process.client // true false

- created 和 beforeCreated 在服务端和客户端都会运行。他们是独立运行的，不会互相影响。
- 使用一些特殊的对象或者方法，如 window、Document、localStorage 等对象只存在于客户端，服务端没有，需要用 process.client 来区分。

## 路由

- Nuxt.js 会依据 pages 目录中的所有 .vue 文件生成应用的路由配置。
- 要在页面之间使用路由，我们建议使用 nuxt-link 标签。
- 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。
- 也支持自定义路由: nuxt.config.js 中定义 extendRoutes

## 文档

[nuxtjs 中文官网](https://www.nuxtjs.cn/)

[参考](https://blog.csdn.net/qq_40407998/article/details/123633815)

[参考](https://zhuanlan.zhihu.com/p/353428855)
