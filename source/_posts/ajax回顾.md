---
title:  ajax回顾 
date: 2017-12-12 17:04:00
tags: ajax
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78781917)


## **jq与原生以及angular中的ajax（长文）**##

http://blog.csdn.net/qq_20264891/article/details/78457021

上面是之前写的一篇关于ajax的帖子，里面的集成包xampp的配置方法有点不太科学，

虽然这样可以运行，但感觉不是很美滋滋。

感谢新浪博主@期待下一站幸福

具体参考原文地址：http://blog.sina.com.cn/s/blog_ae1d0a810102wvy6.html



配置外部服务器，运行后端代码php？
对于完全是小白的我而言，实在是想都不敢想。因为得学习Ajax，就必须得给服务器的发送请求和等待服务器响。所以就在老师的带领下，开始了服务器的配置。

首先介绍一下，我用的IDE:​HBuilder. 后端语言是php。

我使用的是模拟服务器的软件：XAMPP​

(下载地址：https://www.apachefriends.org/download.html)

然后说一下，我要做什么样的效果：

让一个PHP文件在本地服务器上运行。（对！就是这么简单，我捣鼓了一个多小时...）​


好了，接下来我们来看看吧。


​

1,安装一个模拟的服务器。

如果你和我一样，没有任何的​Apache，MySQL，tomcat等WEB服务器。那就下载一个XAMPP.【好用于部署一个本地服务器】

​安装完成后，打开的界面是这样子的：
![这里写图片描述](http://img.blog.csdn.net/20171212150943894?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我们可以先点击“start”启动，这时候需要注意的是：可能出现错误。【错误是：端口被占用】。

> ![引用块内容](http://img.blog.csdn.net/20171212151012172?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



解决方法是：点击config--进入Apache（httpd.conf）--找到listen（监听的端口号）进行修改。如图：
![这里写图片描述](http://img.blog.csdn.net/20171212151304609?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

好了，可以重新启动Apache啦。

**2.打开HBuilder，然后新建一个项目。**

注意：新建的项目---一定要在我们刚刚打开的XMAPP安装目录下的​htdocs文件夹下面。

（不要问为啥，这是我一晚上调试出来的经验）​
![这里写图片描述](http://img.blog.csdn.net/20171212151354297?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
﻿在安装目录下的htdocs，新建文件

3.在HBuilder中的快捷工具栏中找到【浏览器】，打开它的下拉菜单，点击【设置web服务器】。

进入页面点击”外置web服务器“​--选择”新建“

![这里写图片描述](http://img.blog.csdn.net/20171212151434576?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20171212151454782?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

添加本地服务器


![这里写图片描述](http://img.blog.csdn.net/20171212151518701?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


4.把你写的PHP文件可以在浏览器中，打开了。

这是我的源文件：
![这里写图片描述](http://img.blog.csdn.net/20171212151552039?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


![这里写图片描述](http://img.blog.csdn.net/20171212151609984?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

***OK,接下来才是正文：***
==

**一、javaScript原生Ajax**
==

**1.浏览器自带的与服务器交互的对象及附带API**

**该对象是一个全局对象，即位于window对象下。IE与非IE，该对象不同**

非IE && IE7+ : XMLHttpRequest

IE5,IE6: ActiveXObject

**2.兼容创建大法**

```
var xhr=null;//初始化变量

if(window.XMLHttpRequest){
//非IE&&IE7+

xhr = new XMLHttpRequest();
}
else if(window.ActiveXObject){

xhr = new ActiveXObject("Microsoft.XMLHTTP");//不同的IE版本，里面写的东西不一样，具体请自行baidu

}
```
**3.创建好之后的后续步骤**

xhr.open()  //该方法用于 **创建**  连接服务端的请求。

xhr.send();  //所有的事情完毕，正式发送请求。

注意：

xhr.open(method,url,async)  请求方式，请求地址，是否异步？(ps:默认为true,异步执行)

设置好open中的传参，接着执行xhr.send()。

**4.如何知道请求与相应成功不成功？？**

这里，xhr对象自带 一个方法，用来检测连接是否成功，以及对xhr创建过程进行监听，

为什么这样说呢？直接看代码：

```
 xhr.onreadystatechange=function(){
    
    	if(xhr.readyState=4&&xhr.status==200){
    		
    		document.getElementById('box').innerHTML = xhr.responseText;
    	}
    }
***************上面界定了，请求成功以后，将响应的内容放在我们的box盒子里********

	xhr.open("GET","01.php?a=5&b=1",true);//传参a=5,b=1
	xhr.send(); 
	
//因为上面的方法是异步执行的，因此不用纠结，xhr.open()和send()的位置。

}
```
运行结果:
![这里写图片描述](http://img.blog.csdn.net/20171212145801095?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
附上php的代码：

```
<?php
echo  "a为{$_GET['a']},那么b为{$_GET['b']}"  
?>
```
这里php代码看不懂的话， 可以去http://blog.csdn.net/qq_20264891/article/details/78748217回顾一下PHP 的基本语法。作为一个前端，后端语言要了解其接口和语法，这是最起码的(这个B装的66666)。


**说好的监听xhr对象的创建过程呢？**
```
xhr.onreadystatechange = function(){
//这里加上一句话  :
console.log("当前的XMLHttpRequest对象的创建进度为"+xhr.readyState)
...
...
 }
```
来看打印结果:
![这里写图片描述](http://img.blog.csdn.net/20171212150218442?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
可见，每次xhr对象自身状态值改变，都会调用函数，因此导致我们打印的结果发生变化。  由此可得，ajax的创建是分步进行的，查询资料可得：

 - 0 对象未创建
 - 1 已与服务器连接
 - 2 服务器已经接受请求
 - 3 服务器正在处理请求
 - 4 服务器将请求下发
 **同时，status也需要有响应的返回值，从服务器传递回来，有个状态值(xhr.status)： **
如果响应成功，就返回200
如果没找到，返回404
其他还有403,5系列等等，不再赘述。

**二、jQuery中的ajax**
==
1.load方法

```
兹有按钮与容器各一个：

<input type="button" value="点我加载" id="btn"/>

<div id="box"></div>

//js如下

	<script type="text/javascript">
	
		$('#btn').click(function(){
			$('#box').load('03.php')

	</script>
	
//php如下

<?php
echo "hello,world!<br/>a  =  {$_POST['a']}<br/>b  =   {$_POST['b']}"
?>
```
这里，点击按钮，box载入响应值，这个方法是get方法。
如图：![这里写图片描述](http://img.blog.csdn.net/20171212153748919?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


如果，在load()多传一个json对象:

```
$('#box').load('03.php',{
				a:5,
				b:1
			})
```
那么这个请求会自动 变成post请求。
![这里写图片描述](http://img.blog.csdn.net/20171212153930619?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

在 Ajax数据载入完毕之后，就能执行回调函数 callback，也就是第三个参数。回调函数
也可以传递三个可选参数：responseText（请求返回）、textStatus（请求状态)、XMLHttpRequest对象。

```
$('#btn').click(function () {
  $('#box').load('03.php', {
       a:5,
       b:1
  }, function (response, status, xhr) {
        alert('返回的值为：' + response + '，状态为：' + status + '，
           状态是：' + xhr.statusText);
  });
});
```
运行结果：
![这里写图片描述](http://img.blog.csdn.net/20171212154422827?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

这里的status和xhr.statusText都是经过jQuery进行处理的，原本的值应该对应为：
200 
**2.`$.get()和$.post()`**

.load()方法是局部方法，因为他需要一个包含元素的 jQuery对象作为前缀。而$.get()和
$.post()是全局方法，无须指定某个元素。对于用途而言，.load()适合做静态文件的异步获取，
而对于需要传递参数到服务器页面的，$.get()和$.post()更加合适。

```
$('#btn').click($.get(url,{json.data},callback(),type){})

/*GET方法与load()方法相比，多了最后一个参数，返回类型，可以设置为
xml,html,json,text等，一般不需要设置，都是jQuery智能判断返回的。第一个参数：请求
地址，是必须的，后面的都是可选参数。
*/
```
**`$.post()方法`**

的使用和`$.get()`基本上一致，他们之间的区别也比较隐晦，基本都是背后的

不同，在用户使用上体现不出。具体区别如下：

1.GET请求是通过  URL提交的，而 POST请求则是  HTTP消息实体提交的；

2.GET提交有大小限制（2KB），而  POST方式不受限制；

3.GET方式会被缓存下来，可能有安全性问题，而  POST没有这个问题；

4.GET方式通过`$_GET[]`获取，POST方式通过`$_POST[]`获取。
**3.`load(),$.get(),$.post()` **的集合：$.ajax

```
//ajax是jQuery封装的最底层的方法
		$('btn[submit]')[0].click(function(){
			$.ajax({
				type:"get",    //请求方式
				url:"02.php",  //地址
				async:true,      //异步
				success:function(response,status,xhr){alert(response)}, //成功回调函数
				error:function(){},//失败回调
				data:$('form').serialize()//表单序列化
			});
			

		})
```

**三、AngularJs中的ajax**
==


```
在任一一个控制器中注入http依赖

var app = angular.module('myApp',[]);


//http模块注入到任一一个控制器中

app.controller('ctrl1',function($scope,$http){

$http({ 

    method: 'GET', //选择请求方式
    
    url: '02.php' //请求地址
    
}).then(function successCallback(response) {

        // 请求成功执行代码
    }, function errorCallback(response) {
    
        // 请求失败执行代码
//语法为：$http.then(success(),fail())
});



```
**声明：v1.5 中$http 的 success 和 error 方法已废弃。使用 then 方法替代。因此千万不要**

```
$http.success().error()//错误写法！z不能跟jQuery混淆
```

总结：
==
Js/jq/angularjs 中ajax的：


**相同点**
1.都是异步的请求，都支持get,post方法,jq,angular支持(put)。


**不同点：**

1.jq中，对于ajax请求的写法非常简单，非常直观。angular中，通过$http模块也进行相应的封装，非常方便。

2.普通的javaScript AJAX请求，如果需要GET方法传参，只能强行用"？"追加到url后面，并且不同参数连接要用&进行，非常繁琐。

3.所谓jq的success(),error()，以及angular的then方法，都是对原生ajax的

status的不同返回值进行封装,例如：200就会执行success函数，404就执行error函数。



<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

