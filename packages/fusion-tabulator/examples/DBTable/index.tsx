import { db, seed } from '../db';
import TabulatorWithRecoil from '../../src';
import { useEffect, useRef } from 'react';
import Dexie from 'dexie';

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
    tableName: 'herbars',
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
    dropdownSimpleBuiltinQueryCondition: [],
  },
};

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
        uniformProps={UNIFORM_PROPS}
      />
    </div>
  );
};
