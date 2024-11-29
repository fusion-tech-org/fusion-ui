import { CellComponent, TabulatorFull as Tabulator } from 'tabulator-tables';
import { isFunction, isNumber, isString, isUndefined } from 'lodash';

import zhCNLang from 'langs/zh-cn.json';
import { Message } from '@arco-design/web-react';
import { convertExpressionByRule, simpleExecExpression } from './utils';

/**
 * default options
 */
// Tabulator.defaultOptions.columnDefaults.headerSort = false;

/**
 * register modules
 */
// Tabulator.registerModule(DexieModule);

// Tabulator.registerModule(ExternalInputModule);
// Tabulator.registerModule(AdvertModule);
/**
 * extending modules
 */

function genEditStyle(cellValue) {
      // 创建外层div
    const outerDiv = document.createElement('div');
    outerDiv.style.position = 'relative';
    outerDiv.style.opacity = '1';

    // 创建第一个子div，并设置class和内容
    const textDiv = document.createElement('div');
    textDiv.className = 'tabulator-cell-edit-text';
    textDiv.textContent = cellValue; // 将cellValue插入到div中

    // 创建第二个子div，并设置class
    const styleDiv = document.createElement('div');
    styleDiv.className = 'tabulator-cell-edit-style';

    // 将子div添加到外层div中
    outerDiv.appendChild(textDiv);
    outerDiv.appendChild(styleDiv);

    // 将外层div添加到页面中的某个元素内，例如body
    document.body.appendChild(outerDiv);
    return outerDiv;
}

function createText(content:string) {
  const el = document.createDocumentFragment();
  el.textContent = content;
  return el;
}

const span = (() => {
  const span = document.createElement('span');
span.className = 'tabulator-row-del-icon';
span.style.cursor = 'pointer';
span.style.color = '#666';
// 将svg添加到span中
span.innerHTML = ` <svg data-action="del-row-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-close-circle" style="font-size: 24px;"><path d="m17.643 17.643 6.364 6.364m0 0 6.364 6.364m-6.364-6.364 6.364-6.364m-6.364 6.364-6.364 6.364M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"></path>       </svg>`;
return span;
})()

const arcoCheckboxMaskIcon = (() => {
const span = document.createElement('div');
span.className = 'arco-checkbox-mask';
// 将svg添加到span中
span.innerHTML = `
                <svg class="arco-checkbox-mask-icon" aria-hidden="true" focusable="false" viewBox="0 0 1024 1024" width="200" height="200" fill="currentColor"><path d="M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z" p-id="840"></path></svg>
              `;
return span;
})()

/**
 * TODO: below code will refactor soon
 */
// extendiing formatter
Tabulator.extendModule('format', 'formatters', {
  delRowIcon: function () {
    // const curRow = cell.getRow();
    return span.cloneNode(true); //make the contents of the cell bold
  },
  checkbox: function (cell: CellComponent, formatterParams, _onRendered) {
    const cellValue:
      | Array<{
          label: string;
          value: any;
        }>
      | undefined = cell.getValue();
    const { linkColumn } = formatterParams || {};

    if (!Array.isArray(cellValue) || cellValue.length === 0) {
      return '';
    }

  function genCheckboxList() {
    const formatCellValue = cellValue.filter(
        ({ label, value }) => label && value
    );
    const curRowData = cell.getData();
    const mapValues = curRowData[linkColumn] || [];
    // 创建外层容器
    const checkboxGroup = document.createElement('span');
    checkboxGroup.className = 'arco-checkbox-group arco-checkbox-group-direction-horizontal flex flex-wrap';

    formatCellValue.forEach(({ label, value }) => {
        const arcoCheckboxMaskIconSvg = arcoCheckboxMaskIcon.cloneNode();
        // 创建 label 元素
        const labelElement = document.createElement('label');
        const isChecked = mapValues.includes(value);
        labelElement.className = isChecked ? 'arco-checkbox arco-checkbox-checked' : 'arco-checkbox';

        // 创建 checkbox input
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = value;
        checkboxInput.dataset.action = 'checkbox';
        checkboxInput.dataset.actionid = value;

        // 创建 span 元素用于图标
        const spanIcon = document.createElement('span');
        spanIcon.className = `arco-icon-hover arco-checkbox-icon-hover ${isChecked ? '' : 'arco-icon-hover-disabled'} arco-checkbox-mask-wrapper`;
        spanIcon.appendChild(arcoCheckboxMaskIconSvg);
        // 创建 checkbox 文本
        const checkboxText = document.createElement('span');
        checkboxText.className = 'arco-checkbox-text';
        checkboxText.textContent = label;

        // 将所有子元素添加到 label 中
        labelElement.appendChild(checkboxInput);
        labelElement.appendChild(spanIcon);
        labelElement.appendChild(checkboxText);

        // 将 label 添加到外层容器中
        checkboxGroup.appendChild(labelElement);
    });

    return checkboxGroup;
  }
  const checkboxListElement = genCheckboxList();
  return checkboxListElement;
  },
  placeholder: function (cell: CellComponent, formatterParams, _onRendered) {
    const cellValue = cell.getValue();
    const {
      placeholder,
      color = '#A9AEB8',
      enableLookup = false,
      editStyle,
    } = formatterParams || {};

    const text = createText(cellValue);

    if (cellValue === 0) {
      return editStyle ? genEditStyle(cellValue) : text;
    }

    if (cellValue) {
      if (!enableLookup) {
        return editStyle ? genEditStyle(cellValue) : text;
      }

      const cellColDef = cell.getColumn().getDefinition();

      const { editorParams } = cellColDef;
      const { values = [] } = (editorParams || {}) as Record<string, any>;

      let processingValues = values;

      if (isFunction(values)) {
        const rowData = cell.getRow().getData();

        processingValues = values(rowData);
      }

      const convertedValues = {};
      //Todo caches
      for (let i = 0; i < processingValues.length; i++) {
        const item = processingValues[i];

        const { label, value } = item || {};

        if (!isUndefined(value)) {
          convertedValues[value] = label;
        }
      }

      return editStyle
        ? genEditStyle(convertedValues[cellValue])
        : createText(convertedValues[cellValue]);
    }

    const cellElmHasDisableClass = cell
      .getElement()
      .classList.contains('cell-edit-disable');

    if (placeholder && !cellElmHasDisableClass) {
      const span = document.createElement('span');
      span.style.color = color; // 设置颜色
      span.textContent = placeholder; // 设置文本内容
      return span;
    }

    return createText('');
  },
  required: function (cell: CellComponent, formatterParams, _onRendered) {
    const cellValue = cell.getValue();
    const { color = '#CF9FFF', enableLookup = false } = formatterParams || {};

    if (cellValue === 0) {
      return cellValue;
    }

    if (cellValue) {
      if (!enableLookup) {
        return cellValue;
      }

      const cellColDef = cell.getColumn().getDefinition();
      const { editorParams } = cellColDef;
      const { values = [] } = (editorParams || {}) as Record<string, any>;
      const convertedValues = {};

      for (let i = 0; i < values.length; i++) {
        const item = values[i];

        const { label, value } = item || {};

        if (!isUndefined(value)) {
          convertedValues[value] = label;
        }
      }

      return createText(convertedValues[cellValue]);
    }

    const cellElmHasDisableClass = cell
      .getElement()
      .classList.contains('cell-edit-disable');

    if (cellElmHasDisableClass) return createText('');

    const outerDiv = document.createElement('div');
    outerDiv.style.height = '100%';
    outerDiv.style.width = '100%';
    outerDiv.style.marginTop = '-5px';

    // 创建内层 div
    const innerDiv = document.createElement('div');
    innerDiv.style.height = '32px';
    innerDiv.style.border = `1px solid ${color}`; // 使用传入的 color
    innerDiv.style.borderRadius = '12px';
    innerDiv.style.width = '100%';

    // 将内层 div 添加到外层 div
    outerDiv.appendChild(innerDiv);

    return outerDiv;
  },
  tags: function (cell, formatterParams, _onRendered) {
    const cellValue = cell.getValue();
    const {
      separator = ',',
      size = 'default', // 'small' | 'default' | 'medium' | 'large'
      colors = {},
      // colorList = [],
    } = formatterParams || {};

    // 检查 cellValue 是否有效
    if (typeof cellValue !== 'string' || !cellValue) return '';

    const toArr = cellValue.split(separator);
    const container = document.createElement('div');
    container.className = 'arco-space arco-space-horizontal arco-space-align-center';

    toArr.forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = 'arco-space-item';
        tagItem.style.marginRight = '6px';

        const tagDiv = document.createElement('div');
        tagDiv.className = `arco-tag arco-tag-${colors[tag] || 'gray'} arco-tag-checked arco-tag-size-${size}`;

        const tagContent = document.createElement('span');
        tagContent.className = 'arco-tag-content';
        tagContent.textContent = tag; // 设置标签文本

        // 构建 DOM 结构
        tagDiv.appendChild(tagContent);
        tagItem.appendChild(tagDiv);
        container.appendChild(tagItem);
    });

    return container; // 返回构建的 DOM 元素
  },
  plaintext: function (cell) {
    const cellValue = cell.getValue();
    return createText(cellValue);
  },
  lookup: function(cell, formatterParams, onRendered) {
  var value = cell.getValue();
  if (typeof formatterParams[value] === "undefined") {
    console.warn("Missing display value for " + value);
    return  createText(value);
  }
  return createText(formatterParams[value]);
}
  // tickbox: function (_cell: CellComponent, _formatterParams, _onRendered) {
  //   // cell.getColumn().getDefinition().cellClick = function (e, cell) {
  //   //   // e.stopPropagation();
  //   //   cell.getRow().toggleSelect();
  //   // };
  //   return `<input type="checkbox" aria-label="Select Row" data-action="tickbox">`;
  // },
});

// extending accessors
Tabulator.extendModule('accessor', 'accessors', {
  roundDown: function (value, data, accessorParams) {
    return Math.floor(value); //return the new value for the cell data.
  },
});

// extending Column Calculation

// extending edit
Tabulator.extendModule('edit', 'editors', {
  uppercaseInput: function (cell, onRendered, success, cancel, editorParams) {
    //create and style input
    const cellValue = cell.getValue().toUpperCase();
    const input = document.createElement('input');

    input.setAttribute('type', 'text');

    input.style.padding = '4px';
    input.style.width = '100%';
    input.style.boxSizing = 'border-box';

    input.value = cellValue;

    onRendered(function () {
      input.focus();
      input.style.height = '100%';
    });

    function onChange(e) {
      if (input.value !== cellValue) {
        success(input.value.toUpperCase());
      } else {
        cancel();
      }
    }

    //submit new value on blur or change
    input.addEventListener('change', onChange);
    input.addEventListener('blur', onChange);

    //submit new value on enter
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        success(input.value);
      }

      if (e.key === 'Escape') {
        cancel();
      }
    });

    return input;
  },
});

// extending localization
Tabulator.extendModule('localize', 'langs', {
  zh: zhCNLang,
});

// extending mutators
Tabulator.extendModule('mutator', 'mutators', {
  mathCalc: function (_value, data, _type, mutatorParams) {
    /**
     * NOTE: defining the calculate rules, for example: `([columnName] + [columnName]) * [columnName]`
     */
    const {
      calcRule = '',
      // ellipsisType = 'round',
      precision,
      defaultValue = {},
    } = mutatorParams || {};
    try {
      const convertCalcRules: string = convertExpressionByRule(
        calcRule,
        data,
        true,
        defaultValue
      );
      console.log('convertCalcRules', convertCalcRules);
      if (convertCalcRules.includes('NaN')) return;

      const result = simpleExecExpression(convertCalcRules)();

      if (isNumber(precision) && precision > 0) {
        return result.toFixed(precision);
      }

      return result;
    } catch (e) {
      console.error('mutator - mathCalc failed: ', e?.message);
      Message.info('定义的列计算规则格式不正确');
    }
  },
});

export default Tabulator;

// extending validate data
