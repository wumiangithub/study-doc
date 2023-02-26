# react 生态

## umi

## dva

## reducers

- reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

## redux

## react-redux

## redux-saga

## ahooks

## Davinci

## formily 拖拽表单

[github:formily](https://github.com/alibaba/formily)

## antd-formily-boost 表格

[antd-formily-boost 官网](https://fishedee.github.io/antd-formily-boost/start)

## sula Form Table

- 仅通过 JSON 配置就可以完成整个项目的「产品级配置」。
- import { Form, Table, CreateForm, QueryTable, StepForm, StepQueryTable } from 'sula';  
  [sula 官网](https://sula.vercel.app/#/advanced/whatisplugin?anchor=input-%E6%8F%92%E4%BB%B6)

## rematch

Rematch 是在 redux 的基础上再次封装，使用 rematch，我们就不需要再声明 action 类型、action 创建函数、thunks 配置；

如果你之前学过 vuex，那你对这个不会陌生，因为模式基本上一样。
[rematch 官网](https://rematchjs.org/docs/)

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
