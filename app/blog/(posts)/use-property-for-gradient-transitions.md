---
title: 使用@property实现渐变过渡
date: 2024-05-07 17:32:00
updated: 2024-05-06 18:31:00
---

在现代网页开发中，我们经常会使用渐变色作为主题色或是仅用于按钮等元素的背景色，但在CSS中渐变所使用的是[CSS Images Module](https://drafts.csswg.org/css-images-4/#linear-gradients)规范，实际是被当作图片使用，因此截至目前所有浏览器均不支持渐变使用transition过渡。当然想要实现还是有办法的，例如使用@property规则。

![transition compatibility](/post/transition-compatibility.png)

## @property

> @property CSS at-rule是CSS Houdini API 的一部分，它允许开发者显式地定义他们的CSS 自定义属性, 允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

使用`@property`注册的属性在css中属于[自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)，可通过`var()`函数引用（说是属性，其实更像是一个值，我第一反应还以为可以自定义[语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Syntax)中的属性）。我们可以通过`@property`创建两个颜色属性

```css
@property --color-light {
  syntax: '<color>';
  inherits: false;
  initial-value: hsl(172 60 50); /*使用hsl函数创建的颜色*/
}
@property --color-dark {
  syntax: '<color>';
  inherits: false;
  initial-value: hsl(217 90 60);
}
```

需要注意的是，当`syntax`属性指定为`"<color>"`时，`initial-value`值只能是合法颜色，而不是三个数字值代表的颜色变量。

## 使用渐变

接下来就可以在渐变中使用所定义的颜色属性，并使用`transition`属性定义`--color-light`和`--color-dark`颜色如何过渡，当颜色改变时即可看到过渡效果。

```css
.btn {
  /*...*/
  transition:
    --color-light 1s,
    --color-dark 1s;
  background: linear-gradient(to right, var(--color-light), var(--color-dark));

  &:hover {
    --color-light: hsl(325 100 60);
    --color-dark: hsl(9 100 60);
  }
}
```

## 总结

通过使用 `@property`，我们可以轻松地定义自定义属性，大大提高了CSS的灵活性。其通过将background-image的过渡转换为color的过渡，巧妙实现渐变色的过渡效果。不过需要注意的时，截止到目前其并未在所有浏览器中实现，用于生产之前还请查看[兼容性列表](https://caniuse.com/?search=%40property)。

## 参考

[**CSS @property，让不可能变可能**](https://segmentfault.com/a/1190000039826626)
