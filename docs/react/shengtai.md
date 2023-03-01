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

## redux-thunk
