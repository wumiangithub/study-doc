# 米哈游二面

## flex 实战

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}

.item:nth-child(3) {
  align-self: flex-end;
}
```

![三项目](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071314.png)

## CSS 的 BEM 规范

- CSS 命名规范——BEM 思想
  - 由俄罗斯 Yandex 团队所提出。使用 BEM 主要是为了将用户界面划分成独立的块
- BEM 是块（block）、元素（element）、修饰符（modifier）的简写
- 主要缺点就是命名很长

### BEM 命名规则

- 块名称为其元素和修饰符定义了命名空间。
- 块名称与元素名称之间用双连字符--分隔。
- 块名称与修饰符或元素与修饰符之间用双下划线\_\_分隔。
- 命名一般使用小写字母。
- 单词之间可以使用-分隔。

### \_\_和--的区别

- \_\_表示的就是下级元素
- --表示的是不同的形态
  - 就是另一个类名，另一种样式，就像 overview**row 中有公共的样式，而 overview**row--right 中具有非公共的样式，是特有的样式
- &符号表示嵌套的上一级

[参考](https://blog.csdn.net/weixin_46926182/article/details/121606077)

## BFC

### BFC 是什么?

BFC(block formatting context)块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则，它决定了元素如何对齐内容进行布局，以及与其他元素的关系和相互作用。 当涉及到可视化布局的时候，BFC 提供了一个环境，HTML 元素在这个环境中按照一定规则进行布局  
**简短的总结：BFC 是一个独立的布局环境，BFC 内部的元素布局与外部互不影响**

### 如何触发 BFC？

![](https://pic3.zhimg.com/80/v2-7d7017c7cd579f71ea67a6eb6dbf247e_720w.webp)

### BFC 可以解决哪些问题？

#### 1. 解决浮动元素令父元素高度坍塌的问题

- 方法：给父元素开启 BFC
- 原理：计算 BFC 的高度时，浮动子元素也参与计算

#### 2. 非浮动元素被浮动元素覆盖

- 方法：给非浮动元素开启 BFC
- 原理：BFC 的区域不会与 float box 重叠

#### 3. 两栏自适应布局

- 方法：给固定栏设置固定宽度，给不固定栏开启 BFC。

- 原理：BFC 的区域不会与 float box 重叠

#### 4. 外边距垂直方向重合的问题

- 方法：给上 box 或者下 box 任意一个包裹新的 box 并开启 BFC

- 原理：属于同一个 BFC 的两个相邻的 Box 的 margin 会发生重叠。

[BFC 参考](https://zhuanlan.zhihu.com/p/127187654)

## offsetWidth 与 clientWidth

### offsetWidth

- offsetWidth 是一个只读属性,返回一个元素的布局宽度
- offsetWidth= border + padding + scrollbar（如果存在的话）+ width。
- 这个属性将会 round(四舍五入)为一个整数。如果你想要一个 fractional(小数)值,请使用 element.getBoundingClientRect()

### clientWidth

- clientWidth = padding + width。
- 这个属性将会 round(四舍五入)为一个整数。如果你想要一个 fractional(小数)值,请使用 element.getBoundingClientRect()

## addEventListener

第三个参数可能值:

- true - 事件在捕获阶段执行
- false- 默认。事件在冒泡阶段执行

## curentTarget 与 target

- curentTarget 事件绑定元素 ul
- target 事件触发的源组件 li
