import {
  Options,
  OptionsColumns,
  OptionsData,
  OptionsPagination,
  // OptionsGeneral,
  // OptionsLocale,
  ColumnDefinition,
  RowComponent,
  CellComponent,
} from 'tabulator-tables';
import { isArray, isObject, isString, map } from 'lodash';

// import zhCNLang from 'langs/zh-cn.json';
import type { ReactTabulatorProps, TableMode } from './interface';
import { Message } from '@arco-design/web-react';
import { PlatformAppMode, TableTypeFlag } from 'src/interface';
import { convertExpressionByRule, simpleExecExpression } from './utils';
import { CUSTOM_EDITOR_MAP, checkIsCustomEditor } from './editors';
import { ROW_HEIGHT } from './constants';

export const genInitOptions = (
  tabulatorProps: ReactTabulatorProps
): Options => {
  const {
    layout = 'fitColumns',
    data: tableData,
    actionId,
    columns: columnDefs,
    enableRemote = false,
    tableMode = 'editable',
    appMode,
    uniformProps,
  } = tabulatorProps;
  let { commonOptions = {} } = uniformProps || {};

  if (!isObject(commonOptions)) {
    commonOptions = {};
  }

  const { hidePagination = false, ...availableCommonOptions } = commonOptions;

  const {
    enableIndexedDBQuery = false,
    quickAddConfigs,
    indexdbConfigs,
    tableTypeFlag,
    remoteAjax,
  } = uniformProps || {};
  const generalOptions = genGeneralOptions();

  const formatColumnDefs =
    tableTypeFlag === TableTypeFlag.customTableSelect
      ? quickAddConfigs.columns
      : columnDefs;
  const formatTableData =
    tableTypeFlag === TableTypeFlag.customTableSelect
      ? quickAddConfigs.data
      : tableData;

  const columnDefsOptions = genColumnDefsOptions(formatColumnDefs, appMode);
  const ajaxOptions = genAjaxOptions({
    actionId,
    enableRemote,
    enableIndexedDBQuery,
    params: remoteAjax?.params,
  });
  const staticDataOptions = genStaticDataOptions({
    tableData: formatTableData,
    columnDefs,
    tableMode,
    enableIndexedDBQuery,
  });
  const paginationOptions = genPaginationOptions({
    enableRemote,
    tableMode,
    hidePagination,
  });
  const indexedDBOptions = genIndexedDBOptions(
    enableIndexedDBQuery,
    indexdbConfigs,
    tableTypeFlag
  );

  return {
    ...generalOptions,
    ...columnDefsOptions,
    ...indexedDBOptions,
    ...ajaxOptions,
    ...staticDataOptions,
    ...paginationOptions,
    layout:
      tableTypeFlag === TableTypeFlag.customTableSelect
        ? 'fitDataStretch'
        : layout, // fit columns to width of table (optional)
    // ...options // props.options are passed to Tabulator's options.
    ...availableCommonOptions,
  } as Options;
};

const genGeneralOptions = (): Options & {
  selectableRows?: boolean;
  selectableRowsRollingSelection?: boolean;
  selectableRowsCheck?: (row: RowComponent) => void;
} => {
  return {
    height: '100%',
    maxHeight: '100%',
    reactiveData: true,
    headerSort: false,
    placeholder: null,
    tabEndNewRow: true, // create empty new row on tab
    locale: true,
    selectableRows: false,
    // selectableRollingSelection: false, // disable rolling selection
    selectableRowsRollingSelection: false, //disable rolling selection
    renderHorizontal: 'virtual',
    renderVertical: 'virtual',
    // langs: {
    //   zh: zhCNLang,
    // },
    // <div style='display:inline-block; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>
    //   数据加载中...
    // </div>
    dataLoaderLoading: `
      <div class="arco-spin"><span class="arco-spin-icon"><div class="arco-spin-dot-list"><div class="arco-spin-dot"></div><div class="arco-spin-dot"></div><div class="arco-spin-dot"></div><div class="arco-spin-dot"></div><div class="arco-spin-dot"></div></div></span></div>
    `,
    dataLoaderError: '',
    dataLoaderErrorTimeout: 0,
    rowHeight: ROW_HEIGHT,
    // adverts: true,
    // advertSrc: 'https://fujia.site/articles/632ef6cf86ce2500350b37a1'
  };
};

function editCheck(editorParams: Record<string, any>) {
  return (cell: CellComponent) => {
    //cell - the cell component for the editable cell
    const { eqRule = '' } = editorParams || {};
    //get row data
    const data = cell.getRow().getData();

    const execExpr = convertExpressionByRule(eqRule, { ...data });

    if (!execExpr || execExpr.includes('undefined')) return true;

    return simpleExecExpression(execExpr)();
  };
}

function customEditorAndFormatterPipe(
  tempColDefs: ColumnDefinition[],
  appMode?: PlatformAppMode
): ColumnDefinition[] {
  return map(tempColDefs, (item) => {
    const {
      headerSort = false,
      editableTitle = false,
      editable = false,
      editor,
      editorParams = {},
      ...rest
    } = item;

    const formatEditableTitle = appMode !== 'EDIT' ? false : editableTitle;

    const isCustomEditor =
      isString(editor) && checkIsCustomEditor(editor as any);

    const customColDefs: Record<string, any> = {
      editableTitle: formatEditableTitle,
      headerSort,
    };

    if (isCustomEditor) {
      customColDefs.editor = CUSTOM_EDITOR_MAP[editor];
    } else if (editor) {
      customColDefs.editor = editor;
    }

    if (editable) {
      customColDefs.editable = editCheck(editorParams);
    }

    return {
      editorParams,
      ...rest,
      ...customColDefs,
    };
  });
}

const genColumnDefsOptions = (
  initColDefs: ColumnDefinition[],
  appMode?: PlatformAppMode
): OptionsColumns => {
  if (isArray(initColDefs) && initColDefs.length > 0) {
    return {
      columns: customEditorAndFormatterPipe(initColDefs, appMode),
    };
  }

  return {
    autoColumns: true,
    autoColumnsDefinitions: function (definitions) {
      // definitions.forEach((column) => {
      //   column.headerSort = false;
      // });
      //definitions - array of column definition objects
      if (appMode !== 'EDIT') return definitions;

      definitions.forEach((column) => {
        column.editableTitle = true;
        column.headerSort = false;
        // column.headerFilter = true; // add header filter to every column
      });

      return definitions;
    },
  };
};

export const genAjaxOptions = ({
  actionId,
  enableRemote,
  enableIndexedDBQuery,
  params,
}: {
  actionId: string;
  enableRemote: boolean;
  enableIndexedDBQuery: boolean;
  params?: Record<string, any>;
}): OptionsData => {
  if (!actionId || !enableRemote || enableIndexedDBQuery) return {};

  const formatParams = isObject(params) ? params : {};
  console.log(formatParams, 'formatParams');
  return {
    ajaxURL: '/api/v1/actions/execute',
    // ajaxURL: 'https://staging.fusiontech.cn/api/v1/actions/execute',
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
    ajaxRequesting: (url: string, params: any) => {
      console.log('url', url, 'params', params);
      return true;
    },
    ajaxParams: () => {
      console.log('ajaxParams', '<<<<<<<<<<<<<<');
      const executeActionRequest = {
        actionId,
        viewMode: false,
        enablePage: true,
        size: 10,
        page: 1,
        where: {
          ...formatParams,
        },
        dateBetween: {},
      };

      return { executeActionDTO: JSON.stringify(executeActionRequest) };
    },
    ajaxResponse: function (_url, _params, response) {
      //url - the URL of the request
      //params - the parameters passed with the request
      //response - the JSON object returned in the body of the response.
      const { data, responseMeta, size, total } = response;
      const { status, success } = responseMeta || {};

      if (status !== 200 && !success) {
        Message.error('数据加载异常，请稍后重试！');
      }
      // return response.data.tags;
      const { body = [] } = data || {};
      const lastPage = Math.max(Math.ceil(Number(total) / Number(size)), 1);

      return {
        data: body,
        last_page: lastPage,
      }; //return the tableData property of a response json object
    },
  };
};

const genStaticDataOptions = ({
  tableData,
  enableIndexedDBQuery,
  columnDefs,
}: {
  tableData: Record<string, unknown>[];
  enableIndexedDBQuery: boolean;
  columnDefs?: ColumnDefinition[];
  tableMode?: TableMode;
}): OptionsData => {
  console.log('genStaticDataOptions columnDefs:', columnDefs);
  if (!isArray(tableData) || enableIndexedDBQuery) {
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
    data: tableData,
  };
};

export interface GenPaginationOptionsParams {
  enableRemote: boolean;
  tableMode: TableMode;
  hidePagination: boolean;
}
const genPaginationOptions = ({
  tableMode,
  enableRemote,
  hidePagination,
}: GenPaginationOptionsParams): OptionsPagination => {
  if (tableMode === 'editable' || hidePagination) {
    return {
      pagination: false,
    };
  }
  return {
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [10, 30, 50, 100, 500, 1000],
    paginationMode: enableRemote ? 'remote' : 'local',
  };
};

function genIndexedDBOptions(
  enableIndexedDBQuery: boolean,
  indexdbConfigs: Record<string, any>,
  tableTypeFlag?: string
) {
  if (!enableIndexedDBQuery) {
    return {};
  }

  const {
    dexie,
    tableName,
    dropdownIndexedDBTableName,
    simpleBuiltinQueryCondition,
    dropdownSimpleBuiltinQueryCondition,
  } = indexdbConfigs;
  console.log(
    'genIndexedDBOptions',
    tableName,
    simpleBuiltinQueryCondition,
    dropdownSimpleBuiltinQueryCondition
  );
  return {
    dexie: dexie,
    dexieTable:
      tableTypeFlag === TableTypeFlag.customTableSelect
        ? dropdownIndexedDBTableName
        : tableName,
  };
}
