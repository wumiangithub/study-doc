# 工具和软件

## curl 安装 nvm

### mac 或 linux 下安装 nvm。

```js
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ nvm -v
0.39.1
```

## tyarn 国内镜像源

推荐使用 yarn 管理 npm 依赖，并使用国内源（阿里用户使用内网源）。

```
# 国内源
$ npm i yarn tyarn -g
# 后面文档里的 yarn 换成 tyarn
$ tyarn -v

# 阿里内网源
$ tnpm i yarn @ali/yarn -g
# 后面文档里的 yarn 换成 ayarn
$ ayarn -v

```

## 配置 yarn 安装包的环境变量

```
# mac 系统:
$ sudo vi ~/.bash_profile
# 在 .bash_profile 中添加下面一行：
export PATH="$PATH:`yarn global bin`"

# windows系统:
# 获取 global bin 的路径
$ yarn global bin
C:\Users\Administrator\AppData\Local\Yarn\bin
# 复制上面的 global bin 的路径，添加到系统环境变量 PATH。
```

## pnpm

国内建议选 pnpm + taobao 源，速度提升明显。umi 团队推荐

### 安装 pnpm。

```js

curl -fsSL https://get.pnpm.io/install.sh | sh -
$ pnpm -v
7.3.0
```

### 还有什么

这些乱七八糟的，都是阿里搞的，只要会 npm 和 yarn 就行

- npm
- cnpm
- tnpm
- pnpm
- yarn
- tyarn

### npm

npm info 包名
