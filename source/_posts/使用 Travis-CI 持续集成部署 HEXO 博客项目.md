
---
title: 使用 Travis-CI 持续集成部署 HEXO 博客项目
date: 2018-08-29 15:21:08
tags: [Travis-CI, Hexo]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](https://blog.csdn.net/qq_20264891/article/details/82183614)

## 持续集成的概念 ##
现在前端项目都是模块化开发，需要大量的 npm install ,编译等环节，除去在开发环节中使用诸如 webpack 这样的自动化工具，在部署的时候，也可以使用 Travis 来提升部署效率。
持续集成，相当于将环境搭建在云端，每次只需提交代码到对应的分支，就会触发 CI 自动构建，其中构建过程中的指令都可以指定。

## 准备工作 ##

 - **已经有 HEXO 搭建的博客，并且源码存放在 HEXO 项目的分支上(分支名字随便起，不是 master 就行)。**
 如图：
   ![部署](https://img-blog.csdn.net/20180829150457739?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
   
 - **熟悉 HEXO 的用法及基本指令，例如**

```
$ hexo g // 构建
$ hexo clean // 清除已构建的资源
$ hexo s // 起服务
```
## 持续集成部署 ##

 - 登录[https://travis-ci.org/](https://travis-ci.org/)，使用github账号登录。
   
 - 找到自己的 HEXO 项目：
   ![HEXO项目](https://img-blog.csdn.net/20180829150920443?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
 - 设置选项

在github添加Access Token，在右上角账号的settings->Personal access tokens.点击generate new token来生成新token
选择仓库权限就可以。
![get token](https://img-blog.csdn.net/20180829151058290?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

除了 “删库”。其他权限都给上：
![权限分配](https://img-blog.csdn.net/20180829151158858?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

*(生成之后一定要保存好，因为只会出现一次，丢失了就只能再重新生成了。)*

 - 回到Travis官网，在设置中填入刚复制的token，取一个名字，这个名字需要写到下面的配置文件中
![添加 token](https://img-blog.csdn.net/20180829151351186?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
 - 在你的hexo项目的 **分支中** 添加配置文件.travis.yml，并且**放在 HEXO 源码分支的根目录下**如下：
 
![.travis.yml](https://img-blog.csdn.net/20180829153110581?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
```
language: node_js
node_js: stable

install:
  - npm install

script:
  - hexo g

after_script:
  - cd ./public
  - git init
  - git config user.name "ZQ-jhon"
  - git config user.email "350037310@qq.com"
  - git add .
  - git commit -m "Update docs with TRAVIS-CI."
  - `git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master`
  
branches:
  only:
    - hexo
env:
 global:
   - GH_REF: github.com/ZQ-jhon/ZQ-jhon.github.io.git
             ```

你需要修改的是 user.name，user.email，以及在 GH_REF 中填写你自己的仓库中该项目的地址( 浏览器 url 自己找规律 )。
要使用https协议的仓库地址，使用ssh仓库地址会失败。
注意这一行`git push --force --quiet "https://${githubblog}@${GH_REF}"` 中的githubblog就是你刚在token那里取的 Token 字段，key 要对应上。

配置完成后推送到仓库中，我们就能看到网站中在部署了。

 - 展示：
   我push了一个新文件，触发了自动构建，这里可以看到构建过程，其实跟我们本地跑 npm install ... 那些流程是一样的：
   ![构建过程](https://img-blog.csdn.net/20180829152604244?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
 ![部署成功](https://img-blog.csdn.net/20180829151945335?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
 
 - 参考：
 [https://www.jianshu.com/p/5691815b81b6](https://www.jianshu.com/p/5691815b81b6)
 [https://blog.csdn.net/woblog/article/details/51319364](https://blog.csdn.net/woblog/article/details
 <b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
