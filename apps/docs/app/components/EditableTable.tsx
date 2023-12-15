'use client';

import { FusionTabulator } from 'fusion-tabulator';


const data = [
  { id: 1, name: 'Oli Bob', age: '12', color: 'red', dob: '01/01/1980', rating: 5, passed: true, pets: ['cat', 'dog'] },
  { id: 2, name: 'Mary May', age: '1', color: 'green', dob: '12/05/1989', rating: 4, passed: true, pets: ['cat'] },
  { id: 3, name: 'Christine Lobowski', age: '42', color: 'green', dob: '10/05/1985', rating: 4, passed: false },
];

const editableColumns: any[] = [
  { title: 'Name', field: 'name', width: 150, editor: 'input', headerFilter: 'input' },
  { title: 'Age', field: 'age', hozAlign: 'left', formatter: 'progress', editor: 'star' },
];

export const EditableTable = () => {
  return <div>
    <FusionTabulator
      columns={editableColumns}
      data={data}
      cellEdited={(cell: any) => console.log('cellEdited', cell)}
      dataChanged={(newData: any) => console.log('dataChanged', newData)}
      footerElement={<span>Footer</span>}
      options={{ movableColumns: true, movableRows: true }}
    />
  </div>
};