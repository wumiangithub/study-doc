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

- attrs：透传 Attributes（非响应式的对象，等价于 $attrs）,也就是除了 props 中的其他属性
- slots：父组件传递过来的插槽，在以渲染函数返回时会有作用, （非响应式的对象，等价于 $slots）
- emit：当组件内部需要发出事件时会用到 emit
  主要是因为 setup 函数中不能访问 this，所以无法通过 this.$emit 发出事件
- expose：当父组件通过模板引用 ref 访问该组件的实例时，将仅能访问 expose 函数暴露出的内容, 暴露公共属性（函数）

### $slots

```js
export default {
  props: ["message"],
  render() {
    return [
      // <div><slot /></div>
      h("div", this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        "div",
        this.$slots.footer({
          text: this.message,
        })
      ),
    ];
  },
};
```

## setup 函数 中怎么获取 options api 中 data 中的数据

1. **通过函数传参获取**
2. **通过 getCurrentInstance 获取 data 中的数据**
   - 只不过在初始化的时候是获取不到的, 因为 setup 在 data 之前初始化

**script setup 也可以通过 getCurrentInstance 获取 data 中的数据**
**options 也通过函数传参获取 setup 中的数据**

### 通过 getCurrentInstance 获取 data 中的数据

```js
<script>
import { reactive, getCurrentInstance } from "vue";

export default {
  setup() {
    const Instance = getCurrentInstance();
    console.log(Instance.data.message); //undefined
    function fn1() {
      console.log(Instance.data.message); //hello  world
    }
    let list2 = reactive([1, 2]);
    return {
      list2,
      fn1,
    };
  },
  data() {
    return {
      message: "hello  world",
    };
  },
  methods: {
    init() {
      console.log(this.list2); //[1,2]
      this.fn1();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
```

### 通过函数传参

```
<div v-on:click="fun(testdata)"></div>

setup(){
	const  fun=(i)=>{
	  alert(i)
	}
},
data(){
	return{
	   testdata:1,
	}
}
```

## options 中的生命周期，或者 methods 中怎么获取 setup 函数 中的数据和方法

- **直接通过 this 就可以, 并且不会丢失响应式**

- **options 中的生命周期，或者 methods 中无法直接获取 script setup 中的数据和方法**

- **setup 函数和 script setup 只能二选一，而且 script setup 优先级更高,setup 函数中定义的将不会生效**

- **script setup 可以和 data 一起使用，不过优先级高于 data**

## setup 如何访问路由 useRoute/useRouter

```js
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
onMounted(function () {
  const route = useRoute();
  console.log(route.params.id);

  const router = useRouter();
  router.push({
    name: "search",
    query: {
      /**/
    },
  });
});
```

**使用 root 根实例**

```js
// root是vue的根实例，实例上有$router对象
setup(props , { root }){
    const name = ref("")
    const orderId = ref("");
    orderId.value = root.$route.query.orderId;
    root.$router.push({
         path: '/ccList',
         query: { name: name.value },
    });
    return {
        orderId,
        name ,
    };
};
```

**使用 useRouter**

```js

import { useRouter, onMounted } from 'vue-router'

setup (props, context) {
  const router = useRouter();
  onMounted(() => {
    // 打印
    console.log('router:', router.currentRoute.value.query)
  })
  return {}

```

**使用 useRoute**

```js
import { useRoute, onMounted, toRaw } from 'vue-router'

setup (props, context) {
  const route = useRoute();
  onMounted(() => {
    // 打印
    console.log('route:', toRaw(route).query.value)
  })
  return {}
}

```

## reactive 申明的对象不能直接赋值，会丢失响应式

只能对其中的一个属性赋值

```js
setup() {
    const Instance = getCurrentInstance();
    let list2 = reactive({ list: [1, 2], msg: "hahah" });
    //return 之前还能对整体，赋一次值会生效
    list2 = { list: [1, 2, 3], msg: "6666" }; //错误 页面只会渲染1,2,3, 后面在对list操作将丢失响应式
    function init1() {
      list2 = { list: [1, 2, 3, 4], msg: "7777" }; //数据跟新，页面不跟新
      list2.msg = "88888"; //数据跟新，页面不跟新
      console.log(list2); //{ list:  [1, 2, 3, 4], msg : "88888"}
    }
    return {
      list2,
      init1,
    };
  },
```

```js
 setup() {
    const Instance = getCurrentInstance();
    let list2 = reactive({ list: [1, 2], msg: "hahah" });
    function init1() {
      // return 之后在赋值将完全不生效
      list2 = { list: [1, 2, 3, 4], msg: "7777" }; //错误 页面只会渲染1,2，后面在对list操作将丢失响应式
      list2.msg = "88888"; //数据跟新，页面不跟新
      console.log(list2); //{ list:  [1, 2, 3, 4], msg : "88888"}
    }
    return {
      list2,
      init1,
    };
  },
```

## reactive 中不能只申明数组，数组需要挂载到对象下的一个属性中，不然没有响应式

### 页面不会响应，数组需要挂载到对象下的一个属性下

```js
<script setup>
import {reactive} from 'vue;
let arr=reactive([{name:'123',value:'123'},{name:'456',value:'456'}]);

let changeArr=()=>{
	arr.splice(0,1) //页面不会响应，数组需要挂载到对象下的一个属性下
}
</script>
```

## ref、reactive

reactive 与 ref 区别

1. 从定义数据方面：

- ref 通常用来定义基本类型数据
- reactive 用来定义：对象（或者数组）类型数据
- ref 也可以用来定义对象或者数组类型的数据，内部会通过 reactive 转为代理对象

2. 从原理方面：

- ref 通过 Object.defineProperty()的 get 和 set 实现数据代理。
- reactive 使用 Proxy 实现数据代理，并且通过 Reflect 操作源对象内部的数据。

3. 从使用方面：

- ref 操作数据需要.value，template 模板中不需要。
- reactive 都不需要.value
  注意 reactive 当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包：需要.value

### 创建响应式数据

```js
export default defineComponent({
  setup(props) {
    const count = ref(0);
    console.log(count.value); // 0

    const obj = reactive({ count: 0 });
    obj.count++;
  },
});
```

### reactive 对 ref 的解包：

**解包就是不需要使用.value 就能获取到值**

```js
const count = ref(1);
const obj = reactive({ count });

// ref 会被解包
console.log(obj.count === count.value); // true

// 会更新 `obj.count`
count.value++;
console.log(count.value); // 2
console.log(obj.count); // 2

// 也会更新 `count` ref
obj.count++;
console.log(obj.count); // 3
console.log(count.value); // 3
```

### 注意 reactive 当访问到响应式数组或 Map 这样的原生集合类型，不会执行 ref 的解包：

```js
const books = reactive([ref("Vue 3 Guide")]);
// 这里需要 .value
console.log(books[0].value);

const map = reactive(new Map([["count", ref(0)]]));
// 这里需要 .value
console.log(map.get("count").value);
```

```js

```

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

## toRef & toRefs

### toRef 解构 reactive 上的一个属性

- 基于响应式对象上的一个属性，创建一个对应的 ref  
  即使源属性当前不存在，toRef() 也会返回一个可用的 ref。这让它在处理可选 props 的时候格外实用，相比之下 toRefs 就不会为可选 props 创建对应的 refs

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, "foo");

// 更改该 ref 会更新源属性
fooRef.value++;
console.log(state.foo); // 2

// 更改源属性也会更新该 ref
state.foo++;
console.log(fooRef.value); // 3
```

```js
import { toRef } from "vue";

const props = defineProps(/_ ... _/);

// 将 `props.foo` 转换为 ref，然后传入
// 一个组合式函数
useSomeFeature(toRef(props, "foo"));
```

### toRefs

- 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。
- toRefs 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 toRef。

### toRefs 结构后需要加.value

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);

// 这个 ref 和源属性已经“链接上了”
state.foo++;
console.log(stateAsRefs.foo.value); // 2

stateAsRefs.foo.value++;
console.log(state.foo); // 3

let { foo, bar } = stateAsRefs; // 可以解构而不会失去响应性, 也可以对props操作
```

## toRef & toRefs 结构 props

- 当 toRef 与组件 props 结合使用时，关于禁止对 props 做出更改的限制依然有效。  
  尝试将新的值传递给 ref 等效于尝试直接更改 props，这是不允许的。  
  在这种场景下，你可能可以考虑使用带有 get 和 set 的 computed 替代。

```js
const fooRef = toRef(props, "foo");
const { foo } = toRefs(props, "foo");
```

## toRaw & markRaw

- toRaw
  根据一个 Vue 创建的代理返回其原始对象。
  toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。

- markRaw
  将一个对象标记为不可被转为代理。返回该对象本身。

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
**Pinia 配套有个插件 pinia-plugin-persist 进行数据持久化，否则一刷新就会造成数据丢失**

### storeToRefs

**从 Store 中提取属性同时保持其响应式**

```js
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useStore();
    // `name` 和 `doubleCount` 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name, doubleCount } = storeToRefs(store);

    return {
      name,
      doubleCount,
    };
  },
});
```

```js
export default {
  setup() {
    const store = useStore();

    return { getUserById: store.getUserById, count: store.count };
  },
};
```

**store 中调用别的 store**

```js
import { useOtherStore } from "./other-store";

export const useStore = defineStore("main", {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore();
      return state.localData + otherStore.data;
    },
  },
});
```

**订阅**

- someStore.$onAction 订阅 action
- cartStore.$subscribe 订阅 state

### Pinia VS vuex

| vuex       | pinia                                      |
| :--------- | :----------------------------------------- |
| mapState   | mapState :取出的 state 只可读              |
| ---        | mapWritableState:取出的 state 可以直接修改 |
| mapGetters | 用 mapState 代替                           |
| Mutation   | 废弃                                       |
| mapActions | mapActions                                 |

> [Pinia 官网文档](https://pinia.web3doc.top/)  
> [vuex 官网文档](https://vuex.vuejs.org/zh/)

## Vite

**Vite 开发环境是基于原生 ES6 Modules，在生产环境下打包使用的是 Rollup。  
vue-cli 基于 webpack 封装，生产环境和开发环境都是基于 Webpack 打包**

## 7 个指令钩子

- setup 中定义指令使用的是 v + 指令名字
- options 中定义指令是在 directives 中

- 一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};
```

## EventBus 与 mitt 区别？

vue3 移除了 EventBus ，如果需要使用相同功能可以使用辅助库 mitt，同样具有 on、emit、off 方法，而且压缩后仅有 200 bytes

## KeepAlive 是一个内置组件

**它会根据组件的 name 选项进行匹配**

- include
- exclude
- max

```
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

## Reflect.defineProperty 和 Object.defineProperty 区别

- 静态方法 Reflect.defineProperty() 基本等同于 Object.defineProperty() 方法，唯一不同是返回值。
- Object.defineProperty 方法，如果成功则返回一个对象，否则抛出一个 TypeError 。
- 另外，当定义一个属性时，你也可以使用 try...catch 去捕获其中任何的错误。
- 而因为 Reflect.defineProperty 返回 Boolean 值作为成功的标识，所以只能使用 if...else ：

[mdn 参考:Reflect.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)  
[mdn 参考:Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## 生态

### vueuse

> [vueuse](https://vueuse.org/)

## VUE3.0 学习文档

> [官网文档](https://cn.vuejs.org/)
