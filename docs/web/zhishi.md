# web 知识点

## attachShadow

ShadowDOM 最大的用处应该是隔离外部环境用于封装组件  
我们可以轻松地封装一个组件然后可以跨项目共享这个组件。  
样式也被封装，我们甚至可以不用写CSS 样式完全在我们的组件中，这样就防止开发人员随意修改样式
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
