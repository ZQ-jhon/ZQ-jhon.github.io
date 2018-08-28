---
title: Git与GitHub之本地仓库 
date: 2017-12-11 16:07:00
tags: git
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78773371)

马上就要到年底了，再复习一下Git的相关知识，还有20天，再拼拼命！
概念
Git:分布式版本管理系统。
GitHub:全球最大同性交友平台。(匿)

**1.本地的版本库**
==
## 1.1环境搭建 ##
首先确保已经安装了Nodejs的环境。
首先，下载GitBash命令工具。
https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit
运行之。
命令行中敲入

```
$cd  g:
$mkdir git
$cd git
g盘下创建git目录，并且进入该目录
```
## 1.2 建仓库 ##
**1.创建本地仓库**

```
$git init  //创建OK，g:\目录下多了一个 .git的文件夹
```
然后，在桌面上手动新建一个test.txt文本，里面输入 "hllo,world"，然后将该文本放到git目录下(就是刚才创建的那个目录)
![这里写图片描述](http://img.blog.csdn.net/20171211152923042?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



**2.现在，将文件读取至工作区**

```
$ git add test.txt 
```
这样，就完成了工作流的初步设置


**3.对txt文件暗中做手脚**

在test.txt文件中，将"hello,world"改为"hey,boy"，然后ctrl+s，ctrl+F4二连。


**4.再次commit至暂存区**
再次提交至暂存区（如果不再次提交，那么刚才的改变只是在仓库里改变了，而并非在我们的暂存区进行记录。）
```
$ git add test.txt 
```
**5.然后读取暂存区文件的状态：**

```
$ git status
```
**6.接着上传到本地版本库:**

```
$git commit -m "first change"  //回车

***************注意:!!!每次commit都会生成一个版本******
```

OK,这样，系统就记录下了这次改变。当然也可以随时$git status ，来查看当前的暂存区是否干净 (clean)。

**7.要查看历次的修改记录，或者回滚到任一一个版本，可以:**

```
$git log
或者$git reflog //reflog可以显示每次迭代的文件值，并进行排序
```
如果想要项目升级或降级到某一个版本，可以这样：

```
$git reflog //查看变更记录，与对应的入口文件值(自动生成)

```
想去哪里就去那里：

```
$git reset --hard "对应的文件入口，例如35s421"

/*这里的入口文件值，可以写5位，4位甚至更少，因为计算机会自动根据名字来遍历检索，因此为了效率和不必要的麻烦，尽量写7位左右。*/
```
**8.撤销修改**
改到一半发现还不如不改？如果没有commit，那么可以使用“一键还原”

```
$git checkout --test.txt

//这会使test.txt回到版本库中的状态，即：还没有bei $git add test.txt的时候
```
如果已经commit了，那么只能回到最后一次commit的状态。

```
$git rm test.txt 

//做完测试，顺手清理
```



<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

