# 分页

## 概述

> 分页功能由`page`模块提供。

如果想要分页展示数据而不是无限滚动，Tabulator也可以实现。

Tabulator 提供了两种分页方式：

- `local`: 本地解析所有的数据并进行分页
- `remote`: 通过Ajax从远程服务器加载单独页的数据

当启用分页时，表格底部会显示分页组件。

`注意：当启用分组时，改变了过滤器、排序或分组的可见性时，表格页码会被重置到首页。`


## 远程分页(服务端侧)

> 远程Ajax功能由`ajax`模块提供。



### 请求URL

当用户修改页码时，Tabulator会自动创建一个页面请求。

默认情况下，会使用`ajaxURL`生成URL和其它系统生成的参数：

- page - 请求的页码
- size - 每页展示的行数(需要设置`paginationSize`)
- sorters - 当前第一个排序器（如果有）
- filters - 当前过滤器数组（如果有）

如果需要改变这些名字来适配已经存在的系统，可以使用`dataSendParams`属性设置参数别名：

```tsx
var table = new Tabulator("#example-table", {
    pagination:true, //enable pagination
    paginationMode:"remote", //enable remote pagination
    ajaxURL:"http://testdata.com/data", //set url for ajax request
    dataSendParams:{
        "page":"pageNo", //change page request parameter to "pageNo"
    } ,
});
```

**自定义分页URL构建**

### 返回响应数据

远程服务器需要返回一个JSON对象，包含以下属性：

```tsx
{
    "last_page":15, //the total number of available pages (this value must be greater than 0)
    "data":[ // an array of row data objects
        {id:1, name:"bob", age:"23"}, //example row data object
    ]
}
```


## 本地分页(客户端侧)

## 分页控制元素

## 分页计数

## 管理分页

## 回调

