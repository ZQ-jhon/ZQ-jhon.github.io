## 为什么用 YAML 而不是 JSON 来管理配置项？

考虑如下配置：

```json
{
  "name": "PSG",
  "members": 6,
  "repos": ["BMS","Mars","Official-Site","Venus"],
  "env": "prod"
}
```
同样的配置，用 Yaml 表示：

```yaml
# 名称
name: PSG
# 成员
members: 6
# 仓库
repos:
- BMS
- Mars
- Official-Site
- Venus
env: prod
toJSON: { "name": "PSG", "members": 6, "repos": ["BMS","Mars","Official-Site","Venus"], "env": "prod" }
env: $(variable.prod)

```
可见，YAML 的优势体现在：
1. 支持注释
2. 支持外部传入参数，和 YAML 上下文中定义变量，具备可编程性
3. 除了缩进，没有过多标点符号的严格限制，并且兼容 JSON 的写法

可以参考 王老师 写的一份 Azure-pipeline.yaml 文件
[Azure-Pipeline](http://dev.corp.sheencity.com/PSG/_git/psg?path=%2F.azure-pipelines%2Ftemplates%2Fbuild.yaml&version=GBdaily-news)

还有一份关于 YAML 和 JSON 对比的参考资料：
[Read More](https://markrichman.com/yaml-for-aws-cloudformation/)

---

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
