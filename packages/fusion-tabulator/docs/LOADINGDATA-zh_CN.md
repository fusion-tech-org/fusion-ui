# 加载数据

`Tabulator`行数据是一个`对象数组`，可以传递一个数组或是通过AJAX请求返回一个JSON格式的字符串。

数据不仅可以包含`列配置项`的信息，还可以存储其它的数据信息，它们不会在屏幕中展示。

**数据修改**

注意：如果在`列定义数组`中定义了任意的`mutator`函数，在表格数据被解析时，这些函数会被调用（点击[Mutatos](https://tabulator.info/docs/5.5/mutators)查看更多）。

## Row Index(行索引)

在表格展示之后，如果你想要使用编程的方式修改数据，就需要为行数据指定一个唯一的索引值，可以是数字或字符串。

默认情况下，Tabulator 会查找数据的`id` 字段。如果希望使用不同的`field`作为索引，设置`index`配置项。

```tsx
const table = new Tabulator("#example-table", {
    index:"age", //set the index field to the "age" field.
});
```

## 从Array/JSON 加载数据

使用`setData`方法，直接设置表格的数据。

```tsx
const tableData = [
    {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
];

table.setData(tableData);
```

`setData`方法返回一个Promise对象。

### 设置初始化数据

如果希望表格在创建时包含数据，可以在表格的构造器函数中配置`data`属性。

```tsx
const tableData = [
    {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
]

const table = new Tabulator("#example-table", {
    data:tableData, //set initial table data
    columns:[
        {title:"Name", field:"name"},
        {title:"Age", field:"age"},
        {title:"Gender", field:"gender"},
        {title:"Height", field:"height"},
        {title:"Favourite Color", field:"col"},
        {title:"Date Of Birth", field:"dob"},
        {title:"Cheese Preference", field:"cheese"},
    ],
});
```

## 通过AJAX加载

> Ajax 功能由`ajax module`提供

配置`ajaxURL`属性，从远程服务器加载数据。

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
});
```

**Ajax 加载触发器**

在任意时候，可以传递一个URL到`setData`函数来加载数据，它会自动执行`AJAX`请求。URL可以是绝对地址，也可以是相对地址。

```tsx
table.setData("http://www.getmydata.com/now");
```

如果在表格构造器中已经设置了URL，就可以在任意时候调用`setData`函数且不需要参数触发数据重载。

```tsx
table.setData();
```


### 默认的请求头

默认情况下，Ajax 请求会发送以下请求头：

|Header | Value|
|:----:|:----:|
| X-Requested-With | XMLHTTPRequest |
| Accept | application/json |

取决于`ajaxContentType`的内容，也可能发送一些其他的表头。

当前页存储在`cookies`中的凭证也会被携带进请求中。


### URL 参数

使用`ajaxParams`属性传递请求参数。

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    ajaxParams:{key1:"value1", key2:"value2"}, //ajax parameters
});
```

**实时参数**

如果要为每个请求生成一个参数，就可以给`ajaxParams`属性传递一个函数。该函数在每次请求发起时被调用，并返回一个参数对象。

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    ajaxParams: function(){
        return {key1:"value1", key2:"value2"};
    }
});
```

**设置数据参数**

当使用`setData`时，如果你想传递参数，可以使用一个可选的参数，它是一个对象:

```tsx
table.setData("http://www.getmydata.com/now", {key1:"value1", key2:"value2"});
```

### 请求方法

默认情况下，Tabulator使用`GET`请求方法。配置`ajaxConfig`属性可以修改请求方法：

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    ajaxConfig:"POST", //ajax HTTP request type
});
```

或者

```tsx
table.setData("http://www.getmydata.com/now", {}, "POST"); //make a post request
```

### Content-Type

当使用非`GET`的请求方法，Tabulator将会使用`form data`的形式发送所有的参数。

可以使用`ajaxContentType`属性来指定请求的`Content-Type`:

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    ajaxConfig:"POST", //ajax HTTP request type
    ajaxContentType:"json", // send parameters to the server as a JSON encoded string
});
```

`ajaxContentType`的可选值：

- "form" - 以`form data`的形式发送参数（默认）
- "json" - 以JSON字符串的形式发送参数

自定义`Content-Type`示例：

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    ajaxConfig:"POST", //ajax HTTP request type
    ajaxContentType:{
        headers:{
            'Content-Type': 'text/html',
        },
        body:function(url, config, params){
            //url - the url of the request
            //config - the fetch config object
            //params - the request parameters

            //return comma list of params:values
            var output = [];

            for (var key in params){
                output.push(key + ":" + params[key])
            }

            return output.join(",");
        },
    }
});
```

### 高级配置

配置`ajaxConfig`属性来指定请求的`fetch`配置对象：

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    ajaxConfig:{
        method:"POST", //set request type to Position
        headers: {
            "Content-type": 'application/json; charset=utf-8', //set specific content type
        },
    }
});
```

或者在使用`setData`函数时，配置第三个参数：

```tsx
const ajaxConfig = {
    method:"POST", //set request type to Position
    headers: {
        "Content-type": 'application/json; charset=utf-8', //set specific content type
    },
};

table.setData("http://www.getmydata.com/now", {}, ajaxConfig); //make ajax request with advanced config options
```

注意：在高级配置选项中，不要设置下面的选项，它们是由 Tabulator设置的，对库的操作来说是必须的：

- url
- async
- dataType
- success
- error


### 跨域请求

Tabulator 会尝试解决跨域请求，如果请求失败，会抛出错误。

这取决于服务器的配置，你也可以自行配置：

```tsx
const ajaxConfig = {
    mode:"cors", //set request mode to cors
    credentials: "same-origin", //send cookies with the request from the matching origin
    headers: {
        "Accept": "application/json", //tell the server we need JSON back
        "X-Requested-With": "XMLHttpRequest", //fix to help some frameworks respond correctly to request
        "Content-type": 'application/json; charset=utf-8', //set the character encoding of the request
        "Access-Control-Allow-Origin": "http://yout-site.com", //the URL origin of the site making the request
    },
};
```

### 格式化响应

Tabulator 期待一个可JSON串行化的对象数组作为表格数据。

**修改响应**

使用`ajaxResponse`处理返回数据：

```tsx
const table = new Tabulator("#example-table", {
    ajaxResponse:function(url, params, response){
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.

        return response.tableData; //return the tableData property of a response json object
    },
});
```

### 获取当前的Ajax URL

使用`getAjaxUrl`函数获取当前的Ajax URL：

```tsx
const url = table.getAjaxUrl();
```

### 取消一个Ajax请求

在发起`AJAX`请求之前，会调用`ajaxRequesting`回调，如果你想取消一个请求可以返回一个false值。

```tsx
const table = new Tabulator("#example-table", {
    ajaxRequesting:function(url, params){
        return false; //abort ajax request
    },
});
```

### 生成自定义的请求URL

使用`ajaxURLGenerator`属性生成一个自定义的URL

```tsx
const table = new Tabulator("#example-table", {
    ajaxURLGenerator:function(url, config, params){
        //url - the url from the ajaxURL property or setData function
        //config - the request config object from the ajaxConfig property
        //params - the params object from the ajaxParams property, this will also include any pagination, filter and sorting properties based on table setup

        //return request url
        return url + "?params=" + encodeURI(JSON.stringify(params)); //encode parameters as a json object
});
```


### Ajax过滤

如果想在`数据服务器侧`而不是在`Tabulator`中过滤数据，可以使用`filterMode`属性发送过滤参数发送到服务器。

```tsx
const table = new Tabulator("#example-table", {
    filterMode:"remote", //send filter data to the server instead of processing locally
});
```

### Ajax排序

如果想在`数据服务器侧`而不是在`Tabulator`中排序数据，可以使用`sortMode`属性发送排序参数发送到服务器：

```tsx
const table = new Tabulator("#example-table", {
    sortMode:"remote", //send sort data to the server instead of processing locally
});
```

### 覆写`Request Promise`

使用`ajaxRequestFunc`属性替换内置的Ajax功能，将请求路由到另一个`数据源`，如：JS 或 `Realm 数据库`。

```tsx
function queryRealm(url, config, params){
    //url - the url of the request
    //config - the ajaxConfig object
    //params - the ajaxParams object

    //return promise
    return new Promise(function(resolve, reject){
        //do some async data retrieval then pass the array of row data back into Tabulator
        resolve(data);

        //if there is an error call this function and pass the error message or object into it
        reject();
    });
}

var table = new Tabulator("#example-table", {
    ajaxRequestFunc:queryRealm,
});
```

> 注意：当使用了`ajaxRequestFunc`属性时，`ajaxURLGenerator`将不会再调用，你需要在函数中处理所有的URL操作

### 加载异常

两种方式：

**Promise Catch:**

```tsx
table.setData("http://mydata.com/data")
.then(function(){
    //run code after table has been successfully updated
})
.catch(function(error){
   // error - Fetch response object
});
```

**Event**

当加载请求返回异常响应时，会触发`dataLoadError`:

```tsx
table.on("dataLoadError", function(error){
    //error - the returned error object
});
```

### 回调

Tabulator 提供了一些回调函数用于记录`ajax`数据加载的进程。点击[Ajax Callbacks](https://tabulator.info/docs/5.5/callbacks#ajax)部分查看更多。

### 渐进式加载

如果一次性从远程加载大量的数据，有时响应时间会很长，这会降低用户体验。

Tabulator 提供了一种`渐进式加载模式`来解决这个问题。

该模式的原理是：复用了`分页模块`的功能连续的加载数据。

两种不同的渐进式加载模式：

**Load mode**

该模式下，Tabulator 会自动的加载下一页的数据，直到数据全部加载完成:

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    progressiveLoad:"load", //sequentially load all data into the table
});
```

使用`progressiveLoadDelay`添加延迟请求(单位是ms)，可以避免服务器的`速率限制`或`安全策略`:

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    progressiveLoad:"load", //enable progressive loading
    progressiveLoadDelay:200 //wait 200 milliseconds between each request
});
```

**Scroll mode**

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    progressiveLoad:"scroll", //load data into the table as the user scrolls
});
```

使用`progressiveLoadScrollMargin`来配置触发加载的`阈值`（单位：px），默认情况下设置的表格高度的2倍。

```tsx
const table = new Tabulator("#example-table", {
    ajaxURL:"http://www.getmydata.com/now", //ajax URL
    progressiveLoad:"scroll", //enable progressive loading
    progressiveLoadScrollMargin:300 //trigger next ajax load when scroll bar is 300px or less from the bottom of the table.
});
```

**返回响应数据**

当使用`渐进式加载模式`从服务器加载数据时，需要为`pagination`返回特定的格式:

```json
{
    "last_page":15, //the total number of available pages (this value must be greater than 0)
    "data":[ // an array of row data objects
        {"id":1, "name":"bob", "age":"23"} //example row data object
    ]
}
```

## 导入自定义数据

文件导入功能由`import module`提供。

### 从本地文件导入

使用`import`函数从本地磁盘导入数据。

```tsx
table.import("json", ".json")
.then(() => {
    //file successfully imported
})
.catch(() => {
    //something went wrong
})

```

参数说明：

- `format`: 导入数据的格式，支持`json`、`csv`、`xlsx`、`xls`、`txt`
- `accept`: 表示可以接收的文件格式，为空的话，表示可以使用任意的文件类型，参考[accept field of an input element ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)

### 从`Data`导入

**使用 Data 选项导入**

导入自定义数据:

```tsx
//define some CSV data
const csvData = `"Oli", "London", "23"
"Jim", "Mancheser", "53"`;

//define table
const table = new Tabulator("#example-table", {
    data:csvData,
    importFormat:"csv",
    columns:[...],
});

```

**使用Data 配置和Auto Columns 导入**

```tsx
//define some CSV data
const csvData = `"Name", "Location", "Age"
"Oli", "London", "23"
"Jim", "Mancheser", "53"`;

//define table
const table = new Tabulator("#example-table", {
    data:csvData,
    importFormat:"csv",
    autoColumns:true,
});

```

**使用 setData 函数导入**

```tsx
//define some CSV data
const csvData = `"Oli", "London", "23"
"Jim", "Mancheser", "53"`;

//define table
const table = new Tabulator("#example-table", {
    importFormat:"csv",
});

//load data at some point later
table.setData(csvData);

```

## 内置的`importers`

Tabulator 提供了一些`预配置`的`importers`，概述如下：

> 注意：添加你自己的导入器，可以参考[Extending Tabulator](https://tabulator.info/docs/5.5/modules#module-import)部分

### JSON

```tsx
table.import("json", ".json");
```

### CSV

```tsx
table.import("csv", ".csv");
```

### Array

```tsx
//define some array data
var arrayData = [
  ["Name", "Age", "Likes Cheese"], //column header titles
  ["Bob", 23, true],
  ["Jim", 44, false],
]

//define table
var table = new Tabulator("#example-table", {
    data:arrayData,
    importFormat:"array",
    autoTables:true,
});

```

### 自定义`importers`

```tsx
//define custom importer
function customJsonImporter(fileContents){
    return JSON.parse(fileContents);
}

//trigger import using custom importer
table.import(customJsonImporter, ".json");

```

### File Readers

```tsx
const table = new Tabulator("#example-table", {
    importReader:"buffer", //read imported file as buffer
});

```

可用的`readers`:

- text - 将文件读取成字符串
- buffer - 将文件读取为ArrayBuffer
- binary - 将文件读取字符串格式的原始二进制
- url - 将文件读取成data url

## 从HTML Table元素中导入

### 导入设置项

