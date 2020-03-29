---
title: cvm-debug
date: 2020-02-11 17:52:27 #创建时间
tags: [ubuntu] #标签(同级)
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

如您有其他建议，可以通过左上角的 QQ 发起回话，或者在 https://zq-jhon.github.io/about/ 中添加我的微信

## ssh public key
当重新 build 了 id_rsa.pub 为什么
```bash
$ git clone xxxx@github.git
```
还是会报 permission denied 或者 Please make sure you have the correct access rights and the repository exists 呢？

于是，经过尝试:

```bash
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa

```


发现还是不对。

## build 的姿势不对
首先，在执行 git 相关的命令时，最好不要使用 sudo, github 官方也给出了指导 
[官方建议](https://help.github.com/en/github/authenticating-to-github/error-permission-denied-publickey)
so, 在 linux 环境下，最好的方式就是直接以 root 的身份来操作目录和 cli：

```bash
$ sudo passwd
$ su root
```
这样，每次执行任何命令的时候，都不需要烦人的 sudo 了



<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
