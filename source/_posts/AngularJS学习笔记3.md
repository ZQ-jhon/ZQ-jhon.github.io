---
title: AngularJS学习笔记3
date: 2017-12-05 18:44
tags: angularjs
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78719707)
**eg13.依赖注入**
=========
故事要从js说起，在js的function(){}中，参数可以传递为另外一个函数。举个例子：

```
function first(){
	return 3
}
//参数函数1
function second(){
	return 5 
}
//参数函数2

function add(a,b){
	var a_  = a();
	var b_= b();
	alert(a_+b_)
}
//总函数

add(first,second);//调用总函数，其参数为first和second的返回值，弹出 8


```
不光如此，在回调函数中，大致也是这样的思路：
```
function callback(result){
	console.log("您的计算结果为:"+result)
}
function fn(num,callback){
	num = num*num
	callback(num);
}
fn(10,callback);//控制台：您的计算结果为100
```
*简短回忆后，发现javaScript函数的特点，函数定义时的参数个数是定死的，但是如果传入的参数不达标/超出/太少，那么函数体就会报错。
例如上面的add(first,second)只传入add(first)就会报错：b is not a function*
**普通函数的参数往往是由调用它的人时候来决定的**
回到angular中，依赖注入与javaScript函数正好相反，函数体一旦定义了参数，调用它的人就得老老实实的传入指定数量/类型的参数。
for eg1:

```
	<script type="text/javascript">
		var app = angular.module('app',[]);
		app.controller('c',function(){
			alert(arguments.length);//这里打印出0，因为没参数，这个OK，接着往下看
		});
	</script>



```
```

	<script type="text/javascript">
		var app = angular.module('app',[]);
		app.controller('c',function(s,b){
			alert(arguments.length);
		});
	</script>
这里我们发现，虽然传入了s,b两个参数，但是压根连弹窗都没有，只能说明，传入的参数不合法，函数不认。


```
```
	for eg3:
	<script type="text/javascript">
		var app = angular.module('app',[]);
		app.controller('c',function(){
			alert(arguments.length);
		});
	</script>
```

```





<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

