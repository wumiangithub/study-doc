# css

## 样式穿透 pointerEvents: "none"

```
将样式设置为
pointerEvents: "none"

就可以将点击事件穿透到父级

none
元素永远不会成为鼠标事件的 target。
但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，
在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
```

## object-fit 设置 img 填充样式

```css
/*设置img填充样式*/
.img {
  width: 100%; /*很重要*/
  height: 100%; /*很重要*/
}

.fill {
  object-fit: fill;
}
.contain {
  object-fit: contain;
}
.cover {
  object-fit: cover;
}
.none {
  object-fit: none;
}
.scale-down {
  object-fit: scale-down;
}

.productImgLi img {
  width: 150px;
  height: 200px;
  object-fit: cover;
}
```

## white-space

```
规定段落中的文本不进行换行：
p
  {
  white-space: nowrap
  }

pre  空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。
```

## flex

```
flex-shink  : 0 //不允许缩小
flex-grow  : 0 //不允许变大
flex  : 1 //自适应大小
flex的含义
flex是 flex-grow 、flex-shrink 、flex-basis属性的缩写
flex:1 === flex:1 1 0px
```

## 网格布局

```
display: grid;
display: inline-grid;
```

[参考](https://www.runoob.com/css3/css-grid.html)

## 经典布局

### 圣杯布局

![圣杯布局](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071323.png)

### 双飞翼布局

### 两列布局

### 三列布局
