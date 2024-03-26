import { TabulatorFull as Tabulator, Options } from 'tabulator-tables';
import React, { FC, useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

import ExtendTabulator from '../../ExtendTabulator';
import { DroplistWrapper } from './styles';
import { genTabulatorUUID } from 'utils/index';
import Dexie from 'dexie';
import dbDexie from 'src/tabulator/utils/dbDexie';
import { isArray } from 'lodash';

interface TableSelectProps {
  onRef?: (ref: Tabulator) => void;
  uniformProps: Record<string, any>;
}

export const TableSelect: FC<TableSelectProps> = (props) => {
  const { onRef, uniformProps } = props;
  const [mainId] = useState(genTabulatorUUID());
  const instanceRef = useRef<Tabulator>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const initTabulator = () => {
    // mounted DOM element
    const domEle = ReactDOM.findDOMNode(wrapperRef.current) as HTMLElement;
    const initOptions = genInitOptions(uniformProps);
    console.log('TableSelect init options ->: ', initOptions);
    // init tabulator
    instanceRef.current = new ExtendTabulator(domEle, initOptions);

    onRef?.(instanceRef.current);
  };

  // reset table column definitions
  useEffect(() => {
    initTabulator();

    return () => {
      instanceRef.current?.destroy();
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
  dexie?: Dexie;
  tableName?: string;
} {
  const { quickAddConfigs, enableIndexedDBQuery, indexdbConfigs } =
    uniformProps;

  const {
    data = [],
    columns = [],
    isRemoteQuery,
    uniqueKey = 'id',
  } = quickAddConfigs || {};
  const { dropdownIndexedDBTableName } = indexdbConfigs || {};

  // generates initial options
  const commonOptions: Options & {
    selectableRows?: number;
    selectableRowsRollingSelection?: boolean;
  } = {
    index: uniqueKey,
    columnDefaults: {
      headerSort: false,
    },
    // layout: 'fitColumns',
    layout: 'fitDataTable',
    // layout: 'fitData',
    // layout: 'fitDataStretch',
    height: '320px',
    // selectable: 1,
    selectableRows: 1,
    selectableRowsRollingSelection: false,
    rowHeight: 32,
    keybindings: {
      navUp: false, // disable navUp keybinding
      navLeft: false,
      navRight: false,
      navDown: false,
    },
  };

  if (enableIndexedDBQuery) {
    const colDefs: {
      columns?: any[];
      autoColumns?: true;
    } = {};

    if (isArray(columns) && columns.length > 0) {
      colDefs.columns = columns;
    } else {
      colDefs.autoColumns = true;
    }

    return {
      dexie: dbDexie.getDexie(),
      tableName: dropdownIndexedDBTableName,
      ...colDefs,
      ...commonOptions,
    };
  }

  if (isRemoteQuery) {
    return {
      data: [],
      columns: [],
      ...commonOptions,
    };
  }

  return {
    data: isArray(data) ? data : [],
    columns: isArray(columns) ? columns : [],
    ...commonOptions,
  };
}
