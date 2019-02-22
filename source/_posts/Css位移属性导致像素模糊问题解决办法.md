---
title: Css位移属性导致像素模糊问题解决办法
date: 2019-02-22 10:53:11
tags: [css]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

## 一、抛出问题 ##
```css
.modal-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 999;
}
.modal {
    position: absolute;
    top: 50%;
    right: 50%;
    margin: auto;
    transform: translat(-50%,-50%);
}
```
以上代码，是做一个模态框，该模态框使用 Hack 方法来垂直竖直两个方向居中，但是在实际操作中，会发现，整个模态框的边缘，会出现模糊的现象，仿佛打了马赛克一样。

马赛克版：
![马赛克](https://img-blog.csdnimg.cn/20190222103114976.png)

高清版:
![高清版](https://img-blog.csdnimg.cn/20190222103150331.png)

可能上传的图片质量不高，但在我的电脑上差异非常明显

## 二、分析原因 ##
经过查阅资料和一通分析，发现是CSS 的 transform： translate 属性在作元素位移时，极有可能发生像素点无法对其的情况，从而导致显示模糊的问题，画个灵魂示例图：

![灵魂示意图](https://img-blog.csdnimg.cn/20190222104705597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx,size_16,color_FFFFFF,t_70)

如图，正常情况下，元素的边缘应该和像素点对齐，但是经过 CSS translate 后，计算的结果并非整数的像素点，导致本来一个像素能渲染的内容，没有完全归纳在其像素点内，导致出现模糊的情况。

翻译成人话： css transform:translate(-50%,-50%) 计算后的结果很可能是 transform: translate( 100.5px, 100.5px)，就因为 0.5 所以模糊

## 三、解决方案 ##
方式有二

第一种： 在 transfrom 时，使用 calc 函数 加上0.5 px ，具体代码 : 
```css
.modal {

    position: absolute;
    top: 50%;
    right: 50%;
    margin: auto;
    /** 这 0.5px加或者减都可以 */
    transform: translat(calc(-50% + 0.5 px), calc(-50% + 0.5 px));
}
```
第二种，别 transform 了，直接父元素弄成 Flex 布局，两条轴都设置居中，也能达到效果。