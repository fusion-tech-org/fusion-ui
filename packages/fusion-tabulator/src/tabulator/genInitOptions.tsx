import {
  Options,
  OptionsColumns,
  OptionsData,
  OptionsPagination,
  OptionsGeneral,
  OptionsLocale,
  ColumnDefinition,
} from 'tabulator-tables';
import { forEach, isArray } from 'lodash';

import zhCNLang from 'langs/zh-cn.json';
import { ReactTabulatorProps } from './index';

const genGeneralOptions = (): OptionsGeneral & OptionsLocale => {
  return {
    height: '100%',
    reactiveData: true,
    placeholder: '暂无数据',
    locale: true,
    langs: {
      zh: zhCNLang,
    },
  };
};

const genColumnDefsOptions = (initColDefs: any[]): OptionsColumns => {
  if (isArray(initColDefs) && initColDefs.length > 0) {
    return {
      columns: initColDefs,
    };
  }

  return {
    autoColumns: true,
  };
};

const genAjaxOptions = (
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
      // return response.data.tags;
      return {
        data: response.data.tags,
        last_page: 3,
      }; //return the tableData property of a response json object
    },
  };
};

const genStaticDataOptions = (
  staticData: Record<string, any>[],
  columnDefs?: ColumnDefinition[]
): OptionsData => {
  const initEditData = {};

  forEach(columnDefs, (item) => {
    initEditData[item.field] = '';
  });

  if (!isArray(staticData) || !staticData?.length)
    return {
      data: [{
        id: 1,
        ...initEditData
      }],
    };

  return {
    data: staticData,
  };
};

const genPaginationOptions = (enableRemote): OptionsPagination => {
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
    layout = 'fitColumns',
    data: tableData,
    actionId,
    columns: columnDefs,
    enableRemote = false,
  } = tabulatorProps;
  const generalOptions = genGeneralOptions();
  const columnDefsOptions = genColumnDefsOptions(columnDefs);
  const ajaxOptions = genAjaxOptions(actionId, enableRemote);
  const staticDataOptions = genStaticDataOptions(tableData, columnDefs);
  const paginationOptions = genPaginationOptions(enableRemote);

  return {
    ...generalOptions,
    ...columnDefsOptions,
    ...ajaxOptions,
    ...staticDataOptions,
    ...paginationOptions,
    layout, // fit columns to width of table (optional)
    // ...options // props.options are passed to Tabulator's options.
  } as Options;
};
