---
title: readonly 数组与普通数组之间的兼容
excerpt: 最近想巩固和提高自己的 ts 水平，在刷 type-challenges，其中做到了这样一道题 00533-easy-concat，我发现普通数组（`any[]`）可以赋值给只读数组（`readonly any[]`），而反之则不行。
date: 2025-02-07 22:09:33
update: 2025-05-07 23:11:19
---

最近想巩固和提高自己的 ts 水平，在刷 [type-challenges](https://github.com/type-challenges/type-challenges)，其中做到了这样一道题 [00533-easy-concat](https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.zh-CN.md)，我发现普通数组（`any[]`）可以赋值给只读数组（`readonly any[]`），而反之则不行。我对 readonly 关键字使用很少，以至于我最初给出的题目解答为 `type Concat<T extends any[] | readonly any[], U extends any[] | readonly any[]> = [...T, ...U]` ，我并不明白为什么普通数组可以赋值给只读数组。

![readonly-array-error](/post/readonly-array-error.png)

## 类型安全角度考虑

在我看来，readonly 是更严格的约束，而普通数组并没有这种约束，因此由于缺少某些特性导致无法和 readonly 数组兼容，但从类型安全角度考虑时。

当将普通数组赋值给 readonly 数组时，由于 readonly 数组类型值不可修改，此时新数组不可修改，但读取数据仍然不会有区别，此时这个赋值时安全的，普通数组兼容 readonly 数组。

当将 readonly 数组赋值给普通数组时，由于普通数组类型值可被修改，此时新数组可以被修改，破坏了 readonly 约束，读取到的数据可能发生变化，这可能会导致类型安全性问题，因此 readonly 数组无法兼容普通数组。

## 数组类型是 readonly 数组类型的子类型

由于 readonly 的约束性更强，我下意识认为它是普通数组类型的扩展，但事实恰恰相反。翻看 ts 中对于 ReadonlyArray 和 Array 的定义，可以看出 ReadonlyArray 中包含 toString 等 21 个数组访问相关的方法，而 Array 类型同样拥有这 21 个方法，且额外包含了 8 个数组修改相关的方法。

这似乎可以粗略的认为 Array 是 ReadonlyArray 类型的扩展，或者说 **Array 是 ReadonlyArray 类型的子类型**。因此根据经验，子类型的值可以赋值给父类型，就更好理解为何普通数组可以赋值给只读数组而反之不行了。

![compare-ReadonlyArray-with-Array](/post/compare-ReadonlyArray-with-Array.png)

## 对象类型的 readonly 字段

考虑以下示例，在数组中，将非 readonly 数组赋值给 readonly 数组是可行的，但是将 readonly 数组赋值给非 readonly 数组却不行，原因如前所述，这是符合预期的，然而在对象类型中的 readonly，情况似乎并不一样。

```tsx
type ReadonlyArr = readonly string[]
type WritableArr = string[]

declare let readonlyArr: ReadonlyArr
declare let writableArr: WritableArr

readonlyArr = writableArr // no error
writableArr = readonlyArr // error
```

在对象类型的 readonly 中，将非 readonly 对象赋值给 readonly 是可行的，同时将 readonly 对象赋值给非 readonly 同样可行，可以[阅读官方手册](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties)，这表明对象中的 readonly 字段可以相互兼容，readonly 约束似乎“无用”，这和数组中的 readonly 不一样阿。

```tsx
type ReadonlyObj = { readonly title: string }
type WritableObj = { title: string }

declare let readonlyObj: ReadonlyObj
declare let writableObj: WritableObj

readonlyObj = writableObj // no error
writableObj = readonlyObj // no error
```

搜索资料无果，遂问了下 ai。由于在对象属性上添加 readonly 修饰符，对象结构未修改，属性名称和数量并未改变，因此可以相互兼容；但对于数组，添加 readonly 修饰符后结构发生变化，移除了诸如 push 等方法，因此无法兼容。

> 对象属性：**`readonly`** 不影响兼容性，因为结构类型系统仅检查形状，且 **`readonly`** 是本地约束。
>
>
> 数组/元组：**`readonly`** 会影响兼容性，因为 **`ReadonlyArray`** 类型移除了修改方法，类型系统必须保证赋值后的操作安全。
>
> 这种行为差异体现了 TypeScript 在类型安全与灵活性之间的权衡。如果需要强制兼容，可以通过类型断言（**`as`**）绕过检查，但需自行确保安全性。
>
> ———— 来自 deepseek
>

## 其他

关于两个类型之间的兼容，其实涉及到 ts 中类型的可变性（最近才了解到），可变性包括协变（Covariance）、逆变（Contravariance）、不变（Invariance）和双向变（Bivariance），[这篇文章](https://juejin.cn/post/6844904166536527880)写的很好且有例子帮助理解，读完之后受益匪浅。稍微总结下就是：

- **协变**：子类型关系与容器类型一致（`A <: B` ⇒ `F<A> <: F<B>`）。数组是协变的。
- **逆变**：子类型关系与容器类型相反（`A <: B` ⇒ `F<B> <: F<A>`）。函数参数是逆变的。
- **不变**：子类型关系与容器类型无关（`A <: B` ⇒ `F<A>` 和 `F<B>` 无关）。泛型默认是不变的。
- **双向变**：子类型关系与容器类型无关，且可以互相赋值。
