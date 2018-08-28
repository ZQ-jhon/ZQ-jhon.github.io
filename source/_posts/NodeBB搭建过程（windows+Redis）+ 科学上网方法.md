---
title:  NodeBB搭建过程（windows+Redis）+ 科学上网方法 
date: 2018-06-22 10:04:36
tags: [node,javascript]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](https://blog.csdn.net/qq_20264891/article/details/80769624)




1.首先去 github 把项目 clone 下来：
--------------------------


https://github.com/NodeBB/NodeBB

然后cd到nodebb，安装依赖 cnpm i

依赖在安装的时候，由于没有 package.json ，会自动 clone ，整个以来安装完成后，应该是这样：
![install](https://img-blog.csdn.net/20180622095626833?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

2.环境配置
------

附上中文文档：https://docs.nodebb-cn.org/


1.Chocolatey 可以下载**离线包**，之后通过 Chocolatey 安装一些环境：

```
choco install -y imagemagick github python2 nodejs-lts git
```
这里的 github , nodejs ，git 可以选择不安装，跳过。
2.数据库（database）选择 Redis 
Redis 可以在菜鸟教程上面找到安装教程：
http://www.runoob.com/redis/redis-install.html

安装完成以后，WINDOWS + R 打开 services.msc ，找到 Redis 服务，启动之：
![Redis](https://img-blog.csdn.net/20180622095820272?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

3.Hello World Running
---------------------

首先，使用命令 ./nodebb build 构建静态资源，构建完如下：
![helloworld](https://img-blog.csdn.net/2018062210001911?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

此时打开监听的 127.0.0.1:4567 (默认配置的端口)，如图所示：
![installer](https://img-blog.csdn.net/20180622100114522?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

上面的直接填写，下面的数据库配置如下：
![database](https://img-blog.csdn.net/20180622100206278?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
点击最下面的 install NodeBB 后，整个项目总算 Running 了：
![running](https://img-blog.csdn.net/20180622100409227?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

4 . use LANTERN to cross wall (使用lantern 科学上网)
-------

下载lantern安装包 => 一路next安装，并启动 => 右下角图标右键 ，连接 => OK
依赖环境 .net FrameWork 4.0 +
我都打包好了 :
链接：https://pan.baidu.com/s/1-aMsEznQ76Tjd5vrfEwrow 密码：yyfg


<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>