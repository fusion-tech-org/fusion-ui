import TabulatorWithRecoil from '../../src';
import {
  colConfigTableData,
  colConfigTableColumns
} from '../constants';


export const TabulatorFull = () => {
  return (
    <div style={{ display: 'flex', padding: '32px' }}>
      <TabulatorWithRecoil appMode="EDIT" widgetId='ss' tableType="tabulator" tabulatorOptions={{
        data: colConfigTableData,
        columns: colConfigTableColumns
      }} />
    </div>
  )
};