---
title: Electron设置-webkit-app-region 后无法响应鼠标点击事件的解决方式 
date: 2019-02-19 17:46:11
tags: [css,electron]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

## 一、抛出问题 ##
在开发 Electron 应用的过程中，想要使得窗口在普通大小可以拖动，于是设置给 title-bar css 如下：

```css
.title-bar {

-webkit-app-region: drag;
}

```
但是设置了这个属性后，发现在 title-bar 上双击全屏和 restore size 的功能又废了，现象如图：
<img src="https://img-blog.csdnimg.cn/20190219173642306.gif" alt="现象">

怎么办呢？

## 二、网上现有的方案 ##
通过搜索不难发现，有如下方案：

1. 拖动不要用 -webkit-app-region 了，自己监听 mouseDown 和 mouseUp 来实现吧

2. 父元素设置 -webkit-app-region： drag, 子元素 -webkit-app-region： no-drag 即可

但是，本项目在实际开发过程中有点特殊，即：要实现拖拽和双击放大/缩小的所著元素为同一个 DOM


## 三、最终解决方案 ##
在宿主 Dom 中嵌套一个等宽，等高，但设置了-webkit-app-region： no-drag 属性的 div 即可，上代码：

```html
<!-- 拖拽使用 -->
<div [ngClass]="{'title-bar__drag': !isMax}">
    <div style="-webkit-app-region: no-drag; width: 100%;height: 100%"></div>
</div>
```
现在，一切都正常啦！

