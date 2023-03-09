# vue2 和 vue3 区别

**使用 vue2.7 过度到 vue3.0**
vue2.7 正是为了解决过度问题，增加了部分 vue3 的写法和特性，又保留 vue2 原始特性。

## 新的框架级别推荐

Vue 3 的支持库进行了重大更新。以下是新的默认建议的摘要:

- 新版本的 Router, Devtools & test utils 来支持 Vue 3
- 构建工具链: Vue CLI -> Vite
- 状态管理: Vuex -> Pinia
- IDE 支持: Vetur -> Volar
- 新的 TypeScript 命令行工具: vue-tsc
- 静态网站生成: VuePress -> VitePress
- JSX: @vue/babel-preset-jsx -> @vue/babel-plugin-jsx

> [详情说明](https://v3-migration.vuejs.org/recommendations.html)

## 值得注意的新特性

1. <font color="#3eaf7c">组合式 API</font> (包括：响应式 API、生命周期钩子、依赖注入)
2. <font color="#3eaf7c">单文件组件中的组合式 API 语法糖 script setup API</font>
3. <font color="#3eaf7c">Teleport 组件</font> (可将组件插入到指定 dom 节点下)
4. <font color="#3eaf7c">Fragments 片段</font> (单组件支持多个根节点)
5. <font color="#3eaf7c">Emits 组件选项</font> (用于声明由组件触发的自定义事件。)
6. <font color="#3eaf7c">CSS 中的 v-bind()</font> (css 中直接使用 data 中的变量)
7. <font color="#3eaf7c">异步组件</font> (defineAsyncComponent 用于显式地定义异步组件 )

```js
import { defineAsyncComponent } from "vue";
const Richtext = defineAsyncComponent(() =>
  import(/* webpackChunkName: "Richtext" */ "./Richtext.vue")
);

const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./Modal.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
}
```

8.

## 非兼容性改变

### 模板指令

### 被移除的 API

- 过滤器 (filter)
- 移除 $listeners ($listeners 对象在 Vue 3 中已被移除。事件监听器现在是 $attrs 的一部分：)
- $children (在 2.x 中，开发者可以使用 this.$children 访问当前实例的直接子组件, 3.x 我们建议使用模板引用 this.$refs。)
- keyCodes 中数字被移除 v-on:keyup.13="submit"

### 其他

- 监测机制的改变 用 Proxy 代替 Object.defineProperty
- vue 的源码也改用了 TypeScript 来写
- destroyed 生命周期选项被重命名为 unmounted
- beforeDestroy 生命周期选项被重命名为 beforeUnmount

* 自定义指令的 API 已更改为与组件生命周期一致，且 binding.expression 已移除
* Transition 的一些 class 被重命名
* $attrs 现在包含了所有传递给组件的 attribute，包括 class 和 style。

## 生命周期变化

| vue2          | vue3 选项式 API   | vue3 组合式 API     |
| :------------ | :---------------- | :------------------ |
| beforeCreate  | beforeCreate      | ----                |
| created       | created           | ----                |
| beforeMount   | beforeMount       | onBeforeMount()     |
| mounted       | mounted           | onMounted()         |
| beforeUpdate  | beforeUpdate      | onBeforeUpdate()    |
| updated       | updated           | onUpdated()         |
| activated     | activated         | onActivated()       |
| deactivated   | deactivated       | onDeactivated()     |
| beforeDestroy | **beforeUnmount** | onBeforeUnmount()   |
| destroyed     | **unmounted**     | onUnmounted()       |
| errorCaptured | errorCaptured     | onErrorCaptured()   |
| ----          | renderTracked     | onRenderTracked()   |
| ----          | renderTriggered   | onRenderTriggered() |
| ----          | serverPrefetch    | onServerPrefetch()  |

**setup 在 beforeCreate 之前就运行了**

- onRenderTracked  
  调试钩子,仅在开发模式下可用，且在服务器端渲染期间不会被调用
- onRenderTriggered
  调试钩子,仅在开发模式下可用，且在服务器端渲染期间不会被调用
- onServerPrefetch
  注册一个异步函数，在组件实例在服务器上被渲染之前调用。

## Diff 同层对比,深度优先算法

- diff 算法用来比较两棵 Virtual DOM 树的差异，如果需要两棵树的完全比较，那么 diff 算法的时间复杂度为 **O(n^3)**。
- 但是在前端当中，你很少会跨越层级地移动 DOM 元素，所以 Virtual DOM 只会对同一个层级的元素进行对比，如下图所示， div 只会和同一层级的 div 对比，第二层级的只会跟第二层级对比，这样算法复杂度就可以达到 **O(n)**。
- 新旧虚拟 DOM 对比的时候，Diff 算法比较只会在同层级进行, 不会跨层级比较。 所以 Diff 算法是:**深度优先算法**。 时间复杂度:**O(n)**

[diff 算法&vuediff 算法](https://blog.csdn.net/weixin_41086056/article/details/121199791)

## vue2 和 vue3 的 diff 算法有什么不一样

- vue2、vue3 的 diff 算法实现差异主要体现在：处理完首尾节点后，对剩余节点的处理方式。
- vue2 是通过对旧节点列表建立一个 { key, oldVnode }的映射表，然后遍历新节点列表的剩余节点，根据 newVnode.key 在旧映射表中寻找可复用的节点，然后打补丁并且移动到正确的位置。
- vue3 则是建立一个存储新节点数组中的剩余节点在旧节点数组上的索引的映射关系数组，建立完成这个数组后也即找到了可复用的节点，然后通过这个数组计算得到最长递增子序列，这个序列中的节点保持不动，然后将新节点数组中的剩余节点移动到正确的位置。

- vue2 diff 算法就是进行虚拟节点对比，并返回一个 patch 对象，用来存储两个节点不同的地方，最后用 patch 记录的消息去局部更新 Dom。 vue2 diff 算法会比较每一个 vnode,而对于一些不参与更新的元素，进行比较是有点消耗性能的。

- vue3 diff 算法在初始化的时候会给每个虚拟节点添加一个 patchFlags，patchFlags 就是优化的标识。 只会比较 patchFlags 发生变化的 vnode,进行更新视图，对于没有变化的元素做静态标记，在渲染的时候直接复用。

[参考](https://segmentfault.com/a/1190000042586883)

[vue2&vue3—diff](https://blog.csdn.net/weixin_43294560/article/details/121928356)

### Vue3 的 diff 对比 Vue2 的优化部分

- 事件缓存：将事件缓存，可以理解为变成静态的了
- 添加静态标记：Vue2 是全量 Diff，Vue3 是静态标记 + 非全量 Diff
- 静态提升：创建静态节点时保存，后续直接复用
- 使用最长递增子序列优化了对比流程：Vue2 里在 updateChildren() 函数里对比变更，在 Vue3 里这一块的逻辑主要在 patchKeyedChildren() 函数里，具体看下面

- Vue2 是全量 Diff（当数据发生变化，它就会新生成一个 DOM 树，并和之前的 DOM 树进行比较，找到不同的节点然后更新。）；
- Vue3 是静态标记 + 非全量 Diff（Vue 3 在创建虚拟 DOM 树的时候，会根据 DOM 中的内容会不会发生变化，添加一个静态标记。之后在与上次虚拟节点进行对比的时候，就只会对比这些带有静态标记的节点。）
- Vue3 使用最长递增子序列优化对比流程，可以最大程度的减少 DOM 的移动，达到最少的 DOM 操作

[参考](https://blog.csdn.net/weixin_44730897/article/details/127302438)

# 学习文档

> [vue2 和 vue3 区别官网链接](https://v3-migration.vuejs.org/)
