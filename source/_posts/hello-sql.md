---
title: hello-sql #标题
date: 2019-06-11 14:58:10 #创建时间
tags: [sql] #标签(同级)
reward: true #是否开启打赏功能
comment: true #是否开启评论功能
---
本文章原始创作地址：[https://blog.csdn.net/qq_20264891/article/details/91437256](https://blog.csdn.net/qq_20264891/article/details/91437256)

如您有其他建议，可以通过左上角的 QQ 发起回话，或者在 https://zq-jhon.github.io/about/ 中添加我的微信

## 前置条件
1. [廖雪峰 sql 教程](https://www.liaoxuefeng.com/wiki/1177760294764384)
2. [alasql github](https://github.com/agershun/alasql)
3. 新建一个项目 `$ npm i alasql` 
## 一、基本语法
根据示例 [https://github.com/agershun/alasql](https://github.com/agershun/alasql) 学习基本语法
#### 1.建表( CREATE TABLE)
```sql
alasql(`
CREATE TABLE users (age number, name string, money number);
`);
```
#### 2. 插入数据(INSERT INTO {table})
```sql
alasql(`
INSERT INTO users VALUES (25,'张三', 100);
`):
```
然后确认一下数据是否真的写入了
```javascript
const mysql = alasql('

SELECT *FROM users;

');

console.log(mysql); // [ { age: 25, name: '张三', money: 100 } ]
```
于是写个遍历，插入更多数据，以供后面操作。
```javascript
...
for(let i = 0; i< 100; i++) {
    const sql = `INSERT INTO users VALUES (${i}, '张${i}', ${i})`;
    alasql(sql);
}
const mysql = alasql('
SELECT * FROM users;
');
console.log(mysql);
// 输出：
[ { age: 25, name: '张三', money: 100 },
  { age: 0, name: '张0', money: 0 },
  { age: 1, name: '张1', money: 1 },
  { age: 2, name: '张2', money: 2 },
  { age: 3, name: '张3', money: 3 },
  { age: 4, name: '张4', money: 4 },
// ...
 { age: 99, name: '张99', money: 99 },
```
#### 3. SELECT 语句
望文生义， SELECT 就是选中，命中。选中的对象是啥呢？其实就是表的 "列" column。
举例：
```sql
// 选中 users 表中所有的列
SELECT * FROM users;

// 只选中 name 这一列
SELECT name FROM users;

// 选中 name, age 两列
 SELECT name,age FROM users;
```
如果希望返回的结果集可以自定义列名（column） ，这种操作称之为 **"投影"**， 可以使用语法 :
```sql
SELECT 列1 别名1, 列2 别名2 FROM users;
```
举个 🌰:
```sql
// 原 column 名为 name
...
[name]
张三
李四
王麻子
...

SELECT name '姓名' FROM users;
// 输出
...
[姓名]
张三
李四
王麻子
...
```
#### 4. WHERE 语句
现在，从表中筛选出 age > 90 的：
```javascript
...
const mysql = alasql(`SELECT * FROM users WHERE age>90;`);
console.log(mysql);
// 输出：
[ { age: 91, name: '张91', money: 91 },
  { age: 92, name: '张92', money: 92 },
  { age: 93, name: '张93', money: 93 },
  { age: 94, name: '张94', money: 94 },
  { age: 95, name: '张95', money: 95 },
  { age: 96, name: '张96', money: 96 },
  { age: 97, name: '张97', money: 97 },
  { age: 98, name: '张98', money: 98 },
  { age: 99, name: '张99', money: 99 } ]
```
#### 5. 联合条件
联合条件，即多条件叠加。是为了提高命中数据的准确度，达到准确查找想要数据的目的。
##### AND
```javascript
...
const mysql = alasql(`SELECT * FROM users WHERE age=60 AND money=60;`);
console.log(mysql);
// 输出：
[ { age: 60, name: '张60', money: 60 } ]
```
##### OR
```javascript
...
const mysql = alasql(`SELECT * FROM users WHERE age=60 OR money=61;`);
console.log(mysql);
// 输出：
 [ 
 { age: 60, name: '张60', money: 60 },
  { age: 61, name: '张61', money: 61 } 
  ]
```
##### NOT
查询 !(age>=10)
```javascript
...
const mysql = alasql(`SELECT * FROM users WHERE NOT age>=10;`);
console.log(mysql);
// 输出：
[ { age: 0, name: '张0', money: 0 },
  { age: 1, name: '张1', money: 1 },
  { age: 2, name: '张2', money: 2 },
  { age: 3, name: '张3', money: 3 },
  { age: 4, name: '张4', money: 4 },
  { age: 5, name: '张5', money: 5 },
  { age: 6, name: '张6', money: 6 },
  { age: 7, name: '张7', money: 7 },
  { age: 8, name: '张8', money: 8 },
  { age: 9, name: '张9', money: 9 } ]
```
另一种，不等于的写法：
```javascript
// 又要大，又要小。又想马儿跑，又不想给马吃草
const mysql = alasql(`SELECT * FROM users WHERE  age<>20;`);
console.log(mysql);
// 输出：
 ...
 [
  {age: 0, name: '张0'},
   ...
  { age: 18, name: '张18', money: 18 },
  { age: 19, name: '张19', money: 19 },
  // 注意，这里 age=20 的数据被 where 语句命中了，因此没有出现在结果集
  { age: 21, name: '张21', money: 21 },
  ... 
  { age: 99, name: '张99', money: 99 }
  ]
```
#### 6.模糊查询({field} LIKE)
```javascript
// 查询名字中以 `张7` 开头的数据，% 代表任意字符。
const mysql = alasql(`SELECT * FROM users WHERE  name LIKE '张7%';`);
console.log(mysql);
// 输出：
[ { age: 7, name: '张7', money: 7 },
  { age: 70, name: '张70', money: 70 },
  { age: 71, name: '张71', money: 71 },
  { age: 72, name: '张72', money: 72 },
  { age: 73, name: '张73', money: 73 },
  { age: 74, name: '张74', money: 74 },
  { age: 75, name: '张75', money: 75 },
  { age: 76, name: '张76', money: 76 },
  { age: 77, name: '张77', money: 77 },
  { age: 78, name: '张78', money: 78 },
  { age: 79, name: '张79', money: 79 } ]
```
#### 7. 排序方式(ORDER BY {field} DESC/ASC)
细心的你肯定发现了，前面的数据都是按照顺序（ASC 从小到大）来排序的，那如果我希望 age 或者 money 字段按照倒序（DESC 从大到小）来排布，该怎么操作呢？
```javascript
...
const mysql = alasql(`SELECT name '姓名' FROM users ORDER BY age DESC;`);
console.log(mysql);
// 输出:
[ { '\'姓名\'': '张99' },
  { '\'姓名\'': '张98' },
  { '\'姓名\'': '张97' },
  { '\'姓名\'': '张96' },
  { '\'姓名\'': '张95' },
  ...
  ];
```
这里我按照 age 的 DESC 来排序，结果符合预期。
#### 8.分页查询( LIMIT, OFFSET)
之前做后台管理的时候，我还纳闷，为什么接口总是定义 offset=0;limit=10;orderBy='name' 这样的接口，现在看到这里，应该都豁然开朗了。
在上述的例子里，每次返回的结果集都太大，然而这个表只有 100 条数据而已，随着表的规模越来越大，分页查询势在必行。
```javascript
...
// 返回的结果集极限大小为 10 条数据，且从 index=0 的位置向后偏移 4 个
const mysql = alasql(`SELECT name FROM users LIMIT 10 OFFSET 4;`);
console.log(mysql);
// 输出
[ { name: '张4' },
  { name: '张5' },
  { name: '张6' },
  { name: '张7' },
  { name: '张8' },
  { name: '张9' },
  { name: '张10' },
  { name: '张11' },
  { name: '张12' },
  { name: '张13' } ]
```
假表中设有无穷多的数据，需要查询第 N 页的数据，默认 LIMIT = 10，问 OFFSET = ？
```javascript
OFFSET = LIMIT(N-1);
```
偏移量总是等于 = （要查询的页数 - 1）* limit
#### 9.聚合查询（SELECT COUNT(*) FROM {table}）
```javascript
const mysql = alasql(`SELECT COUNT(*) FROM users;`);
console.log(mysql);
// 输出 ['COUNT(*)': 100]
```
同样可以取别名
```javascript
const mysql = alasql(`SELECT COUNT(*) total FROM users;`);
console.log(mysql);
// 输出： [ { total: 100 } ]
```
另外，除了 `COUNT` 还有几个内置函数：
MAX, MIN, AVG, SUM,FLOOR,CELING 等
对应最大，最小，平均，总和。
```javascript
const mysql = alasql(`SELECT MAX(money) max FROM users;`);
console.log(mysql);
// 输出  [ { max: 99 } ]
const mysql = alasql(`SELECT SUM(money) totalMoney FROM users;`);
console.log(mysql);
// [ { totalMoney: 4950 } ]
```

#### 10.分组查询（SELECT FROM {table} GROUP BY {field};）
```javascript
const alasql = require('alasql');

alasql(`CREATE TABLE users (age number, name string, money number)`);

for (let i = 0; i < 10; i++) {
    // build random number as 1~10
    const number = Math.ceil(Math.random() * 10);
    const sql = `INSERT INTO users VALUES (${i}, '张${i}', ${number})`;
    alasql(sql);
}
const mysql = alasql(`SELECT * FROM users GROUP BY money ;`);
console.log(mysql);
// 输出：
[ { money: 9 },
  { money: 8 },
  { money: 4 },
  { money: 3 },
  { money: 2 },
  { money: 7 },
  { money: 1 },
  { money: 10 } ]
```
#### 11. 连接查询(INNER JOIN ... ON...)
顾名思义，即多个表连接到一起，统一查询。
现在，假设每个 user 需要添加一个 company 字段，代表所处公司。而这个 company 是随时会变动的，因此需要建立一个新表进行单独的维护：
```sql
alasql(`
CREATE TABLE companies (id numnber, name string);
`);
```
`companies` 表很简单，只有一个字段。
如果现在每个 user 的字段都要对应到 companies 的一个成员，即 users 长度  = companies 长度，该如何做映射呢？
```javascript
const alasql = require('alasql');
// 创建两个表，user 表中， company 为数字，对应着 companies 表中的索引 id
alasql(`CREATE TABLE users (age number, name string, money number, company number)`);
alasql(`CREATE TABLE companies (id number, name string)`);
for (let i = 0; i < 10; i++) {
    // build random number as 1~10
    const number = Math.ceil(Math.random() * 10);
    const sql = `INSERT INTO users VALUES (${i}, '张${i}', ${number}, ${number})`;
    alasql(sql);
    // 这里每个 company 的 id 应该与 user 表中的 company 字段 依次 相同
    alasql(`INSERT INTO companies VALUES (${number}, '公司' + ${number})`);
}

// 查询时，多加一个 companies 表中的 name 列
const mysql = alasql(`
    SELECT u.age, u.name, u.money, c.name company_name
    FROM users u 
    INNER JOIN companies c 
    ON u.company=c.id
`);
console.log(mysql);
// 输出：
[ { age: 0, name: '张0', money: 1, company_name: '公司1' },
  { age: 1, name: '张1', money: 2, company_name: '公司2' },
  { age: 1, name: '张1', money: 2, company_name: '公司2' },
  { age: 1, name: '张1', money: 2, company_name: '公司2' },
  { age: 1, name: '张1', money: 2, company_name: '公司2' },
  { age: 2, name: '张2', money: 7, company_name: '公司7' },
  { age: 2, name: '张2', money: 7, company_name: '公司7' },
  { age: 3, name: '张3', money: 4, company_name: '公司4' },
  { age: 3, name: '张3', money: 4, company_name: '公司4' },
  { age: 3, name: '张3', money: 4, company_name: '公司4' },
  { age: 4, name: '张4', money: 7, company_name: '公司7' },
  { age: 4, name: '张4', money: 7, company_name: '公司7' },
  { age: 5, name: '张5', money: 2, company_name: '公司2' },
  { age: 5, name: '张5', money: 2, company_name: '公司2' },
  { age: 5, name: '张5', money: 2, company_name: '公司2' },
  { age: 5, name: '张5', money: 2, company_name: '公司2' },
  { age: 6, name: '张6', money: 4, company_name: '公司4' },
  { age: 6, name: '张6', money: 4, company_name: '公司4' },
  { age: 6, name: '张6', money: 4, company_name: '公司4' },
  { age: 7, name: '张7', money: 4, company_name: '公司4' },
  { age: 7, name: '张7', money: 4, company_name: '公司4' },
  { age: 7, name: '张7', money: 4, company_name: '公司4' },
  { age: 8, name: '张8', money: 2, company_name: '公司2' },
  { age: 8, name: '张8', money: 2, company_name: '公司2' },
  { age: 8, name: '张8', money: 2, company_name: '公司2' },
  { age: 8, name: '张8', money: 2, company_name: '公司2' },
  { age: 9, name: '张9', money: 2, company_name: '公司2' },
  { age: 9, name: '张9', money: 2, company_name: '公司2' },
  { age: 9, name: '张9', money: 2, company_name: '公司2' },
  { age: 9, name: '张9', money: 2, company_name: '公司2' } ]
```
总结一下，这种多表联合查询，就是在 SELECT 阶段选择两个表中的字段，然后通过 INNER JOIN {表名} ON {条件} 来完成的。
另外还有 LEFT OUTER JOIN ， RIGHT OUTER JOIN 等，详见廖雪峰大神总结的图示：
{% asset_image sql.png%}

### 二、CRUD BOY 的基本素养
#### 1. 增
语法：
```sql
INSERT INTO table (field) VALUES (value1, value2...);
```
```javascript
const alasql = require('alasql');
// 建表时可以注明类型
alasql(`CREATE TABLE users (age number, name string, money number)`);

for(let i = 0; i< 10; i++) {
    const sql = `INSERT INTO users VALUES (${i}, '张${i}', ${i})`;
    alasql(sql);
}

// 插入时不需要标注 field type
alasql(`INSERT INTO users (age, name, money) VALUES (1 , '大牛' , 100)`);
const mysql = alasql(`SELECT * FROM users;`);
console.log(mysql);
// 输出：
[ { age: 0, name: '张0', money: 0 },
  { age: 1, name: '张1', money: 1 },
  { age: 2, name: '张2', money: 2 },
  { age: 3, name: '张3', money: 3 },
  { age: 4, name: '张4', money: 4 },
  { age: 5, name: '张5', money: 5 },
  { age: 6, name: '张6', money: 6 },
  { age: 7, name: '张7', money: 7 },
  { age: 8, name: '张8', money: 8 },
  { age: 9, name: '张9', money: 9 },
  { age: 1, name: '大牛', money: 100 } ]
```
#### 2. 改
语法：
```sql
UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
```
```javascript
...
// 更新 age=1 的这条数据
alasql(`UPDATE users  SET age=100000, money=200000 WHERE age=1`);
const mysql = alasql(`SELECT * FROM users;`);
console.log(mysql);
// 输出：
[ { age: 0, name: '张0', money: 0 },
  { age: 100000, name: '张1', money: 200000 },
  { age: 2, name: '张2', money: 2 },
  { age: 3, name: '张3', money: 3 },
  { age: 4, name: '张4', money: 4 },
  { age: 5, name: '张5', money: 5 },
  { age: 6, name: '张6', money: 6 },
  { age: 7, name: '张7', money: 7 },
  { age: 8, name: '张8', money: 8 },
  { age: 9, name: '张9', money: 9 } ]
```
#### 3. DELETE
语法：
```sql
DELETE FROM <表名> WHERE ...;
```
```javascript
alasql(`DELETE FROM users WHERE age>5`);
const mysql = alasql(`SELECT * FROM users;`);
console.log(mysql);
// 输出：
[ { age: 0, name: '张0', money: 0 },
  { age: 1, name: '张1', money: 1 },
  { age: 2, name: '张2', money: 2 },
  { age: 3, name: '张3', money: 3 },
  { age: 4, name: '张4', money: 4 },
  { age: 5, name: '张5', money: 5 } ]
```
#### 4. Retrieve
语法：
```sql
SELECT colume FROM table （WHERE） ...
```

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
