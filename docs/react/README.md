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

## 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作

因为更改 state 的函数必须是纯函数

## 文档

[官网](https://zh-hans.reactjs.org/docs/getting-started.html)
