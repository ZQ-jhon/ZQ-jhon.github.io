---
title: "koa-2"
date: 2019-05-16 23:38:20
tags: [koa] #标签(同级)
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
repo: zq-jhon | koa-starter #用户名 | 仓库名
---
本文章原始创作地址：[https://blog.csdn.net/qq_20264891/article/details/90274428](https://blog.csdn.net/qq_20264891/article/details/90274428)

如您有其他建议，可以通过左上角的 QQ 发起回话，或者在 https://zq-jhon.github.io/about/ 中添加我的微信


## MVC 分层
代码地址： https://github.com/ZQ-jhon/koa-starter
 MVC 是个老生常谈的概念了。
 M = Model， V = View , C = Controller ，  angularjs 就是典型的 MVC 框架。
 在 `Angular` （指Angular 2+， 下同） 中，C 被拆分成 ViewModel ，因此称之为 MVVM 框架：
 M = model 数据，驱动渲染的能源
 V = View 视图层，指代用户可以看到的前端界面
 ViewModel = 处理数据和视图之间的关系
 
 那么，在 KOA 中， MVC 指代的又是什么呢? 
 ### C，Controller 层
 先不急着回答，把上一次的代码捋一捋，进一步优化一下。
 由于之前所有的对于请求参数和数据的处理都放在 APP.js ，随着需求的增加，导致难以维护，先让我们给代码分层：
 ```javascript
 /** app.js 中新增 `router.js`，专门用来处理路由相关的东西 
 *   router.js
 *  
 */
const router = require('koa-router')();
module.exports = (app) => {
    app.use(async (ctx, next) => {
        ctx.body = `
          <form action="/submit" method="post">
            <input name="account" type="text"> 账号
            <br/>
            <input name="password" type="password"> 密码
            <br/>
            <button>提交</button>
          </form>
        `;
        await next();
    });
    app.use(async (ctx, next) => {
        if (ctx.request.url === '/submit') {
            ctx.response.type = 'application/json';
            ctx.response.body = ctx.request.body;
        }
        await next();
    });

    // add router middleware:
    app.use(router.routes())
}
}
 ```
整个 `router` 也被编写并导出为一个函数，接受 koa 的实例 app，来进行中间件的使用。

还不够完美，router 中仍然存在大量的与路由无关的代码，我们进一步分层:

```javascript
/**
* 新建 index.controller.js
* index.controller.js 的职责就是：一旦收到命令，就渲染并返回表单页面
*/

module.exports =  async (ctx, next) => {
  ctx.response.type = 'text/html';
  ctx.body = `
      <form action="/submit" method="post">
        <input name="account" type="text"> 账号
        <br/>
        <input name="password" type="password"> 密码
        <br/>
        <button>提交</button>
      </form>
    `;
  await next();
}

/**
* 同理，新建 post.controller.js
* post.controller.js 的职责是：收到命令，就解析 body 中传来的数据，并渲染返回给前端
*/

module.exports = async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = ctx.request.body;
}

```
现在的文件结构应该如下：
```text
|--node_modules
|--package.json
|--app.js
|--index.controller.js
|--post.controller.js
|--router.controller.js
```
*（如果读者嫌乱，可以增加 controllers 文件夹 和 routers 文件夹，将对应后缀的文件丢到对应的目录，并更新文件的引用路径。）*

我们现在更新目录：
```text
|--node_modules
|--package.json
|--app.js
|--contollers
    |--index.controller.js
    |--post.controller.js
|--routers
    |--routers.controller.js
```
VSCODE 提示更新引用，NICE。
{% asset_image vscode.png vscode vscode vscode %}

通过上面的代码可以看到，两个新建的 controller 文件，都是在处理自己的业务职责，即渲染并返回对应的数据，他们不关心路由是不是命中了自己，做到了职责单一。

我们现在在 CMD 中输入 `node app.js` 发现程序还是按照预期来执行，这里就不贴图了。

现在，按照 MVC 框架的思想来理解，业务处理的部分就是 C => controller ，我们已经完成了。

下面来看 View 层是啥？
假设我们现在有 100 个不同的路由来处理请求，并且每个路由要返回不同的页面，我们肯定不希望手写 100 个 html ，代码量太大了。
为了解放生产力，我们不得不使用模板引擎，例如 ejs , jade，nunjucks 等等，由于 [nunjucks ](https://mozilla.github.io/nunjucks/) 是 mozilla 开发的，就用它吧！（官方文档支持中文：[官方文档](https://mozilla.github.io/nunjucks/cn/api.html)）
```javacsript
// 安装 及 使用
// 随便在哪新建一个 js 文件
const nunjucks = require('nunjucks');
const result = nunjucks.renderString(`hello, ${name}`, {name: 123});
// fuck, 这里 双花括号跟 hexo 模板语法冲突了，意思大家明白就行
console.log(result);
```

// 通过 node.js 执行
{% asset_image result.png result result result %}

**如果你写过 Angular，Nunjucks 的东西简直是跟 Angular 的模板语法一毛一样**
支持管道，双花括号取值 ,逻辑判断，循环，继承，还有：
 **防止 XSS 攻击，支持可配置的转义 消毒(sanitizer)**

```javascript
const nunjucks = require('nunjucks');
nunjucks.configure('./', {autoescape: true});
// 默认对当前文件夹下的文件进行转义过滤，消毒处理
```
脏活都被 nunjucks 干完了。

### 使用 nunjucks
下面，我们将 默认 路由下，返回 post 页面的代码，用 nunjucks 来进行重构

在 controller 层同级下，新建 views 目录，然后
新建 from.html 模板文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>form</title>
</head>
<body>
<!--注意，这里使用了 name 变量，看看待会怎么使用它！

 // fuck, 这里 双花括号跟 hexo 模板语法冲突了，意思大家明白就行

 -->
    <h1>{fuck{  name  }fuck}</h1>
    <form action="/submit" method="post">
        <input name="account" type="text"> 账号
        <br/>
        <input name="password" type="password"> 密码
        <br/>
        <button>提交</button>
      </form>
</body>
</html>
```

接着在 renderers 下新建  renderForm.js
```javascript
const nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true });
const htmlRenderFn = (object) => nunjucks.render(`form.html`, object);
module.exports = htmlRenderFn;
```
接着，修改原本在 index.controller.js 中渲染的函数
```javascript
const renderForm = require('../views/renderForm');
module.exports =  async (ctx, next) => {
  ctx.response.type = 'text/html';
  ctx.body = renderForm({name: 'Hello, nunjucks'});
  await next();
}

```
 回到第二个标题抛出的问题，我的理解是，KOA 中的 MVC ：
 M = 泛指整个通信过程中所有的数据，包括但不限于 http 请求中传递的数据或者路由参数、query 参数、post body 体，甚至 view 层 中 nunjucks 渲染的数据来源。
 V =  view，返回给前端的视图
 C = controller 控制器

未完待续...

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
