/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, useCallback } from 'react';
import { isArray, isEmpty, isUndefined } from 'lodash';
import { Empty } from '@arco-design/web-react';
import { createPortal } from 'react-dom';

import './index.css';
import { genTabulatorUUID } from 'utils/index';
import { ExternalInputContainer, TabulatorContainer } from './styles';
import { CustomTableSelect } from './components/CustomTableSelect';
import { ReactTabulatorProps } from './interface';
import { useTabulator } from './useTabulator';
// import dbDexie from './utils/dbDexie';
import { EXTRA_INPUT_HEIGHT, HEADER_HEIGHT, ROW_HEIGHT } from './constants';
import { customEditorAndFormatterPipe } from './genInitOptions';
import { RowComponent } from 'tabulator-tables';

export const TabulatorReact = (props: ReactTabulatorProps) => {
  const {
    classNames,
    appMode,
    data: tableData,
    columns: columnDefs,
    onUpdateWidgetMetaProperty,
    // onUpdateWidgetProperty,
    onCustomSelectDropdownItem,
    // actionId,
    tableMode = 'normal',
    uniformProps = {},
  } = props;
  const {
    headerVisible = true,
    commonOptions = {},
    // enableIndexedDBQuery,
    // isRemote = true,
    enableColumnGroup = false,
  } = uniformProps;
  const commonOptionsRef = useRef(commonOptions);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputWrapRef = useRef<HTMLDivElement | null>(null);
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

  const responsiveTabulator = () => {
    // if (isEmpty(tableData) && !actionId && isEmpty(columnDefs)) return;
    if (isEmpty(tableData) && isEmpty(columnDefs)) return;

    if (!tabulatorRef) {
      initTable();
      return;
    }

    const curColumns = tabulatorRef.getColumnDefinitions();
    const curData = tabulatorRef.getData();

    if (
      !isUndefined(tableData) &&
      JSON.stringify(curData) !== JSON.stringify(tableData)
    ) {
      console.log('replace data: ', tableData);
      tabulatorRef.replaceData(tableData);

      return;
    }

    if (
      !isUndefined(columnDefs) &&
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
    tabulatorRef.on('rowDeleted', (row: RowComponent) => {
      const curTableData = row.getTable().getData('visible');

      transformYInputElem(curTableData);
    });

    tabulatorRef.on('dataChanged', (data) => {
      const visibleDataLen = tabulatorRef.getData('visible').length;

      if (data.length === visibleDataLen + 1) {
        transformYInputElem(data);
      }
    });
  };

  useEffect(() => {
    responsiveTabulator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // actionId,
    JSON.stringify(columnDefs),
    JSON.stringify(tableData),
    // enableIndexedDBQuery,
  ]);

  useEffect(() => {
    transformYInputElem();
  }, [tableMode, tableData?.length, extraInputCreated]);

  useEffect(() => {
    if (!tabulatorRef) return;

    handleAddExtraEvents();
  }, [tabulatorRef]);

  useEffect(() => {
    if (!modeRef.current) {
      modeRef.current = tableMode;
    }
    if (
      !tabulatorRef ||
      JSON.stringify(commonOptions) ===
        JSON.stringify(JSON.stringify(commonOptionsRef.current)) ||
      modeRef.current === tableMode
    ) {
      return;
    }

    initTable();

    commonOptionsRef.current = commonOptions;
    modeRef.current = tableMode;
  }, [JSON.stringify(commonOptions), tableMode]);

  // useEffect(() => {
  //   if (!tabulatorRef || !actionId || !isRemote) return;

  //   const curAjax = tabulatorRef.getAjaxUrl?.();
  //   console.log('curAjax', curAjax);
  //   curAjax && tabulatorRef.setData(curAjax);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [actionId, !tabulatorRef, isRemote]);

  useEffect(() => {
    return () => {
      commonOptionsRef.current = null;
      inputWrapRef.current = null;
      modeRef.current = null;
    };
  }, []);

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

  const renderExtraInput = useCallback(() => {
    const holdEle = document.getElementById(`extra-input-markup-${mainId}`);
    console.log('tableMode', tableMode, 'mainId', mainId, '!holdEle', !holdEle);
    if (tableMode !== 'editable' || !holdEle) return null;

    return createPortal(
      <ExternalInputContainer ref={inputWrapRef}>
        <CustomTableSelect
          onSelectRowData={handleSelectRowData}
          {...props}
          onCreated={handleExtraInputCreated}
        />
      </ExternalInputContainer>,
      holdEle
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainId, tableMode, JSON.stringify(props), tabulatorRef]);

  // if (isEmpty(tableData) && !actionId && isEmpty(columnDefs)) {
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
      style={{
        position: 'relative',
        // height: '100%',
        flex: 1,
      }}
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
      {tableMode === 'editable' && <div id={`extra-input-markup-${mainId}`} />}
      {renderExtraInput()}
    </div>
  );
};
