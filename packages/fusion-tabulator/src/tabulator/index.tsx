/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, useMemo } from 'react';
import * as ReactDOM from 'react-dom';
import {
  TabulatorFull as Tabulator,
  EventCallBackMethods,
} from 'tabulator-tables';
import { forIn, isEmpty } from 'lodash';

// import { pickHTMLProps } from 'pick-react-known-prop';
// import { propsToOptions } from 'utils/ConfigUtils';
import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { genInitOptions } from './genInitOptions';
import { genInitEventMaps } from './genInitEventMaps';
import { Empty } from '@arco-design/web-react';
import { ExternalInputContainer } from './styles';
import { CustomTableSelect } from './components/CustomTableSelect';
import { ROW_HEIGHT } from './constants';
import { ReactTabulatorProps } from './interface';

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const {
    classNames,
    eventMaps = {},
    appMode,
    data: tableData,
    columns: columnDefs,
    onUpdateWidgetMetaProperty,
    // onUpdateWidgetProperty,
    onCustomSelectDropdownItem,
    actionId,
    tableMode = 'normal',
    onEvents,
    // enableRemote = false,
    quickAddDropdownDefinitions,
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

  const calcActionIdCombineDataHash = useMemo(() => {
    if (!actionId && isEmpty(tableData)) return null;

    if (!actionId && !isEmpty(tableData)) return `false|true`;

    if (actionId && isEmpty(tableData)) return `true|false`;

  }, [actionId, JSON.stringify(tableData)])

  const initTabulator = () => {
    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;

    // generates initial options
    const initOptions = genInitOptions(props)

    console.log('initTabulatorOptions', initOptions);
    // init tabulator
    instanceRef.current = new Tabulator(domEle, initOptions);

    if (tableMode === 'editable' && !isEmpty(tableData)) {
      const reCalcTop = (tableData.length * ROW_HEIGHT) + 52;
      setInputTop(reCalcTop);
    }

    // localization
    instanceRef.current.setLocale?.('zh');

    /**
    * NOTE: Binding events
    */
    const defaultEvents = genInitEventMaps({
      appMode,
      tabulatorRef: instanceRef.current,
      onUpdateWidgetMetaProperty,
      onEvents,
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
  }

  const responsiveTabulator = () => {
    if (isEmpty(tableData) && !actionId && isEmpty(columnDefs)) return;

    if (!instanceRef.current) {
      initTabulator();
      return;
    }

    const curColumns = instanceRef.current.getColumnDefinitions();
    const curData = instanceRef.current.getData();
    debugger;
    if (!isEmpty(tableData) && JSON.stringify(curData) !== JSON.stringify(tableData)) {
      debugger;
      instanceRef.current.replaceData(tableData);
      return;
    }

    if (!isEmpty(columnDefs) && JSON.stringify(curColumns) !== JSON.stringify(columnDefs)) {
      debugger;
      instanceRef.current.setColumns(columnDefs) //overwrite existing columns with new columns definition array

      return;
    }
  }

  useEffect(() => {
    if (!calcActionIdCombineDataHash && !instanceRef.current) return;

    console.log('calcActionIdCombineDataHash', '<<<<<<');
  }, [calcActionIdCombineDataHash]);

  useEffect(() => {
    if (!actionId || !instanceRef.current) return;
    debugger;
    const curAjax = instanceRef.current.getAjaxUrl();
    instanceRef.current.setData(curAjax);
  }, [actionId]);

  useEffect(() => {
    responsiveTabulator();
  }, [actionId, JSON.stringify(columnDefs), JSON.stringify(tableData)]);


  function handleSelectRowData(record) {
    console.log('handleSelectRowData: ', record);
    const {
      id: _key,
      ...rest
    } = record || {};
    let isOverHeigth = false;
    // const ROW_HEIGHT = 49;

    onUpdateWidgetMetaProperty?.({
      selectedDropdownItem: record
    });

    if (onCustomSelectDropdownItem) {
      onCustomSelectDropdownItem?.();

      return;
    }

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

  const renderExtraInput = () => {
    if (tableMode !== 'editable') return null;

    return <ExternalInputContainer top={inputTop}>
      <CustomTableSelect onSelectRowData={handleSelectRowData} quickAddDropdownDefinitions={quickAddDropdownDefinitions} />
    </ExternalInputContainer>
  };


  if (isEmpty(tableData) && !actionId && isEmpty(columnDefs)) {
    return <div style={{
      width: '100%',
      paddingTop: 48
    }}>
      <Empty description={!instanceRef.current && appMode === 'EDIT' ? '暂无数据，请先在右侧属性配置栏添加数据源或列定义' : '暂无数据'} />
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
