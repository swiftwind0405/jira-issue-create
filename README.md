# 根据excel自动生成jira issue

## 使用说明

1. 安装依赖：`npm install`
2. 把excel文件与授权相关的data文件放在同一目录下，然后执行`npm start`即可

excel文件格式如下：
| 模块 | 所属项目 | 分配人 | Sprint | summary |
| --- | --- | --- | --- | --- |
| 模块A | 项目1 | stanley.yang | 2.0 Sprint 69 | 标题1 |
| 模块B | 项目2 |  | 2.0 Sprint 70 | 标题2 |

`data.js` 文件如下：
```js
const cookie = 'COOKIE'

const  atl_token = "ATL_TOKEN"

const formToken = "formToke"

module.exports = { cookie, atl_token, formToken }
```

## JIRA 字段备忘
`customfield_10400` : 所属项目
`pid`: 项目ID，比如研发管理就是10104
`issuetype`: 任务类型，比如故事就是10001
