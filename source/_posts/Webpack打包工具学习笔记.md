---
title: Webpack打包工具学习笔记
date: 2018-01-17 11:18:00
tags: Webpack
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/u014717036/article/details/51001311)

## 前言 ##

本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79078776)
前言：Webpack是一款基于node的前端打包工具，它可以将很多静态文件打包起来，自动处理依赖关系后，生成一个.js文件，然后让html来引用，不仅可以做到按需加载，而且可以减少HTTP请求，节约带宽。

## 1.配置与安装 ##
在node已经安装完成的前提下，全局安装webpack

```
$ cd d:

$ mkdir test && cd test  //创建test ，并进入

$ npm install -g webpack  //等待100s，安装完成，也可以使用淘宝镜像

$ npm init //初始化package.json文件

$ npm install --save-dev webpack //添加依赖 ，在package.json中声明依赖,等待安装完成

```
## 2.基本操作`$webpack main.js webpack.js`##

当前目录下创建如下工作结构:

```
/---------test

   ----app
     ----main.js
     ----index.js   
     
   ----index.html
```
项目目录下，app文件夹含有两个js文件，修改如下：

```
//main.js ，这是Webpack主要的入口文件

  require('./index.js');



//index.js ，这是被主文件引用的文件

document.write('Hello,world!');



//index.html ，供浏览器解读

<html>

...

<script src="./webpack.js">  // 引用同目录下的webpack.js

...

</html>

```

webpack.js是哪来的呢？就是通过webpack打包生成的js文件，接下来，

开始生成webpack.js文件：

```
$ webpack main.js webpack.js

```
![这里写图片描述](http://img.blog.csdn.net/20180116202114667?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

可以看到已经打包成功了，此时查看IDE中的项目目录，根目录下已经多了一个webpack.js文件。然后用浏览器打开index.html，效果如下：

![这里写图片描述](http://img.blog.csdn.net/20180116202235717?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

此时查看网页源代码：

![这里写图片描述](http://img.blog.csdn.net/20180116202405946?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

66666666666！
## 3.进阶操作 （配置webpack.config.js或者配置package.json，后者依赖前者）##
每次在命令行敲目录调试，是很痛苦的，因此需要一次配置，多次使用的方法。

在根目录下新建文件： webpack.config.js  (名字就是这样，规定，不能改)，内容如下：

```
module.exports  = {
//入口文件位置
    entry:__dirname+'/app/main.js',

//出口
    output:{
   //路径
        path:__dirname,
        filename:'webpack.js'
    }

}
```
这里的 __dirname是一个node的全局变量，用于指向当前的工作目录，调皮的我console.log了一下这个变量：

![这里写图片描述](http://img.blog.csdn.net/20180116203051747?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
确认无疑。

这样，我们的webpack.js写完以后，可以直接在命令行中敲：

```
$ webpack
```
可以发现，项目中也同样的会生成目标js文件，也就是webpack.js，这样非常方便，省事。 


还有一种配置方法，将package.json文件中"scripts"里面添加键值对：
![这里写图片描述](http://img.blog.csdn.net/20180116203453509?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

这样同样可以在项目目录生成目标js文件，直接在 命令行里敲

```
$ npm start //因为webpack是全局安装的，直接value给webpack，而不用跟路径
```
如果start被占用了/冲突了，也可以在scripts下面自定义一个键值对：

```
"zq":"webpack"

$ npm run zq //稍作修改cmd 命令
```
最后还是可以生成。
## 4.webpack服务器监听代码变动，自动刷新及source-map ##
4.1关于source-map，也就是在webpack.config.js中配置 devtool (develpment tool)的值，例如我这样配置：

![这里写图片描述](http://img.blog.csdn.net/20180117094811412?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

在webpack完成文件打包后，会自动生成一个与目标文件相同名的 .map文件，用来说明打包文件的每个地方对应的是哪些文件，简而言之，让你能知道源码是在哪里错的，帮你刨根问底，而不用开发者自己去Debug。

参考文章1：[入门WEBPACK，看这篇文章就够了----简书](https://www.jianshu.com/p/42e11515c10f)

参考文章2：[Webpack中的sourcemap](https://www.cnblogs.com/axl234/p/6500534.html)


4.2 webpack服务器 

首先单独安装 server 包 ：

```
$ npm install --save-dev webpack-dev-server
```
同样的，在webpack.config.js中做出相应的配置：

```
module.exports = {
    devtool: 'source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {

    },

    devServer: {
        contentBase: "./",//本地服务器加载index.html页面所在的目录，这里写的是根目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新,
    } 

}
```

配置好config后，还得配置一下package.json，在scirpts里面添加server：

```

"scripts": {
    "start": "webpack",
    "server": "webpack-dev-server --open", 
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  
```

接着，在命令行运行

```

$ npm run server 

/*届时服务器会自动启动， 并且打开浏览器,默认端口为8080，也可以
devServer:{

port:4040 //自己配置端口为4040

}

```

下面是一个服务器跑起来后的演示结果，我不断的修改work.js 中 `document.write`的值，从而服务器会自动检测并刷新页面：


![这里写图片描述](http://img.blog.csdn.net/20180117100531064?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



## 5.非JS文件的操作(img,json,css......),猪脚：Loaders ##

 **5.0 基本概念** 
 前面都在说js文件，官网说什么文件都可以当做模块打包，下面就来试试非js文件。

首先要明确的是，webpack只能识别js文件，如果要识别非js文件，就需要loader来解析这些文件。

loaders 需要单独安装，并且在webpack.config.js中的modules关键字下进行配置。

Webpck2以上已经支持对json的解析打包，不需要额外的loaders，可以在main.js中

```
var json = require('../package.json')//json在它的上级目录

document.write(json.scripts.server);

```

运行结果 ：

![这里写图片描述](http://img.blog.csdn.net/20180117101705406?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

可见，网页中，没有通过任何第三方loader，即可将json解析并打包成bundle.js。

**5.1 Bable **
Bable可以使得开发者使用最新的ECMAscript标准来书写代码，而不用管新标准是否被当前使用的浏览器完全支持。

还是需要单独安装Bable的包：

```
$ npm install --save-dev babel-core babel-loader babel-preset-env 

/
```

安装完成后，在webpack.config.js下的module关键字下进行配置：

```
module.exports = {
  devtool: 'source-map',
  
    entry: __dirname + "/app/main.js",
    
    output: {
    
        path: __dirname,
        
        filename: 'bundle.js'
        
    },
    
    
    devtool: 'eval-source-map',
    
    devServer: {
    
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        
        historyApiFallback: true,//不跳转
        
        inline: true//实时刷新
        
    },
    
    module: {
    
        rules: [
        
            {
            
                test: /\.js$/, //正则匹配，必须
                
                use: { //使用到的loader
                
                    loader: "babel-loader",  //loader名
                    
                    options: {   //选项
                    
                        presets: [ //预先配置
                        
                            "env"
                            
                        ]
                        
                    }
                    
                },
                
                exclude: /node_modules/ //不包含的目录或文件
                
            }
            
        ]
        
    }
    
};

```


**5.2 CSS文件处理 **
webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

同样先安装两个包 style-loader和css-loader

```
$ npm install --save-dev style-loader css-loader
```

```
 module: {
        rules: [
          {.......}，
 {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
也可以简写：
{
test:/\.css$/.

use:[{

loader:"style!css"  //这里的执行顺序是从右往左，css应该在style之前执行

}]
}
```
*根目录下新建 ./src/index.css，写一个body的背景为green，然后在入口文件main.js中,require('../src/index.css')，接着通过命令行`$ webpack`*
此时查看index.html，发现页面背景已经变成绿色
![这里写图片描述](http://img.blog.csdn.net/20180117110627698?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 6.插件plugins ##
先安装插件的包：

```
cnpm install html-webpack-plugin
```
在webpack.config.js中 头部，引入依赖：

```
let webpack = require('webpack');
```

然后在webpack.config.js中配置根键值对：

```
  plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究')
    ],
```
![这里写图片描述](http://img.blog.csdn.net/20180117111652412?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)




<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

