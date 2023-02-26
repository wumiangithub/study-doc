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
