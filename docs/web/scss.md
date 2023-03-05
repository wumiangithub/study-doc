# scss

## sass 和 scss 有什么关系？

1、sass 和 scss 其实是一样的 css 预处理语言，SCSS 是 Sass 3 引入新的语法，其后缀名是分别为 .sass 和.scss 两种。

2、SASS 版本 3.0 之前的后缀名为.sass，而版本 3.0 之后的后缀名.scss。

3、两者是有不同的，继 sass 之后 scss 的编写规范基本和 css 一致，sass 时代是有格的缩进规范并且没有‘{}’和‘；’。而 scss 则和 css 的规范是一致的

## 嵌套

## $变量

```scss
$width: 5px;
.main {
  $heigth: 10px;
  width: $width;
  .child {
    heigth: $heigth;
    width: $width;
  }
}
```

## 父选择器&

## #{} 代表的插值

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

## 导入 scss @import

```scss
@import "foo.scss";
```

## 继承样式 @extend

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

## @mixin 和 @include

**用处类似于 extend，区别在于 mixin 是可以传递参数**

### 没有参数

```scss
@mixin large-text {
  font: {
    //scss允许这种写法，但是基本不咋用
    size: 20px;
  }
  color: #ff0000;
  a {
    color: blue;
    background-color: red;
  }
}

//使用
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

### 有参数

```scss
@mixin sexy-border($color, $width: 1in) {
  //可以给与默认值，
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {
  @include sexy-border(blue);
} //当不传递的时候默认第二个值
```

## @for 循环

- 方式 1：@for $i from 开始值 through 结束值 包含结束值
- 方式 2：@for $i from 开始值 to 结束值 不包含结束值

```scss
@for $i from 1 through 12 {
  li:nth-of-type(#{$i}) {
    transform: rotate(($i - 1) * 30 + deg);
  }
}
```

```scss
@for $i from 1 to 3 {
  .margin-left#{2 * $i + 8} {
    margin-left: 2 * $i + 8 + px;
  }
}
```

## 二、数组：语法

定义数组: $arrayName: a,b,c...;

循环数组: @each $item in $arrayName

在循环里边得到数组索引： index($arrayName，$item)

```scss
$pixelArr: 5, 15;
$position: top, right, bottom, left;
@each $item in $pixelArr {
  $index: index($pixelArr, $item); /**可得到循环的索引*/
  .margin-#{$item} {
    margin: $item + px;
    border-width: $index + px;
  }
  @each $p in $position {
    .margin-#{$p}-#{$item} {
      margin-#{$p}: $item + px;
    }
  }
}

/**最终编译结果*/

.margin-5 {
  margin: 5px;
  border-width: 1px;
}

.margin-top-5 {
  margin-top: 5px;
}

.margin-right-5 {
  margin-right: 5px;
}

.margin-bottom-5 {
  margin-bottom: 5px;
}

.margin-left-5 {
  margin-left: 5px;
}

.margin-15 {
  margin: 15px;
  border-width: 2px;
}

.margin-top-15 {
  margin-top: 15px;
}

.margin-right-15 {
  margin-right: 15px;
}

.margin-bottom-15 {
  margin-bottom: 15px;
}

.margin-left-15 {
  margin-left: 15px;
}
```

## scss 在线编译

[scss 在线编译：微工具](http://www.wetools.com/sass-to-css)

## 文档

[sass 官网](https://www.sass.hk/)
