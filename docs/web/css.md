# css

## 样式穿透 pointerEvents: "none"

```
将样式设置为
pointerEvents: "none"

就可以将点击事件穿透到父级

none
元素永远不会成为鼠标事件的 target。
但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，
在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
```

## object-fit 设置 img 填充样式

```css
/*设置img填充样式*/
.img {
  width: 100%; /*很重要*/
  height: 100%; /*很重要*/
}

.fill {
  object-fit: fill; /*fill，contain，cover，none，scale-down*/
}

.productImgLi img {
  width: 150px;
  height: 200px;
  object-fit: cover;
}
```

## white-space

```
规定段落中的文本不进行换行：
p
  {
  white-space: nowrap
  }

pre  空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。
```

## CSS 选择器

```css
/* 元素选择器,以标签名开头，选择所有span元素 */
span {
}
/* id选择器 */
#p1 {
}
/* 类选择器 */
.span1 {
}
/* 后代选择器,以空格隔开包含关系的元素,查找以class=‘content’的父元素下所有的p标签(包含孙子元素) */
.content p {
}
/* 子代选择器,以>隔开包含关系的元素,查找以class=‘content’的父元素下所有的class=‘span1’的儿子元素 */
.content > .span1 {
}
/* 兄弟选择器,以波浪号隔开兄弟关系的元素(修饰前一个选择器往下的所有兄弟选择器) */
#p1 ~ p {
}
/* 以+隔开相邻关系的元素(修饰前一个选择器往下的相邻的选择器 只能一个) */
#p1 + .span1 {
  background-color: aqua;
}

/* 交集选择器: 需要两者都满足条件 */
p.cls {
}

/* 群组选择器:以，分隔(逗号分隔开需要修饰的选择器) */
p,
span {
}

/* 全局选择器:以*开头,查找body下所有标签 */
* {
}

/* 属性选择器:以[ ]修饰，查找属性type=text的元素 */
input[type="text"] {
}

/* 伪类选择器:以：为修饰符，修饰前一个选择器，比如‘button:hover’表示当鼠标放在button元素上面时的样式 */
button:hover {
}
```

## 选择器优先级

先不讨论多个选择器嵌套的情况

- css 优先级: !important>行间样式> ID 选择器>属性选择器&&伪类选择器&&类选择器>元素选择器

### 具体：

- 1. 行内样式:优先级 1000
- 2. ID 选择器:优先级 100
- 3. 类选择器:优先级 10 (伪类&属性的优先级也为 10 ）
- 4. 元素选择器:优先级 1
- 5. 通配符选择器:优先级 0
- 6. 注意：! important:优先级最大 10000 (用了后就不能修改慎用)

```
具体例子：
span 优先级 1
div span 优先级 1+1
div:first-child 优先级  1+10
.p1 span 优先级 10+1
#div1 span 优先级 100+1
```

### 伪类

**语法: “:关键字”,表示的是某个特定状态下的样式,或者是筛选出部分元素**
[伪类:参考 mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)

1. p:not(.fancy): 否定伪类选择器
2. p:active
3. p:hover
4. li:first-child
5. li:nth-of-type(even)

### 伪元素

**语法: “::关键字”,可用于设置所选元素的特定部分的样式**
[伪元素:参考 mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter)

1.  p::first-letter 样式的第一行的第一个字母块级元素
2.  .p1::first-line
3.  p::before
4.  p::after
5.  p::selection
6.  input::placeholder

## flex

```
flex-grow  : 0 //不允许变大
flex-shink  : 0 //不允许缩小
flex  : 1 //自适应大小
flex的含义
flex是 flex-grow 、flex-shrink 、flex-basis属性的缩写
flex:1 === flex:1 1 0px

justify-content: center; flex-end;space-between;
align-items: center;flex-end;
align-self: center; flex-end;

.item:nth-child(2) {
  align-self: center;
}
```

[阮一峰:参考](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 网格布局 grid

```
display: grid;
display: inline-grid;
```

[参考](https://www.runoob.com/css3/css-grid.html)

## 经典布局

### 圣杯布局

![圣杯布局](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071323.png)

### 双飞翼布局

### 两列布局

### 三列布局

## 子元素的 margin-top 绑架了父元素，在父元素上生效了。解决办法：

- 1、设置父元素或者自身的 display:inline-block;

- 2、设置父元素的 border:1px aqua solid;(>0)

- 3、设置父元素的 padding:1px;(>0)

- 4、给父元素设置 overflow:hidden;

- 5、给父元素或者自身设置 position:absolute;

- 6、设置父元素非空，填充一定的内容。

## 文档

[14 个你需要知道的实用 CSS 技巧](https://mp.weixin.qq.com/s/g_INV0FSQDButK2AQNg7qw)
