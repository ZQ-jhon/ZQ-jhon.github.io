---
title: 关于jQuery中scrollTop中的一些兼容问题。
date: 2017-12-13 13:25:00
tags: jquery
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78790869)

最近在做一个响应式的页面，需要有按钮来实现点击回到页头及点击回到页尾的功能。
在使用

```
$('#btn').click(function(){
   $(body).animate({
	 scrollTop:0
   },speed);
});

//发现，该功能只在IE与FireFox下有用，Chrome内核无效。

```
![这里写图片描述](http://files.jb51.net/file_images/article/201512/2015123120741782.png?201511312749)
即：

选择器为body时：FireFox无效，Chrome有效 
选择器为html时：Chrome有效，FireFox无效

因此，在编写代码的时候，只要进行双重选择即可兼容：

```
$('#btn').on('click', function() {
				var speed = 400; //滑动的速度
				$('html,body').animate({
					scrollTop: 0
				}, speed);
				return false;
			});
```
经测试，在IE(9及以上),FireFox及Chome浏览器下，均能正常使用该功能。



<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

