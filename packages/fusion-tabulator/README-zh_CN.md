# FusionTabulator

## 列定义

通过`Tabulator`的构造器对象下的`columns`属性来配置表格列，接收一个对象数组，每个对象表示某一列的配置。

代码示例：

```tsx
const table = new Tabulator("#example-table", {
    columns:[
        {title:"Name", field:"name", sorter:"string", width:200, editor:true},
        {title:"Age", field:"age", sorter:"number", hozAlign:"right", formatter:"progress"},
        {title:"Gender", field:"gender", sorter:"string", cellClick:function(e, cell){console.log("cell click")},},
        {title:"Height", field:"height", formatter:"star", hozAlign:"center", width:100},
        {title:"Favourite Color", field:"col", sorter:"string"},
        {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
        {title:"Cheese Preference", field:"cheese", sorter:"boolean", hozAlign:"center", formatter:"tickCross"},
    ],
});
```

有大量的可选择的属性用来配置某一列：

### 通用

- title(必选) - 当前列展示的标题
- field(必选，在 icon/button列中是非必填的) - 当前列在数据数组中的`key`
- visible(默认 - true) - 当前列是否可见（[查看详情](https://tabulator.info/docs/5.5/columns#visibility)）

### 布局

- hozAlign - 设置当前列文本的水平对齐方式 (left|center|right)
- vertAlign - 设置当前列文本的垂直对齐方式(top|middle|bottom)
- headerHozAlign - 设置当前列表头文本的水平对齐方式 (left|center|right)
- width - 设置当前列的宽度, 可以指定具体的数值（单位：px）,也可以指定相对于整个表格宽度的百分比 (如果不指定，系统会自动分配)
- minWidth - 设置当前列的最小宽度, 必须是数值
- maxWidth - 设置当前列的最大宽度, 必须是数值
- maxInitialWidth - 首次渲染时，设置当前列的最大宽度值，这样用户可以自行调整宽度 (如果设置了，就会作为最大值) , 必须是数值
- widthGrow - 当使用`fitColumns`布局模式时，用于判断当前列增加多少适配可用的空间(点击[Table Layout](https://tabulator.info/docs/5.5/layout)查看更多)
- widthShrink - 当使用`fitColumns`布局模式时，用于判断当前列缩放多少适配可用的空间(点击[Table Layout](https://tabulator.info/docs/5.5/layout)查看更多)
- resizable - 设置当前列是否可以`调整大小`通过拖拽边缘(点击[Table Layout](https://tabulator.info/docs/5.5/layout)查看更多)
- frozen - 滚动时，固定列 (点击[Frozen Columns](https://tabulator.info/docs/5.5/layout#frozen-column)查看更多)
- responsive - 设置一个数值用来判断在`responsive`模式下，当前列是否应该隐藏(点击[Responsive Layout](https://tabulator.info/docs/5.5/layout#responsive)查看更多)
- tooltip - 设置当前列下的cell在`hover`时的`tooltip` (点击[Formatting Data](https://tabulator.info/docs/5.5/format)查看更多)
- cssClass - 设置`css 类名`应用在当前列的`header`和`cells`上 (值是一个字符串类型，多个类名使用空格隔离)
- rowHandle - 设置列作为一个`row handle`，允许在当前列下拖拽可移动的`rows` (点击[Movable Rows](https://tabulator.info/docs/5.5/move)查看更多)
- htmlOutput - 在`getHtml`函数的输出中 展示/隐藏列 (点击[Retrieve Data as HTML Table](https://tabulator.info/docs/5.5/update#retrieve-html)查看更多)
- print - 在打印输出时 展示/隐藏 列([Printing](https://tabulator.info/docs/5.5/print)查看更多)
- clipboard - 在`clipboard` 输出中 展示/隐藏 列(点击[Clipboard](https://tabulator.info/docs/5.5/clipboard#visbility)查看更多)

### 数据操作

- sorter - 控制当前列如何排序数据(点击[Sorting Data](https://tabulator.info/docs/5.5/sort)查看更多)
- sorterParams - 配置传递给`sorter`的参数(点击[Sorting Data](https://tabulator.info/docs/5.5/sort)查看更多)
- formatter - 设置如何格式化数据(点击 [Formatting Data](https://tabulator.info/docs/5.5/format) 查看更多)
- formatterParams - 配置传递给`formatter`的参数(点击 [Formatting Data](https://tabulator.info/docs/5.5/format) 查看更多)
- formatterPrint - 当打印表格时，如何格式化数据(点击 [Formatting Data](https://tabulator.info/docs/5.5/format) 查看更多)
- formatterPrintParams - 配置传递给`print formatter`的参数(点击 [Formatting Data](https://tabulator.info/docs/5.5/format#format-export) 查看更多)
- formatterClipboard - 配置当复制到粘贴板时，如何格式化数据(点击 [Formatting Data](https://tabulator.info/docs/5.5/format#format-export) 查看更多)
- formatterClipboardParams - 配置传递给`clipboard formatter`的参数
- formatterHtmlOutput - 设置使用`getHtml`函数时如何格式化数据(点击 [Formatting Data](https://tabulator.info/docs/5.5/format#format-export) 查看更多)
- formatterHtmlOutputParams - 配置传递给`html output formatter`的参数(点击 [Formatting Data](https://tabulator.info/docs/5.5/format#format-export) 查看更多)
- variableHeight - 调整行高度适配单元格内容，而不是溢出时隐藏
- editable - 检查单元格是否可编辑(点击[Manipulating Data](https://tabulator.info/docs/5.5/edit)查看更多)
- editor - 当编辑数据时，配置使用的`editor`(点击[Manipulating Data](https://tabulator.info/docs/5.5/edit)查看更多)
- editorParams - 配置传递给`editor`的参数(点击[Manipulating Data](https://tabulator.info/docs/5.5/edit)查看更多)
- validator - 当用户编辑一个单元格时，设置一个`validator`用来校验数据(点击[Manipulating Data](https://tabulator.info/docs/5.5/validate)查看更多)
- contextMenu - 添加一个`context menu`到列单元格 (点击[Cell Menus](https://tabulator.info/docs/5.5/menu#cell-context)查看更多)
- clickMenu - 添加`左键菜单`到列单元格(点击[Cell Menus](https://tabulator.info/docs/5.5/menu#cell-context)查看更多)
- dblClickMenu - 添加`双击左键菜单`到列单元格(点击[Cell Menus](https://tabulator.info/docs/5.5/menu#cell-context)查看更多)
- contextPopup - 添加`context popup` 到列单元格(点击[Cell Popups](https://tabulator.info/docs/5.5/menu#popup-cell)查看更多)
- clickPopup - 添加`左键 popup`到列单元格(点击[Cell Popups](https://tabulator.info/docs/5.5/menu#popup-cell)查看更多)
- dblClickPopup - 添加`双击左键 popup`到列单元格(点击[Cell Menus](https://tabulator.info/docs/5.5/menu#popup-cell)查看更多)
- mutator - 当解析表格数据时，配置修改列表值的函数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorParams - 配置传递给`mutator`的参数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorData - 通过命令解析表格数据时，配置修改列的值的函数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorDataParams - 配置传递给`mutatorData`的参数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorEdit - 配置用户编辑列的值时对其进行操作的函数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorEditParams - 配置传递给`mutatorEdit`的参数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorClipboard - 配置用户粘贴列的值时对其进行操作的函数(点击 [Mutators](https://tabulator.info/docs/5.5/mutators) 查看更多)
- mutatorClipboardParams - 配置传递给`mutatorClipboard`的参数
- mutateLink - 当列被编辑时触发列上的改变(点击 [Mutators](https://tabulator.info/docs/5.5/mutators#mutator-link) 查看更多)
- accessor - 配置从表函数中提取列值之前更改列值的函数(点击 [Accessors](https://tabulator.info/docs/5.5/modules#accessors)查看更多)
- accessorParams - 配置传递给`accessor`的参数
- accessorData - 配置使用`getData`函数从表提取列值之前修改列值的函数(点击 [Accessors](https://tabulator.info/docs/5.5/modules#accessors)查看更多)
- accessorDataParams - 配置传递给`accessorData`的参数
- accessorDownload - 配置当下载包含当前列的文件之前修改列值的函数(点击 [Accessors](https://tabulator.info/docs/5.5/modules#accessors)查看更多)
- accessorDownloadParams - 配置传递给`accessorDownload`的参数
- accessorClipboard - 配置复制当前列到粘贴板之前，修改列值的函数(点击 [Accessors](https://tabulator.info/docs/5.5/modules#accessors)查看更多)
- accessorClipboardParams - 传递给`accessorClipboard`的参数
- download - 在下载的数据中中 展示/隐藏当前列(点击 [Downloading Table Data](https://tabulator.info/docs/5.5/download)查看更多)
- titleDownload - 下载时，为当前列配置`自定义标题`(点击 [Downloading Table Data](https://tabulator.info/docs/5.5/download)查看更多)
- topCalc - 在当前列的顶部展示当前列的计算值(点击 [Column Calculations](https://tabulator.info/docs/5.5/column-calcs)查看更多)
- topCalcParams - 配置传递给`topCalc`计算函数的参数
- topCalcFormatter - 配置`topCalc `计算单元格的`formatter`(点击 [Column Calculations](https://tabulator.info/docs/5.5/column-calcs)查看更多)
- topCalcFormatterParams - 配置传递给`topCalcFormatter` 函数的参数
- bottomCalc - 在当前列的底部展示当前列的计算值(点击 [Column Calculations](https://tabulator.info/docs/5.5/column-calcs)查看更多)
- bottomCalcParams - 配置传递给`bottomCalc calculation` 函数的参数
- bottomCalcFormatter - 配置`bottomCalc`计算单元的`formatter`(点击 [Column Calculations](https://tabulator.info/docs/5.5/column-calcs)查看更多)
- bottomCalcFormatterParams - 添加传递给`bottomCalcFormatter`函数的参数

### 单元格事件

- cellClick - 配置用户`点击单元格`时的回调 (点击[Callbacks](https://tabulator.info/docs/5.5/callbacks#cell)查看更多)
- cellDblClick - 配置用户`双击单元格`时的回调（点击[Callbacks](https://tabulator.info/docs/5.5/callbacks#cell)查看更多）
- cellContext - 配置`右键点击`单元格时的回调(点击 [Callbacks](https://tabulator.info/docs/5.5/callbacks#cell)查看更多)
- cellTap - 配置用户`点击（手指）`单元格时的回调，用于触摸设备
- cellDblTap - 配置用户`双击（手指）`单元格时的回调，在触摸设备中，当用户点击同一个单元格的间隔小于300ms时触发
- cellTapHold - 配置用户`点击并按压`单元格时的回调，当用户按下单元格超过1s时触发
- cellMouseEnter - 配置当鼠标指针进入单元格时触发(点击 [Callbacks](https://tabulator.info/docs/5.5/callbacks#cell)查看更多)
- cellMouseLeave - 配置鼠标指针离开单元格时的回调
- cellMouseOver - 配置鼠标指针进入单元格或其子元素时的回调
- cellMouseOut - 配置鼠标指针进入单元格或其子元素时的回调
- cellMouseMove - 配置鼠标指针移动到一个单元格时的回调
- cellMouseDown - 配置当指针移动到一个单元格上，按压鼠标左键时的回调（点击[Callbacks](https://tabulator.info/docs/5.5/callbacks#cell)）
- cellMouseUp - 配置当指针移动到一个单元格上，已按压的鼠标左键放开时的回调
- cellEditing - 配置当用户正在编辑一个单元格时的回调
- cellEdited - 配置当用户编辑完成一个单元格时的回调
- cellEditCancelled - 配置当用户取消编辑一个单元格时的回调

### 列头部

- headerSort - 配置用户是否可以在表头`排序`当前列(点击[Sorting Data](https://tabulator.info/docs/5.5/sort)查看更多)
- headerSortStartingDir - 配置用户`首次点击`表头时开始排序的方向(点击[Sorting Data](https://tabulator.info/docs/5.5/sort)查看更多)
- headerSortTristate - 允许表头排序方向的`三态切换`
- headerClick - 配置用户`点击`当前列表头时的回调(点击[Callbacks](https://tabulator.info/docs/5.5/callbacks)查看更多)
- headerDblClick - 配置用户`双击`当前列表头时回调
- headerContext - 配置用户在当前列表头`点击鼠标右键`触发的回调
- headerTap - 配置用户`点击`当前列的表头时的回调，用于触摸设备
- headerDblTap - 配置用户`双击`当前列的表头时的回调，用于触摸设备，两次点击同一个单元格的时间小于`300ms`时触发(点击 [Callbacks](https://tabulator.info/docs/5.5/callbacks)查看更多)
- headerTapHold - 配置用户`点击并按压`当前列表头时的回调，当用户按下单元格超过1s时触发
- headerMouseEnter - 配置鼠标指针进入列表头时的回调
- headerMouseLeave - 配置鼠标指针离开列表头时的回调
- headerMouseOver - 配置鼠标指针进入列表头或其子元素时的回调
- headerMouseOut - 配置鼠标指针进入列表头或其子元素时的回调
- headerMouseMove - 配置鼠标指针移动到列表头时的回调
- headerMouseDown - 配置当指针移动到某列表头上，按压鼠标左键时的回调
- headerMouseUp - 配置当指针移动到某列表头上，已按压的鼠标左键放开时的回调
- headerTooltip - 配置列表头的`hover tooltip` (点击[Formatting Data](https://tabulator.info/docs/5.5/format) 查看更多)
- headerVertical - 配置列表头的方向为`垂直`方向(点击[Vertical Column Headers](https://tabulator.info/docs/5.5/columns#vertical)查看更多)
- editableTitle - 允许用户`编辑表头名称`(点击 [Editable Column Titles](https://tabulator.info/docs/5.5/columns#edit-titles) 查看更多)
- titleFormatter - 配置`表头名称`的`formatter`函数 (点击 [Formatting Data](https://tabulator.info/docs/5.5/format)查看更多)
- titleFormatterParams - 配置传递给`header title formatter`的参数
- headerWordWrap - 允许列表头`文本换行`(点击 [Header Text Wrapping](https://tabulator.info/docs/5.5/columns#header-wrap)查看更多)
- headerFilter - 从表头中的元素中过滤列(点击 [Header Filtering](https://tabulator.info/docs/5.5/filter#header)查看更多)
- headerFilterPlaceholder - 配置`表头过滤器`的`占位文本`
- headerFilterParams - 配置传递给`表头过滤器`的参数
- headerFilterEmptyCheck - 配置检查`表头过滤器`是否为空的函数(点击 [Header Filtering](https://tabulator.info/docs/5.5/filter#header)查看更多)
- headerFilterFunc - 配置`表头过滤器`必须调用的`过滤器函数`
- headerFilterFuncParams - 配置传递给`headerFilterFunc`函数的参数对象
- headerFilterLiveFilter - `禁用`表格`实时过滤`
- headerMenu - 在列的表头新增`menu button`(点击 [Header Menus](https://tabulator.info/docs/5.5/menu#header-menu)查看更多)
- headerClickMenu - 在列的表头新增`click menu`
- headerDblClickMenu - 在列的表头新增`double click menu`
- headerContextMenu - 在列的表头新增`context menu`
- headerPopup - 在列的表头新增`popup button`(点击 [Column Header Popups](https://tabulator.info/docs/5.5/menu#popup-column)查看更多)
- headerClickPopup - 在列的表头新增`click popup`
- headerContextPopup - 在列的表头新增`context popup`(点击 [Column Header Popups](https://tabulator.info/docs/5.5/menu#popup-column)查看更多)


## 列分组

可以对`列表头`进行分组，从而创建一个复杂的`多行`表头。也可以`内嵌列分组`，这样就可以创建一个多级的列分组。

代码示例：

```tsx
const table = new Tabulator("#example-table", {
    columnHeaderVertAlign:"bottom", //align header contents to bottom of cell
    columns:[
        {title:"Name", field:"name", width:160},
        {//create column group
            title:"Work Info",
            columns:[
            {title:"Progress", field:"progress", hozAlign:"right", sorter:"number", width:100},
            {title:"Rating", field:"rating", hozAlign:"center", width:80},
            {title:"Driver", field:"car", hozAlign:"center", width:80},
            ],
        },
        {//create column group
            title:"Personal Info",
            columns:[
            {title:"Gender", field:"gender", width:90},
            {title:"Favourite Color", field:"col", width:140},
            {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", width:130},
            ],
        },
    ],
});
```

## 处理嵌套的数据


## 默认的配置项

使用`columnDefaults`选项为表格的每一列设置一些默认的属性。

如果某一列需要自定义配置，可以使用`columns`选项重新定义来覆盖它。

示例代码：

```tsx
const table = new Tabulator("#example-table", {
    columnDefaults:{
        width:200, //set the width on all columns to 200px
    },
    columns:[
        {title:"Name", field:"name"},
        {title:"Age", field:"age"},
        {title:"Address", field:"address", width:300}, //override the column default and set this column to 300px wide
    ],
});
```

## 垂直的列表头

默认情况下，列表头的文本是水平展示的。如果需要`垂直`列表头文本，可以设置`headerVertical` 为 `true`

```tsx
{title:"Name", field:"name", headerVertical:true}
```

headerVertical的可选值：

- false - 默认值，禁用垂直列 
- true - 启用垂直列
- "flip" - 启用垂直列，文本方向翻转180度

> 注意： 由于CSS 的限制，该配置项在 Internet Explore 浏览器中无法正常工作。

## 操作列

### 替换所有的`列定义(Column Definitions)`

在表格中，可以使用`setColumns`函数替换所有列的列定义。该函数接收一个`列定义数组`作为唯一的参数。

代码示例：

```tsx
//new column definition array
const newColumns = [
     {title:"Name", field:"name", sorter:"string", width:200},
     {title:"Age", field:"age", sorter:"number", hozAlign:"right", formatter:"progress"},
     {title:"Height", field:"height", formatter:"star", hozAlign:"center", width:100},
     {title:"Favourite Color", field:"col", sorter:"string"},
     {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
 ],

table.setColumns(newColumns) //overwrite existing columns with new columns definition array
```

### 更新 A 列的定义

使用`updateColumnDefinition`更新某一列的定义。

代码示例：

```tsx
table.updateColumnDefinition("name", {title:"Updated Title"}) //change the title on the name column
```

或者，如果你拥有当前列的`[Column Component](https://tabulator.info/docs/5.5/components#component-column)`，你可以调用`updateDefinition`函数直接更新。

代码示例：

```tsx
column.updateDefinition({title:"Updated Title"}) //change the column title
```

> `New Column Component`: 值得注意的是，使用此函数实际上是将旧列替换为全新的列，因此在运行此函数后，对先前列组件的任何引用将不再起作用。

**返回 Promise**

`updateColumnDefinition`和`updateDefinition`函数返回一个`Promise`对象。

在 promise 中运行执行其它操作，可以确保他们是在表格重新绘制后才执行。

代码示例：

```tsx
table.updateColumnDefinition("name", {title:"Updated Title"}) //change the column title
.then(function(column){
    //column - column component for the updated column;
})
.catch(function(error){
    //handle column update error
});
```

### 添加列

使用`addColumn`函数在表格上添加一列。

代码示例：

```tsx
table.addColumn({title:"Age", field:"age"}, true, "name");
```

该函数接收三个参数：

- Columns Definition - 新增列的列定义对象
- Before (可选) - 新增列的位置。为`true`表示`插入`到列的最前面，  为`false`表示`插入`到列的最后。如果指定了`Position`参数，那就以指定的`列`为参考
- Position (可选) - 插入新列的参考列的`field`，可以是任意的标准[column component look up](https://tabulator.info/docs/5.5/components#lookup)项

**返回Promise**

`addColumn`函数返回一个`Promise`对象。

在 promise 中执行其它操作，可以确保他们是在表格已经加载完数据后才执行。

代码示例：

```tsx
table.addColumn({title:"Name", field:"name"})
.then(function(column){
    //column - the component for the newly created column

    //run code after column has been added
})
.catch(function(error){
    //handle error adding column
});
```

### 删除列

使用`deleteColumn`函数从表格中永久删除一列。该函数可以使用任意的标准[column component look up](https://tabulator.info/docs/5.5/components#lookup)项作为第一个参数。

代码示例：

```tsx
table.deleteColumn("name");
```

或者，你拥有当前列的`Column Component`，你可以调用`delete`函数直接删除。

代码示例：

```tsx
column.delete();
```

返回一个Promise.

## 获取列的定义列表

调用`getColumnDefinitions`函数，可以获取表格中所有列的定义列表(包含用户任意的改变，如：调整大小或排序列)。

代码示例：

```tsx
const colDefs = table.getColumnDefinitions(); //get column definition array
```
## 获取`Column Component`

使用`getColumns`函数，可以获取表格配置的`Column Components`数组。它仅会真实的数据列而不是列分组。

```tsx
const cols = table.getColumns() //get array of column components
```

要获取`Column Components`结构化的数组，可以传递`true`作为参数。

```tsx  
const cols = table.getColumns(true) //get a structured array of column components
```

这会返回`顶层列`的`Column Components`数组，无论它们是列或列分组。然后在每个`component`上使用`getSubColumns`和`getParentColumn`查看列的层级。

**通过`Field`获取`Component`**

使用`getColumn`函数可以获取`Columen Component`。参数可以是列的`field`或表头元素的DOM节点。

```tsx
const col = table.getColumn("age") //get column component for age column.
```

### 可编辑的列名称

在列的定义对象中，设置`editable`参数为true，可以编辑列名称。

```tsx
{title:"Name", field:"name", editableTitle:true} //allow user to update this columns title
```

配置后，列标题名称将变成一个输入框，用户可以输入新的名称。

用户改变列名称后，会触发`columnTitleChanged`事件：

```tsx
tabulator.on("columnTitleChanged", function(column){
    //column - the column component for the changed column
});
```

## 列的可见性

有多种方式设置列的可见性。

### 在列的定义中配置

在创建列的定义数组时，设置列的可见性：

```tsx
{title:"Name", field:"name", visible:false}, //create hidden column for the field "name"
```

默认值为true，列是可见的。

### 展示列

使用`showColumn`函数，在任意时候显示隐藏的列。参数为列的`field`名称。

```tsx
table.showColumn("name") //show the "name" column
```

或者，如果你拥有当前列的`ColumnComponent`，你可以直接调用`show`函数。

```tsx
column.show();
```

### 隐藏列

使用`hideColumn`函数，在任意时候显示隐藏的列。参数为列的`field`名称。

```tsx
table.hideColumn("name") // hide the "name" column
```

或者，如果你拥有当前列的`ColumnComponent`，你可以直接调用`hide`函数。

```tsx
column.hide();
```

### `切换`列的可见性

使用`toggleColumn`函数，在任意时候切换列的显示/隐藏，参数为列的`field`名称。

```tsx
table.toggleColumn("name") // toggle the visibility of the "name" column
```

或者，如果你拥有当前列的`ColumnComponent`，你可以直接调用`toggle`函数。

```tsx
column.toggle();
```

## 列表头的可见性

设置`headerVisible`选项为false，可以隐藏列表头。这样表格可以表现为一个简单的列表

```tsx
const table = new Tabulator("#example-table", {
    headerVisible:false, //hide column headers
});
```