# react

## 发展

#### 18 发布时间 2022、3、29

#### 17 发布时间 2022、10、29

#### 16.8 发布时间 2019、2、6

- Hooks 在 React 16.8 版本中正式被引入

#### 16 发布时间 2017、9、26

### 18 新特性

[18 新特性参考](https://blog.csdn.net/rhrh_fd/article/details/126843363)

1. 所有更新都会自动进行批处理。多次更新将会合并成一次更新，从而降低渲染次数提高性能。

- 如果再想退出批处理，需要使用 flushSync

2. react17 和 react18 的区别就是：从同步不可中断更新变成了异步可中断更新。

3. 开启并发模式：

- 在 React18 中提供了新的 root Api，我们只需要把 render 改成 ReactDOM.createRoot(root).render(<App />) 就可以开启并发模式。
  - 并发特性指的是开启并发模式才能使用的特性，比如下面介绍的：
    - startTranstion
    - useTransition
    -

## 简述 React 的生命周期

### 挂载

1. constructor 可以进行 state 和 props 的初始化

2. render

3. componentDidMount 第一次渲染后调用，可以访问 DOM，进行异步请求和定时器、消息订阅

### 更新

1. shouldComponentUpdate 返回一个布尔值，默认返回 true (当组件的 props 或 state 变化会触发更新)

2. render

3. componentDidUpdate 在组件完成更新后调用

### 卸载

1. componentWillUnmount 组件从 DOM 中被移除的时候调用

## 什么是 fiber，fiber 解决了什么问题

在 React16 以前，React 更新是通过树的深度优先遍历完成的，遍历是不能中断的

为了解决这个问题引入了 fiber，React fiber 就是虚拟 DOM，它是一个链表结构，随时可中断

fiber 是协程，是比线程更小的单元，可以被人为中断和恢复

```
在 16 之前，React 是直接递归渲染 vdom 的，setState 会触发重新渲染，对比渲染出的新旧 vdom，对差异部分进行 dom 操作。

在 16 之后，为了优化性能，会先把 vdom 转换成 fiber，也就是从树转换成链表，然后再渲染。整体渲染流程分成了两个阶段：

render 阶段：从 vdom 转换成 fiber，并且对需要 dom 操作的节点打上 effectTag 的标记
commit 阶段：对有 effectTag 标记的 fiber 节点进行 dom 操作，并执行所有的 effect 副作用函数。
从 vdom 转成 fiber 的过程叫做 reconcile（调和），这个过程是可以打断的，由 scheduler 调度执行。
```

[参考:react 的 diff 算法中 vdom 和 fiber](https://zhuanlan.zhihu.com/p/553744711)

## React 中 setState 什么时候是同步的，什么时候是异步的？

setState 是一个异步方法，但是在 setTimeout/setInterval 等定时器里逃脱了 React 对它的掌控，变成了同步方法

- 由 React 控制的事件处理程序，以及生命周期函数调用 setState 不会同步更新 state 。
- React 控制之外的事件中调用 setState 是同步更新的。比如原生 js 绑定的事件，setTimeout/setInterval 等。

这里所说的同步异步， 并不是真正的同步异步， 它还是同步执行的。

这里的异步指的是多个 state 会合成到一起进行批量更新。

希望初学者不要被误导

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0,
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
}
//答案是： 0 0 2 3，你做对了吗？
```

## react 生态

### umi

- 一个可插拔的企业级 react 应用框架
- umi 是蚂蚁金服的底层前端框架
- 开箱即用，内置 react、react-router 等
- dva 目前是纯粹的数据流, 个人觉得 umi + dva 是比较搭的

[umi 官网](https://v2.umijs.org/zh/)

### dva

- dva 目前是纯粹的数据流,
- 仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API

[dva 官网](https://dvajs.com/)

### reducers

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

### redux

- Redux 主要是 action——reducer——store 这三者之间进行关联。

- Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有 2kB，包括依赖）。

- Redux 是 JavaScript 状态容器，

- Redux 由 [Flux](http://facebook.github.io/flux/) 演变而来，但受 Elm 的启发，避开了 Flux 的复杂性。

[redux 官网](https://www.redux.org.cn/)

### react-redux

- 1、将组件分为了容器组件和 UI 组件；
- 2、取代 redux 中的“store.subscribe”监听组件的状态变化，用于渲染组件；
  通过 Provider 组件来取代 redux 中的 store.subscribe 来监听组件的状态变化，用于渲染组件。
- 3、配合 redux 使用，使组件轻松的拿到全局状态，方便组件间的通信。

[react-redux 官网](https://react-redux.js.org/tutorials/quick-start)

### redux-saga

- redux-saga 是一个 redux 中间件，
- 它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。（副作用，例如异步获取数据，访问浏览器缓存等）

[redux-saga 官网](https://redux-saga-in-chinese.js.org/)

### ahooks

### Davinci

### formily 拖拽表单

[github:formily](https://github.com/alibaba/formily)

### antd-formily-boost 表格

[antd-formily-boost 官网](https://fishedee.github.io/antd-formily-boost/start)

### sula Form Table

- 仅通过 JSON 配置就可以完成整个项目的「产品级配置」。
- import { Form, Table, CreateForm, QueryTable, StepForm, StepQueryTable } from 'sula';  
  [sula 官网](https://sula.vercel.app/#/advanced/whatisplugin?anchor=input-%E6%8F%92%E4%BB%B6)

### rematch

Rematch 是在 redux 的基础上再次封装，使用 rematch，我们就不需要再声明 action 类型、action 创建函数、thunks 配置；

如果你之前学过 vuex，那你对这个不会陌生，因为模式基本上一样。
[rematch 官网](https://rematchjs.org/docs/)

## 文档

[官网](https://zh-hans.reactjs.org/docs/getting-started.html)
