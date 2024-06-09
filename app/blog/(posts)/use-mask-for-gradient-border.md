---
title: 使用mask实现带圆角的渐变色边框
date: 2024-05-09 19:36:08
---

最近在项目中想要实现带圆角的渐变色边框，但是通过 `border-image` 或者before伪元素做底色实现后都不满意，直到查到到CSS中的 [`mask`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask) 属性，与其他方案相比可实现圆角、透明底，同时兼容性很好，感觉唯一缺点是仍然需要使用到伪元素，可能可读性不是很好。`mask` 作为2023年的Baseline，意味着目前所有主流浏览器都支持它，[查看浏览器兼容](https://caniuse.com/?search=CSS%20Masks)。

## CSS mask是什么

> CSS 属性 mask 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。

mask属性类似于background是一个简写属性，具体可查看[MDN mask](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask)，本文主要介绍 `mask-image`、`mask-clip` 和 `mask-composite`，设置了mask属性的元素及其子元素将被蒙上了一层遮罩。

### mask-image

`mask-image` 用于设置遮罩层像，该遮罩图像影响内容的方式取决于[`mask-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-mode)。

当该属性为渐变时，mask默认不关心渐变颜色，仅关心其透明度，渐变透明度为1时该元素及其子元素将完全可见，透明度为0时底下元素将完全不可见（第一次使用的时候感觉有点反直觉，因为它和在背景中使用渐变透明度并不一致）；

当该属性为图片时，mask同样默认并不关心图片内容，而仅关心图片大小和透明度，图片大小范围内的元素会被展示，图片大小范围外的元素会被隐藏，透明度对元素影响与渐变一致，相当于在一张纸上扣出了图片的形状，将其覆盖到div上，查看示例；

### mask-clip

`mask-clip` 决定 `mask-image` 绘制的区域，默认为border-box，表示遮罩将绘制到边框盒子中。设置为content-box表示遮罩将绘制到内容盒子中；padding-box表示遮罩将绘制到内边距盒子中。具体取值含义可参考[CSS盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)。

### mask-composite

当元素有多个遮罩层时，也就是 `mask-image` 设置多个，`mask-composite` 决定当前遮罩与其后多个遮罩之间的合成操作，默认值为add，表示多个遮罩层互相叠加。设置为subtract表明多个遮罩之间重叠的部分被剪掉，重叠部分内容将不可见；完整取值可参考[MDN mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite#syntax)。

## 具体操作

### 创建一个渐变边框

首先绘制一个不带内容的边框，使用mask可”扣”出一个只有边框的元素。原理是创建一个渐变背景的div，给div设置两层mask遮罩，第一层遮罩设置到border-box上，确保div所有内容可见；第二层遮罩设置到padding-box上，用于剪掉除边框外其他内容，设置 `mask-composite` 为subtract将重叠部分剪掉，只留一圈边框。这样就可以创建一个只包含边框的元素。

```css
.mask {
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 16px;
  border: 10px solid transparent;
  background: linear-gradient(yellow, green) border-box;
  mask:
    linear-gradient(#fff, #fff) border-box subtract,
    linear-gradient(#fff, #fff) padding-box;
}
```

![mask border](/post/mask-border.png)

> 题外话：当透明边框与渐变色背景同时使用时，会发现边框处的渐变色异常，这是由于 `background-origin` 默认取值为padding-box，渐变会从内边距开始绘制，需要设置其为border-box来充满整个边框，感兴趣可以自行尝试。

### 创建元素主体部分

接下来就是创建元素主体部分并将其边框宽度设置与mask元素一致，边框颜色设置为透明， `background-clip` 设置为padding-box确保边框处不包含背景色（其实也可以不用，毕竟边框会覆盖）。

```css
.content {
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 16px;
  border: 10px solid transparent;
  background: cyan padding-box;
}
```

![mask content](/post/mask-content.png)

### 将边框与内容合并

为了让边框和内容在同一个元素中，可以通过伪元素将其合并，通过将内容元素的before伪元素样式设置为边框元素的样式，并通过position定位，最终效果如下。

```css
.content {
  position: relative;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border-radius: 16px;
  border: 10px solid transparent;
  background: cyan padding-box;
}

.content::before {
  content: '';
  position: absolute;
  inset: -10px;
  box-sizing: border-box;
  border-radius: 16px;
  border: 10px solid transparent;
  background: linear-gradient(yellow, green) border-box;
  mask:
    linear-gradient(#fff, #fff) border-box subtract,
    linear-gradient(#fff, #fff) padding-box;
}
```

![content with border](/post/content-with-border.png)

## 总结

不知道怎么总结。。。
