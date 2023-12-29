import TabulatorWithRecoil from '../../src';
import {
  colConfigTableData,
  colConfigTableColumns
} from '../constants';

const testApi = 'https://api.fujia.site/api/v1/tags';
const platformApi = 'https://staging.fusiontech.cn/api/v1/actions/execute'

export const TabulatorFull = () => {
  return (
    <div style={{ display: 'flex', padding: '32px' }}>
      <TabulatorWithRecoil appMode="EDIT" widgetId='ss' tableType="tabulator" tabulatorOptions={{
        // data: colConfigTableData,
        columns: colConfigTableColumns,
      }} />
    </div>
  )
};