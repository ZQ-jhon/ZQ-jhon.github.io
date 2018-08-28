---
title:  TypeScript学习笔记
date:   2018年3月11日 18:28:38
tags: [typescript,编译,javascript,工具]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891/article/details/79324863)

##  前言 ##
TypeScript是JavaScript的超集，它的作者是著名的C#之父（名字我忘了）。作为后者的超集，Typescript(以下简称为tsc)拓展了JS，真正的将js从玩具语言变成一种工程语言，一种强类型的语言。并且，tsc的标准是根据每年的ECMA提案来预先实现的，也就是说，tsc兼容未来的ES7，ES8...提前为将来的ES标准打下基础。
    学习tsc，不亏!
## 环境搭建  ##
```
$ cnpm install -g typescript
```
完事，安装tsc的npm包，就是为了使用它自带的功能，将.ts文件编译成.js文件，从而兼容各种平台及浏览器，编译的命令行如下：

```
$ cd your File_path
$ tsc File_name.ts
```
OK,执行完，发现在.ts的同目录下，自动编译完成一个同名的.ts文件。

![tsc](http://img.blog.csdn.net/20180214112403989?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 类型检测##
1.基本类型检测

在js中，命名一个变量通常不用指定类型，tsc弥补了这个劣势，加入类型监测，形如：


```
let a:number = 1;  //OK

let a:string = 1;  //error

类型检测的语法，就是在变量屁股后面缀上 :类型

```



2.数组的类型检测：

```
let arr:number[]=[1,2,3];   //ok   类型+[]
 
let brr:Array<number>=[4,5,6]; //OK  数组泛型+尖括号< 类型 >
```
3.元组类型 Tupe 

```
let X:[number,string];
x=[1,'hello']; //OK
x=[1,2];  //type error
元组类型适用于已知个数和元素类型的数组。
```


## 字符串拼接及字符串模板 ##


拼接：跟ES6一样，通过`（``）`来实现，【`】为Tab上面的按键。

for eg  :

```
let hi= (`
hello,
wrold!
`);

//输出 hello,world!
```
字符串模板：提供一种更优雅的书写方式：`${ 变量名}`

for eg:

```
let names:string = 'xiaoming';

let age:number = 23;

let sentence:string = (`

hello,my name is ${names},my age is ${age}

`);

```
编译后的js文件为:

```
var names = 'xiaoming';

var age = 23;

var sentence = ("\nhello,my name is " + names + ",my age is " + age + "\n");

document.body.innerHTML = sentence;

```

## 枚举类型 ##


```typescript
enum flower {a,b,c,d,e,f,g};  //enum关键字，后跟枚举类型的命名

let rouse:flower = flower.a;  //定义一个rouse，类型是刚才定义的枚举类型flower其中的a属性

alert(rouse);  // 0 表明rouse映射的对象，在flower中的index为0

```
## Any类型 ##
有时候不希望tsc太严格，对于部分变量或者数据开个后门，就可以声明Any 任意类型。


![any类型](http://img.blog.csdn.net/20180214120224290?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

let不能重复定义，我就用var来演示。


Any类型也可以像数组的第一种定义方法一样，形如：

```
Array:

let arr:number[]=[1,2,3];  // OK

数字的组合，可不就是数组吗？


字符串组、布尔值组...

let brr:string[] = ['a','b','c'];

let crr:boolean[] = [true,false];


Any:

let drr:any[]=[1,'2',true];  //  OK


只知道是个类似于数组的数据类型，但是对元素的类型不做限制。

```

## Void类型##


void类型表示空。常用在函数返回值，形如：

```
//注意函数返回值类型检测的写法
function foo():void{

alert('123');

};

```
其实，void包含两种数据类型，就是null和undefind。

触类旁通，其实还有两个类型是null和undefind，如图所示：

![null&undefind](http://img.blog.csdn.net/20180214121723225?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
如图所示，两个类型不仅自暴自弃，还拉对方下水，形成“你中有我，我中有你”的关系。
## 类型断言 ##

作用就是清楚的告诉编译器，我知道a是number类型的，不要给我搞事。
写法一：



```
let a:number =1; 

let b:any = <number>a ;  //赋值
```
第二种写法:

![类型断言](http://img.blog.csdn.net/20180214131500183?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



## Let ##

来看这样一段代码：
![for循环实例](http://img.blog.csdn.net/20180220191341275?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

在这个for循环中，有一个setTimeout异步函数，循环5次，打印出的结果是什么呢？

![运行结果](http://img.blog.csdn.net/20180220191448648?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可见，连续打印了5次5，为什么5次都是5 呢？因为setTimeout是一个异步函数，他会等待其他函数执行完，再执行，没有拿到i的最终结果，他不会执行。

**究其本质，是因为for循环()中的作用域与{}中的作用域混淆了，如果将这两个作用域独立，那么setTimeout不会等待i的最终执行结果**

将上述代码的`var i`改为`let i`这样，for 循环中的()部分就有了自己独立的块级作用域，所以每次setTimeout执行的时候就不会等待i的最终结果。
因此，代码结果如下图所示：

![let执行结果](http://img.blog.csdn.net/20180220191954426?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

再来看一个对比：

![使用var声明](http://img.blog.csdn.net/20180220193631816?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

将var 改为let 


![使用let声明](http://img.blog.csdn.net/20180220193713998?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可见，两种声明，是一摸一样的输出，为什么呢？
var的声名方式，是因为()和{}基本上可以视为同一作用域，而let的声名方式稍有不同，每次`for(let i=0;i<5;i++)`的迭代，都会创建一个新的作用域{}，因此，每次的结果照样可以打印出来。
**因为这里没有异步函数**，即便二者的作用域不同(前者是一个全局作用域，后者是两个块级作用域)，输出也是相同的。

总结：使用var或者let，如果当输入环节没有异步函数，无论再怎么变换作用域，那么输出相同，否则，输出不同。

## Const ##
定义了一次，就不能再次定义或者修改赋值。这种定义的方法，用于只读数据，没有修改权限的时候用。
eg:

```
const a = 1 ;

const a = 2 ; //error
```

## 结构赋值 ##

普通结构赋值：

![普通结构赋值](http://img.blog.csdn.net/20180220195746635?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


函数参数结构赋值：

![函数结构赋值](http://img.blog.csdn.net/20180220200215178?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

注意：函数的参数在类型监测的时候，用结构赋值，需要冒号【:】。



## 数组中的【...】解构语法 ##

![数组解构](http://img.blog.csdn.net/20180220200938878?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

输出：

![输出](http://img.blog.csdn.net/20180220201035491?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可见，对于未知元素(数组中的成员)，默认是对象，当打印输出的时候，会将其当做数组对象来看待。

## 对象解构 ##


![对象解构](http://img.blog.csdn.net/2018022020404810?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**直接结构，这里要注意，新定义的对象中，key键名，一定要与被解构对象的属性名字相同，且不能跳跃式解构。**

**下图是错误示范**：


![对象解构错误示范](http://img.blog.csdn.net/20180220204209671?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

那么同理，如果在一个方法中返回对象，同样也可以被解构。
![函数返回的对象也可以解构赋值](http://img.blog.csdn.net/2018022113342527?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

如果对象存在嵌套现象，可以使用冒号表达式：

![嵌套的对象，使用冒号表达式来嵌套化结构](http://img.blog.csdn.net/20180221133915180?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
## 展开 ##

还是使用...语法，进行数组或者对象的浅拷贝。


数组展开，形如：
![数组展开](http://img.blog.csdn.net/20180220205541321?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


对象展开，形如：

![对象展开](http://img.blog.csdn.net/20180220205712494?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


**对象展开时，所有传入的键值对，一旦有重复，按照覆盖原则，后面的value会覆盖前面的。执行顺序是从左到右。**




## 可选参数、默认参数 ##

```
function test(a:string,b?:string,c="wang"){
console.log(a)
console.log(b)
console.log(c)

}

a为string类型，b为可选参数(string类型)，c是有默认值的参数

```

**确定的参数要现在第一个，不能把可选参数写在第一位。**

## 函数断点Yield ##
在往常的js代码中，不可以人为的暂停或者恢复代码的运行，但是现在有了yield关键字，就可以将函数的执行流程化，从而让我们有条不紊的控制步骤。

```
function* foo(){
    console.log(1);
    yield; //设置断点，下同

    console.log(2);

    yield;

    console.log(3);

    yield;
};

/*设置断点以后，并不能直接foo.next()，因为其内部没有next方法。
 *必须重新赋值，再调用。
 */

let zoo =  foo(); 

//这里有三个断点，简单的可以理解为，把函数的执行流程划分为三个阶段，每次的调用，只是执行其中的一个阶段。
zoo.next();//1
zoo.next();//2
zoo.next();//3
```

## 箭头函数 ##
作用一：主要用于声明匿名函数，简化代码。
```
var sum = (a,b)=>a+b

上式等价于：
var sum = function (a,b){
retrun a+b;
};
```
作用二：消除this指针带来的歧义,优化执行上下文。

```
function getName (name) { 
 this.name = name ;
  setInterval(function () { console.log('name is '+this.name)},1000)
};

var john = new getName('jhon');
console.log(john)       // 打印 name is (空)
```

这里由于getName()是全局函数，就是window下的一个方法，但是console.log()时，由于window下并没有定义 window.name 属性，因此，打印出来的值是 undefind。

使用箭头函数改造：

```
function getName (name) { 
 this.name = name ;
    setInterval(() => console.log('name is '+this.name)),1000)
};

var john = new getName('jhon');
console.log(john)       // 打印 name is jhon
```

## For...of循环 ##
**for...in 循环对象的下标**

```
var arr = [1, 2, 3, 4];
arr.name = 'myArr';

for (var n in arr) { 
    console.log(n+'=='+arr[n])
}
//输出0=1,1=2,2=3,3=4,name=myArr
```

**for of 循环对象的key**

```
var arr = [1, 2, 3, 4];
arr.name = 'myArr';

for (var n of arr) { 
    console.log(n+'=='+arr[n])
}
//输出0=1,1=2,2=3,3=4,undefind

//还可以循环字符串
var arr ='hello,world!'


for (var n of arr) { 
    console.log(n)
}
//h,e,l,l,o,，w,o,r,l,d,!;

```

**forEach  循环循环对象的key值，并且可以循环对象的key值对应的value，但是不能循环数组之外新添加的属性**

```
var arr = [1, 2, 3, 4];
arr.name = 'myArr';

arr.forEach(function (n,v) { 
    console.log(n,v)
})
//输出1,2,3,4，但是没有输出我们定义的name
```
总结：for...in循环数组下标。forEach很体面，但是有局限性(不能访问数组外部定义的属性)，for...of有点鸡肋，但是胜在使用场景广泛。


## interface接口 ##
interface是一种类型，预先定义好一系列的属性的类型，然后供新的对象来使用它。

![interface](http://img.blog.csdn.net/2018022210063595?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
当然，接口中预先定义的变量，也可以规定/限制函数中的参数：

![限制函数中的参数](http://img.blog.csdn.net/20180222103808977?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


## 基于Class的继承 ##

在es3中，javascript的继承只能通过原型链来继承，现在可以通过Class类来继承 。真不愧是“JAVA”script!

![基于Class的继承](http://img.blog.csdn.net/20180220210913277?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

访问权限关键字：
**public** 公共成员。  子类、父类内部都可以访问到。

**private** 私有成员。只允许在类中访问。

**protected** 超类的私有成员。但是在子类中仍然可以访问。

构造器Construcor：

```
//形如：
constructor(){
 name?string;
};

```
在构造器中，相当于新建了一个局部的作用域，在构造器中声明的变量、属性都是局部的，哪怕是在Class内部、构造器之外，也无法访问。

举例说明：


![构造器内部的变量无法被全局访问](http://img.blog.csdn.net/20180222105023915?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

这时候，只要在构造器的name上增加关键字`public`，即可在class中全局访问：



![加上public，没有报错](http://img.blog.csdn.net/20180222105147415?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**类的继承**
真的比基于原型链的继承更加优雅和简便。
![通过extends关键字实现继承](http://img.blog.csdn.net/20180222105737601?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjAyNjQ4OTE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)








<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>