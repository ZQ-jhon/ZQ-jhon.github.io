---
title: 正则复习 #标题
date: 2019-06-20 19:56:27 #创建时间
tags: [正则] #标签(同级)
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文章原始创作地址：[https://blog.csdn.net/qq_20264891/article/details/92743420](https://blog.csdn.net/qq_20264891/article/details/92743420)

如您有其他建议，可以通过左上角的 QQ 发起回话，或者在 https://zq-jhon.github.io/about/ 中添加我的微信


### 前言
一直发现我是个野路子，在学完 TS 和 Express 后，才回过头来想巩固一下 正则 的知识，不过话说回来，有了 TS 一些可选参数，以及 后端框架的路由匹配机制后，其实对于正则的理解是有一定作用的。类比这些概念时，发现有太多太多的相似之处，下面将会例举。
所以说，贴近标准，跟随标准（世界大厂）是最最最重要的，像小程序这样反 URL 透明可见的精神的产物，站在非商业的角度来看，确实没有任何价值。扯远了。。。
下面开始用自己的话来进行盘点：
### 量词
我们在匹配字符串中某个 子段 时，需要有足够的数量去进行限制，这样才能保证匹配到的结果足够准确。
常见的量词有：

 1. **?**    => 意思为：可选 0 或者 1 ，跟 ts 函数的可选参数一样
 2. **\+**  => 意思为： 1个或者多个 
 3. **\***  =>   意思为：通配符，0个或者任意个
 
### Range 区间 
例如，我想匹配 1~5 个 'a' ， 用 【量词】中的哪个都不合适，这时候就应该有一个区间的概念来进行约束：
```javascript
const reg = /^a{1,5}/i;
'a'.match(reg);  // 匹配 1 个 a , ["a", index: 0, input: "a", groups: undefined]
...
reg.test('aaaaa'); // 匹配 5 个 ,["aaaaa", index: 0, input: "aaaaa", groups: undefined]
reg.test('aaaaaa'); // 只能匹配到 5 个 ["aaaaa", index: 0, input: "aaaaaaaaa", groups: undefined]

```
可见，{ } 中的边界，是数学定义上的 **左右闭合区间。**

另外，还有一种区间，先看下实例：
[a-z] 代表匹配 a-z 的小写字母，[A-Z] 匹配 A 的大写字母。这些用 “-” 来表示的字符集，都是通过 **ASCII 码** 来进行排序的。
举个 🌰：
```javascript
const reg = /([a-z][A-Z]){1,2}/;
reg.test('aZ'); // true
reg.test('aBcccadsadsad') // true 匹配到了一个
```
### 反向字符集
例如 `[a-z]` 是匹配 a-z 的字母， 那么 `[^a-z]` 相当于不匹配小写字母。
举个例子：
```javascript
const str = `abcdef`;

const reg = /[abcde]/;   => 匹配 `abcde`， 没 `f`
const reg2 = /[abcde]/   => 只匹配 `f`
```
### 内置特殊匹配器
为了不让广大开发者写出太过于雷人的代码，也是内置了许多匹配器：

 1. \b 匹配单词边界 \B 匹配非单词边界
 2. \w 匹配字母 \W 匹配非字母
 3. \d 匹配数字 \D 匹配非数字
 4. 其他制表符和换行符等,例如 \r, \t ,\v 等


### 贪婪和非贪婪匹配
贪婪顾名思义，就是尽可能多的匹配。
```javascript
// 不贪婪
const exampleStr = `RegExp is very interesting!`;
/[a-zA-Z]+?/  => 只匹配 'R'


// 缺省则为贪婪模式
/[a-zA-Z]+/ => 匹配 'RegExp'

```


### 四个 flag
1. g 全局
2. m 多行
3. i 不分大小写
4. y 粘性(sticky) 

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
