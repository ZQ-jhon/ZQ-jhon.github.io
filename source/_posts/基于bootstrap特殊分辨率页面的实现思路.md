---
title: 基于bootstrap特殊分辨率页面的实现思路 
date: 2018-04-14 23:11:09
tags: bootstrap
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](https://blog.csdn.net/qq_20264891/article/details/79945485)

## 前言 ##
很久没更新博客，这段时间刚刚找到工作，会立即（从今天起）恢复更新博客的频率。罗马不是一天建成的，希望自己保持良好的学习和做笔记的习惯，笔耕不缀，他日可期！
## 1.Boostrap重构传统固定px的页面 ##
在第一次接手重构任务后，有点懵逼。可能是因为自己很久没有写代码了，忘了以前做的响应式的一些细节，所以又开始不断的调试，总算是把坑补上了，于是在此做一下记录。
PSD需求图：
![这里写图片描述](https://img-blog.csdn.net/20180414231532595?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)整个需求其实蛮简单的，就是一个固定1122px的页面，里面有些图片，图片在pc端需要留出固定margin（需要像素级还原PSD稿）。想了想，自己以前做的响应式都是根据 .container类的默认宽度来写的，于是想了一会便有答案，整体思路如下：

 1. 给整个页面给一个 container类，并且限制 max-width 为1122px。
 2. 页面中右侧的小兔，因为所有图片都是从后台接口调取，一旦设定img-responsive，那么默认的max-width就是100%(想象一下，如果后台传来一个1000宽的图，用户网络慢点，基本上就GG了)，只能按照原图比例来缩放，何况每个图片的容器都是动态高度的...所以，每张图片的宽高，尽可能的去用js动态设定。
 3. 尽量使用Rem，设定好body的font-size，然后各部分的font-size都根据rem去取，例如 0.8rem,0.6rem等等。
 3. 布局方面，左侧的长图固定的，非接口调取，宽高固定的。在整个页面中，缩放的比例完全是以此图片作为参照物。因此给此图片加上img-responsive以及col-lg-3 col-md-3 col-sm-6 col-xs-6类，然后动态的让单个盒子容器的高度取 左侧长图的高度，这样会让盒子完美的呈现，不会留有内边距，也不会让box-shadow很难看。
右侧的6张小图，每纵向的两个图使用一个列容器来包裹，设定 col-lg-3  col-md-3  col-sm-6 col-xs-6，这样就可以达到在手机端的显示效果，如图所示：
![这里写图片描述](https://img-blog.csdn.net/20180414231323872?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
## 2.核心逻辑代码 ##

```
//动态设置每个box-shadow 容器的高度，为imgLong的高度
var h = $('#imgLong').first().height();

$('.box').each(function(){
	$(this).css({
		height:h
	});
});
$(window).resize(function(){
	var h=$("#imgLong").first().height();$(".box").each(function(){$(this).css({height:h})});
});
					
//限制h4标签文本长度
	$('.imgTitle').each(function(){
	//这里由于后台Trs模版获取的标题，前面有N个空格，因此需要前端来消化一下字数，故进行“空格剔除”，所以用  .split(' ').join('')
	var txt = $(this).text().split(' ').join('');
	if(txt.length>20){		
	
	//其实真正的标题就10个字，但是前面有10个空格
			                             $(this).text(txt.substring(0,19)+'...');
		}
    });
					
//为所有调用的imgShort图片增加CLASS
					
$('.imgShortParent img').each(function(){
			$(this).addClass('imgShort');
});
					
					
					
//动态设定每个单列容器的宽度 = imgLong的宽度，高度 = imgLong的高度，以此来保证图片不会溢出 box-shadow。
var h = $('.imgLong').first().height();
var w = $('.imgLong').first().width();

$('.col-box').each(function(){
   $(this).width(w).height(h);
});

$(window).resize(function(){
//页面缩放时，动态获取宽高，并赋值给 col-box 列容器。
  $('.col-box').each(function(){
   $(this).width(w).height(h);
})

})
```
## 3.不足与改进思路 ##
3.1 页面性能不足，重绘过多，网速慢的时候，会有一瞬间发生：【图片突然很大，然后被缩放到正常比例】的恐怖现象。。。
解决方案：
可以为每张小图(250*165)包裹一层div，设置max-height与max-width，overflow:hidden，来解决。

3.2 实际上，整个项目我写了两套html骨架（由于项目紧，刚接手，长时间没写代码比较陌生），pc一套，mobile一套，感到非常罪过，不配成为一个前端工程师。。。但是话说回来，原先的项目也写的太TM乱了，一个注释都没有，而且一个页面中script标签不下20个。。。
解决方案：
用我上述的思路去实现


<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

