---
title:  关于百度集成API bd_share的一些窥探 
date: 2017-11-03 18:10:00
tags: 百度share
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78438174)


  最近在做一个项目因为要用bootstrap，需要对第三方分享的图标设计两个款式，最终需求的效果如下：

一、需求分析

1.在PC端，要求用font字符来实现第三方分享的图标,并且鼠标经过时，设定hover效果：
![这里写图片描述](http://img.blog.csdn.net/20171103173452202?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
2.在小屏幕设备上，需要设定另外一种款式：
![这里写图片描述](http://img.blog.csdn.net/20171103173511144?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
二、思路分析

理清需求以后，下面来看是如何实现的：

 首先，需要点击这些第三方应用的图片或者字符，来实现相应的跳转，例如点击QQ，进入QQ的分享界面。

  如果要完成这一步，需要去每个平台的官网获取分享组件，其实就是人家官方定义好的js API接口。整个页面如果只需要1个2个分享图标还好，要是十几个，20个图标，估计页面会乱七八糟自己看着都糟心。
  于是这里安利百度share，集成了大多数的第三方share API,非常的方便，省事，复制，粘贴，一气呵成，但是效果可能就不尽人意了。
  ![这里写图片描述](http://img.blog.csdn.net/20171103173650394?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
  看到这里，我以为我打开了二零零年的一张网页，真的，这图标，这32*32的icon清晰度，真的让我很难受。
 首先推荐一几个icon库，这些icon非常精美，并且实时更新：
1.阿里妈妈icon库：
[http://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.8&manage_type=myicons&icontype=histories&keyword=](http://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.8&manage_type=myicons&icontype=histories&keyword=)
2.Easyicon
[http://www.easyicon.net/](http://www.easyicon.net/)
在这里可以下载相应的icon，推荐下载SVG，这个格式的图片制作字体很方便。
 

看一下百度官方的代码
  

```
<div class="bdsharebuttonbox">
	<a href="#" class="bds_more" data-cmd="more"></a>
	<a href="#" class="bds_qzone" data-cmd="qzone"></a>
	<a href="#" class="bds_tsina" data-cmd="tsina"></a>
	<a href="#" class="bds_tqq" data-cmd="tqq"></a>
	<a href="#" class="bds_renren" data-cmd="renren"></a>
	<a href="#" class="bds_weixin" data-cmd="weixin"></a>
</div>
<script>
	window._bd_share_config = {
		"common": {
			"bdSnsKey": {},
			"bdText": "",
			"bdMini": "2",
			"bdPic": "",
			"bdStyle": "0",
			"bdSize": "16"
		},
		"share": {},
		"image": {
			"viewList": ["qzone", "tsina", "tqq", "renren", "weixin"],
			"viewText": "分享到：",
			"viewSize": "16"
		},
		"selectShare": {
			"bdContainerClass": null,
			"bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]
		}
	};
	with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
</script>
```
不难发现，其实a标签的父div：bdsharebuttonbox已经提前为a标签设置好了样式和背景图了。

这里我们下载好图标，能否直接插入到`<a>` 标签中，然后 实现对应图片的替换呢？显然不行，因为百度通过class类设定好的背景图片，不会被框架内的图片所覆盖，给大家演示一下错误的示范：
![这是错误的示范](http://img.blog.csdn.net/20171103174622391?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
不仅没有变美，反而更丑了。

三、功能实现

3.1 将原始图标替换为图片图标



怎么办呢？其实我们应该直接设定对应class类的背景图，并且加权!important，就可以完美实现背景图的替换了。

```
.bd_qzone{background:url(./img/qq.png) !important}
.bd_tsina{background:url(./img/sina.png) !important}
```
这里要说明一下，百度的Share api第三方的图标，全部都是32*32的，因此如果你的图片过于清晰（分辨率太高），应该增加backgrond-size:cover !important ，来填充。
```
.bd_qzone{background:url(./img/qq.png) !important;backgrond-size:cover !important }
.bd_tsina{background:url(./img/sina.png) !important;backgrond-size:cover !important }
```
这样，可以实现一个比较好看的图标分享小模块了：
![这里写图片描述](http://img.blog.csdn.net/20171103175129123?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
这里我用的图标是128*128的，即便将网页放大10倍，也没有锯齿感。

3.2字符图标完成Share 功能的实现
   字符图标相比于图片图标，更加节省资源，而且兼容性更棒！(IE4+都支持字符图标)。
   我们首先去阿里妈妈或者easyicon下载好对应的透明的svg文件，接着到：
   
  [https://icomoon.io/app/#/select](https://icomoon.io/app/#/select)
  这个网站很牛逼，可以将图片转为各种浏览器看得懂的字符文件
 (1)我们打开网站，最上方点击import Icons，上传自己的图标图片文件
![这里写图片描述](http://img.blog.csdn.net/20171103175717350?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
(2)上传好以后， 可以按铅笔图标对文件进行编辑，比如命名，方向结构等等
![这里写图片描述](http://img.blog.csdn.net/20171103175823318?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)![这里写图片描述](http://img.blog.csdn.net/20171103175907853?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
（3）上传好以后，点击下面的Generate Font,下载已经转换好的字体文件


![这里写图片描述](http://img.blog.csdn.net/20171103175937926?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
（4）下载好以后解压，用记事本打开style.css的文件，复制到你的html页面中的```<style>```标签中
![这里写图片描述](http://img.blog.csdn.net/20171103180119963?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
```
复制好如下：
<style type="text/css">
	@font-face {
  font-family: 'icomoon';
  src:  url('fonts/icomoon.eot?eqsiuf');
  src:  url('fonts/icomoon.eot?eqsiuf#iefix') format('embedded-opentype'),
    url('fonts/icomoon.ttf?eqsiuf') format('truetype'),
    url('fonts/icomoon.woff?eqsiuf') format('woff'),
    url('fonts/icomoon.svg?eqsiuf#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-baidu:before {
  content: "\e900";
}
.icon-mail:before {
  content: "\e901";
}
.icon-qq:before {
  content: "\e902";
}
.icon-qzone:before {
  content: "\e903";
}
.icon-renren:before {
  content: "\e904";
}
.icon-sina:before {
  content: "\e905";
}
.icon-wechat:before {
  content: "\e906";
}
.icon-copy:before {
  content: "\e907";
}

</style>
```

> 这段CSS代码最好不用通过`<link>`标签引入，否则会出现字符无法正常显示的问题，这个问题目前我还在找原因。

现在可以看到，通过@font-face已经引入了字体文件，并且已经为你预设好了每张图片(现在他们已经变成了字符或者说字体)的类名。
和bootstrap的glyphicon的调用方法很像，都是通过给目标对象添加类名来调用。并且通过css3的高级选择器 ，在被选择元素之前添加了content，然后是对应字符的编号，非常贴心，这个时候只需要在你想要调用的地方添加class类名即可。
```
<p class="icon-qq"></p>
<p class="icon-sina"></p>
最终的效果如下：
![这里写图片描述](http://img.blog.csdn.net/20171103180831126?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
我通过js/jq又添加了hover效果，这个界面看上去就舒服多了。
今天研究了一天这个问题，从最初的不明白第三方分享的原理，到现在可以改变默认样式，我觉得今天收获还是挺多的，对CSS、JS都有了更进一步的理解。



<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

