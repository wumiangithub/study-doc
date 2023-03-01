# redux-thunk

## redux-thunk

- redux-thunk 是 redux 的中间件
- redux-thunk 是 redux 作者给出的中间件，实现极为简单，10 多行代码：
- dispatch 一个 action 之后，到达 reducer 之前，进行一些额外的操作，就需要用到 middleware
- 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。
  换言之，中间件都是对 store.dispatch()的增强
- 缺点：异步各种各样不好维护，适合小项目。
- 优点: 使用简单

```js
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const store = createStore(reducers, applyMiddleware(thunk));
```

- redux 的 dispatch 默认只能传一个对象参数：
  `dispatch({ type: 'CHANGE_COLOR', themeColor: color })`

- redux-thunk 的作用就是使 dispatch 支持传函数参数：更重要的是这个函数可以是异步的, 而 reducer 是纯函数，内部不能做异步操作
  `dispatch(changeColorAsyn(color))`

**总结：就是 redux-thunk 让 redux 调用 dispatch 的时候支持传入异步函数**

[参考](https://juejin.cn/post/6977213053477748772)
[参考](http://www.mobiletrain.org/about/BBS/96990.html)
