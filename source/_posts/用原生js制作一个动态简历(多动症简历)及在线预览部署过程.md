---
title:  用原生js制作一个动态简历(多动症简历)及在线预览部署过程 
date: 2018-01-29 17:18:00
tags: [动态简历,Github部署]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79197651)



本项目Fork地址(欢迎Star)：
--
[https://github.com/ZQ-jhon/resume](https://github.com/ZQ-jhon/resume)


本项目预览地址(Preview Address)
--
Preview :  [多动症简历](https://zq-jhon.github.io/resume/)

项目起因
--
因为在网上看到一个大神做的动态简历，如连接所示：

[http://strml.net/](http://strml.net/)

炫不炫？酷不酷？其实这个项目其实很简单，整个代码中，js的API超不过10个。

引用的第三方库
--
1.jQuery  实际用到的地方只有1%

2.prism   代码高亮库。用到30%

3.marked.js markdown语法转html的库，实际用到20%

技术概要
--
通篇中使用的技术难度并不大，主要有：


 - **核心原理：**同时向一个style标签和pre标签吐代码，pre中显示源码，而style中直接可以变成样式。
 
 - 字符串提取、拼接。
 
 - setInterval定时器控制整个代码的吞吐节奏/速率。
 
 - 在setInterval中设定一些if，用来控制总字符串的吞吐位置。
 
 避坑指南
--
**1.注意字符串拼接 ： 要注意字符串拼接的时候，往styleTag里面吐的代码，一旦包含注释/**/，要对/进行转义，如下`\/*这里填写你的内容*\/。**

**2.字符串的命名一定要切实合理： 如图所示：**

![字符串的命名](http://img.blog.csdn.net/20180129213013960?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**3.代码高亮渲染 ： 中途加入代码高亮渲染的时候，通过判定字符串循环的 n ++ 达到多少，从而用if(n>123&&n<321)这种方法来进行区域渲染。prism的渲染代码如下：**

```

官方js库地址：[http://prismjs.com/](http://prismjs.com/)

语法:prism.heihlight(渲染的字符串,渲染的代码格式)

Prism.highlight(str.substring(0,n), Prism.languages.css);

```


**4.MarkDown ⇒ HTML渲染 ：  同样根据n的值，来使用if()来进行循环。**

marked.js官方库地址：[https://www.npmjs.com/package/marked](https://www.npmjs.com/package/marked)

渲染代码如下:

`drawBoard.innerHTML =marked(str.substring(929,1885));`

**5.动态创建Pre标签（id="drawBoard"）  ：  CSS代码版是一开始写在HTML的，但是之后的简历板子（id="drawBoard"，本质上是个pre标签）是通过判断n的值，来动态创建的，如图所示：**

![动态创建drawBoard](http://img.blog.csdn.net/20180129214532614?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**6.已经创建的元素无法在另外的循环中获取 ：**
 **在刚才的【5】中，动态创建的pre标签(id="drawBoard")会在if()的区域内无法document.getElementById('drawBoard')，此时需要在if里面再次获取并且赋值，如图所示：**


![再次赋值](http://img.blog.csdn.net/20180129214929626?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


**7.动态下拉   同样通过n的值来让元素的溢出自动下拉**

如图：

![动态下拉](http://img.blog.csdn.net/20180129215552841?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**8. 动态简历最后的魔术环节  ：   还是通过n的值来进行判断，从而渲染 **

其实这个环节就是故弄玄虚，通过判断CSS代码板 的 最后结尾字符串的n值，来进行渲染。


代码如图：


![魔术效果实现](http://img.blog.csdn.net/20180129215916887?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



核心原理代码
--

```
//注意事项，往style标签里面吐字符串时，要注意对/**/注释标签进行转义

var styleTag = document.getElementById('styleTag');

var sourceBoard = document.getElementById('sourceBoard');

var str = '\/*大家好...今天我给大家做一个在线简历...\/*';


var n = 0;
window.setInterval(function(){
   n++;
   styleTag.innerHTML = str.substring(0,n);
    
   sourceBoard.innerHTML = str.substring(0,n);


},100);

//此时，用户观看字符串轮番出现的同时，程序也已经向style标签吐了代码，这样，当用户看完一个CSS样式结束后，对应的样式可以立马通过浏览器渲染出来。
```
 Demo部署到GitHub详细过程
--
本来还不知道Demo可以直接在Github上预览。。。直到发现这样的功能：

![gh-pages预览项目](http://img.blog.csdn.net/20180129220933667?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

在Demo的仓库里，点击Settings，然后找到GitHub Pages，设置源为master主分支（此项目只有一个分支，所以也没得选），点击Save保存，即可出现预览地址，一般保存后会稍有延迟。

整个部署的环节大致如下：

 1. 在本地的项目根目录下，`$ git init`

 2. 加入当前所有文件到暂存区 `$ git add .`(后面有个“·”，代表全部文件)

 3. 连接远程仓库  `$ git remote add origin "your repository address"`

 4. 提交所有文件到git版本控制系统 `$ git commit -m "create Demo resume"`

 5. push到你的远程仓库 `$ git push origin master`

 6. 打开浏览器，进入这个目录的respository，点击settings,设置GitHub pages为 master,稍等片刻，即可预览。
 
 PS:学会这个骚操作，我把以前做的好多Demo都给部署了一遍，目前都可以预览，感谢GitHub

 反思与不足
--


 1. 在快速预览模式下，例如，将setInterval的间隔时间设为0，整个页面跑完，容易出现两个代码版的下拉滚动条“假死”,拉不动，但是将间隔时间设定为正常的90ms或者100ms，整个页面跑完没有任何问题。我初步总结的原因是，因为每次下拉的值是1000，这个下拉的动作很可能重复几百次，几千次。所以当间隔时间极小，重复次数极高，下拉值极大，那么这种现象就越容易出现。


 2. 我在向一些前端前辈请教这个Demo的不足之处时，大神告诉我：面试官只关心页面上的信息，而不是如何呈现，更不能忍受长达200s的等待。这个Demo算是炫技，但是又没有什么核心的技术点，还不如老老实实的写一份干净清爽的简历实在。

 我的反思是，这个Demo由于大量的字符串以及转义字符拼接，因而没有像原作者：[http://strml.net/](http://strml.net/)的页面那样，呈现的美轮美奂，这也是我在写Demo之初没有全局考虑的结果，导致现在如果加一些CSS代码，会带来极大的工作量。
 3. 整个页面没有加速或者暂停的功能，其实这个倒是简单，设置三个按钮：慢，中速，快速，在setInterval中的if里，对点击事件进行监听，一旦点击，就修改setInterval的时间间隔，然后return当前的n值。
 
 
 4. 整个Demo代码过于混乱，没有进行封装，因为自己现在对面向对象还是有些手生，希望以后进行封装，以便提高运行效率，以及复用。









<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>