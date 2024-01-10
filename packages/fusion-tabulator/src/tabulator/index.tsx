/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import {
  TabulatorFull as Tabulator,
  ColumnDefinition,
  Options,
  OptionsColumns,
  EventCallBackMethods,
} from 'tabulator-tables';
import { forIn, isEmpty, isUndefined } from 'lodash';

// import { pickHTMLProps } from 'pick-react-known-prop';
// import { propsToOptions } from 'utils/ConfigUtils';
import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { PlatformAppMode } from 'src/interface';
import { genInitOptions } from './genInitOptions';
import { genInitEventMaps } from './genInitEventMaps';
import { Empty } from '@arco-design/web-react';
import { ExternalInputContainer } from './styles';
import { CustomSelect } from './components/CustomSelect';
// import { ROW_HEIGHT } from './constants';

export interface TabulatorTableData {
  tuid?: string | number;
  [key: string]: any;
}

export type TableMode = 'normal' | 'editable';

export interface ReactTabulatorProps {
  columns?: ColumnDefinition[];
  options?: Options;
  eventMaps?: Record<keyof EventCallBackMethods, <K extends keyof EventCallBackMethods>(event: K, callback?: EventCallBackMethods[K]) => void>;
  onRef?: (ref: any) => void;
  classNames?: string;
  widgetId?: string;
  tableMode?: TableMode;
  data?: TabulatorTableData[];
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
  actionId?: string;
  enableRemote?: boolean;
}

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const {
    classNames,
    eventMaps = {},
    appMode,
    data: tableData,
    columns: columnDefs,
    onUpdateWidgetMetaProperty,
    // onUpdateWidgetProperty,
    actionId,
    tableMode = 'editable'
    // enableRemote = false,
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<Tabulator>();
  const [mainId] = useState(genTabulatorUUID());
  const [inputTop, setInputTop] = useState(52);

  const initTabulator = async () => {
    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;

    // generates initial options
    const initOptions = genInitOptions(props)

    console.log('initTabulatorOptions', initOptions);
    // init tabulator
    instanceRef.current = new Tabulator(domEle, initOptions);

    // localization
    instanceRef.current.setLocale?.('zh');

    /**
    * NOTE: Binding events
    */
    const defaultEvents = genInitEventMaps({ appMode, tabulatorRef: instanceRef.current, onUpdateWidgetMetaProperty });
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
  }

  // useEffect(() => {
  //   if (
  //     (isArray(tableData) && tableData.length > 0) || // loads static data
  //     !isEmpty(actionId) || // lodas data from ajax request
  //     (isArray(columnDefs) && columnDefs.length > 0) // add data from scratch
  //     && !instanceRef.current) {
  //     console.log('To init Tabulator...');
  //     initTabulator();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (actionId) {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
      initTabulator();
    }
  }, [actionId]);

  // reset table data
  useEffect(() => {
    if (!instanceRef.current && tableData?.length > 0) {
      initTabulator();
    }

    if (instanceRef.current && !isUndefined(tableData)) {
      // instanceRef.current.destroy()
      // instanceRef.current = null;
      // console.log('invoked by data changed');
      // initTabulator(); // re-init table
      console.log('tableData have changed: ', tableData);
      instanceRef.current.setData(tableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableData)]);

  // reset table column definitions
  useEffect(() => {
    if (!instanceRef.current && columnDefs?.length > 0) {
      console.log('init tabulator due to column definions');
      initTabulator();
    }
  }, []);

  useEffect(() => {
    const curColumnDefs = instanceRef.current?.getColumnDefinitions();
    console.log('curColumnDefs', curColumnDefs);
    if (!!instanceRef.current && JSON.stringify(curColumnDefs) !== JSON.stringify(columnDefs)) {
      console.log('columnDefs have changed: ');
      // instanceRef.current.setColumns(columnDefs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(columnDefs)]);

  const renderExtraInput = () => {
    if (tableMode !== 'editable') return null;
    let isOverHeigth = false;
    const ROW_HEIGHT = 49;

    function handleSelectRowData(record) {
      console.log('handleSelectRowData: ', record);
      const {
        key: _key,
        ...rest
      } = record || {};
      instanceRef.current.addRow(rest)
        .then(() => {
          const top = inputTop + ROW_HEIGHT;
          const tableHeight = wrapperRef.current.getBoundingClientRect().height;
          console.log('tableHeight', tableHeight);

          if (top < tableHeight - ROW_HEIGHT) {
            setInputTop(top);
            return;
          }

          if (!isOverHeigth) {
            const tableEle = document.querySelector(`#${mainId} .tabulator-table`);

            tableEle.setAttribute('style', `padding-bottom: ${ROW_HEIGHT}px`);
          }

          isOverHeigth = true;
        }).catch(err => {
          console.log(err);
        });
    }

    return <ExternalInputContainer top={inputTop}>
      <CustomSelect onSelectRowData={handleSelectRowData} />
    </ExternalInputContainer>
  };


  if (isEmpty(tableData) && !actionId && isEmpty(columnDefs)) {
    return <div style={{
      width: '100%',
      paddingTop: 48
    }}>
      <Empty description={!instanceRef.current && appMode === 'EDIT' ? '暂无数据，请先在右侧属性配置栏选择数据源' : '暂无数据'} />
    </div>
  }

  return (
    <div style={{
      position: 'relative',
      height: '100%'
    }}>
      <div ref={wrapperRef}
        style={{
          height: '100%',
        }}
        id={mainId}
        data-instance={mainId}
        className={classNames}
      />
      {renderExtraInput()}
    </div>

  );
};
