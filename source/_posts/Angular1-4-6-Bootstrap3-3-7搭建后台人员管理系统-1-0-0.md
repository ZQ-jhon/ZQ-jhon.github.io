---
title: Angular1.4.6 & Bootstrap3.3.7搭建后台人员管理系统 1.0.0 
date: 2017-12-19 15:35:00
tags: angularjs
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78842927)


**前言：接触前端快1满一年了，从什么都不会，一步步摸索，走到现在，觉得前方的路还是很迷茫，但是每天感觉自己都在进步，这是最好的！希望自己能坚持下去，也跟各位同仁共勉！**

```
@important message!
{
    "name":"Manage-system-By-AngularJs",
    "version":"1.0.0",
    "author":"ZQ-jhon",
    "connect":"QQ:350037310"
}
```

直接上全部效果的演示图：
Let's view together:

![GIF加载中，请耐心等待... ...](http://img.blog.csdn.net/20171220094856558?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)




## 1.Angualr和Bootstrap的火花 ##

Angular是开发SPA的得力框架，其数据双向绑定和指令系统能够最大程度的保持页面的

整洁干净，而Bootstrap作为一个UI库，也能够很好的满足本系统的需求。

## 2.思路 ##

2.1 在后台人员管理系统中，需要有以下功能：增、删、改、查。

为了实现这些功能，就必须在项目中留好数据接口，方便跟后台数据进行I/O操作。

2.2 为了实现部分功能的 toggle()，例如：

 1. 点击编辑，文本框的可编辑状态会来回在:  可编辑/不可编辑  切换。

 2. 点击编辑，删除button的 show 与 hidden。

必须使用一个ng-show = bool/ng-disabled = !bool，bool的具体方法每次访问，会

更改布尔值为对立值：

```
//初始化:
$scope.bool = true;

//调用改变自身布尔值
$scope.toggle = function(){        


$scope.bool = !$scope.bool;  //谁调谁改变
 
}
```


而这个`$scope`的bool()方法，应该位于`$rootscope`是最好的解决方式，所有的局部

controller都可以访问到根作用域。

因此，改写如下：

```
$rootscope.toggle = function(){        


$rootscope.bool = !$scope.bool;  //谁调谁改变
 
}
```


## 3.实现 ##

3.1 框架搭建 ：使用bootstrap搭建框架

3.2 初始数据展示：为了让用户有一个直观的展示，当前界面上会mock一些假的数据上

去，仅供参考(当然这些数据也可以删除)，mock的方法为，在`$scope`上绑定一个数

组，该数组是对象数组，然后用过ng-repeat来展现在我们的bootstrap表格中。

3.3 框架代码：

```
<body>
							

        <div class="container-fluid">
            <h1 class="text-center">增删改查后台管理系统</h1>
       <table class="table table-responsive table-hover">
           <thead>
               <tr>
                   <td>序号</td>
                   <td>姓名</td>
                   <td>年龄</td>
                   <td>职务</td>
                   
               </tr>
               <tr>
                   <td><span class="glyphicon glyphicon-pencil btn btn-info">编辑</span></td>
               
                   <td></td>
                   <td><input type="text" value="" ng-disabled="bool"/></td>
                   <td><input type="text" value="" ng-disabled="bool"/></td>
                   <td><input type="text" value="" ng-disabled="bool"/></td>
                   <td><button class="btn btn-danger">删除</button></td>
                   
               </tr>
           </thead>
       </table>
       
       <button class="btn btn-success"><i class="glyphicon glyphicon-user"></i>创建新用户</button> 	
        </div> 
        </body>
```
3.4 ng指令系统的控制原理与规划过程 

  3.4.1     指令构建
  
    首先在表格上声明 `ng-app ="myapp"`
         
    并且声明控制器`ng-controller="ctrl"`
     
    接着，在需要toggle切换的地方赋值，如果默认要false,可以使用 
         
      ng-show="!bool"或者 ng-disabled="bool"
         
    这里因为初始值是：

       `$scope.bool = true`

  然后，在$`scope`上绑定初始数据，即一个对象组：
     

```
        var app=angular.module('myApp',[]);
 	app.controller('ctrl',function($scope){
 		$scope.users = [
 		{name:'LiMing',age:23,job:'fontAnggener'},
 		{name:'Hanmeimei',age:22,job:'teacher'},
 		{name:'Wangjie',age:25,job:'driver'},
 		{name:'Liusir',age:27,job:'business'},
 		{name:'guojingming',age:29,job:'editor'},
 		{name:'Yaoming',age:33,job:'player'}
 		
 		];
```

  有了元数据，就可以为所欲为了，在需要的位置，例如 table 中的 tr 进行ng - repeat

循环，循环的结果是

对象数组中每一个对象！
==
然后在对应的`<td></td>`中使用{{use.name}}或者balalala进行取值



 
   为了完成自动化序号排列以及删除功能，需要$index服务，不需要依赖注入。
   
    当每个删除按钮点击的一瞬间，Angular如何判断该删除哪个呢？

 
    我们为每一个删除按钮button添加一个指令 `ng-click = 'remove($index)'`
    
这里，Angular就是通过`$index`来自行判定当前的行序。来看这一块的代码：

```
<tr ng-repeat="user in users">
    <td>
        <span class="glyphicon glyphicon-pencil btn btn-info" ng-click="toggle()">编辑</span>
    </td>

    <td>{{$index+1}}</td>
    <td>
        <input type="text" value="{{user.name}}" ng-disabled="bool" />
    </td>
    <td>
        <input type="text" value="{{user.age}}" ng-disabled="bool" />
    </td>
    <td>
        <input type="text" value="{{user.job}}" ng-disabled="bool" />
    </td>
    <td>
        <button class="btn btn-danger" ng-click="remove($index)" ng-show="!bool">删除</button>
    </td>

</tr>
```
OK，删除，排序，Toggle功能都完成了，还有一个增加新用户怎么完成呢？

这个更简单了，直接往Object Array 里 push 对象即可：

```
/****这是增加用户按钮的指令*****/
ng-click = "addUser()"

/*****以下是js*****/

 $scope.addUser = function(){
       var index = $scope.users.length-1;  //确定当前最大的行序（ps.本来想自己实现 $index 功能的。。。）
  
       	$scope.users.push({name:'',age:'',job:''});
       
       }
```

以上，就完成了一个后台管理系统，这是初始版本，后续我会增加新的功能在里面。



## 4.初步完成alpha版本，觉得还是有很多不足之处： ##

1.数据很糙，很杂，controller中的东西太过冗杂，而我并没有选择使用构建工具来模块

化、打包、合并，这不是一个好习惯。

2.所有的输入框没有加入过滤器，例如：姓名的位置我们可以用filter或者正则来强行限

定只能输英文，而不是数字或者标点。 这是一个细节不够完善的地方。

3.在点下编辑的时候，文本框变得可以编辑，再次点下编辑，文本框变成了丑丑的不可

编辑，我在想：**

如何可以使得文字在不可编辑的状态下自动切换为`<p>`标签，而在可编辑的状态下变成`<input>`表单？
------------------------------------------------

**
4.自学了这么久ajax,nodejs，然而并没有从后端拉任何数据，所有数据都是angular来

进行操作的，这样也不好，我希望尽快精通express，来进行项目的全栈构建。

以上问题留给自己去解决。


最后，附上我的Github地址，fork 或者 download都可以

地址：https://github.com/ZQ-jhon/Manage-system-By-AngularJs

注意：将 index.html中的

```
<script>以及<link>的src 及 href 替换 成本地目录 
```




<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

