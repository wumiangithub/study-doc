# flutter

## 跨平台技术简介

针对原生开发面临的问题，业界一直都在努力寻找好的解决方案，而时至今日，已经有很多跨平台框架（注意，本书中所指的“跨平台”若无特殊说明，即特指 Android 和 iOS 两个平台），根据其原理，主要分为三类：

- H5 + 原生（Cordova、Ionic、微信小程序）
- JavaScript 开发 + 原生渲染 （React Native、Weex）
- 自绘 UI + 原生 (Qt for mobile、Flutter)
  - UI 样式是自绘，但是一些蓝牙啊，读写文件还是用的原生功能

## Flutter 基础

- Flutter 底层使用 Skia 作为其 2D 渲染引擎
  - Google Chrome 浏览器和 Android 均采用 Skia 作为其 2D 绘图引擎

## 静态编译 AOT 与动态解释 JIT

- AOT 程序的典型代表是用 C/C++ 开发的应用
- 而 JIT 的代表则非常多，如 JavaScript、python 等

## 为什么采用 Dart 语言开发,不采用 js

- **基于 JIT 的快速开发周期**：Flutter 在开发阶段采用，采用 JIT 模式，这样就避免了每次改动都要进行编译，极大的节省了开发时间；

- **基于 AOT 的发布包**: Flutter 在发布时可以通过 AOT 生成高效的机器码以保证应用性能。而 JavaScript 则不具有这个能力。

- Dart 快速内存分配
- Dart 是类型安全的语言 ， 而 js 还需要 ts 辅助

## windows 下安装 flutter

### 1、官网下载 flutter

[flutter 下载地址](https://flutter.dev/docs/development/tools/sdk/releases)

### mac 配置环境变量

```
在.bash_profile新增
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

export PATH=/你的flutter文件夹所在位置/flutter/bin:$PATH
```

### windows 配置环境变量

就是在 path 同级新增两个变量对应镜像路径

![windows配置环境变量](https://i2.wp.com/img-blog.csdnimg.cn/20200624010609394.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N1bmJpbmthbmc=,size_16,color_FFFFFF,t_70)

然后拿到 flutter 安装路径，将路径添加到环境变量的 path 中

- E:\flutterSDK\flutter\bin

## flutter 学习文档

[Flutter 中文开发者社区](https://flutterchina.club/)
