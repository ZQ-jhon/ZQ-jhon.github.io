---
title: ES7 decorator 深入探析 #标题
date: 2019-06-13 22:23:00 #创建时间
tags: [javascript, decorator] #标签(同级)
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文章原始创作地址：[https://blog.csdn.net/qq_20264891/article/details/91357985](https://blog.csdn.net/qq_20264891/article/details/91357985)

如您有其他建议，可以通过左上角的 QQ 发起回话，或者在 https://zq-jhon.github.io/about/ 中添加我的微信


### 起因

一直享受着  Anuglar 和 Nest 的红利，上来就是 `@Component(...) ` 或者 `@Controller(...)`，自己却没有实际的探究过背后的原理。于是今天想好好总结一下，沉淀沉淀。

### 前置条件（es5 原理）
之前看过红宝书，第六章提到过，js 对象的属性有几个特性：
1. [[configurable]] 是否可配置 
2. [[enumerable]] 是否可枚举
3. [[writeble]] 是否可修改值
4. [[value]] 写入的值是啥

*四个配置项都为 boolean 类型。*
这四个配置联合起来有一个名字，叫做**对象属性的描述符(descriptor)**
其中，writeble 和 value 还有另外一个名字， `setter` 和 `getter` 访问器）。
上代码：
```javascript
const obj = { };
Object.defineProperty(obj,'a', {
value: 1,
writeble: false,
});
console.log(obj); // {a: 1}
console.log(obj.a) // 1
obj.a = 3; // 修改 a 属性的值
console.log(obj.a) // 1

/**====================另一种写法====================*/
const d = {};
Object.defineProperty(d , 'name' {
get: function() {return 1},
set: function(value) {return false}
});

console.log(d) // {} 注意！！！！这里跟 writeble 和 value 不太一样，这里打印出来的对象，是没有显示 name 属性的！！！但是访问可以访问出来
d.name; // 1
d.name = 3; // 尝试修改 name 属性 
d.name; // 1
```
我们发现，配置了可写入项为  false 时，我们就无法去修改对象属性的值了，有点像冻结的意思。刚好，JS 有个 `Object.freeze()`， 来看一下
```javascript
const c = {name: 1};
Object.freeze(c);
c.name = 3;
console.log(c) // {a: 1}
```
发现和我们自己去配置 `writeble: false` 效果相同。不信？来验证一下：
```javascript
Object.getOwnPropertyDescriptor(c);
// 返回： 
{
	 name: {
	 configurable: false
	 enumerable: true
	 value: 1
	 writable: false
	}
}
```
### ES6 还要这么写吗？
不用。直接用`装饰器 decorator`来写。
#### 第一种，直接装饰 class，
作用： 给类增加动态属性，该动态属性并不会被继承，只能作为 **被装饰类** 的 静态属性。
注意： 给类添加静态属性的这种行为，是在 **编译时** 发生的！所以说：
**装饰器的本质就是编译时运行的函数**
```javascript
function addFlag(object) {
object.flag = true;
}

@addFlag
class Foo(){}
Foo.flag // true


// 来个实例
const f1 = new Foo();
f1.flag // undefined
```

#### 第二种，装饰属性
装饰器会在 `Object.defineProperty` 之前执行，也就是拦截默认的访问修饰符。
举个例子:
```javascript
// CSDN markdown 编辑器 为什么不支持 typescript 高亮？无语...
function nameEqual3(object, key, descriptor: PropertyDescriptor) {
    descriptor.value = 3;
    descriptor.writable = false;
}
class Person {

    @nameEqual3
    name() { }
}

const p = new Person();
console.log(p.name); // 3
```
可见其效果。
也支持传参，如下代码所示，请仔细阅读注释：
```javascript
  // 装饰器函数 (用闭包来封装一下)
  function sign(id) {
    return function (target, name, descriptor) {
      /**
       *  这里的 value 在我看来，更像是一个 getter, 所以可以直接被赋值成一个函数
       *  类似于：
       *  descriptor = {
       *     get: function(){ return this.value } 
       *  }
       */
      const oldValue = descriptor.value;
      /**
       * 这里的 args 实际上就是装饰器在运行时，挂载的函数的入参，下面的 log 日志会证明
       */
      descriptor.value = function (...args) {
        console.log(`args =>`, args);
        console.log(`标记 ${id}`);
        return oldValue.apply(this, args);
      };

      return descriptor;
    }
  }

  class Person {
    @sign(1)
    method(a, b) {
      return a + b;
    }
  }

  // 实例化和调用
  const p1 = new Person();
  p1.method(2, 4);
  
  // 输出：
   args => [3,4]
   标记 1
```

#### 第三种，装饰器的高级用法（链式调用, combine 以及 mixin)
##### 1.链式（连续）
首先来看链式（连续）调用，这次多加一个装饰器，并且继续通过打印的方式来查看下调用的顺序：
```javascript

// 装饰器函数 再 封装一层
function mark(id) {
  // 真正的装饰器函数以闭包形式返回
  return (obj, target, descriptor) => {
    // 不破坏原 getter 函数
    const old = descriptor.value;
    console.log(id);
    return descriptor.value = () => old.apply(this, id);
  }
}



class Person {

  @mark(1)
  @mark(2)
  method() { }
}


const p1 = new Person();

p1.method();

// 输出：
2 
1
```

咦？明明 `@mark(1) ` 在 `@mark(2)` 之前调用的啊，为什么 2 比 1 先执行了呢？
让我们打开 如下地址，跟着我一起分析：
[Type Script - Play ground](http://www.typescriptlang.org/play/#src=%0D%0A%2F%2F%20%E8%A3%85%E9%A5%B0%E5%99%A8%E5%87%BD%E6%95%B0%20%E5%86%8D%20%E5%B0%81%E8%A3%85%E4%B8%80%E5%B1%82%0D%0Afunction%20mark(id)%20%7B%0D%0A%20%20%2F%2F%20%E7%9C%9F%E6%AD%A3%E7%9A%84%E8%A3%85%E9%A5%B0%E5%99%A8%E5%87%BD%E6%95%B0%E4%BB%A5%E9%97%AD%E5%8C%85%E5%BD%A2%E5%BC%8F%E8%BF%94%E5%9B%9E%0D%0A%20%20return%20(obj%2C%20target%2C%20descriptor)%20%3D%3E%20%7B%0D%0A%20%20%20%20%2F%2F%20%E4%B8%8D%E7%A0%B4%E5%9D%8F%E5%8E%9F%20getter%20%E5%87%BD%E6%95%B0%0D%0A%20%20%20%20const%20old%20%3D%20descriptor.value%3B%0D%0A%20%20%20%20console.log(id)%3B%0D%0A%20%20%20%20return%20descriptor.value%20%3D%20()%20%3D%3E%20old.apply(this%2C%20id)%3B%0D%0A%20%20%7D%0D%0A%7D%0D%0A%0D%0A%0D%0A%0D%0Aclass%20Person%20%7B%0D%0A%0D%0A%20%20%40mark(1)%0D%0A%20%20%40mark(2)%0D%0A%20%20method()%20%7B%20%7D%0D%0A%7D%0D%0A%0D%0A%0D%0Aconst%20p1%20%3D%20new%20Person()%3B%0D%0A%0D%0Ap1.method()%3B%0D%0A%0D%0A%2F%2F%20%E8%BE%93%E5%87%BA%EF%BC%9A%0D%0A2%20%0D%0A1)
 来看右边编译后的 javascript 代码，只看 var decorator 被编译成了啥，下面的不用看，跟源码差不多。**请仔细阅读注释**
```javascript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
// 判断函数真正的入参，如果小于 3 个，r = target 否则 继续判断 ，在该 对象 的属性（被装饰的属性）上原本的 descriptor 是不是 null ？ 如果是，则 desc 等于 当前对象被装饰属性的 descriptor ，否则 r = 当前对象被装饰属性的 descriptor
// 这里的 d 用于缓存 下面遍历时 的 状态
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    // 这里的 Reflect 是 window 下的 全局对象，我们也知道， Reflect 对象根本没有 decorate 方法，所以， turthy 的分支并不会执行，而是走 falsy 分支.
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    /**********关键步骤************/
    // 这里遍历的是入参的装饰器数组，并且，从右倒叙遍历（起始下标为 decorators.length - 1）
    // d 是每次遍历的 装饰器返回的 descriptor, 通过 判断入参个数，来决定 r 的类型，以及是否通过 d(r) 来装饰某个对象。如果 入参 < 3 个，即 r 为 一个对象，执行 d(r) ； 否则如果 入参 > 3 个，即运行时传入了第四个参数 desc(descriptor) ， 此时的 r 其实就是 desc ，d(target, key, r) 意思是：用 入参的 desc 装饰对象 target 的 key 属性；否则 c < 4 ， 此时的 r  为 object 对象，d(target, key)；
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*************************下面这些先不用看***********************/

// 装饰器函数 再 封装一层
function mark(id) {
    var _this = this;
    // 真正的装饰器函数以闭包形式返回
    return function (obj, target, descriptor) {
        // 不破坏原 getter 函数
        var old = descriptor.value;
        console.log(id);
        return descriptor.value = function () { return old.apply(_this, id); };
    };
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.method = function () { };
    __decorate([
        mark(1),
        mark(2)
    ], Person.prototype, "method", null);
    return Person;
}());
var p1 = new Person();
p1.method();
```
上面啰里啰唆的注释是啥意思呢？
翻译成人话： 装饰器的执行顺序是个 栈， 后进先出。像极了... 爱情？不，像极了 **洋葱模型**。

##### 2. combine (合并)
合并指的是装饰器装饰某个类的属性的时候，同时应用多个装饰器的模式。（要跟下面的 `@mixin`）区分
```javascript

function eatApple(count) {
  return (obj,target,descriptor) => {
    const old = descriptor.value;
    console.log(`吃了 ${count} 个 苹果`);
    return old.apply(this);
  }
}


function runMeter(long) {
  return (obj,target,descriptor) => {
    const old = descriptor.value;
    console.log(`跑了 ${long} 米`);
    return old.apply(this);
  }
}


function combine(...descriptors) {
  // 想点办法，让入参的每个函数立马执行！要把自己得到的对象分配给两个小弟
  return (obj, target, descriptor) => descriptors.forEach(d => d.apply(this, [obj, target, descriptor]));
}


class Person {

  @combine(eatApple(1), runMeter(9))
  method() { }
}


const p1 = new Person();

p1.method();

// 输出：
吃了一个苹果
跑了 9 米
```
可见，在 `@combine()` 中传入的参数顺序，竟然跟最终的顺序 是一样的，咦？不是洋葱吗？这压根不是栈啊！
脑子里回想一下刚才解析源码的过程，我再次望向了这次的源码：
```javascript
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.method = function () { };
    __decorate([
        combine(eatApple(1), runMeter(9))
    ], Person.prototype, "method", null);
    return Person;
```
显而易见，这两个函数，直接是作为结果被传进去的，相当于栈里面只有 `mixin` 一个函数，无所谓是栈或者队列了，反正两个函数都在我内部执行，我让他怎么执行就怎么执行，为所欲为。所以这里的输出结果是同步的，完全就是因为栈里只有一个  member。
不信验证一下：
```javascript

function eatApple(count) {
  return (obj,target,descriptor) => {
    const old = descriptor.value;
    console.log(`吃了 ${count} 个 苹果`);
    return old.apply(this);
  }
}


function runMeter(long) {
  return (obj,target,descriptor) => {
    const old = descriptor.value;
    console.log(`跑了 ${long} 米`);
    return old.apply(this);
  }
}


function combine(...descriptors) {
  // 想点办法，让入参的每个函数立马执行！要把自己得到的对象分配给两个小弟
  return (obj, target, descriptor) => descriptors.forEach(d => d.apply(this, [obj, target, descriptor]));
}


class Person {

  @combine(eatApple(1), runMeter(9))
  @combine(eatApple(5),runMeter(100))
  method() { }
}


const p1 = new Person();

p1.method();

// 输出：
吃了 5 个 苹果
跑了 100 米
吃了 1 个 苹果
跑了 9 米
```
##### 3. mixin (混合) 
mixin 意为在一个对象之中混入另外一个对象的方法。
```javascript
function mixins(...list) {
  return function (target) {
  // Object.assign 可用于对象，即 编译后的 es3 runtime 指向 class.prototype
    Object.assign(target.prototype, ...list);
  };
}
const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
