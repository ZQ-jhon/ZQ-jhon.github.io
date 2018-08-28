---
title: Html5回顾总结
date: 2018-01-12 10:53:00
tags: html5
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79041618)

## 1.新标签 ##
**1.1 `<vedio>`** 

```
<video width="320" height="240" controls="controls">
  <source src="movie.ogg" type="video/ogg">
  <source src="movie.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
```
两个video source源是为了最大程度的兼容所有浏览器，该标签IE8及以下不支持。
比较重要的属性：

```
预加载   preload:preload
自动播放 autoplay:autoplay
循环播放 loop:loop
```
常见的高大上的背景视频上嵌套文字的效果可以这样实现：

```
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8"/>
		<title></title>
		<style type="text/css">
			video{z-index:-99999;float:left;position: relative;left:300px;}
			h4{color:white}
		</style>
		
	</head>
<body>

<video width="320" height="240" autoplay="autoplay" loop="loop">
  <source src="http://www.w3school.com.cn/i/movie.ogg" type="video/ogg">
  <source src="http://www.w3school.com.cn/i/movie.ogg" type="video/mp4">
Your browser does not support the video tag.
</video>
<div style="float:left;width:320px;height:240px;z-index:999">
   <h4>震惊！野生棕熊竟然对猎物熟视无睹</h4>
</body>
</html>

```
给`video`给z-index：负数 ，给嵌套层的文字给 z-index：正数，然后相对定位，接着取消`video` 的controls属性，这样会隐藏音量条，播放/暂停按钮等控件。
![这里写图片描述](http://img.blog.csdn.net/20180112101024552?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
类似于该网站的页头：[英雄之刃官网](http://cos.qq.com/)

在js中，可以把`<video>` 完全当做一个Dom节点，操作他的相关属性。
例如：

```
document.getElementById('video').pause()//暂停

document.getElementById('video').play()//播放

document.getElementById("video").currentSrc;//获得原始播放地址

document.getElementById("video").currentTime//获得播放器当前播放位置，单位为s

document.getElementById("video").duration //获得视频的整个播放时长
......
```
还有特别多的API，例 如 EVENT：刚开始播放、结束播放、视频的网络状态等等，甚至可以结合播放时间，来控制插入广告。。。
**1.2 audio  **
与上述视频同理。兼容度更狭隘：IE9及以上
**1.3 拖放 Drag 和 drop**
兼容度：IE9、IE9+
示例：[W3C拖放示例](http://www.w3school.com.cn/tiy/t.asp?f=html5_draganddrop)
**1.4 Canvas**
*"始于苹果的一项技术，使得Javascript具有图像绘制的能力"。*

```
//HTML:
<canvas id="cvs" height="200" width="200">
  您的浏览器不支持<canvas>标签
</canvas>

//JS:
<script type="text/javascript">
var c=document.getElementById("cvs");  //获取
var cxt=c.getContext("2d");  //canvas对象特有的方法，目前仅仅支持到2D，未来可能会支持3D...
cxt.fillStyle="green"; //填充颜色 
cxt.fillRect(0,0,150,75); //（x,y,width,height）绘制起始点坐标，绘制的宽高
</script>

```

贴上自己做的demo
![这里写图片描述](http://img.blog.csdn.net/20180112115334236?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

未完待续。。。




<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

