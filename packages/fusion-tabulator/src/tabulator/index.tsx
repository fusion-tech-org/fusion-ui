/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';

import { isEmpty, isNumber, isUndefined } from 'lodash';

// import { pickHTMLProps } from 'pick-react-known-prop';
// import { propsToOptions } from 'utils/ConfigUtils';
import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { Empty } from '@arco-design/web-react';
import { ExternalInputContainer } from './styles';
import { CustomTableSelect } from './components/CustomTableSelect';
import { HEADER_HEIGHT, ROW_HEIGHT } from './constants';
import { ReactTabulatorProps } from './interface';
import { useTabulator } from './useTabulator';

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const {
    classNames,
    appMode,
    data: tableData,
    columns: columnDefs,
    onUpdateWidgetMetaProperty,
    // onUpdateWidgetProperty,
    onCustomSelectDropdownItem,
    actionId,
    tableMode = 'normal',
    uniformProps = {},
  } = props;
  const { commonOptions = {}, enableIndexedDBQuery } = uniformProps;
  const { headerVisible = true } = commonOptions;
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
  const initInputTop = headerVisible ? HEADER_HEIGHT : 0;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // const instanceRef = useRef<Tabulator>();
  const [mainId] = useState(genTabulatorUUID());
  const [inputTop, setInputTop] = useState(initInputTop);
  const { tableHeight, tabulatorRef, initTable } = useTabulator({
    ref: wrapperRef,
    props,
    eventCallback: handleTableEventCallback,
  });
  const [loadedData, setLoadedData] = useState([]);
  let isOverHeigth = false;

  // const initTabulator = () => {
  //   // mounted DOM element
  //   const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;

  //   // generates initial options
  //   const initOptions = genInitOptions(props)

  //   console.log('initTabulatorOptions', initOptions);
  //   // init tabulator
  //   instanceRef.current = new Tabulator(domEle, initOptions);

  //   if (tableMode === 'editable' && !isEmpty(tableData)) {
  //     const reCalcTop = headerVisible ? (tableData.length * ROW_HEIGHT) + HEADER_HEIGHT : tableData.length * ROW_HEIGHT;

  //     setInputTop(reCalcTop);
  //   }

  //   // localization
  //   instanceRef.current.setLocale?.('zh');

  //   /**
  //   * NOTE: Binding events
  //   */
  //   const defaultEvents = genInitEventMaps({
  //     appMode,
  //     tabulatorRef: instanceRef.current,
  //     onUpdateWidgetMetaProperty,
  //     onEvents,
  //   });
  //   const mergeEvents = {
  //     ...defaultEvents,
  //     ...eventMaps,
  //   };

  //   forIn(mergeEvents, (handler, eventName: keyof EventCallBackMethods) => {
  //     instanceRef.current.on(eventName, handler);
  //   })

  //   // props.onRef && props.onRef(instanceRef);
  //   onUpdateWidgetMetaProperty?.({
  //     tabulatorRef: instanceRef.current,
  //   });
  // }

  function handleTableEventCallback(eventName: string, data: Record<string, any>[]) {
    if (eventName === 'dataProcessed' || eventName === 'dataChanged') {
      // reCalcInputTop(data);
      setLoadedData(data);
    }
  }

  const reCalcInputTop = (data: any[]) => {
    if (!tableHeight) return;
    // const realTableData = tabulatorRef?.getData('active');
    const dataLen = data?.length || 0;
    const allRowHeight = dataLen * ROW_HEIGHT;
    const nextTop = headerVisible ? HEADER_HEIGHT + allRowHeight : allRowHeight;

    // const tableHeight = wrapperRef.current.getBoundingClientRect().height;

    if (nextTop < tableHeight - ROW_HEIGHT) {
      setInputTop(nextTop);
      return;
    } else {
      setInputTop(tableHeight - ROW_HEIGHT);
    }

    if (!isOverHeigth) {
      const tableEle = document.querySelector(`#${mainId} .tabulator-table`);

      tableEle.setAttribute('style', `padding-bottom: ${ROW_HEIGHT}px`);
    }

    isOverHeigth = true;
  }

  useEffect(() => {
    if (isNumber(tableHeight)) {
      reCalcInputTop(loadedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHeight, JSON.stringify(loadedData)]);

  const responsiveTabulator = () => {
    if (isEmpty(tableData) && !actionId && isEmpty(columnDefs) && !enableIndexedDBQuery) return;

    // initTable();
    // NOTE: old logic
    if (!tabulatorRef) {
      initTable();
      return;
    }

    const curColumns = tabulatorRef.getColumnDefinitions();
    const curData = tabulatorRef.getData();

    if (!isUndefined(tableData) && JSON.stringify(curData) !== JSON.stringify(tableData)) {
      tabulatorRef.setData(tableData);
      return;
    }

    if (!isUndefined(columnDefs) && JSON.stringify(curColumns) !== JSON.stringify(columnDefs)) {
      tabulatorRef.setColumns(columnDefs) //overwrite existing columns with new columns definition array

      return;
    }
  }

  // useEffect(() => {
  //   if (!calcActionIdCombineDataHash && !tabulatorRef) return;

  //   console.log('calcActionIdCombineDataHash', '<<<<<<');
  // }, [calcActionIdCombineDataHash]);

  useEffect(() => {
    if (!actionId || !tabulatorRef) return;

    const curAjax = tabulatorRef.getAjaxUrl();
    tabulatorRef.setData(curAjax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionId, !tabulatorRef]);

  useEffect(() => {
    responsiveTabulator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionId, JSON.stringify(columnDefs), JSON.stringify(tableData), enableIndexedDBQuery]);


  function handleSelectRowData(record) {
    const {
      id: _key,
      ...rest
    } = record || {};
    onUpdateWidgetMetaProperty?.({
      selectedDropdownItem: record
    });

    if (onCustomSelectDropdownItem) {
      onCustomSelectDropdownItem?.();

      return;
    }

    tabulatorRef.addRow(rest);
  }

  const renderExtraInput = () => {
    if (tableMode !== 'editable') return null;

    return <ExternalInputContainer top={inputTop}>
      <CustomTableSelect onSelectRowData={handleSelectRowData} {...props} />
    </ExternalInputContainer>
  };


  if (isEmpty(tableData) && !actionId && isEmpty(columnDefs) && !enableIndexedDBQuery) {
    return <div style={{
      width: '100%',
      paddingTop: 48
    }}>
      <Empty description={!tabulatorRef && appMode === 'EDIT' ? '暂无数据，请先在右侧属性配置栏添加数据源或列定义' : '暂无数据'} />
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
