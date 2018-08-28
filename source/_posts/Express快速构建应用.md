---
title: Express快速构建应用(一) 
date: 2017-12-25 11:27:00
tags: Express
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78890797)

Express是基于Nodejs的前端应用构建工具，可以快速开发基于Node的前端SPA，在Nodejs的基础上，又进行一些功能的扩充，使得应用的构建流程非常简单高效，应用也足够健壮。
## 1.安装与 环境配置##
首先使用IDE建一个工程目录，放在Nodejs.exe 的同域目录下。
然后打开Git bash,输入，然后进入工程目录，接着 `$npm init` 表明我们要创建一个应用，最后疯狂回车，可以看到，在工程目录里自动生成了package.json文件。
![这里写图片描述](http://img.blog.csdn.net/20171225112504969?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


接下来安装Express，命令行敲：`$npm install express --save`将express包存放到我们的工程目录里，甚至还可以将其在json文件中声明依赖关系，只需要多加一个-dev：

```
$npm install express --save-dev
```
接着会看到工程目录里出现了modules子目录，并且已经为我们下载好了express及其依赖的包（看上图）。

接下来，我们创建一个app.js，放在工程子目录，app.js代码如下：

```
//app.js
var express = require('express'); //require进来我们的Express
var app = express(); //实例化

//匹配任意路由，都返回下面这句：first test success
app.get('/',function(req,res){
res.send('first test success!');
});

//接着配置server
var server = app.listen(3000,function(){
console.log('绑定到了3000端口')
});

```
在命令行敲：`$node app.js`，打开浏览器输入127.0.0.1:3000 可以看到"first test success"
![这里写图片描述](http://img.blog.csdn.net/20171225113447312?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)




## 2.路由功能 ##
在进入一些网页的时候，会看到后面的url坠着 index.html，这是网站的homepage，如果去列表页，则后缀会变成: list.html，这个其实就是路由，根据请求的url不同，服务器返回不同的路径。
而express可以很好的胜任这个功能。下面来看
在刚才的app.js中加入一些代码，并创建新的index.html文件：

```
//app.js
//使用get请求到index.html时，会向页面吐出一个index.html的文件
app.get('/index.html',function(req,res){
	res.sendfile('./index.html')	
	
});

//index.html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h1>gekki</h1>
		<h2>hello</h2>
		<h3>ke;llt</h3>
	</body>
</html>

```
接着，继续运行`$node app.js`，网页中输入URL：127.0.0.1:3000/index.html
效果如图：
![这里写图片描述](http://img.blog.csdn.net/20171225130220554?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

成功了！

在命令行中，会提示
![这里写图片描述](http://img.blog.csdn.net/20171225130107618?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
提示我们 : res.sendfile不太赞成使用，应该使用驼峰式命名 res.sendFile。。。粗心了。
由上述例子可知，express对于路由的配置非常之简单。设想一下，在一些需要密码和表单操作密集的地方，可以采用post请求来进行路由的配置。那么同理，如果想要加载图片或者加载其他问价，则可以：

```
//表单的html
app.post('/form.html',function(req,res){
res.sendFile('./form.html');
});



//访问路由的某个图片
//all方法用于 匹配所有的请求类型，不管是post,get,put,delete等等都给他返回指定的东西，一视同仁。
app.all('./longzhu.png',function(req,res){  
res.sendFile('./img/longzhu.png');
});
```
## 3.静态资源 ##
所谓的静态资源，就是一旦网页生成，就不会再被改变了。例如：图片，CSS,JS文件等。
我们可以将这些文件放置在一个统一的文件夹里面，命名为：public
![这里写图片描述](http://img.blog.csdn.net/20171225130726717?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

现在，在public下粘贴一张图片，接下来，我们来看这些静态资源应该如何配置以及访问：

```
//app.js
app.use(express.static('./public'));//一句话就完成了静态资源的配置
```
接着，在浏览器中输入:127.0.0.1:3000/xxx.png ，我们可以得到效果：
![这里写图片描述](http://img.blog.csdn.net/20171225130939742?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
说明静态资源配置成功，同理，我们在来试试其他类型的文件:

![这里写图片描述](http://img.blog.csdn.net/20171225131120326?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![这里写图片描述](http://img.blog.csdn.net/20171225131151137?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
都OK。

有时候，可以在一个路由请求中写多个callback函数，来不断的匹配用户输入的需求路由：

```
//app.js

app.get('/123.error',callback1,callback2);
```
此时，如果第一个callback捕获不到路由，则将皮球提给第二个callback函数来执行，不过要在第一个callback中写明白参数:
```

function(req,res,next){
console.log('对不起，我没找到，现在请下一个回调函数帮你找')
next();
},
function (req,res){
console.log('find it!');
res.sendFile('123.error');
}
```
整个回调函数甚至可以组成一个数组，来对用户的请求进行匹配：

```
回调函数1:  
var a = function(req,res,next){
....
next();

};
回调函数2:
var b = function(req,res,next){
....
next();

};

回调函数3:
var b = function(req,res){
....
console.log('找到了!');

};


app.get('/123.error',[a,b,c]);  //这样写很美观
```
当然也可以使用数组和function(){}的混合写法，但是这样写我想不出来哪个地方有好处？



在访问不同的路由时，不必从新restar server，因为服务器是在返回本地的目录，这个状态是一直轮询的，如果有就返回，没有就老老实实报错404 .

当然，整个路由匹配的时候，甚至可以使用正则魔法，以防止用户的误输入行为，防患于未然。


## 4.API走马观花 ##
1.res.download() 	提示下载文件。  //res.download('文件名')，
2.res.end() 	终结响应处理流程。
3.res.json() 	发送一个 JSON 格式的响应。
4.res.jsonp() 	发送一个支持 JSONP 的 JSON 格式的响应。
5.res.redirect() 	重定向请求。 //更改用于在根url之后的路由，例如用户输入了:127.0.0.1:3000/index.html
我们可以`res.redirect('error.html');`，此时浏览器的url会自动变成：127.0.0.1:3000/error.html


6.res.render() 	渲染视图模板。 
7.res.send() 	发送各种类型的响应。
8.res.sendFile 	以八位字节流的形式发送文件。
9.res.sendStatus() 	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。//express预设好了，我就试了两个:
`res.sendStatus(200)//页面显示：OK `

```
res.sendStatus(404)//页面显示：Not Found
```
留坑。



<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

