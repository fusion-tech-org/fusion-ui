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
import { forIn, isArray, isEmpty } from 'lodash';

// import { pickHTMLProps } from 'pick-react-known-prop';
// import { propsToOptions } from 'utils/ConfigUtils';
import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { PlatformAppMode } from 'src/interface';
import { genInitOptions } from './genInitOptions';
import { genInitEventMaps } from './genInitEventMaps';

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
  const wrapperRef = useRef();
  const instanceRef = useRef<Tabulator>();
  const [mainId] = useState(genTabulatorUUID());

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

  useEffect(() => {
    if (
      (isArray(tableData) && tableData.length > 0) || // loads static data
      !isEmpty(actionId) || // lodas data from ajax request
      (isArray(columnDefs) && columnDefs.length > 0) // add data from scratch
      && !instanceRef.current) {
      console.log('To init Tabulator...');
      initTabulator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (actionId && instanceRef.current) {
      console.log(actionId);
      // instanceRef.current.setData
    }
  }, [actionId])

  // reset table column definitions
  useEffect(() => {
    if (instanceRef.current) {
      console.log('columnDefs have changed: ', columnDefs);
      // instanceRef.current.setColumns(columnDefs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(columnDefs)]);

  // reset table data
  useEffect(() => {
    if (instanceRef.current) {
      // instanceRef.current.destroy()
      // instanceRef.current = null;
      // console.log('invoked by data changed');
      // initTabulator(); // re-init table
      // instanceRef.current.setData(tableData);
      console.log('tableData have changed: ', tableData);
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
