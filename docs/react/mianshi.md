# 面试题

## hooks 为什么不能放在条件判断里

- const [state, setState] = useState(initialState);
- 以 setState 为例，react 内部，每个组件(Fiber)的 hooks 都是以链表的形式存在 memoizeState 属性中
- update 阶段，每次调用 setState，链表就会执行 next 向后移动一步。如果将 setState 写在条件判断中，假设条件判断不成立，没有执行里面的 setState 方法，会导致接下来所有的 setState 的取值出现偏移，从而导致异常发生。

## useState 为什么是使用的数组

因为结构赋值，因为如果是对象的话取别名，没有数组简洁

```js
// 第一次使用
const { state, setState } = useState(false);
// 第二次使用
const { state: count, setState: setCount } = useState(0);
```

```js
const [count, setCount] = useState(0);
```

### 简单总结一下，在自定义 hook 的时候可以遵循一个简单原则：

**当参数大于 2 个的时候返回值的类型返回 object， 否则返回数组。**

[useState 为什么是使用的数组](https://blog.csdn.net/zz130428/article/details/128275793)

## 文档

[react 面试题参考](https://juejin.cn/post/7199941931677270076)
