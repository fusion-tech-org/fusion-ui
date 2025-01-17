import { TabulatorFull as Tabulator, Options } from 'tabulator-tables';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import equal from 'fast-deep-equal';

import ExtendTabulator from '../../ExtendTabulator';
import { DroplistWrapper } from './styles';
import { genTabulatorUUID } from 'utils/index';
import { isArray, isFunction } from 'lodash';
import { ReactTabulatorProps } from 'src/tabulator/interface';
import equal from 'fast-deep-equal';

interface TableSelectProps {
  onRef?: (ref: Tabulator) => void;
  uniformProps: Record<string, any>;
  onExtraInputValueChanged?: CallableFunction;
}

export const TableSelect: FC<TableSelectProps> = (props) => {
  const { onRef, uniformProps, onExtraInputValueChanged } = props;
  const [mainId] = useState(genTabulatorUUID());
  const instanceRef = useRef<Tabulator>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { quickAddConfigs } = uniformProps;
  const { data: tableData } = quickAddConfigs || {};
  const recordData = useRef<ReactTabulatorProps["data"]>();

  const initTabulator = () => {
    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;
    const initOptions = genInitOptions(uniformProps);
    console.log('TableSelect init options ->: ', initOptions);
    // init tabulator
    instanceRef.current = new ExtendTabulator(domEle, initOptions);

    onRef?.(instanceRef.current);
  };

    const replaceData = useCallback((...args: Parameters< Tabulator["replaceData"]>) => {
      //! 避免tabulator的重绘,重要！！！
      instanceRef.current.element.classList.add("hidden")
      instanceRef.current.replaceData(...args);
      setTimeout(function showTabulator() {
        instanceRef.current.element.classList.remove("hidden")
      },10)
    }, [])

  useEffect(() => {
    if (!instanceRef.current || !isFunction(onExtraInputValueChanged)) return;

    if (
        isArray(tableData)&&
        !equal(recordData.current, tableData)
    ) {
        replaceData(tableData);
        recordData.current = tableData;
      }
  }, [tableData, instanceRef, onExtraInputValueChanged]);

  // reset table column definitions
  useEffect(() => {
    initTabulator();

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
      wrapperRef.current = null;
    };
  }, []);

  return (
    <DroplistWrapper>
      <div
        ref={wrapperRef}
        style={{
          height: '100%',
        }}
        id={mainId}
        data-instance={mainId}
      />
    </DroplistWrapper>
  );
};

function genInitOptions(uniformProps: Record<string, any>): Options & {
  tableName?: string;
} {
  const { quickAddConfigs } = uniformProps;

  const {
    data = [],
    columns = [],
    uniqueKey = 'id',
    subTableLayout = 'fitDataStretch',
  } = quickAddConfigs || {};

  // generates initial options
  const commonOptions: Options & {
    selectableRows?: number;
    selectableRowsRollingSelection?: boolean;
  } = {
    index: uniqueKey,
    columnDefaults: {
      headerSort: false,
      resizable: false,
    },
    // layout: 'fitColumns',
    // layout: 'fitDataTable',
    // layout: 'fitData',
    layout: subTableLayout,
    height: '320px',
    // selectable: 1,
    selectableRows: 1,
    selectable: 'highlight',
    selectableRowsRollingSelection: false,
    selectableRangeRows: false,
    rowHeight: 32,
    renderHorizontal: 'virtual',
    renderVertical: 'virtual',
    keybindings: {
      navUp: false, // disable navUp keybinding
      navLeft: false,
      navRight: false,
      navDown: false,
    },
  };

  return {
    data: isArray(data) ? data : [],
    columns: isArray(columns) ? columns : [],
    ...commonOptions,
  };
}
