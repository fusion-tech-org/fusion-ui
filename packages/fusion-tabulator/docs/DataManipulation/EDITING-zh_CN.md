# 数据编辑

## 概述

> 编辑功能由`edit`模块提供

Tabulator 允许用户编辑表格中的每一个单元格的数据。

[在线demo](https://tabulator.info/docs/5.5/edit#overview)。

在定义表格列时可以使用`editor`属性设置表格列是`可编辑`的（点击[Define Column](https://tabulator.info/docs/5.5/columns)查看更多）。

当用户点击可编辑的列时就可以编辑当前单元格的值。

默认情况下，Tabulator会使用一个`editor`去匹配当前单元格的格式。如果你想指定具体的`editor`，可以在定义`列`时设置`editor`属性。如果将该值设置为`true`，表格会使用与列`格式化程序`（如果存在）最匹配的编辑器。

也可以向编辑器传递一个可选的额外参数，`editorParams` 是一个用于配置编辑器其它信息的对象。

**参数查询函数**

如果想要在`editor`被调用时动态地生成`editorParams`，可以传递一个函数给该属性，它返回一个参数对象：

```tsx
//define lookup function
function paramLookup(cell){
    //cell - the cell component

    //do some processing and return the param object
    return {param1:"green"};
}

//column definition
{title:"Rating", field:"rating", editor:"star", editorParams:paramLookup}
```


## 内置编辑器

Tabulator 提供了大量的内置的`editor`， 包含如下：

> 注意：添加自定义的`editors`到清单，可以查看[Extending Tabulator](https://tabulator.info/docs/5.5/modules#module-edit)章节

### Input

`input`编辑器允许输入单行的`纯文本`:

```tsx
{title:"Example", field:"example", editor:"input", editorParams:{
    search:true,
    mask:"AAA-999",
    selectContents:true,
    elementAttributes:{
        maxlength:"10", // 设置输入框元素最大的字符长度
    }
}}
```

`editorParams`对象的属性说明：

- search -  使用带有清除按钮的搜索类型输入框
- mask - 应用一个`mask` 到 `input`，允许按特定的顺序输入指定的字符（点击[Text Input Masking](https://tabulator.info/docs/5.5/edit#masking)查看更多）
- selectContents - 当编辑器被加载时，选中它的文本内容
- elementAttributes - 直接在`input`元素上设置属性


### Textarea

用于输入多行文本。

```tsx
{title:"Example", field:"example", editor:"textarea", editorParams:{
    elementAttributes:{
        maxlength:"10", //set the maximum character length of the textarea element to 10 characters
    },
    mask:"AAA-999",
    selectContents:true,
    verticalNavigation:"editor", //navigate cursor around text area without leaving the cell
    shiftEnterSubmit:true, //submit cell value on shift enter
}}
```

### Numeric

`number`编辑器用于输入数值类型，它带有`增加` 和 `减少`的按钮。

```tsx
{title:"Example", field:"example", editor:"number", editorParams:{
    min:0,
    max:100,
    step:10,
    elementAttributes:{
        maxlength:"10", //set the maximum character length of the input element to 10 characters
    },
    mask:"999",
     selectContents:true,
    verticalNavigation:"table", //up and down arrow keys navigate away from cell without changing value
}}
```


### Range

用于输入一个数值范围。

```tsx
{title:"Example", field:"example", editor:"range", editorParams:{
    min:0,
    max:100,
    step:10,
    elementAttributes:{
        maxlength:"10", //set the maximum character length of the input element to 10 characters
    }
}}
```

### Checkbox

### Star

### Progress Bar

### Date

`前置依赖：如果在 editor 中使用了 format 参数，需要安装 luxon.js 库执行格式转换`

用于编辑日期：

```tsx
{title:"Example", field:"example", editor:"date", editorParams:{
    min:"01/01/2020", // the minimum allowed value for the date picker
    max:"02/12/2022", // the maximum allowed value for the date picker
    format:"dd/MM/yyyy", // the format of the date value stored in the cell
    verticalNavigation:"table", //navigate cursor around table without changing the value
    elementAttributes:{
        title:"slide bar to choose option" // custom tooltip
    }
}}
```

### Time

用于编辑时间格式数据。

```tsx
{title:"Example", field:"example", editor:"time", editorParams:{
    format:"hh:mm:ss", // the format of the time value stored in the cell
    verticalNavigation:"table", //navigate cursor around table without changing the value
    elementAttributes:{
        title:"slide bar to choose option" // custom tooltip
    }
}}
```

### Date Time

用于编辑日期时间格式数据。

```tsx
{title:"Example", field:"example", editor:"datetime", editorParams:{
    format:"dd/MM/yyyy hh:mm", // the format of the date value stored in the cell
    verticalNavigation:"table", //navigate cursor around table without changing the value
    elementAttributes:{
        title:"slide bar to choose option" // custom tooltip
    }
}}
```

### List(Select/Autocomplate)

`list`编辑器会创建一个下拉列表，允许用户从预定义的选项中选择一个，默认情况下，它是充当一个选择列表类型，但也可以将它配置成`autocomplete`。

```tsx
{title:"Example", field:"example", editor:"list", editorParams:{
    //Value Options (You should use ONE of these per editor)
    values:["red", "green", "blue", orange], //an array of values or value/label objects
    valuesURL: "http://myvalues.com", //a url to load the values from
    valuesLookup:"active", //get the values from the currently active rows in this column

    //Value Lookup Configuration (use these with valuesLookup Option)
    valuesLookupField:"color", //the field to lookup values from

    //General Options
    clearable:true, //show clear "x" button on editpr
    itemFormatter:(label, value, item, element){
        //label - the text lable for the item
        //value - the value for the item
        //item - the original value object for the item
        //element - the DOM element for the item

        return "<strong>" + label + " </strong><br/><div>" + item.subtitle + "</div>" : "");
    },
    elementAttributes:{ //set attributes on input element
        maxlength:"10", //set the maximum character length of the input element to 10 characters
    },
    verticalNavigation:"hybrid", //navigate to new row when at the top or bottom of the selection list
    sort:"asc", sort direction for the values list
    defaultValue:"Steve Johnson", //the value that should be selected by default if the cells value is undefined
    emptyValue:null, //the value that should be asigned to the cell if the editor is left with an empty value
    maxWidth:true, prevent width of list item from exceeding width of cell
    placeholderLoading:"Loading List...", set custom placeholder when loading list values
    placeholderEmpty:"No Results Found", set custom placeholder when list is empty

    //Select Options (only available when autocomplete:false)
    multiselect:true, //allow selection of multiple items from the list

    //Autocomplete Options (only available when autocomplete:true)
    autocomplete:true, //enable autocomplete mode,
    filterFunc:function(term, label, value, item){ //replace built in filter function with custom
        //term - the string being searched for
        //label - the text lable for the item
        //value - the value for the item
        //item - the original value object for the item

        return label === term;
    },
    filterRemote:true, //pass filter term to remote server in request instead of filtering
    filterDelay:100, //delay in milliseconds after typing before filter begins
    allowEmpty:true, //allow the user to leave the cell empty
    listOnEmpty:true, //show all values in the list if the input is empty
    mask:"AAA-999", //apply input mask to text entry
    freetext:true, //allow the user to set the value of the cell to a free text entry
}}
```

### Values

有多种定义列表值的方式，这取决于你的需求，下面的章节概述了相关的详情。

#### Values - Array / Object

可以传递一个数组给`values`参数：

```tsx
{title:"Example", field:"example", editor:"list", editorParams:{values:["red", "green", "blue", "orange"]}}
```

这种模式下，值也会作为列表项的`label`。

#### Values - 从`列`中查询

#### Values - 远程的`Ajax`加载

#### 格式化列表

#### 排序列表

#### 过滤列表


## 自定义Editors

如果你需要不同类型的`editor`，可以为`editor`选项指定一个自定义的函数。该函数接收5个参数：

- `CellComponent`: 当前单元格组件
- onRendered: 单元格渲染完成后的回调函数，可以用来设置聚焦或在元素显示后格式化展示
- success: Tabulator成功更新之后的回调函数
- cancel: Tabulator取消编辑并返回一个正常的单元格时的回调函数
- editorParams: 传递给列定义属性`editorParams`的参数对象

**自定义的`editor`函数应该返回一个`DOM`节点，它会被插入到当前单元格。或返回false取消编辑。**

```tsx
var dateEditor = function(cell, onRendered, success, cancel, editorParams){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass thesuccessfully updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell
    //editorParams - params object passed into the editorParams column definition property

    //create and style editor
    var editor = document.createElement("input");

    editor.setAttribute("type", "date");

    //create and style input
    editor.style.padding = "3px";
    editor.style.width = "100%";
    editor.style.boxSizing = "border-box";

    //Set value of editor to the current value of the cell
    editor.value = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd")

    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function(){
        editor.focus();
        editor.style.css = "100%";
    });

    //when the value has been set, trigger the cell to update
    function successFunc(){
        success(luxon.DateTime.fromFormat(cell.getValue(), "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
    }

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", successFunc);

    //return the editor element
    return editor;
};


//in your column definition for the column
{title:"Birthday", field:"dob", editor:dateEditor}}
```

## 可选的编辑

## 文本输入屏蔽

## 编辑历史

## 事件



