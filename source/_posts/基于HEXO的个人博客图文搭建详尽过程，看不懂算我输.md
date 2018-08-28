---
title:  基于HEXO的个人博客图文搭建详尽过程，看不懂算我输
date: 2018-01-18 16:08
tags: [HEXO,动态部署]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79096846)




## 前言 ##
**须知：**
*1.最终生成的博客地址必须是： ZQ-jhon.github.io  即用户名.github.io*
*2.本地的HEXO仓库，命名必须也为 ZQ-jhon.github.io ，HEXO项目放置于该目录之下。*

昨天经过一番折腾，终于将HEXO部署上线了，以下对于昨天整个搭建的过程做一个详细的回顾。

HEXO是基于NODE的一款博客框架，有很多丰富的主题可以选择，配合GIT来使用。

Git回顾：[本地仓](http://blog.csdn.net/qq_20264891/article/details/78773371)、[远程仓](http://blog.csdn.net/qq_20264891/article/details/78774208)

## 安装 ##

整个安装过程我是参考一位博主：[HEXO系列教程](http://www.chenyijun.net/2016/06/04/hexo_teach_1/)

以下用自己的理解来做一番梳理与归纳：

*先介绍HEXO中的4个命令：

```
$ hexo g #完整命令为hexo generate，用于生成静态文件  
$ hexo s #完整命令为hexo server，用于启动服务器，主要用来本地预览  
$ hexo d #完整命令为hexo deploy，用于将本地文件发布到github上  
$ hexo n #完整命令为hexo new，用于新建一篇文章
```

首先，确保本地Git公钥与Github公钥相匹配，参照：[Git本地仓](http://blog.csdn.net/qq_20264891/article/details/78773371)

确认匹配后，新建Repository，命名的时候，规范为：

github名字.github.io

因此，这里的新仓库名字应该为： ZQ-jhon.github.io

![这里写图片描述](http://img.blog.csdn.net/20180118155548420?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

同样的，在本地新建一个同名的目录：ZQ-jhon.github.io  ，然后打开目录，文件夹是空的


**此时，在项目目录下右键打开Gitbash here**

1.`$ cnpm install hexo-cli -g`&nbsp; &nbsp; &nbsp; 使用淘宝镜像安装hexo-cli

2.`npm install hexo-deployer-git --save`&nbsp;&nbsp;&nbsp; 模块安装到开发目录

3.`$ hexo init`&nbsp;&nbsp;&nbsp;初始化

4.`$cnpm install`&nbsp;&nbsp;&nbsp;安装依赖

（PS：中途如果出现问题，可以 `cnpm install hexo-deployer-git --save 安装GIT的PUSH插件）
`
5.`$hexo g && hexo s` 构建(genereater)并启动服务(server)，在locallhost:4000下即可预览效果

![这里写图片描述](http://img.blog.csdn.net/20180118154519905?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


## 远程部署 ##

本地的文件我们已经在locallhost:4000端口预览的非常满意了，如何部署到站点(github)上呢？

1.首先，找到HEXO目录下的 __yml文件，在最下面修改如下：

```
deploy: 
  type: git
  repository: git@github.com:ZQ-jhon/ZQ-jhon.github.io.git
  branch: master
```

![](http://img.blog.csdn.net/20180118154939998?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

***注意：如下图所示，这里的repository地址就是Github download时弹出的项目地址，但是最好不要用HTTPS协议，走SSH协议，昨天因为这个问题，调试了一下午！！！***

![这里写图片描述](http://img.blog.csdn.net/20180118155710430?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

2.布置好以后，我们来Ping一下Github，看能否有响应：

```
$ ssh -T git@github.com
```
![这里写图片描述](http://img.blog.csdn.net/20180118155238282?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

欢迎了一波，很稳。

此时，直接把Server   Ctrl + C
 
然后 `$HEXO D`&nbsp;&nbsp;&nbsp;直接推送，稍等片刻，打开Github仓库，看看文件是否上传成功

如果上传成功，大功告成，打开 [https:ZQ-jhon.github.io](https:ZQ-jhon.github.io)即可访问博客页面了。

 ## 文章新建与MarkDown语法 ##

   
新建文章 `$hexo n filename`
    
这个比较简单，建完文件，也别秀骚操作了，老老实实去source文件夹的_post文件夹里面，去用一个好点的编辑器，修改文本文档，保存为UTF-8格式，并且修改后缀名为.md，保存类型为所有类型，否则上线部署会产生乱码。

值得一提的是，CSDN的在线文档编辑器就采用的是MarkDown语法，而且该种语法与标签语言完全兼容，因此，可以将HTML代码原封不动的全被拷贝近.md文件。

##主题更换与配置##

在我们HEXO根目录下，有一个themes文件夹，里面存放的都是各式各样的主题，默认的是landscape，我们可以去官网，HEXO的THEME分类下下载更多精美的主题，然后解压缩，将文件夹放在themes下，另外稍微修改 __yml文件下，theme:lanscape 即可。

![这里写图片描述](http://img.blog.csdn.net/20180118160508595?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

相关的配置，我们可以follow官方推荐作者的github去看看人家的wiki或者code，都有详尽的说明，甚至可以加QQ咨询......

![这里写图片描述](http://img.blog.csdn.net/20180118160644506?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 最终效果与总结 ##
Welcome to the ZQ-jhon.github.io wiki!
![基本效果预览](http://img.blog.csdn.net/20180118163837782?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![文章详情预览](http://img.blog.csdn.net/20180118163853108?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
![搜索模块预览](http://img.blog.csdn.net/20180118163911153?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

不得不说GITHUB开源生态真的非常强大，感谢这些开发者带来的精美主题。

感谢主题作者Miachel.Lu[HEXO-Mellow-theme  点击查看该项目](https://github.com/codefine/hexo-theme-mellow)








<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>