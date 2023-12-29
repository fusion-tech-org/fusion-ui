# 列设置

## 概述

在Tabulator中，`列`被用来定义当数据加载进表格后如何显示数据。

每一列表示的是行数据对象中的一个字段(`field`)，但不需要为行数据的每一个字段都创建一个列定义，只有要展示在表格的列才需要配置。

## 自动列生成

```tsx
//define table
const table = new Tabulator("#example-table", {
    data:tabledata,
    autoColumns:true,
});
```

### 自定义`自动列生成`

```tsx
var table = new Tabulator("#example-table", {
    data:tabledata,
    autoColumns:true,
    autoColumnsDefinitions:function(definitions){
        //definitions - array of column definition objects

        definitions.forEach((column) => {
            column.headerFilter = true; // add header filter to every column
        });

        return definitions;
    },
});
```

**列定义数组**

```tsx
var table = new Tabulator("#example-table", {
    data:tabledata,
    autoColumns:true,
    autoColumnsDefinitions:[
        {field:"name", editor:"input"}, //add input editor to the name column
        {field:"age", headerFilter:true}, //add header filters to the age column
    ],
});
```

**字段名查询对象**

```tsx
var table = new Tabulator("#example-table", {
    data:tabledata,
    autoColumns:true,
    autoColumnsDefinitions:{
        name: {editor:"input"}, //add input editor to the name column
        age: {headerFilter:true}, //add header filters to the age column
    },
});
```


## 列定义

可以在表格构造器对象中配置`columns`属性，它的值是一个对象数组，每个对象定义一个列:

```tsx
var table = new Tabulator("#example-table", {
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

有大量的属性可以用来配置列:

**通用**

- title
- field
- visible

**布局**

- hozAlign
- vertAlign
- headerHozAlign
- width
- minWidth
- maxWidth
- maxInitialWidth
- widthGrow
- widthShrink
- resizable
- frozen
- responsive
- tooltip
- cssClass
- rowHandle
- htmlOutput
- print
- clipboard

**数据操作**

- sorter
- sorterParams
- formatter
- formatterParams
- formatterPrint
- formatterPrintParams
- formatterClipboard
- formatterClipboardParams
- formatterHtmlOutput
- formatterHtmlOutputParams
- variableHeight
- editable
- editor
- editorParams
- validator
- contextMenu
- clickMenu
- dblClickMenu
- contextPopup
- clickPopup
- dblClickPopup
- mutator
- mutatorParams
- mutatorData
- mutatorDataParams
- mutatorEdit
- mutatorEditParams
- mutatorClipboard
- mutatorClipboardParams
- mutateLink
- accessor
- accessorParams
- accessorData
- accessorDataParams
- accessorDownload
- accessorDownloadParams
- accessorClipboard
- accessorClipboardParams
- download
- titleDownload
- topCalc
- topCalcParams
- topCalcFormatter
- topCalcFormatterParams
- bottomCalc
- bottomCalcParams
- bottomCalcFormatter
- bottomCalcFormatterParams

**单元格事件**

- cellClick
- cellDblClick
- cellContext
- cellTap
- cellDblTap
- cellTapHold
- cellMouseEnter
- cellMouseLeave
- cellMouseOver
- cellMouseOut
- cellMouseMove
- cellMouseDown
- cellMouseUp
- cellEditing
- cellEdited
- cellEditCancelled

**列头事件**

- headerSort
- headerSortStartingDir
- headerSortTristate
- headerClick
- headerDblClick
- headerContext
- headerTap
- headerDblTap
- headerTapHold
- headerMouseEnter
- headerMouseLeave
- headerMouseOver
- headerMouseOut
- headerMouseMove
- headerMouseDown
- headerMouseUp
- headerTooltip
- headerVertical
- editableTitle
- titleFormatter
- titleFormatterParams
- headerWordWrap
- headerFilter
- headerFilterPlaceholder
- headerFilterParams
- headerFilterEmptyCheck
- headerFilterFunc
- headerFilterFuncParams
- headerFilterLiveFilter
- headerMenu
- headerClickMenu
- headerDblClickMenu
- headerContextMenu
- headerPopup
- headerClickPopup
- headerContextPopup


### 列分组

### 处理嵌套数据

### 默认的配置

### 垂直的列表头

## 单元格对齐

## 操作列

### 替换列定义

使用`setColumns`函数去替换表格当前的列定义，该函数接收一个列定义数组作为唯一的参数。

```tsx
//new column definition array
 var newColumns = [
     {title:"Name", field:"name", sorter:"string", width:200},
     {title:"Age", field:"age", sorter:"number", hozAlign:"right", formatter:"progress"},
     {title:"Height", field:"height", formatter:"star", hozAlign:"center", width:100},
     {title:"Favourite Color", field:"col", sorter:"string"},
     {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
 ],

table.setColumns(newColumns) //overwrite existing columns with new columns definition array
```

**更新列定义**

```tsx
table.updateColumnDefinition("name", {title:"Updated Title"}) //change the title on the name column

column.updateDefinition({title:"Updated Title"}) //change the column title
```


### 添加列

### 删除列

### 获取列定义

### 获取列组件

### 可编辑的列表头

### 表头文本换行

### 列的可见性

### 列表头的可见性

## 回调

## 事件

