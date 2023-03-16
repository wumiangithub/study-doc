# diff 算法

## diff 算法

diff 整体策略为：深度优先，同层比较

        1. 比较只会在同层级进行，不会跨层级比较

        2. 本质上就是比较两个 js 对象的差异

        3. 其实 diff 算法最重要的就是找到可复用的节点，然后移动到正确的位置。只不过不同的算法查找顺序不一样。

## vue diff 算法

- 简单 diff 算法 : 从一端逐个处理

- 双端 diff 算法是 Vue2 采用的 diff 算法，性能还不错 : 从两端进行对比, 需要 4 个指针，分别指向新旧两个 vnode 数组的头尾

- vue3 也采用双端 diff ，并且 Vue3 又对 diff 算法进行了一次升级，叫做快速 diff 算法。

## react diff 算法

- 传统的 diff 算法是使用循环递归对节点进行依次对比，复杂度为 O(n^3),效率低下。

- React 的开发者结合 Web 界面的特点做出了两个大胆的假设，使得 Diff 算法复杂度直接从 O(n^3)降低到 O(n)，

- React 通过三个方面对 tree diff, component diff, element diff 进行了优化

- 在开发时，尽量保持稳定的 DOM 结构，并且减少将最后的节点移动到首部的操作，能够优化渲染性能。

- 深度优先，有子节点，就遍历子节点，没有子节点，就找兄弟节点，没有兄弟节点，就找叔叔节点，叔叔节点也没有的话，就继续往上找，它爷爷的兄弟，如果一直没找到，就代表所有的更新任务都更新完毕了

- 其实 SSR 的时候就不用做 diff，因为会把组件渲染成字符串，第二次渲染也是产生字符串，难道这时候还要和之前的字符串对比下，有哪些字符串可以复用么？

- vdom 转 fiber 的 reconcile 阶段

## SSR 会有 diff 吗

不需要，SSR 的时候就没有 diff，每次都是 vdom 渲染出新的字符串

## React 的 diff 算法是分成两次遍历的

- 第一个阶段一一对比，如果可以复用就下一个，不可以复用就结束。

- 第二个阶段把剩下的老 fiber 放到 map 里，遍历剩余的 vdom，一一查找 map 中是否有可复用的节点。
  - 最后把剩下的老 fiber 删掉，剩下的新 vdom 新增。
  - 这样就完成了更新时的 reconcile 过程。

## react 的 diff 算法，是不同节点就替换吗

[react-diff 算法参考](https://juejin.cn/post/7116141318853623839)

## reconcile&scheducler&commit。

浏览器下使用 react-dom 的渲染器，会先把 vdom 转成 fiber，找到需要更新 dom 的部分，打上增删改的 effectTag 标记，这个过程叫做 reconcile，可以打断，由 scheducler 调度执行。reconcile 结束之后一次性根据 effectTag 更新 dom，叫做 commit。

## react 的 diff 算法为什么不和 vue 一样采用双端算法

- React 不能通过双端对比进行 Diff 算法优化是因为目前 Fiber 上没有设置反向链表,
- 双端对比算法的实现也在我们的工作迭代当中

## vue 和 react 的 diff 算法有什么区别

- Vue 中的 Diff 算法采用了 React 相似的思路，都是同层节点进行比较，在比较的过程中，使用了一些优先判断和就地复用策略，提高了 Diff 算法的效率。
- react 中后面引入 fiber 提高性能，

  - 当渲染完一次，产生了 fiber 之后，再次渲染的 vdom 要和之前的 fiber 对比下，再决定如何产生新的 fiber，目标是尽可能复用已有的 fiber 节点，这叫做 diff 算法。

- 对静态节点的处理不一样。
  - 由于 Vue 是通过 template 模版进行编译的，所以在编译的时候可以很好对静态节点进行分析然后进行打补丁标记，
  - 然后在 Diff 的时候，Vue2 是判断如果是静态节点则跳过过循环对比，
  - 而 Vue3 则是把整个静态节点进行提升处理，Diff 的时候是不过进入循环的，所以 Vue3 比 Vue2 的 Diff 性能更高效。
  - 而 React 因为是通过 JSX 进行编译的，是无法进行静态节点分析的，所以 React 在对静态节点处理这一块是要逊色的。

[react-diff vs vue-diff 算法参考](https://juejin.cn/post/7116141318853623839)  
[参考 1](https://zhuanlan.zhihu.com/p/534903909)  
[参考 2](https://www.jianshu.com/p/a23546dc9897)  
[react diff 算法:参考](https://juejin.cn/post/6844903944796258317)  
[react hooks diff 算法:真棒-参考](https://zhuanlan.zhihu.com/p/553744711)
