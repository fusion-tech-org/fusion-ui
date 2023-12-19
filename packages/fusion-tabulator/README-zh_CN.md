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
- cellMouseOut - callback for when the mouse pointer enters a cell or one of its child elements(see Callbacks for more details)
- cellMouseMove - callback for when the mouse pointer moves over a cell (see Callbacks for more details)
- cellMouseDown - callback for the left mouse button is pressed with the cursor over a cell (see Callbacks for more details)
- cellMouseUp - callback for the left mouse button is released with the cursor over a cell (see Callbacks for more details)
- cellEditing - callback for when a cell in this column is being edited by the user (see Callbacks for more details)
- cellEdited - callback for when a cell in this column has been edited by the user (see Callbacks for more details)
- cellEditCancelled - callback for when an edit on a cell in this column is aborted by the user (see Callbacks for more details)

### 列头部

- headerSort - user can sort by clicking on the header (see Sorting Data for more details)
- headerSortStartingDir - set the starting sort direction when a user first clicks on a header (see Sorting Data for more details)
- headerSortTristate - allow tristate toggling of column header sort direction (see Sorting Data for more details)
- headerClick - callback for when user clicks on the header for this column (see Callbacks for more details)
- headerDblClick - callback for when user double clicks on the header for this column (see Callbacks for more details)
- headerContext - callback for when user right clicks on the header for this column (see Callbacks for more details)
- headerTap - callback for when user taps on a header for this column, triggered in touch displays. (see Callbacks for more details)
- headerDblTap - callback for when user double taps on a header for this column, triggered in touch displays when a user taps the same header twice in under - 300ms. (see Callbacks for more details)
- headerTapHold - callback for when user taps and holds on a header for this column, triggered in touch displays when a user taps and holds the same header for 1 second. (see Callbacks for more details)
- headerMouseEnter - callback for when the mouse pointer enters a column header (see Callbacks for more details)
- headerMouseLeave - callback for when the mouse pointer leaves a column header (see Callbacks for more details)
- headerMouseOver - callback for when the mouse pointer enters a column header or one of its child elements(see Callbacks for more details)
- headerMouseOut - callback for when the mouse pointer enters a column header or one of its child elements(see Callbacks for more details)
- headerMouseMove - callback for when the mouse pointer moves over a column header (see Callbacks for more details)
- headerMouseDown - callback for the left mouse button is pressed with the cursor over a column header (see Callbacks for more details)
- headerMouseUp - callback for the left mouse button is released with the cursor over a column header (see Callbacks for more details)
- headerTooltip - sets the on hover tooltip for the column header (see Formatting Data for more details)
- headerVertical - change the orientation of the column header to vertical (see Vertical Column Headers for more details)
- editableTitle - allows the user to edit the header titles. (see Editable Column Titles for more details)
- titleFormatter - formatter function for header title (see Formatting Data for more details)
- titleFormatterParams - additional parameters you can pass to the header title formatter(see Formatting Data for more details)
- headerWordWrap - Allow word wrapping in the column header (see Header Text Wrapping for more details)
- headerFilter - filtering of columns from elements in the header (see Header Filtering for more details)
- headerFilterPlaceholder - placeholder text for the header filter (see Header Filtering for more details)
- headerFilterParams - additional parameters you can pass to the header filter (see Header Filtering for more details)
- headerFilterEmptyCheck - function to check when the header filter is empty (see Header Filtering for more details)
- headerFilterFunc - the filter function that should be used by the header filter (see Header Filtering for more details)
- headerFilterFuncParams - additional parameters object passed to the headerFilterFunc function (see Header Filtering for more details)
- headerFilterLiveFilter - disable live filtering of the table (see Header Filtering for more details)
- headerMenu - add menu button to column header (see Header Menus for more details)
- headerClickMenu - add click menu to column header (see Header Menus for more details)
- headerDblClickMenu - add double click menu to column header (see Header Menus for more details)
- headerContextMenu - add context menu to column header (see Header Menus for more details)
- headerPopup - add popup button to column header (see Column Header Popups for more details)
- headerClickPopup - add click popup to column header (see Column Header Popups for more details)
- headerContextPopup - add context popup to column header (see Column Header Popups for more details)

