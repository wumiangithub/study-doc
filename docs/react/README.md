# react

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
```

```
事件最开始从原生 DOM 按钮一路冒泡到 body，body 的事件处理器执行，输出 body。
注意此时流程还没进入 React。为什么？因为 React 监听的是 document 上的事件。
```

## 学习文档

> [官网文档](https://zh-hans.reactjs.org/)

## 面试题学习文档

> [参考 1](https://juejin.cn/post/6941546135827775525)  
> [参考 2](https://juejin.cn/post/6940942549305524238)
