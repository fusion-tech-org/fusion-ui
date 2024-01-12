import {
  TabulatorFull as Tabulator,
  ColumnDefinition,
  Options,
  OptionsColumns,
  EventCallBackMethods,
} from 'tabulator-tables';
import React, { FC, forwardRef, useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

import { DroplistWrapper } from "./styles";
import { genTabulatorUUID } from 'utils/index';
import {
  colDefs,
  initData
} from './constants';


interface TableSelectProps {
  onRef?: (ref: Tabulator) => void;
}

export const TableSelect: FC<TableSelectProps> = (props) => {
  const { onRef } = props;
  const [mainId] = useState(genTabulatorUUID());
  const instanceRef = useRef<Tabulator>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const initTabulator = () => {
    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;

    // generates initial options
    const initOptions: Options = {
      data: initData,
      columns: colDefs,
      layout: 'fitDataTable',
      height: '320px',
      selectable: 1,
      rowHeight: 32,
      keybindings: {
        "navUp": false, // disable navUp keybinding
        "navLeft": false,
        "navRight": false,
        "navDown": false,
      },
      // keybindings: false, //disable all key bindings
    };

    console.log('initTabulatorOptions', initOptions);
    // init tabulator
    instanceRef.current = new Tabulator(domEle, initOptions);

    // instanceRef.current.on('rowSelected', (row) => {
    //   console.log(row);
    // })

    // localization
    instanceRef.current.setLocale?.('zh');

    onRef?.(instanceRef.current);
  };

  // reset table column definitions
  useEffect(() => {
    initTabulator();
  }, []);

  return (
    <DroplistWrapper>
      <div ref={wrapperRef}
        style={{
          height: '100%',
        }}
        id={mainId}
        data-instance={mainId}
      />
    </DroplistWrapper>
  )
};