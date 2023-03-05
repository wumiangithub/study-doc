# less

## @定义变量

```less
@width: 10px;
@height: @width + 10px;

@dashan: "#wrap";
@{dashan}{
	color:red;
    height:@height;
}
```

## @{}插值,字符串拼接

```less
// Variables
@my-selector: banner;

// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

// 编译为
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

```less
@images: "../img";
body {
  background: url("@{images}/1.png");
}
```

## @import 引入别的样式文件

```less
@src: "./header.less";
@import "@{src}";
```

## 使用混入 Mixins

### 有参数的 Mixins

```less
.style(@color: #58a, @size: 16px) {
  background-color: @color;
  font-size: @size;
}
.box p {
  .style(blue, 50px);
}
```

### 没有参数的 Mixins

```less
.wrapProp() {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}

.wrap {
  .wrapProp() // 加括号 可以执行mixin;
}
.box {
  background: skyblue;
  .wrapProp; // 没有参数不加括号也可以执行mixin
  width: 100px;
}
```

## less 可以直接继承其他选择器中的样式

```less
.wrap {
  width: 200px;
  height: 200px;
}
.box {
  .wrap; // 这里将会继承.wrap的样式
  color: red;
}
```

## Mixins 的判断条件

**Less 没有 if / else 但是 less 具有一个 when，and，not 与“，”语法**

```less
// 这里必须满足传递的宽度和颜色必须同时同满足条件才能执行Mixin
#box(@width, @height, @color) when (@width > 100px) and (@color = pink) {
  width: @width;
  height: @height;
  background-color: @color;
}

.box {
  #box(101px,50px,skyblue);
}
```

## Less 循环

**Less 循环采用的类似于 js 的递归调用**

```less
.dashan(@length,@i:1) when (@i  <= @length){
  .item-@{i}{
    width: @i * 50px;
    height:50px;
    border:1px solid red;
  }

  // 递归调用的同时,改变循环变量@i
  .dashan(@length, (@i+1));
};

.dashan(6);

```

## 嵌套

```less
.a {
  .b {
    width: 10px;
  }
}

// 编译之后
.a .b {
  width: 10px;
}
```

## &符号的使用

## 作为内层选择器时候，&符号表示父元素

```less
.box {
  width: 100px;
  height: 100px;
  .wrap {
    font-size: 16px;
    &:hover {
      color: red;
    }
  }
}

// 编译后
.box {
  width: 100px;
  height: 100px;
}
.box .wrap {
  font-size: 16px;
}
.box .wrap:hover {
  color: red;
}
```

```less
.demo {
  &-title {
    text-align: center;
  }
}

// 编译后
.demo-title {
  text-align: center;
}
```

## 使用两个&

- && 表示.demo.demo
- & & 表示.demo .demo
- &, & 表示.demo, .demo

```less
.demo {
  & &-title {
    text-align: center;
  }
}

// 解析后
.demo .demo-title {
  text-align: center;
}
```

## &反转嵌套

```less
.demo-title {
  .demo & {
    font-size: 20px;
  }
}

// 解析后
.demo .demo-title {
  font-size: 20px;
}
```

## less 在线编译器

[less 在线编译器](https://tool.oschina.net/less)

## 文档

[less 官网](https://less.bootcss.com/)
