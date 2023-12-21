import {
  TabulatorReact,
  ColumnDefinition,
  TabulatorTableData,
} from '../src/index';

export const baseTableData: TabulatorTableData[] = [
  { tuid: 1, id: 1, name: 'Oli Bob', age: '12', col: 'red', dob: '' },
  {
    tuid: 2,
    id: 2,
    name: 'Mary May',
    age: '1',
    col: 'blue',
    dob: '14/05/1982',
  },
  {
    tuid: 3,
    id: 3,
    name: 'Christine Lobowski',
    age: '42',
    col: 'green',
    dob: '22/05/1982',
  },
  {
    tuid: 4,
    id: 4,
    name: 'Brendon Philips',
    age: '125',
    col: 'orange',
    dob: '01/08/1980',
  },
  {
    tuid: 5,
    id: 5,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999',
  },
];

export const baseTableColumn: ColumnDefinition[] = [
  { title: '姓名', field: 'name', width: 100 },
  { title: '年龄', field: 'age', hozAlign: 'left', formatter: 'progress' },
  { title: '最喜欢的颜色', field: 'col' },
  { title: '生日', field: 'dob', sorter: 'date', hozAlign: 'center' },
];

export const autoTableData: TabulatorTableData[] = [
  {
    tuid: 1,
    id: 1,
    name: 'Billy Bob',
    age: 12,
    gender: 'male',
    height: 95,
    col: 'red',
    dob: '14/05/2010',
  },
  {
    tuid: 2,
    id: 2,
    name: 'Jenny Jane',
    age: 42,
    gender: 'female',
    height: 142,
    col: 'blue',
    dob: '30/07/1954',
  },
  {
    tuid: 3,
    id: 3,
    name: 'Steve McAlistaire',
    age: 35,
    gender: 'male',
    height: 176,
    col: 'green',
    dob: '04/11/1982',
  },
];

export const colConfigTableData: TabulatorTableData[] = [
  {
    tuid: 1,
    id: 1,
    name: 'Oli Bob',
    age: '12',
    height: 173,
    gender: 'male',
    col: 'red',
    dob: '',
    cheese: '',
  },
];

export const colConfigTableColumns: ColumnDefinition[] = [
  { title: '姓名', field: 'name', sorter: 'string', width: 200, editor: true },
  {
    title: '年龄',
    field: 'age',
    sorter: 'number',
    hozAlign: 'right',
    formatter: 'progress',
  },
  {
    title: '性别',
    field: 'gender',
    sorter: 'string',
    cellClick: function (e, cell) {
      console.log('cell click');
    },
  },
  {
    title: '身高',
    field: 'height',
    formatter: 'star',
    hozAlign: 'center',
    width: 100,
  },
  { title: '最喜欢的颜色', field: 'col', sorter: 'string' },
  { title: '出生日期', field: 'dob', sorter: 'date', hozAlign: 'center' },
  {
    title: '喜欢的奶酪',
    field: 'cheese',
    sorter: 'boolean',
    hozAlign: 'center',
    formatter: 'tickCross',
  },
];
