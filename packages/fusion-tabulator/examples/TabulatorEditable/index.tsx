import TabulatorWithRecoil from '../../src';
import { colConfigTableData, editableColDefs } from '../constants';

const colDefs = [
  {
    title: '姓名',
    field: 'name',
    headerSort: false,
  },
  {
    title: '年龄',
    field: 'age',
    editor: true,
    hozAlign: 'right',
    headerSort: false,
  },
  {
    title: '性别',
    field: 'gender',
    editor: true,
    headerSort: false,
  },
  {
    title: '身高',
    field: 'height',
    editor: true,
    headerSort: false,
    hozAlign: 'center',
  },
];

const initData = (() => {
  return new Array(30).fill(0).map((_, i) => ({
    id: i + 1,
    name: `anyone_${i}`,
    age: 12,
    gender: '男',
    height: 95,
  }));
})();

export const TabulatorEditable = () => {
  return (
    <div style={{ display: 'flex', padding: '32px', height: '200px' }}>
      <TabulatorWithRecoil
        appMode="EDIT"
        widgetId="ss33"
        tableType="tabulator"
        tableMode="editable"
        tabulatorOptions={{
          columns: editableColDefs,
          data: colConfigTableData,
        }}
        uniformProps={{
          commonOptions: {
            selectableRows: true,
          },
        }}
        quickAddDropdownDefinitions={{
          data: initData,
          columns: colDefs,
        }}
      />
    </div>
  );
};
