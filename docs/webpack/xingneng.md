# 性能

## 懒加载/预加载

```js
document.getElementById('btn').onclick = function () {
// console.log(mul(1, 2));
//懒加载：当文件需要使用时才加载
//懒加载 当前 test.js 不会被加载，只有在点击按钮之后才会加载 test.js[文件会分割]
// import(/_webpackChunkName:'test' _/'./test').then(({ mul }) => {
// console.log(mul(2, 2));
// })

//预加载 prefetch：会在使用之前，提前加载 js 文件，
//正常加载可以认为是并行加载（同一时间加载多个文件）
//预加载 prefetch：等其他资源加载完毕，浏览器空闲了，在偷偷加载资源
import(/_webpackChunkName:'test',webpackPrefetch:true _/'./test').then(({ mul }) => {
console.log(mul(2, 2));
})
}
```

## PWA 渐进式网络开发形式

```js
new WorkboxWebpackPlugin.GenerateSW({
  /**
   * 1、帮助serviceworker快速启动
   * 2、删除旧的 serviceworker
   *
   *  文件～
   */
  clientsClaim: true,
  skipWaiting: true,
});
```

```js
/**
 * 1、eslint不认识 window、navigater全局变量
 *   解决：需要修改package.json中eslintConfig配置
 *     "env":{
 *       "browser":true //支持浏览器端全局变量
 *     }
 * 2、sw代码必须运行在服务器上
 *   ---nodejs (直接写服务器)
 *   --->下载包 运行指令
 *      npm i serve -g
 *      serve -s build 启动服务器，将bulid目录下所有资源作为静态资源暴露出去
 */

// 注册兼容性问题
// 处理兼容性问题

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("sw注册成功了");
      })
      .catch(() => {
        console.log("sw注册失败了");
      });
  });
}
```
