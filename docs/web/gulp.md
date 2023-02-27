# gulp

##

gulpfile.js 配置文件

## 常用命令

- gulp.series 用于串行（顺序）执行

- gulp.parallel 用于并行执行

- gulp.pipe 将 src 读取的流转换出去的一个桥梁
- gulp.src 读取文件，转为流
- gulp.dest 将流写入文件
- gulp.task 执行一个任务
- gulp.watch 监听文件变化

### gulp.task

```js
if (process.env.NODE_ENV === "development") {
  gulp.task("default", gulp.series(fn1, fn2));
} else {
  gulp.task("default", gulp.parallel(fn3, fn4));
}
```

### gulp.watch

```js
const { watch } = require("gulp");
// 所有事件都将被监控
watch("src/*.js", { events: "all" }, function (cb) {
  // body omitted
  cb();
});
```

### gulp.src 加 gulp.pipe 加 gulp.dest

```js
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

exports.default = function () {
  return src("src/*.js")
    .pipe(babel())
    .pipe(src("vendor/*.js"))
    .pipe(uglify())
    .pipe(dest("output/"));
};
```

## gulp-babel

gulp-babel 搭配 process.env.BABEL_ENV //lib、esm、dist 输出不同格式的代码

## through2

一般在 gulp 中都会使用 through2.obj(), 帮忙处理 stream 的

```js
const { src, dest } = require("gulp");
const uglify = require("uglify-js");
const through2 = require("through2");

exports.default = function () {
  return (
    src("src/*.js")
      // 创建一个内联插件，从而避免使用 gulp-uglify 插件
      .pipe(
        through2.obj(function (file, _, cb) {
          if (file.isBuffer()) {
            const code = uglify.minify(file.contents.toString());
            file.contents = Buffer.from(code);
          }
          cb(null, file);
        })
      )
      .pipe(dest("output/"))
  );
};
```

## gulp-cssnano 压缩 css

## gulp-less 处理 less 文件

## gulp-uglify 压缩文件

## gulp-gzip

## gulp-imagemin 压缩图片

## gulp-base64 把小图片转成 base64 字符串

## varlet-cli Vue3 组件库快速成型工具

## 文档

[gulp 官网](https://www.gulpjs.com.cn/)
