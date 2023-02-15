# vue3 面试题

## script setup 是干啥的？

scrtpt setup 是 vue3 的语法糖，简化了组合式 API 的写法，并且运行性能更好。使用 script setup 语法糖的特点：

- 属性和方法无需返回，可以直接使用。
- 引入组件的时候，会自动注册，无需通过 components 手动注册。
- defineProps 和 defineEmits API 来声明 props 和 emits, 不需要引入，直接使用
- useAttrs 获取属性，useSlots 获取插槽。
- 默认不会对外暴露任何属性，如果有需要可使用 defineExpose 。  
  [参考:script setup 是干啥的](https://blog.csdn.net/qq_41880073/article/details/124199104)

## 可以使用两个 script

```js
<script>
    export default {
        name: 'demo'
    }
</script>

<script setup>
    // do something...
</script>
```

**setup 确实很香，可是无法定义 name。 可以使用 vite-plugin-vue-setup-extend 插件实现**

```js
<script lang="ts" setup name="demo"></script>
```

## VUE3.0 面试题学习文档

> [参考 1](https://juejin.cn/post/7139921537896808479)  
> [参考 2](https://juejin.cn/post/7139921537896808479#heading-25)
