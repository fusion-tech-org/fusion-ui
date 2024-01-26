
import React, { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import {
  TabulatorFull as Tabulator,
  EventCallBackMethods,
} from 'tabulator-tables';
import { filter, forIn, isNull, isUndefined, reduce } from 'lodash';

import { DexieModule } from './custom-modules/DexieModule';
// import { AdvertModule } from './custom-modules/AdvertModule';
import { genInitOptions } from './genInitOptions';
import { genInitEventMaps } from './genInitEventMaps';
import zhCNLang from 'langs/zh-cn.json';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';

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
  bold: function (cell, formatterParams) {
    return "<strong>" + cell.getValue() + "</strong>"; //make the contents of the cell bold
  },
  placeholder: function (cell, formatterParams) {
    console.log('formatterParams', formatterParams);
    const cellValue = cell.getValue();
    const { placeholder } = formatterParams || {};

    if (cellValue) return cellValue;

    if (placeholder) return `<span style="color: #999">${placeholder}</span>`;

    return '';
  }
});

// extending accessors
Tabulator.extendModule('accessor', 'accessors', {
  roundDown: function (value, data, accessorParams) {
    return Math.floor(value); //return the new value for the cell data.
  }
})

// extending requests
// Tabulator.extendModule("ajax", "defaultConfig", {
//   type: "POST",
//   contentType : "application/json; charset=utf-8",

// });

// extending Column Calculation

// extending edit
Tabulator.extendModule("edit", "editors", {
  uppercaseInput: function (cell, onRendered, success, cancel, editorParams) {

    //create and style input
    const cellValue = cell.getValue().toUpperCase(),
      input = document.createElement("input");

    input.setAttribute("type", "text");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function () {
      input.focus();
      input.style.height = "100%";
    });

    function onChange(e) {
      if (input.value !== cellValue) {
        success(input.value.toUpperCase());
      } else {
        cancel();
      }
    }

    //submit new value on blur or change
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
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
Tabulator.extendModule("localize", "langs", {
  "zh": zhCNLang,
});

// extending mutators
Tabulator.extendModule('mutator', 'mutators', {
  linkedColumns: function (_value, data, _type, mutatorParams) {
    const { columns = [] } = mutatorParams || {};
    console.log(_value, _type);
    const formatCols = filter(columns, col => !isUndefined(col) && !isNull(col))

    return reduce(formatCols, (acc, col) => {
      return acc + (data[col] || 0);
    }, 0)
  }
});

// extending validate data


/**
 * default options
 */
// Tabulator.defaultOptions.columnDefaults.headerSort = false;
export const useTabulator = ({
  ref,
  props,
  eventCallback,
}: {
  ref: React.RefObject<HTMLElement>;
  props: any;
  eventCallback?: (eventName: string, data?: Record<string, any>, tableTypeFlag?: string) => void;
}) => {
  const {
    eventMaps = {},
    appMode,
    onUpdateWidgetMetaProperty,
    onEvents,
  } = props;
  const instanceRef = useRef<Tabulator>();
  const [rectBound] = useIntersectionObserver(ref);

  const handleTableEvents = (eventName: string, data?: Record<string, any>, tableTypeFlag?: string) => {
    eventCallback?.(eventName, data, tableTypeFlag);

    onEvents?.(eventName, data);
  }

  const initTabulator = (callback?: VoidFunction) => {
    if (instanceRef.current) {
      // debugger;
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(ref.current) as HTMLElement;

    // generates initial options
    const initOptions = genInitOptions(props)

    console.log('initTabulatorOptions', initOptions);
    // init tabulator
    instanceRef.current = new Tabulator(domEle, initOptions);

    // if (tableMode === 'editable' && !isEmpty(tableData)) {
    //   const reCalcTop = headerVisible ? (tableData.length * ROW_HEIGHT) + HEADER_HEIGHT : tableData.length * ROW_HEIGHT;

    //   setInputTop(reCalcTop);
    // }

    // localization
    instanceRef.current.setLocale?.('zh');

    /**
    * NOTE: Binding events
    */
    const defaultEvents = genInitEventMaps({
      appMode,
      tabulatorRef: instanceRef.current,
      onUpdateWidgetMetaProperty,
      onEvents: handleTableEvents,
    });
    const mergeEvents = {
      ...defaultEvents,
      ...eventMaps,
    };

    forIn(mergeEvents, (handler, eventName: keyof EventCallBackMethods) => {
      instanceRef.current.on(eventName, handler);
    })

    // props.onRef && props.onRef(instanceRef);
    onUpdateWidgetMetaProperty?.({
      tabulatorRef: instanceRef.current,
    });

    callback?.();
  }

  return {
    tableHeight: rectBound?.height,
    tabulatorRef: instanceRef.current,
    initTable: initTabulator
  }
}