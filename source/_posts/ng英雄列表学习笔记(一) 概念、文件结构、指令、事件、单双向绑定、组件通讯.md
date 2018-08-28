---
title:  ng英雄列表学习笔记(一) 概念、文件结构、指令、事件、单/双向绑定、组件通讯
date: YYYY-MM--DD hh-mm-ss
tags: [angular] 
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](https://blog.csdn.net/qq_20264891/article/details/80698441)
## 为什么要学angualr(4.0+)？##
1. 无论是轮子也好、库也好、框架也好，很大一部分初衷就是为了改善开发体验，提升开发效率，并且让代码更加优美，易于维护。从而节省出时间，将开发人员从繁忙的业务中解放。
2. 微软收购了github，还不赶紧学ts？

本文参考博客/资料：
----------

1.https://blog.csdn.net/u012967849/article/details/78767294/ （ng父子组件如何传值）
2.https://www.angular.cn/ （ng中文官网）
3.https://www.jianshu.com/p/a2b625a99c8d （ng的class和interface区别）

本篇笔记所用环境及NG版本一览：
----------------

![NG版本](https://img-blog.csdn.net/20180614211344486?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 文件目录 ##
**1.组件的文件形式/结构：**
形如：![components](https://img-blog.csdn.net/20180614211811858?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
跟单文件的.vue不一样，文件目录比较多，但是也易于查询和解耦。
**2.打包入口：**
 app.moudle.ts为主要入口，负责装载所有的组件，以及声明一些第三方依赖的库。
![moudle](https://img-blog.csdn.net/20180614211620198?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
如图：
在头部 import 声明了所有组件及依赖的原生组件(from @angular/core)。
在@NgMoudle中，import则声明了使用的第三方库。
在 declarations 中注册了子组件。
**app目录不仅作为整个项目的打包入口，其本身也是一个根组件**。
**3.模块划分：**
 1. 根组件/模块 appMoudle
 2. 英雄列表 => heroes 组件
 3. 当前选择的英雄=> hero-detail组件

 ## 新的ng语法 ##
ng新语法:
```
	*代表ng指令  不用ng-if,ng-for，类似于驼峰 ngFor ngIf 
	()代表绑定事件   原生事件绑定直接写在括号里 (click) (keydown)
	[]单向绑定  代表绑定属性   [name] = 'jobs' 
	[()] 双向绑定<input [(value="someValue")] type="text"/> 
	
```
*官方称双向绑定写法叫盒子里的香蕉？？？？？？？*
## 父子组件状态传递  ##

Step1: 父组件想要引用子组件时，不需要在ts逻辑中引用，因为本身没有像Vue那样，有 components:[ ] 这样的选项。
Step2: 父组件中引用子组件的模版，并且单向绑定一个hero属性，这个属性来源于父组件的一个变量值。
Step2如图所示：
![Step2](https://img-blog.csdn.net/20180614212726956?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
Step3: 在子组件中，通过@Input来申请接收从 父组件中传递过来的属性。直接通过@Input() varitible 来声明/初始化即可。
Step3如图所示：
![Step3](https://img-blog.csdn.net/20180614213345167?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

在Vue中，通常是这样做的：
子组件声明一个props数组，来表明接收了哪几个值，然后为己所用。
angular其实也是同理，子组件通过标签来单向绑定一个属性，并且在逻辑文件中申请接收/初始化这个属性。
## 组件 运作/执行流程 的文字描述 ##

 - 列表组件渲染出Mock的数组 (列表组件 heroes 负责)
 - 为每一个渲染出的项，绑定事件，并传参 (同上)
 - 在列表组件heroes 的模版加入`<app-hero-detail [hero]="selectedHero"></app-hero-detail>`，这样父组件的值已经通过单向绑定至子组件，**但接收与使用，决定权在于子组件**。（同上）
 - hero-detail组件接收父组件传递过来的数值，并在内部`import {Input} from '@angular/core'`（hero-detail组件负责）
 - 接着在export语句中，使用装饰器来声明+初始化 得到的属性` @Input() hero: Hero;`然后就可以用啦！  （hero-detail组件负责）

## 整体逻辑代码 步骤 ##
**Step 1**
创建列表组件，使用`*ngFor`来渲染出组件，并且每个组件绑定一个点击事件，传递的值为当前循环的每一个currentValue。

```
<li 
    *ngFor="let thisHero of heroes" 
    (click)="onSelect(thisHero)"
>
</li>
```
在对应的.ts文件中，这个方法为：

```
//方法

 /*定义参数类型为Hero类型，即从hero.ts导出的类：
   export class Hero {
    id: number;
    name: string;
  }
  并且，设定该方法没有返回值。
  */
onSelect(hero: Hero): void {

  //动态赋值
  this.selectedHero = hero; 
  
 //业务逻辑相关
  this.bool = !this.bool;
  this.isSelected =  {
		   'badge':!this.bool,
			'selected':this.bool
   }
}
```
这样，每个循环出的item，在点击的时候，会把自己的值传递给该方法，从而进行后续业务逻辑处理。
**Step 2**
在列表渲染组件（父组件）中，引入子组件模版，并且通过单向绑定传值：
```
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```
把值绑定到子组件模版，这样，父组件的使命就结束了。
**Step 3**
子组件如何接收并使用父组件传来的值呢？
首先，引入内置的接收装饰器模型（不知道这种叫法是否严谨）
`import {Input} from '@angular/core'`
接着，装饰器来申请接收传进来值，声明+初始化二连：
```
  @Input() hero: Hero;
```
哦，完事了。

此时，这个hero相当于一个变量，存在于子组件中，并且，通过单向绑定，动态的与父组件同步。


<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>