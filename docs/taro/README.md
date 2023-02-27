# taro

- Taro 是一套遵循 React 语法规范的 多端开发 解决方案。
- Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 小程序 / H5 / RN 等应用。
- 早在 Taro 1.2 发布 时，我们就提供微信小程序转 Taro 的功能，转换后的微信小程序应用会变成一个多端应用

## react 用法

```tsx
import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";

export default class Index extends Component<PropsWithChildren> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
```

## 学习文档

[官网](https://taro.jd.com/)
