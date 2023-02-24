# redux

## Redux 工作原理

````
使用单例模式实现

Store 一个全局状态管理对象

Reducer 一个纯函数，根据旧state和props更新新state

Action 改变状态的唯一方式是dispatch action```
````

## createStore

```js
import { createStore } from "redux";

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 */
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => console.log(store.getState()));

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1
```

## combineReducers

```js
function visibilityFilter(state = "SHOW_ALL", action) {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case "COMPLETE_TODO":
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

import { combineReducers, createStore } from "redux";
let reducer = combineReducers({ visibilityFilter, todos });
let store = createStore(reducer);
```

## 三大原则

### 单一数据源

整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

### State 是只读的

唯一改变 state 的方法就是触发 action

### 使用纯函数来执行修改

为了描述 action 如何改变 state tree ，你需要编写 reducers。

## 文档

[redux 官网](https://www.redux.org.cn/)
