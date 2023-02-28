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

## 配置环境变量

### mac 配置环境变量

1. 打开 terminal
2. vim ~/.bash_profile
3. 打开之后 按下键盘上的 i 键， 进入编辑模式
4. 直接在需要添加环境变量的地方输入
   - export PUB_HOSTED_URL=https://pub.flutter-io.cn
   - export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
5. 输入完成后 按下 esc 键 表示编辑完成
6. 再直接输入 :wq 表示保存并退出
7. source ~/.bash_profile 让环境变量生效
8. 检查是否生效
   - echo $PUB_HOSTED_URL

### windows 配置环境变量

1. 直接右键我的电脑，属性
2. 高级系统设置
3. 环境变量
4. 直接在 path 中新增路径，或者，在 path 同级新增一个路径并取一个别名 NVM_HOME，然后在 path 中新增这个别名也可以（只不过要用%包裹起来）
   - NVM_HOME C:\Users\Administrator\AppData\Roaming\nvm
   - %NVM_HOME%
