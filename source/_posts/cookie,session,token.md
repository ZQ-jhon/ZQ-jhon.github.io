---
title: Cookie、Session、Token 
date: 2018-08-26 23:57:08
tags: http
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](https://mp.csdn.net/postedit/82085958)
#### 1.Cookie 是比较早的服务端和客户端验证身份的方法。

 因为 http 是无状态的，因此，每次 http 请求，服务端不知道是谁在来访，因此，对于每次来访，回传字段中会设置 set-cookie 字段，浏览器会将 cookie 保存在本地，等下次 http 请求，再发送给这个域名的服务器。

Cookie 可以由服务端来设置生命周期。

Cookie 存储在客户端本地 。

Cookie 挂载在 Document 对象下，可以用 js 修改，因此有安全风险，所以后面又引入 Session 来补全不足。

一般情况， cookie 直接写入请求头。

For eg:

```javascript
// 首次访问
client => 访问 www.example.com
server => 收到来访，在回传字段中，包含 set-cookie 字段： 
  { set-cookie: username=uuidtest123;Domail=.example.com ... }
// 第二次访问
client => 判断访问的域名，检查是否存在该域名的 cookie, 有的话就带上一起请求
server => 收到来访，并含有 cookie ，回传不用再加新 cookie 了。
```

2.Session 一般通过 set-cookie 一起传过来，配合 cookie 保存会话信息。

Session 的出现是为了保持用户的连接状态而做出的努力。

比如有一个场景，用户登录了 a.com ，如果登陆 a.com/profile ，查看一下个人资料，难道还要用户重新登陆吗?不合适吧？

用户判断 Cookie 所在的客户端是否还“在线”，每次客户端进行请求(动作)，都会刷新 Session 的时间值。

For eg:

```javascript
// 首次访问
client => 访问 www.example.com
server => 收到来访，在回传字段中，包含 set-cookie 字段： 
  { set-cookie: username=uuidtest123;Domail=.example.com;sessionId=xxx;sessionFresh=30min;}
// 第二次访问
client => 访问 www.example.com ，并自动携带 session 
server => 收到来访，刷新 session 的新鲜值，并通过 set-cookie 回传给客户端。
  如果在限定的时间内（此处是30分钟）， session 新鲜值没有被刷新，就会被销毁。
```


其中 cookie 的作用就是为了解决HTTP协议无状态的现状所作出的努力。至于 session 机制则是又一种在客户端与服务器之间保持状态的解决方案。 

简而言之， cookie 是辨别来访者，session 是看该来访者是否保持连接



3.token 和 session 很像，也是为了保持状态，一般是登陆以后，后端会返回 sessinId ,其实就是 token=> 用户唯一标识，通过 Cookie 来传给后台。

token 在前端传给后端时，直接写入请求体，当做普通参数缀在后面即可。

参考： https://zhuanlan.zhihu.com/p/27736893


<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

