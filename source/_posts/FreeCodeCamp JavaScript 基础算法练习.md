---
title: FreeCodeCamp JavaScript 基础算法练习
date: 2019-04-06 00:09:11
tags: [算法]
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---

## 起由 ##
最近由于 996.icu 事件，才知道 GitHub 排行前十的 repo 中有这样一个项目。于是就刷起来了

## 题 & 解 ##

 **1. 找出最长单词  在句子中找出最长的单词，并返回它的长度。函数的返回值应该是一个数字。**
	
```javascript
// 测试用例 (test case): 
findLongestWord("The quick brown fox jumped over the lazy dog") 应该返回一个数字
findLongestWord("The quick brown fox jumped over the lazy dog") 应该返回 6.
findLongestWord("May the force be with you") 应该返回 5.
findLongestWord("Google do a barrel roll") 应该返回 6.
findLongestWord("What is the average airspeed velocity of an unladen swallow") 应该返回 8.
findLongestWord("What if we try a super-long word such as otorhinolaryngology") 应该返回 19.
```
解答： 

```javascript
function findLongestWord(str) {
 // 直接根据空格分割, 映射成 word 的长度，再使用 Math API 选出最大的
  const arr = str.split(' ').map(word => word.length);
  return  Math.max(...arr);
}
```
**2. 句中单词首字母大写  确保字符串的每个单词首字母都大写，其余部分小写。像'the'和'of'这样的连接符同理。**
```javascript
// 测试用例 (test case): 
titleCase("I'm a little tea pot") 应该返回一个字符串
titleCase("I'm a little tea pot") 应该返回 "I'm A Little Tea Pot".
titleCase("sHoRt AnD sToUt") 应该返回 "Short And Stout".
titleCase("HERE IS MY HANDLE HERE IS MY SPOUT") 应该返回 "Here Is My Handle Here Is My Spout".
```
解答： 

```javascript
function titleCase(str) {
  // 字符串处理的步骤和顺序至关重要
  return  str.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
}

```

**3. 找出多个数组中的最大数 右边大数组中包含了4个小数组，分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新数组。**
*提示：你可以用for循环来迭代数组，并通过arr[i]的方式来访问数组的每个元素。*
```javascript
// 测试用例 (test case): 
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]) 应该返回一个数组
largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]) 应该返回 [27,5,39,1001].
largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]) 应该返回 [9, 35, 97, 1000000].
```
解答： 

```javascript
function largestOfFour(arr) {
  const result = [];
  arr.forEach(child => result.push(Math.max.call(...child)));
  return result;
}
```
你以为对了吗？？？？
呵呵

```javascript
// 举个例子

const array= [1000000,1001];
Math.max.call(...array);
// output is 1001

所以，解答的结果中为： [9, 35, 97, 1001]，与预期  [9, 35, 97, 1000000] 不符

// WTF! WHY?
// 因为，在调用  `Math.max.call() ` 时，第一个参数传递 This 指针，实际上传入的却是一个数字，因此，该函数的运行时应该是这样的

Math.max.call(null, 1001) 等价于 Math.max(1001) 
// 实际上，参数只进去一个，自己跟自己没啥好比的。因此，当数组只有两个参数时，实际的输出结果完全取决于第二个参数是啥。


// 正确解法一：
function largestOfFour(arr) {
  const result = [];
  arr.forEach(child => result.push(Math.max(...child)));
  return result;
}

// 正确解法二
function largestOfFour(arr) {
  const result = [];
  arr.forEach(child => {
  if(child.length > 1) {
     result.push(Math.max(...child))
   }
  if(child.length === 1) {
    result.push(child);
 }
  if(result.length === 0) {
   // 入参的时候应该不会传空数组，但还是防一手
  return ;
 }

});
  return result;
}
```
**4. 检查字符串结尾  判断一个字符串(str)是否以指定的字符串(target)结尾。 如果是，返回true;如果不是，返回false。**
```javascript
// 测试用例 (test case): 
confirmEnding("Bastian", "n") 应该返回 true.
confirmEnding("Connor", "n") 应该返回 false.
confirmEnding("Walking on water and developing software from a specification are easy if both are frozen", "specification") 应该返回 false.
confirmEnding("He has to give me a new name", "name") 应该返回 true.
confirmEnding("He has to give me a new name", "me") 应该返回 true.
confirmEnding("He has to give me a new name", "na") 应该返回 false.
confirmEnding("If you want to save our world, you must hurry. We dont know how much longer we can withstand the nothing", "mountain") 应该返回 false.
```

解答： 
```javascript
function confirmEnding(str, target) {
  if(target.length === 1) {
    return str[str.length-1] === target;
  }
  // 分割母字符串
  const arr = str.split(' ');
  return (arr[arr.length-1].indexOf(target) > 0) || arr[arr.length-1] === target;
}
```
**5. 重复输出字符串 （重要的事情说3遍）重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。**
```javascript
// 测试用例 (test case): 
repeat("*", 3) 应该返回 "***".
repeat("abc", 3) 应该返回 "abcabcabc".
repeat("abc", 4) 应该返回 "abcabcabcabc".
repeat("abc", 1) 应该返回 "abc".
repeat("*", 8) 应该返回 "********".
repeat("abc", -2) 应该返回 "".
```
解答：
```javascript
// ES6
function repeat(str, num) {
  // 请把你的代码写在这里
  return num > 0 ? str.repeat(num) : '';
}

// ES5
function repeat(str, num) {
  if(num > 0) {
  	let result = '';
	for(var i = 0;i< num;i++) {
	  result += str;
	  }
	  return result;
  }
  else {return ''}
}
```
**6. 截断字符串 （用瑞兹来截断对面的退路）  如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。 切记，插入到字符串尾部的三个点号也会计入字符串的长度。
*但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。***
```javascript
// 测试用例 (test case): 
truncate("A-tisket a-tasket A green and yellow basket", 11) 应该返回 "A-tisket...".
truncate("Peter Piper picked a peck of pickled peppers", 14) 应该返回 "Peter Piper...".
truncate("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length) 应该返回 "A-tisket a-tasket A green and yellow basket".
truncate("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2) 应该返回 "A-tisket a-tasket A green and yellow basket".
truncate("A-", 1) 应该返回 "A...".
truncate("Absolutely Longer", 2) 应该返回 "Ab...".
```

解答：
```javascript
function truncate() {
  if(str.length > num) {
    return str.substr(0,num-3) + `...`;
  }
  if(num <= 3) {
        return str.substr(0,num) + '...';
  }

}
```
**7. 猴子吃香蕉, 分割数组 （猴子吃香蕉可是掰成好几段来吃哦） 把一个数组arr按照指定的数组大小size分割成若干个数组块
例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];
chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];**
```javascript
// 测试用例 (test case): 
chunk(["a", "b", "c", "d"], 2) 应该返回 [["a", "b"], ["c", "d"]].
chunk([0, 1, 2, 3, 4, 5], 3) 应该返回 [[0, 1, 2], [3, 4, 5]].
chunk([0, 1, 2, 3, 4, 5], 2) 应该返回 [[0, 1], [2, 3], [4, 5]].
chunk([0, 1, 2, 3, 4, 5], 4) 应该返回 [[0, 1, 2, 3], [4, 5]].
chunk([0, 1, 2, 3, 4, 5, 6], 3) 应该返回 [[0, 1, 2], [3, 4, 5], [6]].
chunk([0, 1, 2, 3, 4, 5, 6, 7, 8], 4) 应该返回 [[0, 1, 2, 3], [4, 5, 6, 7], [8]].
```

解答
```javascript
function chunk(arr, size) {
	if(arr.length < size) {
		return arr;
	}
  // 请把你的代码写在这里
  const result = [];
  for(var i=0;i< arr.length;i=i+size) {
   result.push(arr.slice(i,i+size))
   
 }
  return result;
}
```
这道题一时半会我也没有思路，网上搜索的答案。
针对该类问题，大概的思路就是: **通过迭代不断简化问题的复杂度，在每次迭代中处理细化后的小 case **
take a case:

```javascript
const arr = [1,2,3];
const size = 2;
// 第一次迭代时: 
i = 0;  i + size = 0 + 2 = 2;
// 因此 ( slice 操作是半闭半开区间 )
arr.slice(0,2) => [1,2]  

// 第二次迭代时：
i = 之前循环末尾语句的计算结果
i = 2; i + size = 2 + 2 = 4;
arr.slice(2,4) => [3]

// 第三次迭代时， i = 4, 已经无法通过循环条件 i < arr.length( 4 > 3 )，退出循环体

// 此时， result 的结果为 [[1,2],[3]]
*/
```

**8. 截断数组  返回一个数组被截断n个元素后还剩余的元素，截断从索引0开始。**
```javascript
// test case: 
slasher([1, 2, 3], 2) 应该返回 [3].
slasher([1, 2, 3], 0) 应该返回 [1, 2, 3].
slasher([1, 2, 3], 9) 应该返回 [].
slasher([1, 2, 3], 4) 应该返回 [].
slasher(["burgers", "fries", "shake"], 1) 应该返回 ["fries", "shake"].
slasher([1, 2, "chicken", 3, "potatoes", "cheese", 4], 5) 应该返回 ["cheese", 4].
```
解答： 

```javascript
function slasher(arr, howMany) {
  if(arr.length < howMany) {
    
    return [];
  }
  
  arr.splice(0, howMany);
  return arr;
}
// 没啥好说的，splice 不是一个 pure function, 每次经过 splice 操作，都会改变原始数组
// 另外，数组的非纯方法还有:

 - Array.prototype.push()
 - Array.prototype.unshift()
 - Array.prototype.pop()
 - Array.prototype.shift()
 - Array.prototype.sort()
```
**9. 比较字符串 （蛤蟆可以吃队友，也可以吃对手）如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。
举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。
["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。
["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。**
```javascript
// test case
mutation(["hello", "hey"]) 应该返回 false.
mutation(["hello", "Hello"]) 应该返回 true.
mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]) 应该返回 true.
mutation(["Mary", "Army"]) 应该返回 true.
mutation(["Mary", "Aarmy"]) 应该返回 true.
mutation(["Alien", "line"]) 应该返回 true.
mutation(["floor", "for"]) 应该返回 true.
mutation(["hello", "neo"]) 应该返回 false.
```
**10. 比较字符串
（蛤蟆可以吃队友，也可以吃对手）
如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。
举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。
["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。
["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。**

```javascript
// test case
mutation(["hello", "hey"]) 应该返回 false.
mutation(["hello", "Hello"]) 应该返回 true.
mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]) 应该返回 true.
mutation(["Mary", "Army"]) 应该返回 true.
mutation(["Mary", "Aarmy"]) 应该返回 true.
mutation(["Alien", "line"]) 应该返回 true.
mutation(["floor", "for"]) 应该返回 true.
mutation(["hello", "neo"]) 应该返回 false.
```

解答： 
```javascript
// 啰里啰唆的写法
function mutation(arr) {
  const prev = arr[0].toLowerCase().split('').sort().join('');
  const next = arr[1].toLowerCase().split('').sort().join('');
  let result =  true;
  for(var i =0;i<next.length;i++) {
    if(!prev.includes(next[i])) {
      result = false;
    }
  }
  return result;
}
// 装逼写法
function mutation(arr) {
  const accumulator = (acc, prev, index, arr) => {
    // 如果只有一个成员，或者遍历不到下一个成员
    if (arr[index + 1]) {
      // 相比较的两个成员都进行转为小写操作
      prev = prev.toLowerCase();
      const next = arr[index + 1].toLowerCase();
      
      for (var i = 0; i < next.length; i++) {
        // 找不到后面字符串中的某个字符时，直接 return
        if(!prev.includes(next[i])) {
          return false;
        }
        acc = true;
      }
    }
    return acc;
  };

  return arr.reduce(accumulator, true);
}
```
**11. 过滤数组假值 （真假美猴王）删除数组中的所有假值。
在JavaScript中，假值有false、null、0、""、undefined 和 NaN。**
```javascript
// test case
bouncer([7, "ate", "", false, 9]) 应该返回 [7, "ate", 9].
bouncer(["a", "b", "c"]) 应该返回 ["a", "b", "c"].
bouncer([false, null, 0, NaN, undefined, ""]) 应该返回 [].
bouncer([1, null, NaN, 2, undefined]) 应该返回 [1, 2].
```

解答：
```javascript
function bouncer(arr) {
  // 请把你的代码写在这里
  return arr.filter(member => Boolean(member));
}
// API 背的熟练， Easy
```
12. 摧毁数组  金克斯的迫击炮！实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。
```javascript
// 垃圾 撸啊撸，还金克斯，垃圾游戏，抄袭我 Dota
// test case
destroyer([1, 2, 3, 1, 2, 3], 2, 3) 应该返回 [1, 1].
destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3) 应该返回 [1, 5, 1].
destroyer([3, 5, 1, 2, 2], 2, 3, 5) 应该返回 [1].
destroyer([2, 3, 2, 3], 2, 3) 应该返回 [].
destroyer(["tree", "hamburger", 53], "tree", 53) 应该返回 ["hamburger"].
```
解答：
```javascript
function destroyer(arr, ...rest) {
  // 请把你的代码写在这里
  const params = Array.from(rest);
  params.map(member => {
   arr = arr.filter(item => item !== member);
  });
  return arr;
}
// 原文中， destoryer 函数只接受一个参数，想要考察 arguments, 可改造如下：
function destoryer(arr) {
// 深拷贝一下
const brr = JSON.parse(JSON.stringfy(arr));
// 把默认的数组过滤掉
brr.shift();
const params = Array.from(brr);
  params.map(member => {
   arr = arr.filter(item => item !== member);
  });
  return arr;
}
```
**13. 数组排序并找出元素索引
我身在何处？
先给数组排序，然后找到指定的值在数组的位置，最后返回位置对应的索引。
举例：where([1,2,3,4], 1.5) 应该返回 1。因为1.5插入到数组[1,2,3,4]后变成[1,1.5,2,3,4]，而1.5对应的索引值就是1。
同理，where([20,3,5], 19) 应该返回 2。因为数组会先排序为 [3,5,20]，19插入到数组[3,5,20]后变成[3,5,19,20]，而19对应的索引值就是2。**

```javascript
// test case
where([10, 20, 30, 40, 50], 35) 应该返回 3.
where([10, 20, 30, 40, 50], 30) 应该返回 2.
where([40, 60], 50) 应该返回 1.
where([3, 10, 5], 3) 应该返回 0.
where([5, 3, 20, 3], 5) 应该返回 2.
where([2, 20, 10], 19) 应该返回 2.
where([2, 5, 10], 15) 应该返回 3.
```
解答
```javascript
function where(arr, num) {
  // 为什么不适用默认的 sort 参数呢？可以测试一下 [1,100,1000,1001,10000,10001 ].sort() 的结果
  // 进行非纯排序
  arr.sort((a,b) => a-b); 
  
  // let 个变量，用于缓存最终插入的下标
  let insetIndex = 0 ;
  // 当所有成员都小于等于给定值，那么插入的位置为最后一个
  if(arr.every(member => member <= num)) {
    insetIndex = arr.length;
  } 
  // 当所有成员都大于等于给定值，那么插入位置为第一个
  else if(arr.every(member => member >= num)) {
    insetIndex = 0;
  }
  // 如果都不是，那么，找到比他大的那个数的下标，将此下标作为最终的插入下标
  else {
    insetIndex = arr.findIndex(member => member >= num);
  }
  return insetIndex;
}
/** PS： 在 
else {  
insetIndex = arr.findIndex(member => member >= num); 
} 
逻辑中，我本来判断的是 
member => member <= num 
这样是不对的，因为可能有多个数比他小，返回第一个比他小的数，位置不准确
*/
```
**14. 凯撒密码 （让上帝的归上帝，凯撒的归凯撒）下面我们来介绍风靡全球的凯撒密码Caesar cipher，又叫移位密码。
移位密码也就是密码中的字母会按照指定的数量来做移位。 一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔ 'O'，以此类推。
写一个ROT13函数，实现输入加密字符串，输出解密字符串。**
 
 什么是凯撒密码？一张图说明：
 下图搬运自：
 https://img-blog.csdn.net/20180826085456567?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5ncWl1bWluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70
![图片搬运自https://img-blog.csdn.net/20180826085456567?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5ncWl1bWluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70](https://img-blog.csdn.net/20180826085456567?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5ncWl1bWluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
我的理解： 简单来说，凯撒密码的规则就是，加密和揭秘双方以一个数字作为密钥，来约定每个字母的位移顺序。例如，密钥为3时，A => D, B=> E ...  X => A (因为X的 charCodeAt +3 已经超过了 Z，不符合规则，因此需要 先减去一个 循环的周期 26，再按照密钥+3)
不 BB 了， show you code
```javascript
`X`.charCodeAt(0) = 88;
String.fromCharCode(88+3); // '[' 不符合凯撒加密规则，因此需要先往回撤回一个密码表周期, 即 26 ，再按照密钥位移 +3

String.fromCharCode(88-26+3); // 'A' this is right!
```


解答：
```javascript
function rot13(str) {
    // 将一段话，转换为可以被处理的二维数组 eg: `hello, my wolrd!` => [`hello,`,`my` ,`world`];
    const stringArrays = str.split(' ').filter(member => !!member);
    // 再分别处理每一个 "单词"
    const parseResult = stringArrays.map(word => {
      // 将每个单词转换为数组，对每个字符进行处理
      return Array.from(word).map(charator => {
            // A 对应的 ASCII => 65 , N 对应的 ASCII => 78
            const ZCode =  'Z'.charCodeAt(0);
            let current = charator.charCodeAt(0);
            // 非字母的处理方法
            if(current < 65 || current > ZCode) {
                return charator;
            }
            // 
            else {
                const dest = (charator.charCodeAt(0) + 13) > ZCode ? (charator.charCodeAt(0) -26 + 13): charator.charCodeAt(0) + 13;
              return String.fromCharCode(dest); 
            }
          
        }).join(''); //单词中的每个字母拼接，不用空格
      
    }).join(' '); //多个单词拼接，需要空格
    return parseResult;
  }
// 另外，这里的 
 if(current < 65 || current > ZCode) {
                return charator;
            }
 可以使用 String.match(/\w/g) 来命中为数组，从而过滤掉非字母的标点符号
```

## 总结 ##
这些算法都是最最最最最基本的算法，然而在解决这些问题中，还是出现了卡壳的地方。
算法还是得多练，人脑的逻辑思维，就得靠大量算法来优化和调教~
keep moving !


<b>😘觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
