import TabulatorWithRecoil from '../../src';

const colDefs = [
  {
    title: '姓名',
    field: 'name',
  },
  {
    title: '年龄',
    field: 'age',
    editor: true,
    hozAlign: 'right',
  },
  {
    title: '性别',
    field: 'gender',
    editor: 'autoComplete',
    editorParams: {
      values: [
        { value: '1', label: 'John' },
        { value: '2', label: 'Jack' },
        { value: '3', label: 'Jane' },
        { value: '4', label: 'Mike' },
      ],
      placeholder: '请输入搜索值',
    },
  },
  {
    title: '身高',
    field: 'height',
    editor: true,
    hozAlign: 'center',
  },
];

const initData = (() => {
  return new Array(2).fill(0).map((_, i) => ({
    id: i + 1,
    name: `anyone_${i}`,
    age: 12,
    gender: '',
    height: 95,
  }));
})();

const uniformProps = {
  tableType: 'tabulator',
  filterDefs: {},
  columnDefs: [
    {
      field: 'name',
      title: '名称',
      headerSort: false,
      editor: true,
    },
    {
      field: 'age',
      title: '年龄',
    },
    {
      field: 'gender',
      title: '性别',
      editor: 'list',
      editorParams: {
        values: [],
      },
    },
  ],
  isRemote: false,
  enableIndexedDBQuery: false,
  data: [
    {
      id: 1,
      name: '潮生',
      age: '12',
      gender: 'male',
      height: 1,
      col: 'red',
      dob: '',
      cheese: 1,
    },
  ],
  remoteAjax: {},
  tableMode: 'editable',
  quickAddConfigs: {
    data: [
      {
        id: 1,
        name: 'anyone_0',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 2,
        name: 'anyone_1',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 3,
        name: 'anyone_2',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 4,
        name: 'anyone_3',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 5,
        name: 'anyone_4',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 6,
        name: 'anyone_5',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 7,
        name: 'anyone_6',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 8,
        name: 'anyone_7',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 9,
        name: 'anyone_8',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 10,
        name: 'anyone_9',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 11,
        name: 'anyone_10',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 12,
        name: 'anyone_11',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 13,
        name: 'anyone_12',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 14,
        name: 'anyone_13',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 15,
        name: 'anyone_14',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 16,
        name: 'anyone_15',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 17,
        name: 'anyone_16',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 18,
        name: 'anyone_17',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 19,
        name: 'anyone_18',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 20,
        name: 'anyone_19',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 21,
        name: 'anyone_20',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 22,
        name: 'anyone_21',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 23,
        name: 'anyone_22',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 24,
        name: 'anyone_23',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 25,
        name: 'anyone_24',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 26,
        name: 'anyone_25',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 27,
        name: 'anyone_26',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 28,
        name: 'anyone_27',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 29,
        name: 'anyone_28',
        age: 12,
        gender: '男',
        height: 95,
      },
      {
        id: 30,
        name: 'anyone_29',
        age: 12,
        gender: '男',
        height: 95,
      },
    ],
    columns: [
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
    ],
    filters: ['name'],
    uniqueKey: 'id',
    isRemoteQuery: false,
    remoteQuery: {},
  },
  indexdbConfigs: {},
  commonOptions: {
    selectable: false,
  },
};

export const CustomEditor = () => {
  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        height: '200px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <TabulatorWithRecoil
        appMode="EDIT"
        widgetId="ss33"
        tableType="tabulator"
        tableMode="editable"
        tabulatorOptions={{
          columns: colDefs,
          data: initData,
        }}
        uniformProps={uniformProps}
        quickAddDropdownDefinitions={{
          data: initData,
          columns: colDefs,
        }}
      />
    </div>
  );
};
