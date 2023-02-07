# vue2 和 vue3 区别

**使用 vue2.7 过度到 vue3.0**

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

# 学习文档

> [vue2 和 vue3 区别官网链接](https://v3-migration.vuejs.org/)
