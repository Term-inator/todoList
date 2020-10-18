# todoList

使用四象限法则管理事件

借助jQuery和jCanvas实现

入口：www/index.html

---

## 1.0.0.201017_alpha

### 简介

一个列表式toList和一张象限图

添加的事件包含事件名和ddl（deadline）

数据均存在本地，关闭窗口or刷新数据不会消失

### 更新内容

支持通过勾选删除已完成的事件（刷新or关闭窗口后生效以防止误删）

支持在象限图中移动事件来表示紧急、重要程度

---

## 1.1.0.201018_alpha

### 更新内容

修复了批量删除需要操作log<sub>2</sub>n次的问题

对于ddl是明天、后天的事件会显示“明天”、“后天”，而不是日期

对于已过期的事件会显示“已过期”

支持添加无月份、无日期和无ddl的事件

支持将列表按ddl升序排序