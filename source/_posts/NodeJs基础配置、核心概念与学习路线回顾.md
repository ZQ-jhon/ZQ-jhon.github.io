---
title: NodeJs基础配置、核心概念与学习路线回顾 
date: 2017-12-12 22:07:00
tags: nodejs
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78786161)

Nodejs把前端开发带入一个全新的阶段，他使得js能够跑在服务端上，大大强化了js这门语言的可塑性。
OK，环境配置不提，配置好了以后，直接来跑一些简单的demo

以前一直没搞懂nodejs复杂的目录（其实是不懂linux），老把文件目录和运行时的目录搞错。

在gitbash下，先进入对应的目录，例如我的js文件在 D:\node\nodejs下，那么应该：

```
$ cd d:
$ cd node/nodejs

```
这样就OK啦，如果想跟IDE进行配合也不是不行，步骤如下：
1.在node.exe同级下建立project，命名为 nodejs ：
![这里写图片描述](http://img.blog.csdn.net/20171212205905914?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
2.在IDE中添加新建项目，添加刚才的文件夹路径：
![这里写图片描述](http://img.blog.csdn.net/20171212210012938?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
欧~~尅！
接着，在IDE里面新建几个js文件，然后在我们的Node上面跑一跑(CreateServer那个DEMO就不做了)。
建立第一个文件:hello.js （null文件）
建立第二个文件:world.js（null文件）
两个文件可以在同级目录，也可以不在。

将下列代码填入hello.js：

```
function hello(){
	console.log("hello")
}
exports.hello =hello();
 
```
打开gitBash,找到IDE中工程的目录(最好把js文件放在工程目录下即可，或者单独建一个js文件夹)：
然后输入：`$ node hello.js`

![这里写图片描述](http://img.blog.csdn.net/20171212210405883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

然后将下列代码填入 world.js :

```
var world = require("./hello.js");
world.hello
```
运行之，得出下图：

![这里写图片描述](http://img.blog.csdn.net/20171212210540891?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
可以看到，两次的运行结果一样。hello.js的运行结果为hello不足为奇，那么world.js为什么也输出hello呢？

这是因为在hello.js中，打包出来一个公共模块，`exports.hello =function(){....}`
而在world.js中，引入了这个模块，并且赋值给变量world:

```
var world = require('./hello.js') /*引入【hello.js里面打包的

模块】*/

/*此时，world相当于拥有共有模块的所有属性和方法了，那么此时，这个

world有一个方法为hello,我们调用这个hello方法，world.hello ，自然

而然输出hello*/



```
如果将hello.js改进一下，
```
var i=0 ; 
function hello(){
++i;
console.log("hello for " + i)
};
```
运行 `node hello.js` 输出: //hello for 1

同时更改world.js:

```
var world = require('./hello.js')
var world1 = require('./hello.js')
world.hello
world1.hello
```
运行 `$node world.js` 输出//hello for 1甭管运行几次，都是这个结果

这说明，引入模块时，只有第一次引入时会初始化模块。

**模块的集合：包(package)**
所谓的包，就是内部集成了好多模块，主要使用一个入口文件作为包的入口，该文件的导出对象作为包的公有模块：

```
一   ---nodejs
|一   ----js
   |       -----main.js
   |       ------head.js
   |       ------body.js
   |       ------footer.js
|一   ------package.json


```
此时，main.js是包的入口和导出对象模块，在main.js中，很有可能引入了head.js、body.js、footer.js的导出模块，然后写入一些功能和方法，最后导出一个公有方法，供其他的包或者模块使用。



当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。


当引用包的入口文件时，require('./node/nodejs/main.js')这样给人感觉仿佛在引用一个模块，而不是整个包。
解决方法是，将Main.js命名为index.js，这样，在引入包的入口文件时，直接填写包入口文件的路径：
```
var cat = require('./js/index.js');
var cat = require('/js');

//上面两条语句等价
```

这样处理后，就只需要把包目录路径传递给require函数，感觉上整个目录被当作单个模块使用，更有整体感。

也可以用json文件来声明入口：

```
｛
	  'main':'./main.js'
｝
```
这样，在引入包的入口文件时 require('./node/nodejs')时，会优先查找json文件，并从中读取入口配置，注意，此时的json一定要在引用的路径之下。







<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

