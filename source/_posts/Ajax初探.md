---
title: Ajax初探 
date: 2017-11-06 14:03:00
tags: ajax
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78457021)


## Ajax初探 ##

---------- 
<h2>1.环境搭建与配置</h2>
这两天在捣鼓Ajax,期初用的都是开发工具自己集成的apache服务器，但是因为我太蠢，找不到相关的设置项和说明，又或者是我懒得找把，于是搜了一款**数据库**和**Apache**服务器集成好的本地站点包：【XAMPP】，百度下载好，按照相关说明进行配置。
<h2>2.基本设置与文件索引目录</h2>

![这里写图片描述](http://img.blog.csdn.net/20171106140930710?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
如图所示，只需要将Apache与MySQL打钩，并且star，就OK。
打开浏览器，输入站点ip与端口（默认是127.0.0.1）
然后在安装目录下的,安装盘:\xampp\htdocs 看到有个.html的文件，该就是刚才在浏览器中看到的。
可以将这个.html的文件**删除**，刷新浏览器，可以直接看到浏览器中的目录索引。
![这里写图片描述](http://img.blog.csdn.net/20171106141608295?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast) 
现在网页上127.0.0.1的目录就是文件库中的映射。
以后我们可以将服务器端需要响应的asp/php/txt文件，都放在  **安装盘:\xampp\htdocs**下即可，环境搭建完成。

<h2>3.喜闻乐见敲代码环节</h2>
<h4>3.1 javascript原生Ajax</h4>

>       所谓Ajax：
      A:async 异步加载
      ja: javascript  脚本语言
      x:xml  前后台通信的数据载体，文本
      （鉴与json的出现，XML正在被逐渐取代，大有"Ajaj"的趋势）

  <h4> 3.2 目的</h4>
  目的是为了提高用户体验，更新局部数据时不用刷新整个网页，就可以完成数据交互。
  <h4>3.3 对象(API)</h4>
 1. 在IE7+/Chrome/Opera/Safari 中，对象为XMLHttpRequest，**该对象属于window下的子对象**;
  创建方法为
```
var xhr = new XMLHttpRequest;
```
2.在IE7以下， 对象为ActiveXObject,**该对象属于window下的子对象**;
 创建方法为
 

```
var xhr = new ActiveXObject('Microsoft.XMLHTTP');
//括号中的必须有。
```
 <h4>3.4 浏览器兼容判断</h4>

```
 var xhr =;  //var 一个空对象
 if(window.XMLHttpRequest){
 xhr = new XMLHttpRequest;
 }  //非IE7以下
 
 else if(window.ActiveXObject){
xhr = new ActiveXObject('Microsoft.XMLHTTP');
}//IE7以下

else{alert("您的浏览器过于先进，请降级到合适的版本！")}
```

  <h4>3.5 方法</h4>
  这个xhr对象，自带了一些方法。
  1.open（规定请求的类型，地址，是否异步）方法

```
  xhr.open(method,url,async) 
```
2.send(string)方法，用于发送请求
该方法中的string，只要在method="post"时，才可以使用。

3.当method==true,那么要设定就绪时执行的函数，跟回调函数有点像:
  先说两个属性：
  (1)xhr.responseText           //······························· 返回字符串形式的相应数据
  (2)xhr.responseXML          //································ 返回XML形式的相应数据
```

xhr.onreadystateChange=function{
if(xhr.readystate==4&&xhr.status==200){
     //这里写下要回调的方法
     document.getElementById('div').innerHTML=xhr.responseText;
     //获取返回的文本，这里也可以写xhr.responseXML
     
     }
}
xhr.open('get','123.php',true);
xhr.send();
```
OK,这是默认的**异步处理**，要执行一个就绪时的函数。
那么，在同步模式下，即async=false时，应该这么写请求：

xhr.open("GET","/try/ajax/ajax_info.txt",false);
xh.send();
document.getElementById("Div").innerHTML=xhr.responseText;


   <h4>3.6  onreadystatechange 存储函数</h4>
    onreadystatechange 存储着xhr的好几种状态：
    0：初始化未就绪    (想找老板要工资，但没准备好)
    1：已经与服务器连接 （已经走进老板办公室）
    2：服务器已经接受（老板已经听到你的诉求）
    3：正在处理请求（老板在苦思冥想给不给你钱）
    4：请求已经完成，并且响应也已经下发（想了半天给你了）
    每当 readyState 改变时，就会触发 onreadystatechange 事件。

  同时，status也需要有响应的返回值，从服务器传递回来，有两个值：
  200 响应就绪，成功下发（会计接到老板的电话，立马爽快的给了你工资）
  404  未找到   （会计跑路了，尽管老板同意，你还是没拿到钱）
    <h4></h4>
     <h4></h4>




<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

