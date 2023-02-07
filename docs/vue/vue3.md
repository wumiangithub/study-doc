# vue3

#### vue 3.0 是什么时候正式发布？

`2020年09月18日`

## setup

`setup 在 props 之后，在 data 之前。所以不能使用 this。`

```
因为 props 是响应式的，
所以你不能使用 ES6 解构，它会消除 prop 的响应性。
如果需要解构 prop，可以在
setup 函数中使用 toRefs 函数来完成此操作
```

```js
setup(props) {
    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
    const { title } = toRefs(props)
    // `title` 是一个追踪着 `props.title` 的 ref
    console.log(title.value)

    // 或者，将 `props` 的单个属性转为一个 ref
    const title = toRef(props, 'title')
  }
```

**setup 函数主要由两个参数：**

**props：** 父组件传递过来的属性会被放到 props 对象中

- 在 setup 函数中用 props，不可以通过 this 去获取

**context：** 也称之为 SetupContext，是 setup 函数的上下文对象，它主要由四个属性

- attrs：所有的非 props 的的属性
- slots：父组件传递过来的插槽，在以渲染函数返回时会有作用
- emit：当组件内部需要发出事件时会用到 emit
  主要是因为 setup 函数中不能访问 this，所以无法通过 this.$emit 发出事件
- expose：暴露公共属性（函数）

## ref、reactive

- ref 可以为所有数据类型添加响应式状态
- reactive 用于为对象或数组添加响应式状态

> [ref、reactive、toRef、toRefs 的区别](https://blog.csdn.net/u010059669/article/details/112287552)

## ref、shallowRef

- ref
- shallowRef 是 ref 的浅层作用形式。 shallowRef() 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

```js
const state = shallowRef({ count: 1 });

// 不会触发更改
state.value.count = 2;

// 会触发更改
state.value = { count: 2 };
```

## reactive、shallowReactive

- reactive 深层响应式
- shallowReactive 浅层响应式

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2,
  },
});

// 更改状态自身的属性是响应式的
state.foo++;

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested); // false

// 不是响应式的
state.nested.bar++;
```

## toRef toRefs

**即使源属性当前不存在，toRef() 也会返回一个可用的 ref。这让它在处理可选 props 的时候格外实用，相比之下 toRefs 就不会为可选 props 创建对应的 refs**。

## triggerRef()

这个要注意，强制触发的不是 ref 的副作用，而是浅层 ref 的副作用也就是 shallowRef

```js
const shallow = shallowRef({
  greet: "Hello, world",
});

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet);
});

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = "Hello, universe";

// 打印 "Hello, universe"
triggerRef(shallow);
```

## watchEffect

- 默认情况下，侦听器将在组件渲染之前执行。
- flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。  
  等同于：watchPostEffect()
- flush: 'sync' 响应式依赖发生改变时立即触发侦听器。  
  等同于：watchSyncEffect()  
  该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题

```js
const id = ref(0);

const stop = watchEffect(
  async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value);
    // `cancel` 会在 `id` 更改时调用
    // 以便取消之前
    // 未完成的请求
    onCleanup(cancel);
    data.value = await response;
  },
  {
    flush: "post", //sync
    onTrack(e) {
      debugger;
    },
    onTrigger(e) {
      debugger;
    },
  }
);
// 当不再需要此侦听器时:
stop();
```

## watch

**watch() 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。**

```js
const state = reactive({ count: 0 });
const stop = watch(
  () => state,
  async (newValue, oldValue, onCleanup) => {
    // newValue === oldValue
    const { response, cancel } = doAsyncWork(newId);
    // 当 `id` 变化时，`cancel` 将被调用，
    // 取消之前的未完成的请求
    onCleanup(cancel);
    data.value = await response;
  },
  {
    deep: true,
    flush: "post", //sync
    immediate: true, //立即触发
    onTrack(e) {
      debugger;
    },
    onTrigger(e) {
      debugger;
    },
  }
);
stop();
```

## watchEffect() 相比，watch() 使我们可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。

**总之 watchEffect 可以的，watch 都可以。**

## Pinia

`Pinia 起始于 2019 年 11 月左右的一次实验，其目的是设计一个拥有组合式 API 的 Vue 状态管理库。     
从那时起，我们就倾向于同时支持 Vue 2 和 Vue 3，并且不强制要求开发者使用组合式 API`  
**Pinia 是作为 Vuex 5 的雏形而创建的**  
**Vuex 4.0 还提供对于 Vue 3 的支持，其 API 与 3.x 大致相同**

> [官网文档](https://pinia.web3doc.top/)

## Vite

## VUE3.0 学习文档

> [官网文档](https://cn.vuejs.org/)

## VUE3.0 面试题学习文档

> [参考 1](https://juejin.cn/post/7139921537896808479)
