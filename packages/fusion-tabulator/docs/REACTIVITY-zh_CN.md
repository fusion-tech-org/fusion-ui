# Reactivity

## 概述

在V4.2 版本中，Tabulator为JavaScript表格引入了响应式数据的实现。响应式系统允许Tabulator监听传递给表格的数组或对象的修改，然后自动更新表格，不需要调用额外的函数。

使用这种方式，意味着你不需要担心在表格上调用大量的不同函数进行修改，你只需要简单得更新传递给表格的原始数据，Tabulator会完成剩下的工作。

体验[示例](https://tabulator.info/docs/5.5/reactivity#overview)。

## 响应式数据

## 前端框架兼容

`数据响应式模块`可以兼容所有的响应式的前端框架，如：vue, react 和 angular。这意味着当你在包含上述前端框架的项目中引入`Tabulator`时，你仅只需要在初始化表格时传递一个数组进去。之后你就可以通过通过框架操作数组和数据对象，Tabulator会自动更新。