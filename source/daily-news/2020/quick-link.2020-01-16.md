## quick-link

来自 GoogleChromeLib team 的小玩意，可以在浏览器空闲时，进行资源的预加载，使得之后有可能要跳转的路由会加载的更快。

大致原理如下：

1. 检测当前页面所有的 links.

2. 等待浏览器空闲，即在帧绘制的间隙。

3. 分析用户的网络状况，通过 `navigator.connection.effectiveType` 来判断用户的网络类型，quick-link 将通过 `requestIdleCallback` API，推入每个 pre-fetch 的任务，根据网络状况的好坏，来决定加载量。

举个例子：

```typescript
const tasks = [] as  Promise<Response>[];
links.forEach(link => tasks.push(preFetch(link)));
await Promise.all(tasks);
```
**这些信息可能会预加载，也可能不会预加载。**

4. 当然了，上一步中的 link 看起来都一样，但其中有一部分是这样的：

```xml
<link url ="xxx" rel="prefetch">
```
因此，这部分 link 优先级比较高，quick-link 会优先考虑加载高优先级的 link.

PlayGround:
[https://anton-karlovskiy-quicklink-news.glitch.me/](https://anton-karlovskiy-quicklink-news.glitch.me/)

打开控制台，点击一个链接，看他加载了多少资源吧!

[Read More](https://github.com/GoogleChromeLabs/quicklink)

---


<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>