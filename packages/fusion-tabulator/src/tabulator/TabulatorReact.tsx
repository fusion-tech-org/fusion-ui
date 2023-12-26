/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import {
  TabulatorFull as Tabulator,
  ColumnDefinition,
  Options,
  OptionsColumns,
  EventCallBackMethods,
  CellComponent,
  ColumnComponent,
} from 'tabulator-tables';
import { forIn, isArray, isEmpty } from 'lodash';
import { Message } from '@arco-design/web-react';

// import { pickHTMLProps } from 'pick-react-known-prop';
// import { propsToOptions } from 'utils/ConfigUtils';
import zhCNLang from 'langs/zh-cn.json';
import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { PlatformAppMode } from 'src/interface';

export interface TabulatorTableData {
  tuid: string | number;
  [key: string]: any;
}

export interface ReactTabulatorProps {
  columns?: ColumnDefinition[];
  options?: Options;
  eventMaps?: Record<keyof EventCallBackMethods, <K extends keyof EventCallBackMethods>(event: K, callback?: EventCallBackMethods[K]) => void>;
  onRef?: (ref: any) => void;
  classNames?: string;
  widgetId?: string;
  data: TabulatorTableData[];
  layout?: OptionsColumns['layout'];
  appMode?: PlatformAppMode;
  configs?: {
    generalConfigs?: Record<string, any>;
    loadedConfigs?: Record<string, any>;
    columnConfigs?: Record<string, any>;
    rowConfigs?: Record<string, any>;
    cellConfigs?: Record<string, any>;
    keyBindingConfigs?: Record<string, any>;
    eventConfigs?: Record<string, any>;
    styleConfigs?: Record<string, any>;
    advancedConfigs?: Record<string, any>;
  };
  onUpdateWidgetMetaProperty?: (params: Record<string, any>) => void;
  onUpdateWidgetProperty?: (params: Record<string, any>) => void;
  queryInfo?: string;
}

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const {
    layout = 'fitColumns',
    classNames,
    eventMaps = {},
    appMode,
    data: tableData,
    columns: columnDefs,
    onUpdateWidgetMetaProperty,
    // onUpdateWidgetProperty,
    queryInfo,
  } = props;
  console.log('TabulatorReact -> ', props);
  // const {
  //   generalConfigs,
  //   loadedConfigs,
  //   columnConfigs,
  //   rowConfigs,
  //   cellConfigs,
  //   keyBindingConfigs,
  //   eventConfigs,
  //   styleConfigs,
  //   advancedConfigs,
  // } = configs;
  const wrapperRef = useRef();
  const instanceRef = useRef<Tabulator>();
  const [mainId] = useState(genTabulatorUUID());

  // const htmlProps = pickHTMLProps(props); // pick valid html props
  // delete htmlProps['data']; // don't render data & columns as attributes
  // delete htmlProps['columns'];

  // const handleDataLoaded = () => {
  //   if (appMode === 'EDIT') {
  //     Message.info('表格数据加载完成');
  //   }
  //   const curTableData = instanceRef.current.getData();
  //   console.log(curTableData);
  //   onUpdateWidgetMetaProperty?.({
  //     curTableData,
  //   });
  // }

  const handleTableDestroyed = () => {
    console.log('table destroyed');
  }

  const handleDataProcessed = () => {
    if (appMode === 'EDIT') {
      Message.info('表格数据渲染完成');
    }
    const curTableData = instanceRef.current.getData();
    console.log(curTableData);
    onUpdateWidgetMetaProperty?.({
      curTableData,
    });
  }

  const handleLoadError = (error: Error) => {
    console.log(error);
  }

  const handleDataChanged = (data: any[]) => {
    onUpdateWidgetMetaProperty?.({
      curTableData: data,
    });
  }

  const handleColumnMoved = (column, columns) => {
    // column - column component of the moved column
    // columns- array of columns in new order
    console.log(column, columns);
  };

  const handleColumnResized = (column: ColumnComponent) => {
    //column - column component of the resized column
    console.log(column);
  };

  const handleColumnTitleChanged = (column) => {
    //column - column component
    console.log(column);
  };

  const handleColumnVisibilityChanged = (column, visible) => {
    //column - column component
    //visible - is column visible (true = visible, false = hidden)
    console.log(column, visible);
  };

  const handleCellEditing = (cell: CellComponent) => {
    //cell - cell component
    console.log(cell);
  };

  const handleCellEdited = (cell: CellComponent) => {
    console.log(cell.getField(), cell.getValue());
    const cellField = cell.getField();
    const cellValue = cell.getValue();
    onUpdateWidgetMetaProperty?.({
      editingCell: {
        [cellField]: cellValue
      },
    });
  };

  const defaultEvents: Partial<Record<keyof EventCallBackMethods, EventCallBackMethods[keyof EventCallBackMethods]>> = {
    // data events
    tableDestroyed: handleTableDestroyed,
    // dataLoaded: handleDataLoaded,
    dataProcessed: handleDataProcessed,
    dataChanged: handleDataChanged,
    dataLoadError: handleLoadError,
    // column events
    columnMoved: handleColumnMoved,
    columnResized: handleColumnResized,
    columnTitleChanged: handleColumnTitleChanged,
    columnVisibilityChanged: handleColumnVisibilityChanged,
    // cell events
    cellEditing: handleCellEditing,
    cellEdited: handleCellEdited,
  };

  const initTabulator = async () => {
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement; // mounted DOM element
    // const { columns, data = [], options } = props;

    // const propOptions = await propsToOptions(props);

    // if (data) {
    //   propOptions.data = data;
    // }

    const initTabulatorOptions: Options = {
      height: '100%',
      locale: true,
      pagination: true,
      reactiveData: true,
      langs: {
        'zh': zhCNLang
      },
      data: tableData,
      // ...propOptions,
      layout, // fit columns to width of table (optional)
      // ...options // props.options are passed to Tabulator's options.
    };

    if (isEmpty(columnDefs)) {
      initTabulatorOptions.autoColumns = true;
    } else {
      initTabulatorOptions.columns = columnDefs;
    }
    console.log('initTabulatorOptions', initTabulatorOptions);
    instanceRef.current = new Tabulator(domEle, initTabulatorOptions);

    instanceRef.current.setLocale?.('zh');

    /**
    * NOTE: Binding events
    */
    const mergeEvents = {
      ...defaultEvents,
      ...eventMaps,
    };

    forIn(mergeEvents, (handler, eventName: keyof EventCallBackMethods) => {
      instanceRef.current.on(eventName, handler);
    })

    // props.onRef && props.onRef(instanceRef);
  };

  useEffect(() => {
    if (isArray(tableData) && tableData.length > 0 && !instanceRef.current) {
      console.log('init tabulator', tableData.length);
      initTabulator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (queryInfo && instanceRef.current) {
      console.log(queryInfo);
      // instanceRef.current.setData
    }
  }, [queryInfo])

  useEffect(() => {
    if (instanceRef.current) {
      // instanceRef.current.destroy()
      // instanceRef.current = null;
      // console.log('invoked by data changed');
      // initTabulator(); // re-init table
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableData)]);

  return (
    <div ref={wrapperRef}
      style={{
        width: '100%',
        height: '100%',
      }}
      data-instance={mainId}
      className={classNames}
    />
  );
};
