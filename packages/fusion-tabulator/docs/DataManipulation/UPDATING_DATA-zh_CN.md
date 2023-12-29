# 更新数据

## 概述

当表格加载完数据后，Tabulator提供了大量的方法更新和操作表格数据。

## 修改数据

### 原地替换数据

`replaceData` 函数会静默地替换表格中的数据，不会更新滚动的位置、排序或过滤选项以及触发加载UI。

这对想要定期新增/更新表格信息又不想提示用户去更新的需求来说，非常有用。

接收的参数和加载数据的行为与`setData`函数一致（如：可以发起Ajax请求，解析JSON等）。

```tsx
table.replaceData([{id:1, name:"bob", gender:"male"}, {id:2, name:"Jenny", gender:"female"}]) // 加载数据数组

table.replaceData("/data.php") // 通过 ajax 请求从`data/php` 加载数据

table.replaceData() // 使用 `ajaxURL` 属性的值，重新加载ajax数据
```

**返回 Promise**

`replaceData` 方法返回一个Promise，可以在数据加载完成后执行其它操作：

```tsx
table.replaceData(tableData)
.then(function(){
    //run code after table has been successfully updated
})
.catch(function(error){
    //handle error loading data
});
```

> `注意：当启用 Vitrual DOM并设置了表格高度时 replaceData 函数仅维护滚动的位置`


### 更新已存在的数据

如果想要更新表格中已存在的数据，可以使用 `updateData` 方法， `setData`方法会完全替换全部数据。

`updateData`接收一个`行对象数组`作为参数，并根据`索引值(index value)更新每一行`，没有指定`索引`的项或表格数据中的项没有索引的项会被忽略。

`addRow`函数应该用于新增一行表格数据。

```tsx
table.updateData([{id:1, name:"bob", gender:"male"}, {id:2, name:"Jenny", gender:"female"}]);
```

注意：**该函数不会使用提供的数据替换整行，它仅会更新提供的参数**

```tsx
//data before update {id:1, name:"Steve", gender:"male", age:20}

table.updateData([{id:1, name:"bob"}]); //update data

//data after update  = {id:1, name:"bob", gender:"male", age:20}
```

该函数返回一个Promise。

### 添加数据

可以使用`addData`函数在已存在数据的表格上添加新数据。

它接收两个参数：

第一个是一个`行数据对象数组`，如果某一列对应的值没有提供，则会留空。

第二个参数是可选的，它用来决定数据是新增到表头还是表尾。值为`true`的话，数据会新增到表头，值为`false`的话，数据会新增到表尾。如果该参数没有设置，这会根据全局选项`addRowPos`的值确定插入的位置。

```tsx
table.addData([{id:1, name:"bob", gender:"male"}, {id:2, name:"Jenny", gender:"female"}], true);
```

默认情况下，新的行数据会被添加到表格的底部。要添加到表头，可以设置`addRowPos`的值为 `top`。

如果想要将数据插入到指定行的附近，可以给该函数传递第三个参数，它是可选的（是在指定行的上方还是下方取决于第二个值）。该参数会使用[row component look up](https://tabulator.info/docs/5.5/components#lookup)中的任意一个有效值：

```tsx
table.addData([{id:6, name:"bob", gender:"male"}, {id:7, name:"Jenny", gender:"female"}], true, 3); //add new data above existing row with index of 3
```

>`数据变化：如果在列定义数组中使用了任意的 mutator 函数，在数据被添加之前会被应用到新数据上（点击[Mutators](https://tabulator.info/docs/5.5/mutators)查看更多）` 

该函数返回一个Promise。

**更新或新增数据**

如果传递给表格的数据包含需要更新的已存在的行和要新增的行，可以调用`updateOrAddData`函数。它会检查提供的每一行对象，如果存在就更新它，不存在就创建：

```tsx
table.updateOrAddData([{id:1, name:"bob"}, {id:3, name:"steve"}]);
```

该函数返回一个Promise。

### 清空表格

调用`clearData`函数清楚所有的表格数据:

```tsx
table.clearData();
```


## 检索数据

### 行数据

**检索所有数据**

使用`getData`函数，检索存储在表格中的所有数据:

```tsx
const data = table.getData();
```

可以给函数传递一个[row range lookup](https://tabulator.info/docs/5.5/components#row-lookup)参数限制返回的数据：

```tsx
var data = table.getData("active"); //return currently filtered data
```

**查询行的数量**

```tsx
const rowCount = table.getDataCount();

const rowCount = table.getDataCount("active"); //count only rows that pass the currently filtered data
```

**查询行数据**

```tsx
var row = table.getRow(1); //return row component with index of 1
var rowData = row.getData();

```

**查询Row Components**

```tsx
var rows = table.getRows();
var rows = table.getRows("active"); //return currently filtered rows
```

### 搜索数据

搜索函数允许您使用过滤器检索数据，与 setFilter 函数使用的过滤器完全相同，然后返回任何匹配的数据或行组件。

**搜索 Row Components**

```tsx
var rows = table.searchRows("age", ">", 12);//get row components for all rows with an age greater than 12
```

**搜索行数据**

```tsx
var data = table.searchData("age", ">", 12);//get row data for all rows with an age greater than 12
```

### 行位置

### HTML表格形式的数据

## 行操作

有多种方式操作单独的行而且不会影响其他已经渲染的行。

### 添加行

使用`addRow`函数新增一行。

第一个参数是一个行数据对象。如果对应列的值没有传，这它的值为空。**要创建一个新行(如：给用户进行填充)，可以传入一个空对象。**

第二个参数是可选的，为true的话，数据插入到表尾，为false的话插入到表头。

```tsx
table.addRow({name:"Billy Bob", age:"12", gender:"male", height:1}, true);
```

> 更多详情参考`addData`

### 更新行

使用`updateRow`函数更新表格行数据。

```tsx
table.updateRow(1, {id:1, name:"bob", gender:"male"});
```

更新完成，该函数会触发`rowUpdated`和`dataEdited`事件。

更新成功的时，该函数返回`true`，如果找不对应的行返回`false`。**如果新的数据不匹配已经存在的行数据，不会执行更新。**

如果已经获取到对应的`RowComponent`，可以直接调用`update`函数更新：

```tsx
row.update({"name":"steve"}); //update the row data for field "name"
```

### 更新或新增行

```tsx
table.updateOrAddRow(3, {id:3, name:"steve", gender:"male"});
```

### 获取行元素

```tsx
var row = table.getRow(1); //return row component with index of 1
var rowElement = row.getElement();
```

### 删除行

```tsx
table.deleteRow(15); //delete row with an id of 15

table.deleteRow([15,7, 9]); //delete rows with ids of 15, 7 and 9

row.delete();
```