import TabulatorWithRecoil from '../../src';
import {
  colConfigTableData,
  editableColDefs,
} from '../constants';


export const TabulatorEditable = () => {

  return (
      <div style={{ display: 'flex', padding: '32px' }}>

        <TabulatorWithRecoil appMode="EDIT" widgetId='ss33' tableType="tabulator" tabulatorOptions={{
          columns: editableColDefs,
          data: colConfigTableData
        }} />
      </div>
  );
};