---
title:  IONIC3 打包安卓apk详细过程（大量图文）
date:   2018-03-06 23:44:03
tags: [android,SDK,JDK,APP,IONIC,gradle]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79319408)



本文写于2018年2月12日 22:25:59。

如果2018年的新春之际，你遇到IONIC的开发问题，这将是一篇最为详尽的打包方案。

经历三天的踩坑，跳坑，相信绝大多数的问题都已经覆盖到了，请仔细按照流程来对照操作及检查。
## 1.基本依赖环境 ##

 1. nodejs环境 (作为一个前端相信你已经有了)![nodejs](http://img.blog.csdn.net/20180212223918473?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)最好提前配置好node的环境变量，便于全局访问
 2. jdk(下面细说)![JDK](http://img.blog.csdn.net/20180212224004766?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 3. SDK(下面细说，其实主要难就难在SDK配置了)![SDK](http://img.blog.csdn.net/20180212224101120?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 4. gradle(下面细说)![gradle](http://img.blog.csdn.net/20180212224141473?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 2. 基本工具 ##

 1. gitbash(就是用来替代windows自带的丑陋的CMD)![gitbash](http://img.blog.csdn.net/20180212224300075?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 下载：我都打包了！
链接：https://pan.baidu.com/s/1mje7ZHu 密码：ob6m
 2. windows自带的CMD(`window`+`R`输入CMD，管理员身份运行)![CMD](http://img.blog.csdn.net/20180212224327731?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
 3. VSCode(微软爸爸开发的前端IDE)![VSCode](http://img.blog.csdn.net/20180212224349157?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
下载：请自行去微软爸爸官网下载。

## 3.环境配置 ##
**3.1 nodejs (需要配置环境变量)**
前端必会，跳过。
**3.2 jdk (无需配置环境变量)**
下载：已经上传网盘↓
链接：https://pan.baidu.com/s/1mje7ZHu 密码：ob6m
请自行根据系统安装32/64位的版本。
安装方法：下载完成，解压，直接按照提示安装，全局点确定，不出意外，最后的安装路径为：C:\Program Files\Java 
OK，jdk安装完成，在cmd中，输入`$ java -version`验证是否安装成功。

![jdk安装成功](http://img.blog.csdn.net/20180212225402220?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


OK。
**3.3 sdk (需要配置环境变量)**
下载：跟上面的一样，我都打包了。
链接：https://pan.baidu.com/s/1mje7ZHu 密码：ob6m

解压后（直接右键X解压并重命名。因为面还有个文件夹，不建议用右键+E解压）。
将重命名的文件夹，跟jdk放在一个父目录，便于查找：C:\Program Files\SDK
接着配置环境变量，我的电脑------右键属性-------高级系统设置-------环境变量。
在下面的系统变量(s)中，新建，键值对如下：
name: ANDROID_HOME
key: C:\Program Files\SDK
如图所示：

![SDK环境变量](http://img.blog.csdn.net/20180212230110171?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


然后在path中，全局声明一下，将;%PATH%;%GRADLE_HOME%\bin缀在最后面，前面有【;】分隔符。

然后运行CMD，输入`$ android -h`，如果出现一大堆指令，说明你的SDK安装无误，并且环境变量配置OK。

![ANDROID环境配置验证](http://img.blog.csdn.net/20180212230459827?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

现在，打开SDK目录下的SDK Manager.exe
打开界面上的Tools,选择options，先配置国内镜像：

域名千万不要输入http或者https协议前缀，谁输谁哭。

![配置镜像](http://img.blog.csdn.net/20180212231404498?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
下面记得勾选。
回到主界面，点packages再点reload
先勾选如下图的三个Tools:
分别是[ Android SDK Tools,Android SDK platform-tools,Android SDK Build-tools]
![Tools](http://img.blog.csdn.net/20180212230934859?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

别急，还没完，下面还有一个：
[SDK platform]![SDK platform](http://img.blog.csdn.net/20180212231104690?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

全部选中后，点右下角 install packages 来安装，耐心等待即可。
**3.4 gradle安装(需要配置环境变量)**
打开：http://services.gradle.org/distributions/
下载：gradle-4.1-bin.zip
同样安装在JDK,SDK的目录下，便于查找。
同样的配置环境变量：
GRADLE_HOME=C:\Program Files\SDK\gradle-4.1
;%GRADLE_HOME%\bin

测试命令（查看版本）：gradle -v
 
## 3.基本流程 ##
1.安装ionic和cordova 
 
打开Gitbash,全局安装ionic和cordova（IONIC是UI，cordova负责打包成apk,并且可以调用原生安卓的各种API）
```
$ cnpm install -g ionic cordova
```
![安装ionic和cordova ](http://img.blog.csdn.net/20180212224442812?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
2.创建ionic项目

桌面右键，在此处gitbash
```
$ ionic start app tabs
```
耐心等待完成，在 cd 到 app 子目录(app是你的真实项目目录)，然后

```
$ ionic serve
```
![ionic serve](http://img.blog.csdn.net/20180212224746544?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

稍等片刻，浏览器自动弹出预览界面(建议电脑安装Chrome浏览器)，并且支持持续热更新(Webpack的功能)，如下图所示：


![CHROME预览](http://img.blog.csdn.net/20180212224825825?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

如果做到这一步没问题，说明：
1.nodejs与gitbash没有问题。
2.ionic和cordova没有问题。

## 4.打包 ##

确保SDK,JDK没问题以后，使用指令
```
$ ionic cordova build android --release
```
 (如果这条命令有问题，可以去掉--release然后debug编译，编译完成Dos会显示apk目录位置)

如若你聪慧的双眼发现如下字眼：Build Success!  即可关闭本网页，说明你已经成功打包了。

OK，此时你已经有了debug的包，但是这个包没有签名，不能发布。

此时，我们应该：
    First：在JDK目录下的bin文件夹下（C:\Program Files\Java\jdk1.8.0_71\bin），先看看有没有keytool.exe和jarsigner.exe文件，这两个程序用于给APK签名，签名以后即可发布。
    
Second：将Ionic生成的文件先命名为app.apk，然后复制一份当前的bin目录里，执行命令1，生成自己的签名文件，名为:zhangqiang.keystrore，别名也是这个，有效期20000天，仅仅在第一次生成签名文件，以后不需要。
执行完命令1，继续执行命令2即可完成签名打包。
 
命令1：生成签名密钥

```
/*
使用工具, 签名,-genkey表示构建签名文件，-v 显示在dos窗口中 -alias表示签名包的别名 -validity 签名有效期(天)，姓名:zhangqiang 城市:lz + lz 国家: cn 口令敲的时候不动，是因为保护隐私，别当做你电脑死机！
*/

```

keytool -genkey -v -keystore zhangqiang.keystore -alias zhangqiang.keystore -keyalg RSA -validity 20000


命令2：给文件签名
使用刚才生成的zhangqiang.keystore   -signedjar   签名后的apk   签名之前的apk  签名包别  

jarsigner -verbose -keystore zhangqiang.keystore -signedjar complete.apk app.apk zhangqiang.keystore

![签名完成](http://img.blog.csdn.net/20180212234119134?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

如上图所示，IONIC打包的文件为app.apk,签名后的文件为complete.apk，这时候，可以说，一个软件就诞生啦！
后续的软件压缩打包可以百度：jarsigner打包
## 5.疑难杂症 ##
**5.1 Without ·from· option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.**

 出现这个提示，说明配置不正确。
 
 解决方法：
  在“/node_modules/@ionic/app-scripts/dist/sass.js”路径的“sass.js”文件，在postcssOptions参数中添加“from: undefined”。添加后效果如下：

```javascript
	var postcssOptions = {  
		from: undefined,  
		to: path_1.basename(sassConfig.outFile),  
		map: autoPrefixerMapOptions  
	};  

```
**5.2 安卓SDK组件缺失/缺少/不匹配**
报文：

```
A problem occurred configuring project ':CordovaLib'.
> You have not accepted the license agreements of the following SDK components:
  [Android SDK Build-Tools 26.0.2].
```

原因:SDK构建工具和platform工具不匹配，或者有东西遗漏了，没下载。
解决：如果中途报错SDK出问题，请打开C盘/profiles/SDK/manager.exe，使用东软的镜像，根绝报错信息，来down对应的platform或者build包。

**5.3 缺少安卓构建/打包工具**
报错报文：

```
Unhandled promise rejection (rejection id: 1): CordovaError: Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle
in your path, or install Android Studio
(node:3444) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

原因：缺少安卓构建打包工具，报文提示你可以用Android Studio，也可以安装一个Gradle。
解决办法：
去http://services.gradle.org/distributions/ 下载 gradle-4.1-bin.zip
配置相应的环境变量：

GRADLE_HOME=E:\software\gradle-3.0
PATH=%PATH%;%GRADLE_HOME%\bin

测试命令（查看版本）：gradle -v

完成上述任务后，重新运行Gitbash,然后 $ ionic cordova build android ,发现build成功，会自动下载gradle-4.1-bin.zip (初步猜测是因为自己的gradle路径不对，可能没有被项目依赖，但是项目在全局空间中发现gradle环境，因此自己要下载gradle来依赖。) 

感谢收看。









<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>