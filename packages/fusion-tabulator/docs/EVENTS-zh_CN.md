# Events

## 概述

Tabulator 提供了许多的事件，在用户使用表格时触发以便开发者可以处理用户交互和系统事件。

事件被触发就像一个简单的通知，不需要有返回值。注意与回调函数的区别，回调函数可以需改表格的行为。

### 订阅事件

在表格上调用`on`函数可以订阅事件，传递`事件名`和要触发的事件函数。

```tsx
const table = new Tabulator("#example-table", {
  //setup your table
});

//subscribe to event
table.on("dataLoaded", function(data){
  //data has been loaded
});

```

### 取消事件订阅

调用`off`函数取消一个事件的所有监听器，函数接收事件名作为参数。

```tsx
table.off('dataProcessed');
```

### 取消一个监听器

调用`off`函数取消给定事件的具名监听器，函数接收事件名和监听器名称作为参数。

```tsx
const dataProcessedEvent = function(data){
  //data has been loaded
}

//subscribe to event
table.on("dataProcessed", dataProcessedEvent);

//unsubscribe from event
table.off("dataProcessed", dataProcessedEvent);

```

## 表格事件

1. 表格`building`

2. 表格`built`

3. 表格`销毁`

当表格调用`destroy`函数销毁时，表格内部所有的功能被销毁且所有的外部事件被移除之前，将会触发`tableDestroyed`事件。

```tsx
table.on("tableDestroyed", function(){});
```

## 列事件

> 表头交互事件功能由`interaction`模块提供

1. 列头部点击

2. 列头部双击

3. 列头部右键点击

4. 列头部`tap`（触摸设备）

5. 列头部`dbltap`（触摸设备）

6. 列头部`Tap hold`

7. 列头部`鼠标进入`

8. 列头部`鼠标离开`

9. 列头部`鼠标悬停`

10. 列头部`鼠标out`

11. 列头部`鼠标move`

12. 列头部`鼠标左键按下`

13. 列头部`鼠标左键弹起`

14. 列`移动`

当列成功地被移动后，将会触发`columnMoved`事件:

```tsx
table.on("columnMoved", function(column, columns){
    //column - column component of the moved column
    //columns- array of columns in new order
});
```

15. 列`调整大小`

16. 列`可见性改变`

17. 列`标题改变`

当用户在`列定义`数组中启用了`editableTitle`参数时，用户无论时候编辑列名称时会触发`columnTitleChanged`事件:

```tsx
table.on("columnTitleChanged", function(column){
    //column - column component
});
```


## `行`事件

> 行交互事件功能由`interaction`模块提供

1. 行`点击`

当用户`点击行`时，将会触发`rowClick`事件:

```tsx
table.on("rowClick", function(e, row){
    //e - the click event object
    //row - row component
});
```

2. 新增行

当表格调用`addRow`和`updateOrAddRow`函数添加一个行时，会触发`rowAdded`事件:

```tsx
table.on("rowAdded", function(row){
    //row - row component
});
```

3. 更新行

当表格行通过`updateRow, updateOrAddRow, updateData 或 updateOrAddData`函数更新时，将会触发`rowUpdated`事件:

```tsx
table.on("rowUpdated", function(row){
    //row - row component
});
```

4. 删除行

当表格调用`deleteRow`函数删除一个行时，会触发`rowDeleted`事件:

```tsx
table.on("rowDeleted", function(row){
    //row - row component
});
```

5. 行大小调整

当用户调整行大小时，会触发`rowResized`事件:

```tsx
table.on("rowResized", function(row){
    //row - row component of the resized row
});
```

<!-- .... a range of events(not important now) -->


## 单元格事件

1. 单元格`点击`

当用户左键点击单元格时，会触发`cellClick`事件:

```tsx
table.on("cellClick", function(e, cell){
        //e - the click event object
        //cell - cell component
});
```

2. 

<!-- .... a range of events(not important now) -->

## 数据事件

1. 数据记载中

2. 数据加载完成

3. 数据加载异常

当`加载请求`返回错误响应时会触发`dataLoadError`事件，该事件传递[Fetch Response Object](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Response_objects)作为它的第一个参数，这样就可以访问`响应内容和状态码`等等

```tsx
table.on("dataLoadError", function(error){
    //error - the returned error object
});
```

4. 数据处理中

5. 数据处理完成

在数据被处理和表格完成渲染后，触发该事件：

```tsx
table.on("dataProcessed", function(){});
```

6. 数据改变

无论什么时候表格数据发生改变时，都会触发`dataChanged`事件，触发的行为包括：单元格编辑，新增/更新/删除行：

```tsx
table.on("dataChanged", function(data){
        //data - the updated table data
});
```

## 单元格编辑事件

1. 单元格编辑中

当用户开始编辑单元格时，会触发`cellEditing`事件：

```tsx
table.on("cellEditing", function(cell){
        //cell - cell component
});
```

## HTML导入事件


## 过滤器事件


## 排序事件


## 布局事件


## 分页事件

1. 页面加载



## 本地化事件


## 分组事件


## 选择事件

1. 行被选中事件

当表格行被用户或使用编程的方式选中时，会触发`rowSelected`事件：

```tsx
table.on("rowSelected", function(row){
    //row - row component for the selected row
});
```

2. 行取消选中事件

当表格行被用户或使用编程的方式取消选中时，会触发`rowDeselected`事件：

```tsx
table.on("rowDeselected", function(row){
    //row - row component for the deselected row
});
```

3. 行选择改变

## 行移动事件

### 标准的`行移动`事件

在单张表格内部移动行时会触发下面的事件

1. 行移动中

2. 行被移动

当行被成功移动后触发该事件:

```tsx
table.on("rowMoved", function(row){
    //row - row component
});
```

### 跨表格移动行事件

跨表格移动行时会触发下面的事件



## 校验事件

**校验失败**

在单元格编辑时，输入的值不符合校验规则时，会触发`validationFailed`事件：

```tsx
table.on("validationFailed", function(cell, value, validators){
    //cell - cell component for the edited cell
    //value - the value that failed validation
    //validators - an array of validator objects that failed
});
```

对每一个失败的`validator`来说，`validators`参数是一个校验器对象数组。每个对象有一个`type`属性，它是校验器的`key`(比如： `required`)以及一个`parameters`属性，它包含传递给校验器的props

在下面的示例中，校验失败是因为`min` 校验器，它的参数是`5`:

```tsx
[
    {
        key:"min"
        parameters:5,
    }
]

```


## History事件



## 粘贴板事件


## Menu事件


## Popup事件


## 下载事件


## Data Tree事件


## 滚动事件

