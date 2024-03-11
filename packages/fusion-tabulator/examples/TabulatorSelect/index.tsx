import TabulatorWithRecoil, { ColumnDefinition } from '../../src';

const initColDefs: ColumnDefinition[] = [
  { title: 'Name', field: 'name', width: 200 },
  {
    title: 'Progress',
    field: 'progress',
    width: 100,
    hozAlign: 'right',
    sorter: 'number',
  },
  { title: 'Gender', field: 'gender', width: 100 },
  { title: 'Rating', field: 'rating', hozAlign: 'center', width: 80 },
  { title: 'Driver', field: 'car', hozAlign: 'center', width: 100 },
  { title: 'Favourite Color', field: 'col' },
  { title: 'Date Of Birth', field: 'dob', hozAlign: 'center', sorter: 'date' },
  { title: 'col1', field: 'col1' },
  { title: 'col2', field: 'col2' },
  { title: 'col3', field: 'col3' },
  { title: 'col4', field: 'col4' },
  { title: 'col5', field: 'col5' },
  { title: 'col6', field: 'col6' },
  { title: 'col7', field: 'col7' },
  { title: 'col8', field: 'col8' },
  { title: 'col9', field: 'col9' },
  { title: 'col10', field: 'col10' },
  { title: 'col11', field: 'col11' },
];

const initData = [
  {
    id: 1,
    name: 'Billy Bob',
    age: '12',
    gender: 'male',
    height: 1,
    col: 'red',
    dob: '',
    cheese: 1,
  },
  {
    id: 2,
    name: 'Mary May',
    age: '1',
    gender: 'female',
    height: 2,
    col: 'blue',
    dob: '14/05/1982',
    cheese: true,
  },
  {
    id: 3,
    name: 'Christine Lobowski',
    age: '42',
    height: 0,
    col: 'green',
    dob: '22/05/1982',
    cheese: 'true',
  },
  {
    id: 4,
    name: 'Brendon Philips',
    age: '125',
    gender: 'male',
    height: 1,
    col: 'orange',
    dob: '01/08/1980',
  },
  {
    id: 5,
    name: 'Margret Marmajuke',
    age: '16',
    gender: 'female',
    height: 5,
    col: 'yellow',
    dob: '31/01/1999',
  },
  {
    id: 6,
    name: 'Billy Bob',
    age: '12',
    gender: 'male',
    height: 1,
    col: 'red',
    dob: '',
    cheese: 1,
  },
  {
    id: 7,
    name: 'Mary May',
    age: '1',
    gender: 'female',
    height: 2,
    col: 'blue',
    dob: '14/05/1982',
    cheese: true,
  },
  {
    id: 8,
    name: 'Christine Lobowski',
    age: '42',
    height: 0,
    col: 'green',
    dob: '22/05/1982',
    cheese: 'true',
  },
  {
    id: 9,
    name: 'Brendon Philips',
    age: '125',
    gender: 'male',
    height: 1,
    col: 'orange',
    dob: '01/08/1980',
  },
  {
    id: 10,
    name: 'Margret Marmajuke',
    age: '16',
    gender: 'female',
    height: 5,
    col: 'yellow',
    dob: '31/01/1999',
  },
];

export const TabulatorSelect = () => {
  return (
    <div style={{ padding: '32px', height: '320px' }}>
      <TabulatorWithRecoil
        appMode="EDIT"
        widgetId="ss"
        tableType="tabulator"
        enableRemote
        actionId="65e01c15b4fd3b23e5559dbd"
        tabulatorOptions={{
          columns: initColDefs,
        }}
      />
    </div>
  );
};
