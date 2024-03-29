# todoList

**This repository is no longer maintained. Please go to its new version: [Schedule](https://github.com/Term-inator/Schedule)**

使用四象限法则管理事件

借助jQuery和jCanvas实现

入口：www/index.html

---

## 1.3.1.201108_beta

### 更新内容

修复了连续修改多个事件ddl时，若第一次将它们的dll修改到同一天，则之后的修改中，只需修改其一的ddl，剩余事件的ddl也会被修改

（该问题也可以通过修改完ddl立即刷新页面解决）

</br>

## 1.3.0.201031_beta

### 更新内容

修复了重复打开日历时日历没有初始化的问题

修复了页面可以滚动的问题

修复了可以输入html标签的问题

</br>

## 1.3.0.201024_alpha

### 更新内容

修复了列表表头双击也可修改的问题

改变了选择日期的方法，支持添加未来一年内的事件

只保留无期限事件，移除了没有月份或没有日期的时事件

</br>

## 1.2.1.201022_alpha

### 更新内容

修复了修改源代码，报错后数据丢失的问题

修复了第一次打开时按ddl排序失效问题

修复了双击事件名却不修改，提示事件名已存在的问题

优化了象限图的更新

</br>

## 1.2.0.201021_alpha

### 更新内容

支持通过Enter添加事件

支持双击修改事件名和ddl

</br>

## 1.1.1.201020_beta

### 更新内容

修复了定时刷新异常的问题

优化了页面的更新和刷新

</br>

## 1.1.1.201018_alpha

### 更新内容

修复了无期限事件显示异常的问题

</br>

## 1.1.0.201018_alpha

### 更新内容

修复了批量删除n个事件需要操作log<sub>2</sub>n次的问题

对于ddl是明天、后天的事件会显示“明天”、“后天”，而不是日期

对于已过期的事件会显示“已过期”

支持添加无月份、无日期和无ddl的事件

支持将列表按ddl升序排序

</br>

## 1.0.0.201017_alpha

### 简介

一个列表式toList和一张象限图

添加的事件包含事件名和ddl（deadline）

数据均存在本地，关闭窗口or刷新数据不会消失

### 更新内容

支持通过勾选删除已完成的事件（刷新or关闭窗口后生效以防止误删）

支持在象限图中移动事件来表示紧急、重要程度
