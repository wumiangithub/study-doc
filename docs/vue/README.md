# vue

#### vue 是什么时候正式发布？

`2013年12月8日`

## 什么是 MVVM？

Model–View–ViewModel （MVVM） 是一个软件架构设计模式  
MVVM 的核心是 ViewModel 层  
MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层

## 虚拟 DOM 实现原理？

虚拟 DOM 的实现原理主要包括以下 3 部分：

1. 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
2. diff 算法 — 比较两棵虚拟 DOM 树的差异；
3. pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## vue 和 react 的 diff 算法有什么区别

### diff 算法

diff 整体策略为：深度优先，同层比较

        1. 比较只会在同层级进行，不会跨层级比较

        2. 本质上就是比较两个 js 对象的差异

        3. 其实 diff 算法最重要的就是找到可复用的节点，然后移动到正确的位置。只不过不同的算法查找顺序不一样。

### vue diff 算法

- 简单 diff 算法 : 从一端逐个处理

- 双端 diff 算法是 Vue2 采用的 diff 算法，性能还不错 : 从两端进行对比, 需要 4 个指针，分别指向新旧两个 vnode 数组的头尾

- 后来，Vue3 又对 diff 算法进行了一次升级，叫做快速 diff 算法。

### react diff 算法

- 传统的 diff 算法是使用循环递归对节点进行依次对比，复杂度为 O(n^3),效率低下。

- React 的开发者结合 Web 界面的特点做出了两个大胆的假设，使得 Diff 算法复杂度直接从 O(n^3)降低到 O(n)，

- React 通过三个方面对 tree diff, component diff, element diff 进行了优化

- 在开发时，尽量保持稳定的 DOM 结构，并且减少将最后的节点移动到首部的操作，能够优化渲染性能。

### 区别

- Vue 中的 Diff 算法采用了 React 相似的思路，都是同层节点进行比较，在比较的过程中，使用了一些优先判断和就地复用策略，提高了 Diff 算法的效率。
- react 中后面引入 fiber 提高性能，
  - 当渲染完一次，产生了 fiber 之后，再次渲染的 vdom 要和之前的 fiber 对比下，再决定如何产生新的 fiber，目标是尽可能复用已有的 fiber 节点，这叫做 diff 算法。

[参考 1](https://zhuanlan.zhihu.com/p/534903909)  
[参考 2](https://www.jianshu.com/p/a23546dc9897)  
[react diff 算法:参考](https://juejin.cn/post/6844903944796258317)  
[react hooks diff 算法:参考](https://zhuanlan.zhihu.com/p/553744711)
