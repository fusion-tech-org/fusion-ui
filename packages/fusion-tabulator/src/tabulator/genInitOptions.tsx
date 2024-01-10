import {
  Options,
  OptionsColumns,
  OptionsData,
  OptionsPagination,
  // OptionsGeneral,
  // OptionsLocale,
  ColumnDefinition,
  Editor,
  Formatter,
} from 'tabulator-tables';
import { isArray, isString, map } from 'lodash';

import zhCNLang from 'langs/zh-cn.json';
import { ReactTabulatorProps, TableMode } from './index';
import { Message } from '@arco-design/web-react';
import { CUSTOM_EDITOR_MAP, checkIsCustomEditor } from './editors';
import { CUSTOM_FORMATTER_MAP, checkIsCustomFormatter } from './formatters';

const genGeneralOptions = (): Options => {
  return {
    height: '100%',
    maxHeight: "100%",
    reactiveData: true,
    placeholder: null,
    tabEndNewRow: true, // create empty new row on tab
    locale: true,
    selectable: false,
    selectableRollingSelection: false, // disable rolling selection
    renderHorizontal: "virtual",
    langs: {
      zh: zhCNLang,
    },
    dataLoaderLoading: `
      <div style='display:inline-block; border:4px solid #333; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>
        数据加载中...
      </div>
    `,
    dataLoaderError: '',
    dataLoaderErrorTimeout: 0,
  };
};

function customEditorAndFormatterPipe(tempColDefs: ColumnDefinition[]): ColumnDefinition[] {
  return map(tempColDefs, item => {
    const { editor, formatter, ...rest } = item;

    const pendingItem: {
      editor?: Editor;
      formatter?: Formatter;
    } = {
      editor,
      formatter
    };

    if (isString(editor) && checkIsCustomEditor(editor)) {
      pendingItem.editor = CUSTOM_EDITOR_MAP[editor];
    }

    if (isString(formatter) && checkIsCustomFormatter(formatter)) {
      pendingItem.formatter = CUSTOM_FORMATTER_MAP[formatter]
    }

    return {
      ...pendingItem,
      ...rest
    }
  })
}

const genColumnDefsOptions = (initColDefs: ColumnDefinition[]): OptionsColumns => {
  if (isArray(initColDefs) && initColDefs.length > 0) {
    return {
      columns: customEditorAndFormatterPipe(initColDefs),
    };
  }

  return {
    autoColumns: true,
    autoColumnsDefinitions: function (definitions) {
      //definitions - array of column definition objects

      definitions.forEach((column) => {
        column.editableTitle = true;
        // column.headerFilter = true; // add header filter to every column
      });

      return definitions;
    },
  };
};

export const genAjaxOptions = (
  actionId: string,
  enableRemote: boolean
): OptionsData => {
  if (!actionId) return {};

  console.log(enableRemote, 'enableRemote');
  return {
    ajaxURL: '/api/v1/actions/execute',
    ajaxConfig: {
      method: 'POST',
      // mode: 'cors', //set request mode to cors
      // credentials: 'same-origin', //send cookies with the request from the matching origin
      headers: {
        Accept: 'application/json', //tell the server we need JSON back
        // 'X-Requested-With': 'XMLHttpRequest', //fix to help some frameworks respond correctly to request
        // 'Content-type': 'application/json; charset=utf-8', //set the character encoding of the request
        // 'Access-Control-Allow-Origin': '*', //the URL origin of the site making the request
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        // Cookie: 'SESSION=0209b4c2-4e3a-4a21-b696-9329b3800427', //set specific content type
      },
    },
    ajaxParams: () => {
      const executeActionRequest = {
        actionId,
        viewMode: false,
        enablePage: true,
        size: 10,
        page: 1,
        where: {},
        dateBetween: {},
      };

      return { executeActionDTO: JSON.stringify(executeActionRequest) };
    },
    ajaxResponse: function (_url, _params, response) {
      //url - the URL of the request
      //params - the parameters passed with the request
      //response - the JSON object returned in the body of the response.
      console.log(response);

      const { data, responseMeta, size, total } = response;
      const { status, success } = responseMeta || {};

      if (status !== 200 && !success) {
        Message.error('数据加载异常，请稍后重试！');
      }
      // return response.data.tags;
      const { body = [] } = data || {};
      const lastPage = Math.max(Math.ceil(total / size), 1);

      return {
        data: body,
        last_page: lastPage,
      }; //return the tableData property of a response json object
    },
  };
};

const genStaticDataOptions = (
  staticData: Record<string, unknown>[],
  columnDefs?: ColumnDefinition[],
  tableMode?: TableMode
): OptionsData => {
  console.log('genStaticDataOptions columnDefs:', columnDefs);
  if (!isArray(staticData) || !staticData?.length || tableMode === 'editable') {
    // const initEditData = {};

    // forEach(columnDefs, (item) => {
    //   initEditData[item.field] = '';
    // });

    // return {
    //   data: [{
    //     id: 1,
    //     ...initEditData
    //   }],

    // };
    return {};
  }

  return {
    data: staticData,
  };
};

export interface GenPaginationOptionsParams {
  enableRemote: boolean;
  tableMode: TableMode;
}
const genPaginationOptions = ({ tableMode, enableRemote }: GenPaginationOptionsParams): OptionsPagination => {
  if (tableMode === 'editable') {
    return {
      pagination: false,
    }
  }
  return {
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [3, 10, 30, 50, 100],
    paginationMode: enableRemote ? 'remote' : 'local',
  };
};

export const genInitOptions = (
  tabulatorProps: ReactTabulatorProps,
): Options => {
  const {
    // layout = "fitColumns",
    data: tableData,
    actionId,
    columns: columnDefs,
    enableRemote = false,
    tableMode = 'editable',
  } = tabulatorProps;
  const generalOptions = genGeneralOptions();
  const columnDefsOptions = genColumnDefsOptions(columnDefs);
  const ajaxOptions = genAjaxOptions(actionId, enableRemote);
  const staticDataOptions = genStaticDataOptions(tableData, columnDefs, tableMode);
  const paginationOptions = genPaginationOptions({
    enableRemote,
    tableMode
  });

  return {
    ...generalOptions,
    ...columnDefsOptions,
    ...ajaxOptions,
    ...staticDataOptions,
    ...paginationOptions,
    // layout, // fit columns to width of table (optional)
    // ...options // props.options are passed to Tabulator's options.
  } as Options;
};
