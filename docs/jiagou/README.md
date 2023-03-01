# 架构

## husky 和 lint-staged

- husky 代码提交前，检查代码是否合格，全量检查
- lint-staged 只检查本次修改的

`npm i husky lint-staged -D`

```json
"husky": {
		"hooks": {
			"pre-commit": "pretty-quick --staged && yarn eslint"
		}
	},
"lint-staged": {
		"*.{js,jsx,less,md,json}": [
			"prettier --write"
		],
		"*.ts?(x)": [
			"prettier --parser=typescript --write"
		]
	},
```

## pretty-quick 和 prettier

格式化所有文件
`npm i prettier pretty-quick -D`

## 怎么绝对防止 git 冲突

### 方式一：git stash

```
如果你和同事修改的同一个分支，改动都不小，为了防止提交冲突，覆盖对方的修改，避免出错，如何做呢

首先将自己的修改暂存，git stash

其次拉取对方修改的代码，git pull

然后再 将你自己的改动取出， git stash pop
有冲突就解，没有就提交

git add .

git commit -m 'update'

git pull

git push

即可，完美！！！！
```

### 方式二: 代码至少一天合一次。

### 方式三: 使用 husky

### 方式四: 每个人代码提交之前，代码 preview

### 方式五: git rebase master

[git rebase 参考](https://zhuanlan.zhihu.com/p/427842903?utm_id=0)

## 前端架构应该包含

### 1.公用类库/函数；

### 2.公用组件；

### 3.异常监控；

### 4.日志系统；

### 5.安全系统；

### 6.资源管理系统；

### 7.性能优化系统；

### 8.开发规范；

### 9.构建工具；

### 10.统计系统；

### 11.自动化测试工具；
