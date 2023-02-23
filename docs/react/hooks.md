# react

## startTransition

```js
import { startTransition } from "react";
// 紧急的更新：展示用户的输入
setInputValue(e.target.value);

// 将非紧急的更新标记为"transitions"
startTransition(() => {
  setContent(e.target.value);
});
```

```js
// hooks用法
import { useTransition } from "react";
const [isPending, startTransition] = useTransition();
```

## useDeferredValue

返回一个延时响应的值可以让一个 state 延时生效，只有当前没有紧急更新的任务时，该值才会变为最新的值。和 startttanstion 一样都是标记为非紧急更新。

## useTransition

**可以用来降低渲染优先级**

```js
/*
举一个输入框的例子
用户输入是最高优先级，
查询优先级次之，那么就可以使用useTransition代替防抖
*/
import React, { useState, useTransition } from "react";

export default function Demo() {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState([]);
  const [loading, startTransition] = useTransition(2000);

  const handleChange = (e) => {
    setValue(e.target.value);
    // 延迟更新
    startTransition(() => {
      setSearchQuery(Array(20000).fill(e.target.value));
    });
  };

  return (
    <div className="App">
      <input value={value} onChange={handleChange} />
      {loading ? (
        <p>loading...</p>
      ) : (
        searchQuery.map((item, index) => <p key={index}>{item}</p>)
      )}
    </div>
  );
}
```

### useDeferredValue

**useDeferredValue 会在更紧急的任务执行完，在执行。比如等用户输入完成在执行  
比起防抖和节流更智能，不需要固定时间执行。**

## useTranstion 和 useDeferredValue 异同：

相同点： useDeferredValue 本质上和内部实现与 useTranstion 一样都是标记成了过度更新任务。

不同点：useTranstion 是把 startTranstion 内部的更新任务变成了过度任务 transtion，而 useDeferredValue 是把原值通过过度任务得到新的值，这个值作为延时状态，一个是处理逻辑，一个是生产一个新的状态

[useTranstion 和 useDeferredValue 原理](https://blog.csdn.net/weixin_43294560/article/details/121428955)

## Hook 规则

- 不要在循环，条件或嵌套函数中调用 Hook
- 不要在普通的 JavaScript 函数中调用 Hook  
  `我们发布了一个名为 eslint-plugin-react-hooks 的 ESLint 插件来强制执行这两条规则`
  > [官网解释](https://zh-hans.reactjs.org/docs/hooks-rules.html)

## useState useReducer

```js
const [state, setState] = useState(initialState);
setState(newState);
setCount((prevCount) => prevCount - 1);
setState((prevState) => {
  // 也可以使用 Object.assign
  return { ...prevState, ...updatedValues };
});

const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props); //只有初始化执行一次
  return initialState;
});
```

**useReducer 是 useState 另一种可选方案，它更适合用于管理包含多个子值的 state 对象。**
在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，[因为你可以向子组件传递 dispatch 而不是回调函数](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down) 。

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

## useEffect 的三种使用方式

```js
// 每次更新都会触发
useEffect(() => {
  // Update the document title using the browser API
  document.title = `You clicked ${count} times`;
});

// 每次更新都会触发，卸载会执行return或者下次更新的时候会执行return，在触发
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  // Specify how to clean up after this effect:
  return function cleanup() {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

```js
//空数组，仅在组件挂载和卸载时执行
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, []);
```

```js
// 仅在 count 更改时更新
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

## useLayoutEffect

但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。

尽可能使用标准的 useEffect 以避免阻塞视觉更新。

useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的

## useMemo

**记住，传入 useMemo 的函数会在渲染期间执行。  
请不要在这个函数内部执行不应该在渲染期间内执行的操作，  
诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。**

## useCallback

### 返回一个 memoized 回调函数。

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
```

### 搭配 ref 使用，

```js
function MeasureExample() {
  const [height, setHeight] = useState(0);

  // 挂载的时候会自动执行
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

## useImperativeHandle, 父组件调用子组件方法

useImperativeHandle 应当与 forwardRef 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

## useRef

### 挂载到 dom 元素上

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### 保存变量

**当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染**

```js
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current); //卸载的时候清除定时器
    };
  }, []);

  // ...
}
```

## 自定义 Hook

**自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook**

## useContext 跨组件传值

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## React.memo

`包裹组件提升性能`

## react 事件机制

```
React 有自身的一套事件系统，
叫作 SyntheticEvent。叫什么不重要，实现上，
React的事件并没有绑定到具体的dom节点上，而是绑定在了document上，然后由统一的事件监听器去监听事件的触发
其实就是通过在 document 上注册事件代理了组件树中所有的事件，并且它监听的是 document 冒泡阶段。

React16的事件绑定在document上， React17以后事件绑定在container上,ReactDOM.render(app,container)
```

```
事件最开始从原生 DOM 按钮一路冒泡到 body，body 的事件处理器执行，输出 body。
注意此时流程还没进入 React。为什么？因为 React 监听的是 document 上的事件。
```

## 在 react 中，阻止事件冒泡有三种形式

1. 阻止合成事件的冒泡用 e.stopPropagation()
2. 阻止合成事件和最外层 document 事件冒泡，使用 e.nativeEvent.stopImmediatePropogation()
3. 阻止合成事件和除了最外层 document 事件冒泡，通过判断 e.target 避免
   ```js
   document.body.addEventListener("click", (e) => {
     if (e.target && e.target.matches("div.stop")) {
       return;
     }
     this.setState({ active: false });
   });
   ```

## 为什么 React 自定义组件首字母要大写

从 jsx 到真实 DOM 需要经历 jsx->虚拟 DOM->真实 DOM。如果组件首字母为小写，它会被当成字符串进行传递，在创建虚拟 DOM 的时候，就会把它当成一个 html 标签

## React 性能优化手段

1. shouldComponentUpdate
2. memo
3. getDerviedStateFromProps
4. 使用 Fragment
5. v-for 使用正确的 key
6. 拆分尽可能小的可复用组件，ErrorBoundary
7. 使用 React.lazy 和 React.Suspense 延迟加载不需要立马使用的组件

## React.lazy 和 React.Suspense

```js
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

## react-loadable vs React.Suspense

```
替换前后对比
对比react-loadable，React.Suspense还是有一些不足。

加载组件缺少delay参数，不能解决请求快速完成时的"闪烁"问题（即使加载模块只需要几毫秒的时间， fallback也会被执行，就上述代码来说，也就是 Spinner 会闪烁一下），需要自己封装
没有内置的加载错误处理方法，需要自己去处理
react-loadable有预加载支持，React.Lazy没有
仍然推荐使用react-loadable来异步加载组件，暂时不用React.Suspense。
```

| 功能                      | React.lazy | react-loadable | @loadable/component |
| :------------------------ | :--------- | :------------- | :------------------ |
| 通用 library 加载         | ❌         | ❌             | ✅                  |
| SSR 支持                  | ✅(v18)    | ✅             | ✅                  |
| 支持 Suspense             | ✅         | ❌             | ✅                  |
| 支持 import(`./${value}`) | ❌         | ❌             | ✅                  |
| 是否支持 timeout、delay   | ❌         | ✅             | ❌                  |
| 是否对包体积友好          | ✅         | ❌             | ❌                  |

[参考](https://zhuanlan.zhihu.com/p/585623764)

## 函数组件与类组件的区别:

1. 类组件需要声明 constructor，函数组件不需要
2. 类组件需要手动绑定 this，函数组件不需要
3. 类组件有生命周期钩子，函数组件没有
4. 类组件可以定义并维护自己的 state，属于有状态组件，函数组件是无状态组件
5. 类组件需要继承 class，函数组件不需要
6. 类组件使用的是面向对象的方法，封装：组件属性和方法都封装在组件内部 继承:通过 extends React.Component 继承;函数组件使用的是函数式编程思想

## 高阶组件

高阶组件是参数为组件，返回值为新组件的函数。

## Portals

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

```js
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

## Profiler

Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 它需要两个 prop ：一个是 id(string)，一个是当组件树中的组件“提交”更新的时候被 React 调用的回调函数 onRender(function)。

```js
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

## 学习文档

> [官网文档](https://zh-hans.reactjs.org/)

## 面试题学习文档

> [参考 1](https://juejin.cn/post/6941546135827775525)  
> [参考 2](https://juejin.cn/post/6940942549305524238)  
> [参考 3](https://juejin.cn/post/7182382408807743548)
