/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, useCallback } from 'react';
import { isArray, isEmpty } from 'lodash';
import { Empty } from '@arco-design/web-react';
import { createPortal } from 'react-dom';

import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { ExternalInputContainer, TabulatorContainer } from './styles';
import { CustomTableSelect } from './components/CustomTableSelect';
import { ReactTabulatorProps } from './interface';
import { useTabulator } from './useTabulator';
import { EXTRA_INPUT_HEIGHT, HEADER_HEIGHT, ROW_HEIGHT } from './constants';
import { customEditorAndFormatterPipe } from './genInitOptions';

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const {
    classNames,
    appMode,
    data: tableData,
    columns: columnDefs,
    onUpdateWidgetMetaProperty,
    // onUpdateWidgetProperty,
    onCustomSelectDropdownItem,
    tableMode = 'normal',
    uniformProps = {},
  } = props;
  const {
    headerVisible = true,
    commonOptions = {},
    enableColumnGroup = false,
  } = uniformProps;
  const commonOptionsRef = useRef(commonOptions);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputWrapRef = useRef<HTMLDivElement | null>(null);
  // const extraInputWrapRef = useRef<HTMLDivElement | null>(null);
  const [extraInputContainer, setExtraInputContainer] = useState(null);
  const modeRef = useRef<string | null>(null);
  const tabulatorId = genTabulatorUUID();
  const [mainId] = useState(tabulatorId);
  const [extraInputCreated, setExtraInputCreated] = useState(false);
  const { tablePosition, tabulatorRef, initTable } = useTabulator({
    ref: wrapperRef,
    props: {
      ...props,
      // onEvents: handleListenEvents,
    },
    // eventCallback: handleTableEventCallback,
  });

  const transformYInputElem = useCallback(
    (realData?: any[]) => {
      if (
        tableMode !== 'editable' ||
        !inputWrapRef.current ||
        tablePosition.height <= 0
      )
        return;

      const len = realData?.length || tableData?.length || 0;
      let offsetHeight = headerVisible
        ? HEADER_HEIGHT + len * ROW_HEIGHT + 1
        : len * ROW_HEIGHT + 1;

      if (offsetHeight + EXTRA_INPUT_HEIGHT > tablePosition.height) {
        offsetHeight = tablePosition.height - ROW_HEIGHT + 12;
        inputWrapRef.current.style.right = '14px';
      } else {
        inputWrapRef.current.style.right = '0px';
      }

      inputWrapRef.current.style.transform = `translateY(${offsetHeight}px)`;
    },
    [tablePosition.height, tableMode, tableData?.length, headerVisible]
  );

  const holdEle = document.getElementById(`table-container-${mainId}`);

  const responsiveTabulator = () => {
    if (isEmpty(tableData) && isEmpty(columnDefs)) return;

    if (!tabulatorRef) {
      initTable();
      return;
    }

    const curColumns = tabulatorRef.getColumnDefinitions();
    // const curData = tabulatorRef.getData();

    if (isArray(tableData)) {
      console.log('replace data: ', tableData);
      tabulatorRef.replaceData(tableData);

      // return;
    }

    if (
      isArray(columnDefs) &&
      JSON.stringify(curColumns) !== JSON.stringify(columnDefs)
    ) {
      const formatColumns = customEditorAndFormatterPipe(
        columnDefs,
        appMode,
        enableColumnGroup
      );
      try {
        tabulatorRef.setColumns(formatColumns); // overwrite existing columns with new columns definition array
      } catch (error) {
        console.log('setColumns failed: ', error, formatColumns);
      }
    }
  };

  const handleAddExtraEvents = () => {
    tabulatorRef.on('dataChanged', (data) => {
      transformYInputElem(data);
    });
  };

  useEffect(() => {
    responsiveTabulator();
  }, [JSON.stringify(columnDefs, null, 2), tableData]);

  useEffect(() => {
    transformYInputElem();
  }, [tableMode, tableData?.length, extraInputCreated]);

  useEffect(() => {
    if (!tabulatorRef) return;

    handleAddExtraEvents();
  }, [tabulatorRef]);

  useEffect(() => {
    if (
      !tabulatorRef ||
      JSON.stringify(commonOptions) ===
        JSON.stringify(JSON.stringify(commonOptionsRef.current))
    ) {
      return;
    }

    commonOptionsRef.current = commonOptions;
  }, [JSON.stringify(commonOptions, null, 2)]);

  useEffect(() => {
    if (!tableMode) {
      modeRef.current = tableMode;
    }

    if (tableMode === modeRef.current) return;

    modeRef.current = tableMode;
    // const newId = genTabulatorUUID();

    // setMainId(newId);

    return () => {
      modeRef.current = null;
      commonOptionsRef.current = null;
      wrapperRef.current = null;
      inputWrapRef.current = null;
    };
  }, [tableMode]);

  useEffect(() => {
    if (holdEle && tabulatorRef) {
      setExtraInputContainer(holdEle);
    }
  }, [tabulatorRef, mainId, holdEle]);

  function handleSelectRowData(record) {
    const { id: _key, ...rest } = record || {};

    onUpdateWidgetMetaProperty?.({
      selectedDropdownItem: record,
    });

    if (onCustomSelectDropdownItem) {
      onCustomSelectDropdownItem?.(record);

      return;
    }

    tabulatorRef.addRow(rest);
  }

  const handleExtraInputCreated = () => {
    setExtraInputCreated(true);
  };

  if (isEmpty(tableData) && isEmpty(columnDefs)) {
    return (
      <div
        style={{
          width: '100%',
          paddingTop: 48,
        }}
      >
        <Empty
          description={
            !tabulatorRef && appMode === 'EDIT'
              ? '暂无数据，请先在右侧属性配置栏添加数据源或列定义'
              : '暂无数据'
          }
        />
      </div>
    );
  }

  return (
    <div
      id={`table-container-${mainId}`}
      className={tableMode === 'editable' ? 'h-full' : 'flex-1'}
    >
      <TabulatorContainer
        tableMode={tableMode}
        ref={wrapperRef}
        style={{
          height: '100%',
        }}
        id={mainId}
        data-instance={mainId}
        className={classNames}
      />
      {tableMode === 'editable' &&
        extraInputContainer !== null &&
        createPortal(
          <ExternalInputContainer ref={inputWrapRef} key={mainId}>
            <CustomTableSelect
              onSelectRowData={handleSelectRowData}
              {...props}
              onCreated={handleExtraInputCreated}
            />
          </ExternalInputContainer>,
          extraInputContainer
        )}
    </div>
  );
};
