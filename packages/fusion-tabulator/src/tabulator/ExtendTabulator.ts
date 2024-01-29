import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { filter, isNull, isUndefined, reduce } from 'lodash';

import { DexieModule } from './custom-modules/DexieModule';
// import { AdvertModule } from './custom-modules/AdvertModule';

import zhCNLang from 'langs/zh-cn.json';

/**
 * default options
 */
// Tabulator.defaultOptions.columnDefaults.headerSort = false;

/**
 * register modules
 */
Tabulator.registerModule(DexieModule);

// Tabulator.registerModule(AdvertModule);
/**
 * extending modules
 */

// extendiing formatter
Tabulator.extendModule('format', 'formatters', {
  delRowIcon: function () {
    // const curRow = cell.getRow();

    return `<span class="tabulator-row-del-icon" style="cursor: pointer; color: #666;">
      <svg data-action="del-row-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-close-circle" style="font-size: 24px;"><path d="m17.643 17.643 6.364 6.364m0 0 6.364 6.364m-6.364-6.364 6.364-6.364m-6.364 6.364-6.364 6.364M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z"></path>
      </svg>
    </span>`; //make the contents of the cell bold
  },
  placeholder: function (cell, formatterParams, _onRendered) {
    console.log('formatterParams', formatterParams);
    const cellValue = cell.getValue();
    const { placeholder } = formatterParams || {};

    if (cellValue) return cellValue;

    if (placeholder) return `<span style="color: #999">${placeholder}</span>`;

    return '';
  },
});

// extending accessors
Tabulator.extendModule('accessor', 'accessors', {
  roundDown: function (value, data, accessorParams) {
    return Math.floor(value); //return the new value for the cell data.
  },
});

// extending requests
// Tabulator.extendModule("ajax", "defaultConfig", {
//   type: "POST",
//   contentType : "application/json; charset=utf-8",

// });

// extending Column Calculation

// extending edit
Tabulator.extendModule('edit', 'editors', {
  uppercaseInput: function (cell, onRendered, success, cancel, editorParams) {
    //create and style input
    const cellValue = cell.getValue().toUpperCase(),
      input = document.createElement('input');

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
  linkedColumns: function (_value, data, _type, mutatorParams) {
    const { columns = [] } = mutatorParams || {};
    console.log(_value, _type);
    const formatCols = filter(
      columns,
      (col) => !isUndefined(col) && !isNull(col)
    );

    return reduce(
      formatCols,
      (acc, col) => {
        return acc + (data[col] || 0);
      },
      0
    );
  },
});

export default Tabulator;

// extending validate data
