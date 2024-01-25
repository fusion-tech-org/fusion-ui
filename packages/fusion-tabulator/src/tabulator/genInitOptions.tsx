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
import { isArray, isObject, isString, map } from 'lodash';

// import zhCNLang from 'langs/zh-cn.json';
import type { ReactTabulatorProps, TableMode } from './interface';
import { Message } from '@arco-design/web-react';
import { CUSTOM_EDITOR_MAP, checkIsCustomEditor } from './editors';
import { CUSTOM_FORMATTER_MAP, checkIsCustomFormatter } from './formatters';
import { PlatformAppMode } from 'src/interface';

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
    renderVertical: "virtual",
    // langs: {
    //   zh: zhCNLang,
    // },
    dataLoaderLoading: `
      <div style='display:inline-block; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>
        数据加载中...
      </div>
    `,
    dataLoaderError: '',
    dataLoaderErrorTimeout: 0,
    // adverts: true,
    // advertSrc: 'https://fujia.site/articles/632ef6cf86ce2500350b37a1'
  };
};

function customEditorAndFormatterPipe(tempColDefs: ColumnDefinition[], appMode?: PlatformAppMode): ColumnDefinition[] {
  return map(tempColDefs, item => {
    const { editableTitle = false, ...rest } = item;

    const formatEditableTitle = appMode !== 'EDIT' ? false : editableTitle;

    return {
      editableTitle: formatEditableTitle,
      ...rest
    }
  })
}

const genColumnDefsOptions = (initColDefs: ColumnDefinition[], appMode?: PlatformAppMode): OptionsColumns => {
  if (isArray(initColDefs) && initColDefs.length > 0) {
    return {
      columns: customEditorAndFormatterPipe(initColDefs, appMode),
    };
  }

  return {
    autoColumns: true,
    autoColumnsDefinitions: function (definitions) {
      //definitions - array of column definition objects
      if (appMode !== 'EDIT') return definitions;

      definitions.forEach((column) => {
        column.editableTitle = true;
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
  actionId: string,
  enableRemote: boolean,
  enableIndexedDBQuery: boolean,
  params?: Record<string, any>;
}): OptionsData => {
  if (!actionId || !enableRemote || enableIndexedDBQuery) return {};

  console.log(enableRemote, 'enableRemote');
  const formatParams = isObject(params) ? params : {};
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
        where: {
          ...formatParams
        },
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
    paginationSizeSelector: [10, 30, 50, 100, 500, 1000],
    paginationMode: enableRemote ? 'remote' : 'local',
  };
};

export const genInitOptions = (
  tabulatorProps: ReactTabulatorProps,
): Options => {
  const {
    layout = "fitDataFill",
    data: tableData,
    actionId,
    columns: columnDefs,
    enableRemote = false,
    tableMode = 'editable',
    appMode,
    uniformProps,
  } = tabulatorProps;
  let { commonOptions = {} } = uniformProps || {};
  const { enableIndexedDBQuery = false, quickAddConfigs, indexdbConfigs, dbType, remoteAjax } = uniformProps || {};
  const generalOptions = genGeneralOptions();

  const formatColumnDefs = dbType === 'cutomTableSelect' ? quickAddConfigs.columns : columnDefs;

  const columnDefsOptions = genColumnDefsOptions(formatColumnDefs, appMode);
  const ajaxOptions = genAjaxOptions({ actionId, enableRemote, enableIndexedDBQuery, params: remoteAjax?.params });
  const staticDataOptions = genStaticDataOptions({ tableData, columnDefs, tableMode, enableIndexedDBQuery });
  const paginationOptions = genPaginationOptions({
    enableRemote,
    tableMode
  });
  const indexedDBOptions = genIndexedDBOptions(enableIndexedDBQuery, indexdbConfigs, dbType);

  if (!isObject(commonOptions)) {
    commonOptions = {};
  }

  return {
    ...generalOptions,
    ...columnDefsOptions,
    ...indexedDBOptions,
    ...ajaxOptions,
    ...staticDataOptions,
    ...paginationOptions,
    layout, // fit columns to width of table (optional)
    // ...options // props.options are passed to Tabulator's options.
    ...commonOptions,
  } as Options;
};

function genIndexedDBOptions(enableIndexedDBQuery: boolean, indexdbConfigs: Record<string, any>, dbType?: string) {
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
  console.log('genIndexedDBOptions', tableName,
    simpleBuiltinQueryCondition,
    dropdownSimpleBuiltinQueryCondition,);
  return {
    dexie: dexie,
    dexieTable: dbType === 'cutomTableSelect' ? dropdownIndexedDBTableName : tableName
  };
}
