---
title: Base64 encode decode image #标题
date: 20190906 17:33:01 #创建时间
tags: [javascript] #标签(同级)
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文章原始创作地址：[https://blog.csdn.net/qq_20264891/article/details/100583761](https://blog.csdn.net/qq_20264891/article/details/100583761)

如您有其他建议，可以通过左上角的 QQ 发起回话，或者在 https://zq-jhon.github.io/about/ 中添加我的微信


#### 前言

最近在修福报，深深觉得，一个程序员或者成年人，最大的敌人就是时间，没有时间，就会陷入焦虑的怪圈，一直出不来。



#### What is Base64

Base64 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。Base64 这个词出自一种 MIME 数据传输编码。 ----- from [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)



对于前端而言，Base64 使用范围广泛，可以对 ASCII 码进行编码，也是作为 雪碧图 的一种备选方案，即增加运行时的体积，但是减少了静态资源的请求数。对图片的 Base64 编码见 [Advanced](#Advanced)



#### How to use



浏览器 API

```typescript



// 编码

let encodedData = window.btoa("Hello, world");  // 此时 encodedData = 'SGVsbG8sIHdvcmxk'



// 解码

let decodedData = window.atob(encodedData);    // 此时 decodedData = ‘Hello, world’



```



#### Advanced



对于常见的 ASCII 可以解析，那么对于图片，自然有另外的方法：



**法一： 通过 fetch 图片的 response.arrayBuffer() 来获取二进制缓冲流来进行编码。**



```typescript

const image = `https://www.xxxxx.xxxx/abc.png`;

fetch(image).then(response => response.buffer())

            .then(buffer => buffer.toString("base64"));

```

目前 NPM 上最活跃的 imageToBase64 中, 是这么写的： [imageToBase64](https://github.com/renanbastos93/image-to-base64/blob/master/image-to-base64.js#L43)




**法二：通过 Canvas**



```javascript

// 大致思路:

document.querySelector('canvas').getContext('webgl').canvas.toDataURL('image/jpeg', 0.5);

```

第一种，通过图片 url 来获取 base64



```javascript

function getUrlBase64(url, ext, callback) {

    let canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = new Image;

    img.crossOrigin = 'Anonymous';

    img.src = url;

    img.onload = function () {

        canvas.height = 60;

        canvas.width = 85;

        ctx.drawImage(img, 0, 0, 60, 85);

        const dataURL = canvas.toDataURL("image/" + ext);

        callback.call(this, dataURL);

        canvas = null;

    };

}

```



第二种，parameter 直接是 image



```javascript

function getImageBase64(img, ext) {

    var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样

    canvas.width = img.width;

    canvas.height = img.height;

    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图

    var dataURL = canvas.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式

    canvas = null; //释放

    return dataURL;

}

```