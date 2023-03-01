## rematch

Rematch 是在 redux 的基础上再次封装，使用 rematch，我们就不需要再声明 action 类型、action 创建函数、thunks 配置；

如果你之前学过 vuex，那你对这个不会陌生，因为模式基本上一样。
[rematch 官网](https://rematchjs.org/docs/)

```js
import { createModel } from "@rematch/core";

export const taskInfo = createModel({
  state: {
    id: 0,
  },
  reducers: {
    setProjectId(state, payload) {
      return {
        ...state,
        id: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getProjectInfo(payload, RootState) {
      dispatch.taskInfo.setProjectId(payload.projectId);
    },
  }),
});
```

```js
import { init, RematchRootState } from "@rematch/core";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import * as models from "./index";

export const historyMode = createBrowserHistory();
const reducers = { router: connectRouter(historyMode) };
export const store: any = init({
  models,
  redux: {
    reducers,
    middlewares: [routerMiddleware(historyMode)],
  },
});
```
