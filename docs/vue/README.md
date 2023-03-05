# vue

### vue 是什么时候正式发布？

`2013年12月8日`

https://github.com/vuejs/vue/releases?page=25

### 1.0 发布

`2015年10月27日`
https://github.com/vuejs/vue/releases?page=17

## 什么是 MVVM？

Model–View–ViewModel （MVVM） 是一个软件架构设计模式  
MVVM 的核心是 ViewModel 层  
MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层

## 虚拟 DOM 实现原理？

虚拟 DOM 的实现原理主要包括以下 3 部分：

1. 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
2. diff 算法 — 比较两棵虚拟 DOM 树的差异；
3. pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## proxy 为什么就比 Object.defineProperty 快

- 其实最大的好处就是 proxy 是对整个对象进行代理，所以可以监听对象某个属性值的变化，还可以监听对象属性的新增和删除，而且还可以监听数组；
- 而 defineProperty 只是给对象的某个已存在的属性添加对应的 getter 和 setter，所以它只能监听这个属性值的变化，而不能去监听对象属性的新增和删除。
