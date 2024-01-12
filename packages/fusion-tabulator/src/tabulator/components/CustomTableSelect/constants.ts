import { ColumnDefinition } from 'tabulator-tables';

export const colDefs: ColumnDefinition[] = [
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

export const initData = (() => {
  return new Array(30).fill(0).map((_, i) => ({
    id: i + 1,
    name: `anyone_${i}`,
    age: 12,
    gender: '男',
    height: 95,
  }));
})();
