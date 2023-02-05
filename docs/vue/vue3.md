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

## ref、reactive

- ref 可以为所有数据类型添加响应式状态
- reactive 用于为对象添加响应式状态

> [ref、reactive、toRef、toRefs 的区别](https://blog.csdn.net/u010059669/article/details/112287552)


## Pinia

## Vite

## VUE3.0 学习文档

> [官网文档](https://cn.vuejs.org/)

## VUE3.0 面试题学习文档

> [参考 1](https://juejin.cn/post/7139921537896808479)
