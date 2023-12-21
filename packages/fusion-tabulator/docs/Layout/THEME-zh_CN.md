# 主题

## 概述

Tabulator 提供了一些预置包的主题样式来简化表格样式的使用。

使用其它主题，可以修改默认的`tabulator.css`文件。

所有的样式表存放在`/dist/css`目录下，包含一个标准的CSS和压缩的版本。



## 标准主题

## 框架主题

## 构建自定义的主题

除了使用内置的主题，你也可以构建自定义的主题来满足需求。根据下面的步骤集成你自己的主题。

**Source Files**

已存在主题的源文件存放在`/src/scss`目录下，特定框架的主题按文件夹分组，以便它们可以共享任何主题特定的变量文件。

**引入核心的样式表**

所有的主题都需要引入核心的样式表`/src/scss/tabulator.scss`，然后定义具体的SCSS变量覆盖需要调整的核心样式。

```css
//first define any variables you want to overrides
$backgroundColor:#f00; //change background color of table

//then import the core SCSS
@import  "../tabulator.scss";

//then add your overriding CSS
.tabulator{
    ...
}

```

查看Tabulator使用的完整SCSS变量[列表](https://tabulator.info/docs/5.5/style#sass)。

