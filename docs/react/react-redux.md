## react-redux

- 1、将组件分为了容器组件和 UI 组件；
- 2、取代 redux 中的“store.subscribe”监听组件的状态变化，用于渲染组件；
  通过 Provider 组件来取代 redux 中的 store.subscribe 来监听组件的状态变化，用于渲染组件。
- 3、配合 redux 使用，使组件轻松的拿到全局状态，方便组件间的通信。
- 4、shallowEqual 性能优化
- 5、搭配@reduxjs/toolkit 使用

```js
npm install react-redux --save
npm i @reduxjs/toolkit --save
```

```js
import ReactDOM from "react-dom";
import App from "./App.js";
import store from "./store/store.js";
import { Provider } from "react-redux";

// 通过 Provider 提供 store 供其他组件内部使用
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// 用了 react-redux 下面手动触发更新的方式就没用了
/* store.subscribe(() => {
    ReactDOM.render(<App />, document.querySelector('#root'))
}) */
```

[react-redux 使用:参考](https://blog.csdn.net/m0_71485750/article/details/126876178)

### @reduxjs/toolkit

[@reduxjs/toolkit 官网](https://redux-toolkit.js.org/introduction/getting-started)

## 文档

[react-redux 官网](https://react-redux.js.org/tutorials/quick-start)
