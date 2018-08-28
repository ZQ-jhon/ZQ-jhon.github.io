---
title: css3原理，结合jquery复习
date: 2018-01-17 11:18:00
tags: css3
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79019724)

## 0.怪异盒模型 ##
非IE及IE9及以上， 盒模型的构成为:content
老IE，IE8及以下， 盒模型为 content+border+padding 
如果有这样一个DIV：

```
div{width:100px;height:100px;border:1px solid black;padding:10px;}
```
在非IE下，盒模型为：
![这里写图片描述](http://img.blog.csdn.net/20180110092905668?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
在老IE下，盒模型为：
![这里写图片描述](http://img.blog.csdn.net/20180110092944223?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
由此可见，老IE在计算盒模型时，加入了两个padding和border的值。

## 1.background-size ##
规定背景的位置。
eg:

```
#div{background-size:cover;}//覆盖整个div
#div{background:url(img/123.png) no-repeat;background-size:10% 10%;}//背景图片宽高为原始图片宽高的10%，且不重复

```
## 2.background-orgin: ##
//可以选择的值为：content-box、margin-box、padding-box

***content-box、margin-box、padding-box的区别***

①content-box，即采用W3C标准渲染方法，不计算padding和border及margin，得出的盒子
②padding-box，渲染盒子的时候，把padding当做盒子宽高的组成部分，即在标准盒子模型的基础上，宽高都增加padding px。
③margin-box，同理，宽高都增加margin-box
3.border-radius  圆角边框，假如DIV 的  宽 = 高，即正方形，此时，如果border-radius = div 的宽/高，那么此时的div是一个圆形。如果border-radius远远大于div的宽/高，那么还是一个圆形，不会变化。
因此，background-origin的值，就取决于背景图从哪个盒子模型开始渲染。
## 4.text-shadow : 水平偏移 垂直偏移 阴影距离文字的z-index距离 颜色 ##

```
{
text-shadow: 225px 0px 0px #FF0000; /*水平偏移225，垂直不偏移 z-index为0 颜色为红色*/

}
```
最终效果：
![这里写图片描述](http://img.blog.csdn.net/20180110095154859?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 5.font-face 自定义字体 ##
兼容度：IE及IE8以下不支持，主流浏览器都支持。
关于自定义字体，请参见我之前的一篇博客：
[自定义图标与百度Share API](http://blog.csdn.net/qq_20264891/article/details/78438174)
## 6.Css3 之 2D转换 (transform)##
释义：transform 改变;变换
兼容度：IE9及以上，主流浏览器都兼容。
下面列举的方法，都位于transform属性之下，例如：transform:rotate()、transform:translate()
主要的2D转换属性：
**6.1  位移：  translate()   方法 **

```
div{transform：translate(100px,100px)} /*在原来位置的基础上，x轴移动10px，y轴移动10px*/
```
如图所示：
![这里写图片描述](http://img.blog.csdn.net/20180110101251395?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

原本处于空白位置的DIV，现在x,y轴都平移了正的100px
**6.2 旋转   rotate() 方法**

```
```
img{transform：rotate(30deg)}
 /*图片顺时针旋转30度，当然，也可以和css伪类配合完成一些效果 ，例如 ：*/
 img:hover{transform:rotate(30deg)} /*鼠标悬停，方可旋转*/
```
![这里写图片描述](http://img.blog.csdn.net/20180110102120286?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
由此可见，这个效果在一些圆形的图片上最为适用

**6.3 比例/缩放 scale(x轴比例，y轴比例) 方法**
跟刚才的旋转同理，我们也可以给一个图片设定一:hover伪类，然后来观察效果

```
/*文档结构：父div包含着一个图片，父div标准盒子模型100x100，原始图片100x100 */

div{width:101px;height:101px;overflow:hidden;border:1px solid black;}

img:hover{transform: scale(1.5,1.5);}
```
![这里写图片描述](http://img.blog.csdn.net/20180110102627735?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
这个效果也很常见。鼠标放进去放大，鼠标离开变成原始比例。
关于这一点，可以参照之前的博客：
[关于CSS3呼吸效果的探究](http://blog.csdn.net/qq_20264891/article/details/78949964)
**6.4 偏斜/歪斜  skew(x轴偏斜,y轴偏斜)**
以前见过很多用CSS3做的留言墙，skew属性用的比较多。

```
img:hover{transform:skew(30deg,30deg)}
```
鉴于这个方法比较扭曲，就不上图了，值得注意的一点是，这个偏移量貌似根据tan来计算的，当我给这个方法传入90deg时，图片会不存在。
**6.5 矩阵/汇总方法 matrix**
martrix()接受6个参数，其实就是对于 平移、旋转、缩放、偏斜的汇总简写。
具体请参见张鑫旭大神的博客：
[理解CSS3 transform中的Matrix(矩阵)](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)
## 7. Css3之3D转换 ##（Oprea不支持3D转换）
**7.1    3D旋转 rotateY()**

```
div:hover{transform: rotateY(180deg)}
```
![这里写图片描述](http://img.blog.csdn.net/20180110123324497?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

框中的文字，其本身围绕Y轴旋转180°

## 8.Transition 过渡效果 ##
兼容度：IE9及以下不支持该属性，需要优雅降级

```
div{width:100px;height:100px;background:yellow;transition:width:width 2s;}
div:hover{width:300px;}
```
效果如图（鼠标移入，DIV变宽，鼠标移出，自动复原）：
![鼠标移入，DIV变宽](http://img.blog.csdn.net/20180111092602675?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

此时，我们在div:hover中重写了属性width，那么，在原始的div{transition}中，我们要说明，那个属性需要过渡效果，并注明过渡时间，此时肯定是transition:width 2s，如果有多个属性需要过渡效果，那么，就应该给出如下说明：

```
transition:all 2s   //所有属性都需要过渡效果，并且所有效果同步过渡的总时长为2s.
```
如此一来，就可以实现类似于jquery的效果：

```
$('div').animate({width:'101px';height:'101px';background:'green';})
```
![这里写图片描述](http://img.blog.csdn.net/20180111115416020?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

甚至可以规定过渡的delay延时：

```
transition-delay:0.5s;  //0.5秒延时以后开始动画效果。
```
效果与上图大同小异，不过有0.5s的移入和移出延时。
其实，在transition里有4个属性，分别是：
1.过渡的属性名称
2.过渡的总时长
3.过渡的方式:线性，缓慢等等
4.过渡的延时，即多少s以后才开始过渡
例如：

```
div{
	transition-property: width;
	transition-duration: 1s;
	transition-timing-function: linear;
	transition-delay: 2s;
}
```
可以简写为：

```
div{transition:width 2s linear 2s}
```
## 9.CSS3 动画 ##
之前一篇帖子对于动画部分做了一些探究：
[关于CSS3呼吸效果的探究 ](http://blog.csdn.net/qq_20264891/article/details/78949964)
如果对于动画的需求比较复杂，需要持续重复的完成，可以考虑动画效果，如果只是简单的一些效果，完全可以采用transform来自己实现。
## 10.CSS 3 多列 ##

```
div{
-moz-column-count:3; /* Firefox */
-webkit-column-count:3; /* Safari and Chrome */
column-count:3;
}
/*将一个DIV分为三列*/
```
![这里写图片描述](http://img.blog.csdn.net/20180111133322968?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
以及最后的最后，有一个允许用户自定义元素大小(可拖拽拉伸)的属性

```
div
{
border:2px solid;
padding:10px 40px; 
width:300px;
resize:both;
overflow:auto;
}
```
![这里写图片描述](http://img.blog.csdn.net/20180111135633726?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)




<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

