# dva

## dva

- dva 目前是纯粹的数据流,
- 仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
- 定位：dva 首先是一个基于 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。
- dva = React-Router + Redux + Redux-saga；

## model 介绍

每个 model 中都包含 6 个 api,分别是 state,Action,dispatch reducer,effect Subscription

## state

state 表示 model 的状态数据，通常是一个 JavaScript 对象。操作时候每次都要当做不可变数据对待，保证每次都是全新对象，没有引用关系，这样才能保证 State 的独立性

## Action

Action 是一个普通的 JavaScript 对象，是改变 State 的唯一途径，无论是 UI 事件，网络回调，还是 websocket 等数据源获取数据，最终都是通过 dispatch 函数调用一个 action

## dispatch

dispatch 函数是一个触发 action 函数，dispatch 可以看成是触发这个歌行为的方式

## reducer

reducer 函数接收两个参数，reducer 来自函数式编程

## Effect

- Effect 表示为副作用函数，在应用中最常见的就是异步操作。dva 为了控制副作用的操作，底层是引用了 redux-saga 做异步流程，由于采用了函数式编程（generator 函数），所以讲异步转换成同步，从而 Effect 转成纯函数
- 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑

## Subscription

Subscription 是一种从源获取数据的方法。它在函数被注册的时候调用

[参考](https://www.jianshu.com/p/b8e9959d226b)

[dva 官网](https://dvajs.com/)
