# web 知识点

## attachShadow

**ShadowDOM 最大的用处应该是隔离外部环境用于封装组件**  
我们可以轻松地封装一个组件然后可以跨项目共享这个组件。  
样式也被封装，我们甚至可以不用写 CSS 样式完全在我们的组件中，这样就防止开发人员随意修改样式

```js
// let shodowDOM = document.getElementById('shadow').attachShadow({mode: "closed"});
let shodowDOM = shadow.attachShadow({ mode: "closed" }); //直接这样，不用getElementById居然也是可以的
let shadowDom = shadow.attachShadow({ mode: "open" });
let pElem = document.createElement("p");
let styleElem = document.createElement("style");

styleElem.innerHTML = "p{color:red}";
pElem.innerHTML = "hello shadow";

shadowDom.appendChild(pElem);
// 外部样式影响不了影子节点内部样式
document.body.appendChild(styleElem);

console.log(document.getElementById("shadow").firstChild); // 返回null
console.log(document.getElementById("shadow").shadowRoot.firstChild);
// 返回影子节点
```

## BFF 项目

BFF——服务于前端的后端(Back-end For Front-end)  
如：graphql

## preventDefault 与 stopPropagation 与 stopImmediatePropagation

### stopImmediatePropagation() 和 stopPropagation()的区别

后者只会阻止冒泡或者是捕获。 但是前者除此之外还会阻止该其他父级元素的同类事件发生，但是后者就不会。

- stopImmediatePropagation 是 stopPropagation 的加强版
- 阻止冒泡或者是捕获
- 多个事件侦听器侦听同一元素的同一事件时，执行 event.stopImmediatePropagation()的侦听器之后的侦听器被忽略
- 侦听同一元素的不同事件的侦听器不受影响

- Event.cancelBubble 属性是 Event.stopPropagation()的一个曾用名。在从事件处理程序返回之前将其值设置为 true 可阻止事件的传播。

```html
<div style="height: 300vh">
  <div class="A" style="font-size: 30px">
    A
    <div class="B" style="font-size: 30px">
      B
      <p style="font-size: 30px">&#128513;P</p>
    </div>
  </div>
</div>
```

### stopImmediatePropagation

```js
const p = document.querySelector("p");
p.addEventListener(
  "mousedown",
  (event) => {
    console.log("我是p元素上被绑定的第一个监听函数: mousedown");
  },
  false
);

p.addEventListener(
  "mousedown",
  (event) => {
    event.stopImmediatePropagation();
    console.log("我是p元素上被绑定的第二个监听函数: mousedown");
  },
  false
);

p.addEventListener(
  "mousedown",
  (event) => {
    console.log("我是p元素上被绑定的第三个监听函数---被阻止了: mousedown");
    // 该监听函数排在上个函数后面，该函数不会被执行
  },
  false
);

p.addEventListener(
  "click",
  (event) => {
    // 嘿嘿嘿，虽然监听的是同一元素，但却是不同事件！
    console.log("我是p元素上被绑定的第四个监听函数---没有被阻止: click");
  },
  false
);

document.querySelector(".A").addEventListener(
  "mousedown",
  (event) => {
    console.log("我是div & class A元素");
  },
  false
);

document.querySelector(".B").addEventListener(
  "mousedown",
  (event) => {
    console.log("我是div & class B元素");
  },
  false
);
```

### stopPropagation

```js
const p = document.querySelector("p");
p.addEventListener(
  "mousedown",
  (event) => {
    // event.cancelBubble = true
    event.stopPropagation();
    console.log("我是p元素上被绑定的第一个监听函数: mousedown");
  },
  false
);

p.addEventListener(
  "mousedown",
  (event) => {
    console.log("我是p元素上被绑定的第二个监听函数---没有被阻止: mousedown");
  },
  false
);
document.querySelector(".A").addEventListener(
  "mousedown",
  (event) => {
    // event.cancelBubble = true
    event.stopPropagation();
    console.log("我是div & class A元素");
  },
  false
);
document.querySelector(".B").addEventListener(
  "mousedown",
  (event) => {
    console.log("我是div & class B元素");
  },
  false
);
```

[参考](https://zhuanlan.zhihu.com/p/389150328)

## js 事件代理(委托)

addEventListener
