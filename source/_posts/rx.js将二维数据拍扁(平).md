---
title:  rx.js将二维数据拍扁(平)
date: 2018-09-26 20:00:00
tags: rxjs
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文初始编辑地址，源自我的CSDN博客：[我的CSDN博客](https://blog.csdn.net/qq_20264891/article/details/82858004)


```javascript
        /** 
         * 从后台返回如下格式数据 
         * 
         * 期望数据结构： [...{ index:'', name: '', age: '' }]  该数据类型的长度为 9 (所有数据拆开的总长度)
         */
        const response = {
            content: [
                [{ index: 0, name: 'aa1', age: 11 }, { index: 0, name: 'aa2', age: 11 }, { index: 0, name: 'aa3', age: 11 }],
                [{ index: 1, name: 'bb1', age: 12 }, { index: 1, name: 'bb2', age: 12 }, { index: 1, name: 'bb3', age: 12 }],
                [{ index: 2, name: 'cc1', age: 13 }, { index: 2, name: 'cc2', age: 13 }, { index: 2, name: 'cc3', age: 13 }]
 
            ],
        };
 
// 使用 Rx.js
 
        of(response).pipe(
            map(res => res.content),
            mergeMap(arr => from(arr)),
            mergeMap(arr => from(arr)),
            toArray(),
        ).subscribe(res => console.log(res));

```
最终结果：

<img src="https://img-blog.csdn.net/20180926193747185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIwMjY0ODkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>

说明：无论嵌套多复杂，嵌套几层，都能用 opreator 给拍平，这就是纯函数强大的地方，指责单一，功能明确，代码量小。

<b>觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
