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

## 经典布局

###
