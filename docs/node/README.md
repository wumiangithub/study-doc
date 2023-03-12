# node

## nvm

nvm 全名 node.js version management，顾名思义是一个 nodejs 的版本管理工具

## 在 Node.js 中使用 import 关键字

注意，在 Node.js 中使用 import 关键字，需要在 package.json 增如键值对： “type”: “module”

## 切片上传知道吗？ 网路不好上传大文件的时候怎么办？

## 压测怎么做

## 什么是错误优先的回调函数？

**第一个参数始终应该是一个错误对象**

```js
fs.readFile(filePath, function (err, data) {
  if (err) {
    //handle the error
  }
  // use the data object
});
```

## Node 是通过 libuv 来实现多线程的

Node 只运行在一个单一线程上，至少从 Node.js 开发者的角度是这样的。在底层， Node 是通过 libuv 来实现多线程的。
Libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个事件循环， 以异步的方式将任务的执行结果返回给 V8 引擎

## node 爬虫

### node 爬虫框架

- crawl-pet
