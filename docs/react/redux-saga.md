## redux-saga

- 定位：redux 中间件；旨在于更好、更易地解决异步操作（有副作用的 action）
- 它的目标是让副作用管理更容易（副作用，例如异步获取数据，访问浏览器缓存等）
- redux-saga 基于 generator
- 简单解释就是，saga 是一个任务列表，任务执行顺序是有序的
- 缺点：学习成本高
- 优点：集中处理了所有的异步操作，异步接口部分一目了然
- 所以推荐使用 dva 整合了 saga，使用简单

## redux-saga vs redux-thunk

[参考](https://www.cnblogs.com/sexintercourse/p/15689873.html)

## 文档

[redux-saga 官网](https://redux-saga-in-chinese.js.org/)
