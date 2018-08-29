---
title:  javascript Dom拖动 插件 putThere.js
date: 2018-03-06 00:00:00
tags: [javascript , plug-in]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79171972)



## 开源地址： ##
跪求各位看官给我点star吧 T.T，谢谢！
[https://github.com/ZQ-jhon/putThere.js](https://github.com/ZQ-jhon/putThere.js)

## 原理及构想 ##
关于拖动，如果不用html5的原生事件，怎样实现呢？
不妨先设想一下整个拖动的流程：

 1. 点击一个元素，鼠标按下，这个元素其实已经脱离了正常的定位，变成了绝对定位absolute
 2. 当鼠标移动到目标位置的时候，我们来捕获鼠标当前的坐标值clientX,clientY(相对于浏览器视口位置的相对值)
 3. 当松开鼠标，将鼠标的坐标值赋值给元素的left及top属性，如果此时，鼠标坐标值大于元素的left，或者top，说明元素在向右下角移动，反之同理。

## 代码 ##
想好其中的原理，代码也就不那么难写了。
```javascript
//window监听
               window.onmousedown=function(obj){
               
	/*鼠标按下，dom元素脱离位置，变成绝对定位*/
	obj.style.position='absolute';
	
}

window.onmouseup=function(event){
      var event = window.event||event;
		//获取鼠标距离浏览器边界的距离
		var x = event.clientX;
		
		var y = event.clientY;
		
		
		console.log('鼠标距离浏览器边界(0,0)的距离('+x+','+y+')')
		
		/*获取dom元素距离浏览器边界的x,y值*/
		var left = obj.style.left;
		
		var top = obj.style.top;
		
		console.log('Dom元素距离浏览器边界(0,0)的距离('+left+','+top+')')
		
		
		/*判断鼠标拖动的方向。x小于left，说明在向左拖动;y小于top，说明向上拖动。反之同理*/
		if(left>x||top>y){
		
			x=-x;
			
			y=-y;
			
		}
		
		obj.style.left = x+'px'; 
		
		obj.style.top = y+'px';
		
	}
};


}
```
我将它封装成一个函数，调用的时候，形式如下：

```javascript
var div = document.getElementById('div');

putThere(div);

此时，div元素可以在document中任意的拖动，改变位置。
```
## 效果预览： ##

鼠标拖动div效果如下：
![Demo效果预览](http://img.blog.csdn.net/20180126140231318?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
可以看到，基本上实现了【指哪打哪】的功能，鼠标的松开的坐标，就是div元素左上角定点的落点，其实刚开始封装插件的时候还想再加一个参数，用于选择元素的落点为左上角顶点或者中心位置，但是想了一下，似乎没有什么实际意义，遂放弃。
## 兼容程度 ##
实测 兼容 IE9及以上










<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>