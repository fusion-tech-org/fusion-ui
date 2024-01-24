# 模块

## 概述

Tabulator是使用`模块化`的方式构建的，核心的代码模块提供了基础的渲染功能，而更多的扩展功能由其它的模块提供。

在你的项目中，你仅需要引入核心的和需要的模块，这样可以最小化引入代码并使表格性能更好。

**完整的包**

如果你想在项目中引入完整的`Tabulator`库，使用所有的内置模块编译，可以使用`TabulatorFull`导入，它会`预注册`所有的模块。

在[Install Documentation](https://tabulator.info/docs/5.5/install)查看模块安装详情。

## 扩展模块

大量的模块提供了一些默认的配置使得表格配置更加简单，如：sorters, formatters 和 editors可以扩展为Tabulator标准的组件。

如果你多次的使用一些自定义的配置（例如一个自定义的sorter），你可以不再需要为了不同的表格多次重新声明他们。Tabulator提供了一种简单的方式允许你扩展自定义的模块为Tabulator标准组件。

在全局的`Tabulator`变量上调用`extendModule`函数添加配置项到所有的表格上。

该函数接收三个参数：模块的名称，想要扩展的属性名以及一个包括想要添加到模块上的元素对象。下面的示例中，我们扩展了`format`模块，添加了两个新的默认`formatters`

```tsx
Tabulator.extendModule('format', 'formatters', {
  bold: function (cell, formatterParams) {
    return '<strong>' + cell.getValue() + '</strong>'; //make the contents of the cell bold
  },
  uppercase: function (cell, formatterParams) {
    return cell.getValue().toUpperCase(); //make the contents of the cell uppercase
  },
});
```

注意：`extendModule`函数必须在`Tabulator`引入之后其它任意表格实例化之前被调用。

注意：如果你在模块对象上定义了一个已经存在的属性，已存在的属性会被复写。

## 可用的模块

## 默认选项
