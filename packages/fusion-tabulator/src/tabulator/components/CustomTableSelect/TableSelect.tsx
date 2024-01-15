import {
  TabulatorFull as Tabulator,
  Options,
} from 'tabulator-tables';
import React, { FC, useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

import { DroplistWrapper } from "./styles";
import { genTabulatorUUID } from 'utils/index';
import { map } from 'lodash';


interface TableSelectProps {
  onRef?: (ref: Tabulator) => void;
  quickAddDropdownDefinitions?: {
    data: any[];
    columns: any[];
  };
}

export const TableSelect: FC<TableSelectProps> = (props) => {
  const { onRef, quickAddDropdownDefinitions } = props;
  const [mainId] = useState(genTabulatorUUID());
  const instanceRef = useRef<Tabulator>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { data = [], columns = [] } = quickAddDropdownDefinitions || {};

  const initTabulator = () => {
    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;

    const cloneData = map(data, (item) => ({ ...item }))
    // generates initial options
    const initOptions: Options = {
      data: cloneData,
      columns: [...columns],
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
    };

    console.log('initTabulatorOptions sub ->: ', initOptions);
    // init tabulator
    instanceRef.current = new Tabulator(domEle, initOptions);

    // instanceRef.current.on('rowSelected', (row) => {
    //   console.log(row);
    // })

    // localization
    // instanceRef.current.setLocale?.('zh');

    onRef?.(instanceRef.current);
  };

  // reset table column definitions
  useEffect(() => {
    initTabulator();

    return () => {
      instanceRef.current?.destroy();
    }
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