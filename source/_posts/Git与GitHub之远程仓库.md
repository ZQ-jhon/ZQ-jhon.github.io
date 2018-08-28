---
title: Git与GitHub之远程仓库 
date: 2017-12-11 16:46:00
tags: git
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78774208)


## 在GitHub上创建一个repository。 ##
1.首先，生成私钥和公钥：

$ ssh-keygen -t rsa -C "350037310@qq.com" (最好填写gitHub的注册邮箱)

这里有个关键的地方：SSH，待会会用到。

![这里写图片描述](http://img.blog.csdn.net/20171211161758024?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



2.将本地的Git关联到GitHub

在本地命令行中：` git remote add origin git@github.com:ZQ-jhon/test.git`即可关联远程仓库(这里的git@github.com对应上图。)

狂敲回车，然后在C：/Administrator下会生成一个.ssh文件夹，找到里面_pub的文件，记事本打开，全部ctrl+c，来到:

gitHub----->Settings------>SSH and GPG keys ,点New SSH Key ，title随便取个名字，底下内容粘贴刚才复制的_pub文件，OK。

OK，至此，两个库已经关联起来了。关联的GitHub项目库仅仅是名为test的这个库。

3.将本地库推到GitHub中。
$ git push -u origin master 

4.提示信息
第一次关联推送时，提示：

```
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
RSA key fingerprint is xx.xx.xx.xx.xx.
Are you sure you want to continue connecting (yes/no)?
```
输入yes，回车，OK，现在远程仓库和本地仓目录一摸一样了。

以后每次推送，只需要$git push origin master就行。










<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

