---
title: 关于CSS3呼吸效果的探究 
date: 2018-01-17 11:18:00
tags: css3
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78949964)

## 一、效果预览 ##
![这里写图片描述](http://img.blog.csdn.net/20180102103428658?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
如图所示，鼠标移动上去，图片会向右上角抖动，鼠标离开，图片恢复原状。

## 二、方案选择 ##
刚刚接触到这个效果的时候，我还以为是采用放大效果来实现的，即scale:1.2诸如此类的代码，结果不然。

这个效果的实现，如果采用jquery的方案，直接写个动画即可。

```
//先设定好position:relative;
$('img:hover').animate({'left':'10px','bottom':'10px'});
```
假如追根溯源，还是使用的CSS3的动画。
首先自定义一个动画：

```
@keyframes testAnimate{

from{position: relative;bottom: 0;left: 0;}

to{position: relative;bottom: 20px;left: 30px;border: 5px solid #999;}

}
```
这个动画定义了一个名为：testAnimate的位置过渡动画，从相对位置(0,0)，变到相对位置 (30px,20px)，且终态时，增加了一个5px的边框。

接着，我们在测试的图片用例上来引入动画：

```
img:hover{
animation:testAnimate 1s;
-webkit-animation:testAnimate  1s;
-moz-animation:testAnimate  1s;
-o-animation:testAnimate  1s;
-ms-animation:testAnimate 1s;
}
//整个动画1s完成，并设置了浏览器兼容
```
效果如下：
![这里写图片描述](http://img.blog.csdn.net/20180102110628693?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
可能在网页上显示的不尽人意，这里面存在一个问题，当鼠标移入图片，并且悬停不动时，图片会自动回复到动画之前的状态，这就感觉像拖动一个东西，拖到一半，东西自己滑走了，好在CSS3里面有了现成的解决方案：

```
img:hover{
animation-fill-mode: forwards;
-ms-animation-fill-mode:forwards;//兼容IE  xxxxxx  
-webkit-animation-fill-mode:forwards;//兼容Chrome xxxxxx
-moz-animation-fill-mode:forwards;//兼容FireFox xxxxx
-o-animation-fill-mode:forwards;//兼容opear xxxxxx
}
```
这样，当鼠标移入，只要不松开，图片就会停留在动画的100%状态，而不会回滚到动画为0%的状态；当鼠标移出图片，动画结束，方回到初始状态。
## 三、分析归纳 ##
众所周知，jquery封装的js库，其中的动画部分来源于CSS3，作为原生的CSS，其功能不可小觑，而且相当于jquery的实现方法，这种方法定义起来更加的个性化，而且不用引入额外的js库，很省带宽。但缺点就是兼容性差，比起第三方封装的Animation.js库，兼容性不行

预览效果参见：news.lanzhou.cn/system/2017/12/29/011485365.shtml 其中的【微说图解】栏目。





<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

