

import { RecoilRoot } from 'recoil';
import { Tabulator } from './Tabulator';
import { FusionTabulatorProps } from './interface';

export type {
  ColumnDefinition,
  Options as FusionTabulatorOptions,
  EventCallBackMethods,
} from 'tabulator-tables';

export type { TabulatorTableData } from './tabulator/interface';

export { TabulatorReact } from './tabulator/index';


export default function TabulatorWithRecoil(props: FusionTabulatorProps) {
  console.log('all props ', props);
  return (
    <RecoilRoot>
      <Tabulator {...props} />
    </RecoilRoot>
  )
}

// export const fakeProps = {
//   "actionId": "65a391ba127bf556ab45edf0",
//   "appMode": "EDIT",
//   "eventMaps": {},
//   "filterDefinitions": {},
//   "quickAddDropdownDefinitions": {
//     "data": [
//       {
//         "id": 1,
//         "name": "anyone_0",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 2,
//         "name": "fujia_1",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 12
//       },
//       {
//         "id": 3,
//         "name": "sunny_2",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 33
//       },
//       {
//         "id": 4,
//         "name": "gaung_3",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 56
//       },
//       {
//         "id": 5,
//         "name": "every_4",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 55
//       },
//       {
//         "id": 6,
//         "name": "anyone_5",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 7,
//         "name": "anyone_6",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 78
//       },
//       {
//         "id": 8,
//         "name": "anyone_7",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 9,
//         "name": "anyone_8",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 10,
//         "name": "anyone_9",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 11,
//         "name": "anyone_10",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 12,
//         "name": "anyone_11",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 13,
//         "name": "anyone_12",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 14,
//         "name": "anyone_13",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 15,
//         "name": "anyone_14",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 16,
//         "name": "anyone_15",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 17,
//         "name": "anyone_16",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 18,
//         "name": "anyone_17",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 19,
//         "name": "anyone_18",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 20,
//         "name": "anyone_19",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 21,
//         "name": "anyone_20",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 22,
//         "name": "anyone_21",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 23,
//         "name": "anyone_22",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 24,
//         "name": "anyone_23",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 25,
//         "name": "anyone_24",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 26,
//         "name": "anyone_25",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 27,
//         "name": "anyone_26",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 28,
//         "name": "anyone_27",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 29,
//         "name": "anyone_28",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       },
//       {
//         "id": 30,
//         "name": "anything_29",
//         "age": 12,
//         "signature": "one time",
//         "gender": "男",
//         "height": 95
//       }
//     ],
//     "columns": [
//       {
//         "title": "姓名",
//         "field": "name",
//       },
//       {
//         "title": "签名",
//         "field": "signature",
//       },
//       {
//         "title": "年龄",
//         "field": "age",
//         "editor": true,
//         "hozAlign": "right",

//       },
//       {
//         "title": "性别",
//         "field": "gender",
//         "editor": true,

//       },
//       {
//         "title": "身高",
//         "field": "height",
//         "editor": true,
//         "hozAlign": "center"
//       }
//     ],
//     "filters": [
//       "name",
//       "signature"
//     ]
//   },
//   "tableMode": "editable",
//   "tableType": "tabulator",
//   "uniformProps": {
//     "tableType": "tabulator",
//     "filterDefs": {},
//     "columnDefs": [
//       {
//         "field": "name",
//         "title": "名称",
//         "headerSort": false,
//         "editor": true
//       },
//       {
//         "field": "age",
//         "title": "年龄"
//       },
//       {
//         "field": "gender",
//         "title": "性别",
//         "editor": "list",
//         "editorParams": {
//           "values": []
//         }
//       }
//     ],
//     "isRemote": false,
//     "enableIndexedDBQuery": false,
//     "data": [
//       {
//         "id": 1,
//         "name": "潮生",
//         "age": "12",
//         "gender": "male",
//         "height": 1,
//         "col": "red",
//         "dob": "",
//         "cheese": 1
//       }
//     ],
//     "remoteAjax": {},
//     "tableMode": "editable",
//     "quickAddConfigs": {
//       "data": [
//         {
//           "id": 1,
//           "name": "anyone_0",
//           "age": 12,
//           "signature": "one",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 2,
//           "name": "fujia_1",
//           "age": 12,
//           "signature": "two",
//           "gender": "男",
//           "height": 12
//         },
//         {
//           "id": 3,
//           "name": "sunny_2",
//           "age": 12,
//           "signature": "three",
//           "gender": "男",
//           "height": 33
//         },
//         {
//           "id": 4,
//           "name": "gaung_3",
//           "age": 12,
//           "signature": "four",
//           "gender": "男",
//           "height": 56
//         },
//         {
//           "id": 5,
//           "name": "every_4",
//           "age": 12,
//           "signature": "five",
//           "gender": "男",
//           "height": 55
//         },
//         {
//           "id": 6,
//           "name": "anyone_5",
//           "age": 12,
//           "signature": "six",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 7,
//           "name": "anyone_6",
//           "age": 12,
//           "signature": "seven",
//           "gender": "男",
//           "height": 78
//         },
//         {
//           "id": 8,
//           "name": "anyone_7",
//           "age": 12,
//           "signature": "eight",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 9,
//           "name": "anyone_8",
//           "age": 12,
//           "signature": "nine",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 10,
//           "name": "anyone_9",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 11,
//           "name": "anyone_10",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 12,
//           "name": "anyone_11",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 13,
//           "name": "anyone_12",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 14,
//           "name": "anyone_13",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 15,
//           "name": "anyone_14",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 16,
//           "name": "anyone_15",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 17,
//           "name": "anyone_16",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 18,
//           "name": "anyone_17",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 19,
//           "name": "anyone_18",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 20,
//           "name": "anyone_19",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 21,
//           "name": "anyone_20",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 22,
//           "name": "anyone_21",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 23,
//           "name": "anyone_22",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 24,
//           "name": "anyone_23",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 25,
//           "name": "anyone_24",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 26,
//           "name": "anyone_25",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 27,
//           "name": "anyone_26",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 28,
//           "name": "anyone_27",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 29,
//           "name": "anyone_28",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         },
//         {
//           "id": 30,
//           "name": "anything_29",
//           "age": 12,
//           "signature": "one time",
//           "gender": "男",
//           "height": 95
//         }
//       ],
//       "columns": [
//         {
//           "title": "姓名",
//           "field": "name",
//         },
//         {
//           "title": "签名",
//           "field": "signature",
//         },
//         {
//           "title": "年龄",
//           "field": "age",
//           "editor": true,
//           "hozAlign": "right",

//         },
//         {
//           "title": "性别",
//           "field": "gender",
//           "editor": true,

//         },
//         {
//           "title": "身高",
//           "field": "height",
//           "editor": true,
//           "hozAlign": "center"
//         }
//       ],
//       "filters": [
//         "name",
//         "signature"
//       ],
//       "uniqueKey": "id",
//       "isRemoteQuery": false,
//       "remoteQuery": {}
//     },
//     "indexdbConfigs": {},
//     "commonOptions": {}
//   },
//   "widgetId": "98mog9bjn2",
//   "tabulatorOptions": {
//     "columns": [
//       {
//         "field": "name",
//         "title": "名称",
//         "headerSort": false,
//         "editor": true
//       },
//       {
//         "field": "age",
//         "title": "年龄"
//       },
//       {
//         "field": "gender",
//         "title": "性别",
//         "editor": "list",
//         "editorParams": {
//           "values": []
//         }
//       }
//     ],
//     "data": [
//       {
//         "id": 1,
//         "name": "潮生",
//         "age": "12",
//         "gender": "male",
//         "height": 1,
//         "col": "red",
//         "dob": "",
//         "cheese": 1
//       }
//     ]
//   }
// }