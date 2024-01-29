import { db, seed } from '../db';
import TabulatorWithRecoil from '../../src';
import { useEffect, useRef } from 'react';
import Dexie from 'dexie';
import IndexClass from './IndexClass';

const UNIFORM_PROPS = {
  tableType: 'tabulator',
  filterDefs: {},
  isRemote: false,
  enableIndexedDBQuery: true,
  remoteAjax: {},
  tableMode: 'normal',
  quickAddConfigs: {
    columns: [],
    filters: [],
    uniqueKey: '',
    isRemoteQuery: false,
    remoteQuery: {},
  },
  indexdbConfigs: {
    tableName: 'drug_list',
    dexie: db,
    simpleBuiltinQueryCondition: [
      {
        label: 'where',
        value: 'ICD_NAME',
      },
      {
        label: 'limit',
        value: '1000',
      },
    ],
    dropdownIndexedDBTableName: "herbars",
    dropdownSimpleBuiltinQueryCondition: [
      {
        "label": "where",
        "value": "ICD_NAME"
      },
      {
        "label": "limit",
        "value": "1000000"
      }
    ],

  },
};

const colDefs: any[] = [
  {
    title: '标题',
    field: 'SEQUENCE_NO',
    editor: true,
    formatter: 'placeholder',
    formatterParams: {
      placeholder: '用量'
    }
  },
  {
    title: '标题—2',
    field: 'ICD_CODE',
    editor: true,
  },
  {
    title: '标题3',
    field: 'SICD',
    editor: true,
  },
  {
    title: '标题4',
    field: 'SPELL_CODE',
    editor: true,
  },
  {
    title: '标题5',
    field: 'WB_CODE',
    editor: true,
  },
  {
    title: '标题6',
    field: 'ICD_NAME',
    editor: true,
  }, {
    title: '标题7',
    field: 'DISEASE_CODE',
    editor: true,
  },
  {
    title: '标题8',
    field: 'INFECT_FLAG',
    editor: true,
  },
]

export const DBTable = () => {
  const dexieRef = useRef<Dexie>(null);

  useEffect(() => {
    seed().then(() => {
      if (!dexieRef.current) {
        dexieRef.current = db;
      }
    });
  }, []);
  return (
    <div style={{ width: '80vw', margin: '0 auto', height: '50vh', border: '1px solid #eee', borderRadius: 6 }}>
      <TabulatorWithRecoil
        appMode="EDIT"
        widgetId="ss"
        tableType="tabulator"
        tableMode="editable"
        uniformProps={UNIFORM_PROPS}
        tabulatorOptions={{
          columns: colDefs,
        }}
      />
      <IndexClass />
    </div>
  );
};
