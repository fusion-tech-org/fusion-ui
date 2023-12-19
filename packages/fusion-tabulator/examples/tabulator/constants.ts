import {
  TabulatorReact,
  ColumnDefinition,
  TabulatorTableData,
} from '../../src/index';

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
