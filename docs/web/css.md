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

## flex 常用属性

## flex 父元素属性

```css
.parent {
  display: flex;
  justify-content: center; //水平方向布局
  align-items: center; //垂直方向布局 (侧轴单行使用)
  flex-direction: row; //设置主轴的方向
  flex-wrap: wrap; //是否允许换行
  align-content: center; // 设置侧轴的子元素的排列方式（多行才生效）
}
```

- justify-content:水平方向布局

  - center:水平居中;
  - flex-start:靠左;
  - flex-end:靠右；
  - space-between:两边的向两边靠，中间等分；
  - space-around:环绕，完美的平均分配

- align-items:垂直方向布局(也被称为侧轴方向); （单行）

  - center:垂直居中、
  - flex-start：至顶、
  - flex-end:至底、
  - space-between:两边的向两边靠，中间等分；
  - space-around:环绕，完美的平均分配

- flex-direction://设置主轴的方向

  - row:从左到右，
  - row-reverse:从右向左
  - column:从上向下的排列，
  - column-reverse:从下向上

- flex-wrap 是否允许换行

  - warp 允许换行： 从上往下
  - nowarp 不允许换行: 默认值
  - wrap-reverse 允许换行： 从下往上

- align-content: 设置侧轴的子元素的排列方式（多行才生效）

  - center:垂直居中、
  - flex-start：至顶、
  - flex-end:至底、
  - space-between:两边的向两边靠，中间等分；
  - space-around:环绕，完美的平均分配
  - stretch: 默认值。元素被拉伸以适应容器。
  - [在线测试](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=stretch)

- flex-flow:复合属性，相当于同时设置了 flex-direction 和 flex-wrap

### align-content 和 align-items 区别

- align-items 适用于单行情况下，只有上对齐、下对齐居中和拉伸
- align-content 适应于换行(多行)的情况下(单行情况下无效)，可以设置上对齐、下对齐、 居中、拉伸以及平均分配剩余空间等属性值。
- 总结就是单行找 align-items 多行找 align-content

## flex 子元素属性

```css
.child {
  flex: 1;
}

.item:nth-child(2) {
  align-self: center; //属性允许单个项目有与其他项目不一样的对齐方式,可覆盖align-items属性。
}
```

- flex:1 //flex:1 === flex:1 1 0%

  - flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。
  - flex-grow 变大 => 0 不允许变大
  - flex-shrink 缩小 => 0 不允许缩小
  - flex-basis 原本大小

- align-self
  - 默认值为 auto ,表示继承父元素的 align-items 属性,如果没有父元素,则等同于 stretch.
  - center 元素位于容器的中心
  - flex-start 元素位于容器的开头。
  - flex-end 元素位于容器的结尾。
  - baseline 元素位于容器的基线上。
- order
  - 数值越小,排列越靠前,默认为 0。

[阮一峰:参考](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## flex:1 和 flex auto 的区别

```
flex:none;   // flex : 0,0,auto;
flex:auto;  // flex : 1,1,auto;
flex:1;    //  flex : 1,1,0%;
```

- flex:1 和 flex:auto 的区别主要是在于 flex-basis
- flex:1 不管内容多少，一般都是平分空间，空间大小都一致, 设置的 width 无效
- flex:auto 是根据内容的大小来分，不是平分的，原本大的多分，原本小的少分（除非内容都是一样，才平分）

## Flex 具体含义

- Flex 是 Flexible Box 的缩写，意为”弹性布局”
- 是一种布局方式，类似于 block，inline-block 等。

## flex 实例理解

```html
<div class="parent">
  <div class="first"></div>
  <div class="senced"></div>
</div>
```

### 场景一:先 auto 在 0

```css
.parent {
  display: flex;
  width: 600px;
  background-color: red;
  height: 400px;
}

.first {
  width: 300px;
  flex: 1 2 auto;
  background-color: yellow;
  height: 400px;
}

.senced {
  width: 200px;
  flex: 2 1 0;
  background-color: blue;
  height: 400px;
}

/* 
first:400px   300 + 100
senced:200px   200 + 0
*/
```

### 场景二:先 0 在 auto

```css
.parent {
  display: flex;
  width: 600px;
  background-color: red;
  height: 400px;
}

.first {
  width: 300px;
  flex: 1 2 0;
  background-color: yellow;
  height: 400px;
}

.senced {
  width: 200px;
  flex: 2 1 auto;
  background-color: blue;
  height: 400px;
}

/* 
first:133.33px  0 + 133.33
senced:466.67px  200 + 266.66
*/
```

### 场景三:先 0 在 0

```css
.parent {
  display: flex;
  width: 600px;
  background-color: red;
  height: 400px;
}

.first {
  width: 300px;
  flex: 1 2 0;
  background-color: yellow;
  height: 400px;
}

.senced {
  width: 200px;
  flex: 2 1 0;
  background-color: blue;
  height: 400px;
}

/* 
宽度无效：按照flex-grow 平分
first:200px
senced:400px
*/
```

### 场景四: 先 auto 在 auto

```css
.parent {
  display: flex;
  width: 600px;
  background-color: red;
  height: 400px;
}

.first {
  width: 300px;
  flex: 1 2 auto;
  background-color: yellow;
  height: 400px;
}

.senced {
  width: 200px;
  flex: 2 1 auto;
  background-color: blue;
  height: 400px;
}

/* 
宽度有效：剩余空间按照flex-grow 平分
first:333.33px    300 +   33.33
senced:266.67px   200 + 66.67
*/
```

## 网格布局 grid

```
display: grid;
display: inline-grid;
```

[参考](https://www.runoob.com/css3/css-grid.html)

## margin-bottom 和 margin-top

- margin-bottom:30px
- margin-top:20px
- 两者之间的间隙是 30px

## rem

```
使用
npm i amfe-flexible   //根据window.devicePixelRatio设置根节点字体大小
npm i postcss-px2rem  //px自动转rem
```

[移动端的 rem 适配：参考](https://blog.csdn.net/qq_56989560/article/details/124097757)

设置 rem 大小:

- 方式一
  - document.documentElement.style.fontSize=(document.documentElement.clientWidth/750)\*100+'px';
- 方式二:
  - document.documentElement.style.fontSize='10vw';
  - 即 1rem 等于屏幕宽度的 10 分之一(屏幕宽度为 100vw),若宽为 375px,则 1rem=37.5px;
  - 1rem 就等于根节点字体大小
- 监听窗口改变设置 rem
  window.addEventlistener('resize',fn);
- px2rem 或者使用 postcss-px2rem 将 px 自动转为 rem

- rem 是 CSS 3 中新增的一种相对长度单位。当使用 rem 单位时，根节点 html 的字体大小(font-size)决定了 rem 的尺寸。

- rem 单位类似于 em 单位，em 单位表示父元素字体大小，不同之处在于，rem 的基准是相对于 html 元素的字体大小。

## em

em 是相对于父级字体大小的一个百分比单位

## 移动端 1px 问题

- 使用 box-shadow 模拟边框

```css
.box-shadow-1px {
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```

- 使用 background-image 实现

```css
.background-image-1px {
  background: url(../img/line.png) repeat-x left bottom;
  -webkit-background-size: 100% 1px;
  background-size: 100% 1px;
}
```

- 使用 border-image 实现

```css
div {
  -moz-border-image: url(/i/border.png) 30 30 stretch; /* Old Firefox */
  -webkit-border-image: url(border.png) 30 30 stretch; /* Safari 5 */
  -o-border-image: url(border.png) 30 30 stretch; /* Opera */
  border-image: url(border.png) 30 30 stretch;
}
```

- 4、伪元素+transform
  - 构建 1 个伪元素, border 为 1px, 再以 transform 缩放到 50%。

```css
/* 设计稿是750,采用1：100的比例,font-size为100*(100vw/750) */
.border-1px {
  position: relative;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-1px:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
```

- 5、用 JS 计算 rem 基准值和 viewport 缩放值

```css
/* 设计稿是750,采用1：100的比例,font-size为100 * (docEl.clientWidth * dpr / 750) */
var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');
dpr = window.devicePixelRatio || 1;
rem = 100 * (docEl.clientWidth * dpr / 750);
scale = 1 / dpr;
// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
// 设置data-dpr属性，留作的css hack之用，解决图片模糊问题和1px细线问题
docEl.setAttribute('data-dpr', dpr);
// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
```

[解决移动端 1px 问题-5 种方法:参考](https://www.jianshu.com/p/5d15bfa1da2d)

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
