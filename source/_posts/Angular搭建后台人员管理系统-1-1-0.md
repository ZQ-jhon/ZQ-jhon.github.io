---
title: Angular搭建后台人员管理系统 1.1.0 
date: 2018-01-17 11:18:00
tags: angularjs
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/78863387)


今天基于原来的DEMO，将功能进行了调整。
![这里写图片描述](http://img.blog.csdn.net/20171221142259866?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
如图所示，增加了一个新的controller，完成了增删改查的最后一步：查。

step1中还是使用ng-repeat遍历出的options，然后这个select又绑定了一个model，可以在controller用于判定用户的选项，然后根据这个选项，在users的数组中进行查找，最后，显示在查询结果的框中。

今天遇到的几个问题：
1.数据可视化和canvas视图留了一个坑。
2.突然发现controller之间的方法、变量不可以共享，例如我在下面的控制器中创建的用户数组：

```
$scope.users=[
{...},
{...},
{...},
{...}
]
```
在上面查询控制器中无法访问，网上查询之，得到结果，原因是作用域无法访问，这点跟js比较像，两个在树形结构上是兄弟层级关系的节点，不能访问对方的内部变量。但是angular 可以像js一样，变量继承，因此，可以吧users挂到 相对比较高的祖先节点上，这样，其子控制器就可以访问到了。
3.在Step1的位置，出现了F5以后，默认出现一个空白options的现象，查看元素，得知该元素：

```
<option value="  undefind!"></option>
```
于是采用了一个笨办法，手动添加一个
`<option value="" selected=""></option>
`
然后，在ng-repeat的原始option选项中，也添加`selected="selected"，这样就OK了！`
4.今天对各个控制器进行合理的切分，达到模块化的效果，例如：

```
/*********根控制器的数据*********/
 	app.controller('rootctrl',function($scope){
 		$scope.users = [
 		{name:'LiMing',age:23,job:'fontAnggener'},
 		{name:'Hanmeimei',age:22,job:'teacher'},
 		{name:'Wangjie',age:25,job:'driver'},
 		{name:'Liusir',age:27,job:'business'},
 		{name:'guojingming',age:29,job:'editor'},
 		{name:'Yaoming',age:33,job:'player'}
 		
 		];
 	})
/**********增加用户 控制器*************/
 $scope.addUser = function(){
       var index = $scope.users.length-1;
  
       	$scope.users.push({name:'',age:'',job:''});
       
       }
 /**********查询 控制器************ /
 $scope.jiansuo = function(){
 			var a = $scope.selectValue;
 			$scope.result = a;
 		
 		
 		    if(a==""||null||undefined){
 		    	document.getElementById('sp').innerHTML="未选择/未输入!";
 		    	document.getElementById('inputInfo').setAttribute('placeholder','请先选择分类')
 		    }
 		    else{
 		    	document.getElementById('sp').innerHTML="您要查询的"+$scope.infos[a].name+"是:"+$scope.input;
 		    	document.getElementById('inputInfo').setAttribute('placeholder','请输入具体的'+$scope.infos[a].name+"！");
 		    }
 			
 			
 			
 		};
 /********删除 控制器***********/
    
      $scope.remove = function(index){
      
//   if($scope.users.length<=1){
//   	$scope.users.splice(index,1)
//   }
//   else{}
         	$scope.users.splice(index,1)
         
         

      	 	
            
      };
```
在切分这些控制器的过程中，一定要注意各个控制器的作用域，以及能否访问到调用数据。
GitHub:
https://github.com/ZQ-jhon/Manage-system-By-AngularJs/commits/master


<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>

