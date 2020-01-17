
## 代码是如何执行的？
按照我的理解，有三个步骤：

1. scanner 
2. tokenize
3. AST（abstract syntax tree）

### 1. Scanner 扫描

compiler 会遍历扫描，对不同的字符（所有输入实际上都是 String）进行判断，这里包含了类型、value、code escape 等。

我找到了大名鼎鼎的 TypeScript 官方的 `scanner` [TypeScript-Scanner](../assets/typescript-scanner.js)

最终，第一步的制品 <sup>[1]</sup> 就是 Token stream. 

Token 流长啥样？

```typescript
VarKeyword 0 3
Identifier 3 7
FirstAssignment 7 9
FirstLiteralToken 9 13
SemicolonToken 13 14
```
意思就是，通过扫描线，将大量的语法分析成对应的 Token，大概知道每个单词，每个符号是干什么的，并记录下其始末位置。

### 2. Tokenlize
如果你看到了上面官方 Scanner 的源码，不难想到，这一步的过程，应该是这样的： 

```typescript
function tokenParser(tokenize: TokenStream): AST;
```

Token 流可以通过特定的解析规则 (parser) 生成 AST，AST 一定程度上描绘了 Code Path，可以看作一个庞大的 JSON.

点击了解更多： [https://astexplorer.net/](https://astexplorer.net/)

### 3. AST 供其他 renderer 或开发者使用
 《略》

参考文献：
*[1] 意为制作出的产品，出处：阿里云效*
*[2] [TypeScript Deep Dive] https://basarat.gitbooks.io/typescript/docs/compiler/parser-functions.html*



<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
