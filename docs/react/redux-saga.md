## redux-saga

- 定位：redux 中间件；旨在于更好、更易地解决异步操作（有副作用的 action）
- 它的目标是让副作用管理更容易（副作用，例如异步获取数据，访问浏览器缓存等）
- redux-saga 基于 generator
- 简单解释就是，saga 是一个任务列表，任务执行顺序是有序的
- 缺点：学习成本高
- 优点：集中处理了所有的异步操作，异步接口部分一目了然
- 所以推荐使用 dva 整合了 saga，使用简单

## call 用来调用异步方法

- call 用来调用异步方法,
- put 派发 reduer 的 action 以及获取的值,
- takeEvery 监听触发 saga 的事件

```js
import { call, put, takeEvery } from "redux-saga/effects";
//模拟一个异步方法
const user = {
  login(name) {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        //当用户输入的值等于tom则登录成功,否则失败
        if (name == "tom") {
          reslove({ name: "tom", age: 20 });
        } else {
          reject("用户名或密码有误");
        }
      }, 1000);
    });
  },
};
//执行异步方法并派发action,因为这个过程可能会报错,用try,catch来捕获
function* login(action) {
  try {
    yield put({ type: "nowlogin" });
    const res = yield call(user.login, action.name);
    yield put({ type: "haslogin", res });
  } catch (message) {
    yield put({ type: "loginfail", message });
  }
}
//监听触发saga事件,并执行上面的generator   login函数
function* mysaga() {
  yield takeEvery("LOGIN_REQUEST", login);
}

export default mysaga;
```

## redux-saga vs redux-thunk

[参考](https://www.cnblogs.com/sexintercourse/p/15689873.html)

## 文档

[redux-saga 官网](https://redux-saga-in-chinese.js.org/)
