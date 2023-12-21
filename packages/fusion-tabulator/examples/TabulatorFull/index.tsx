import React from 'react';

import { Tabulator } from '../../src/Tabulator';
import {
  colConfigTableData,
  colConfigTableColumns
} from '../constants';


export const TabulatorFull = () => {
  return (
    <div style={{ display: 'flex', padding: '32px' }}>
      <Tabulator appMode="EDIT" widgetId='ss' tableType="tabulator" tabulatorOptions={{
        data: colConfigTableData,
        columns: colConfigTableColumns
      }} />
    </div>
  )
};