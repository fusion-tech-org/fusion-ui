import TabulatorWithRecoil from '../../src';
import fakeData from './mockData.json';

export const DataGroup = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: '32px',
          height: '640px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <TabulatorWithRecoil
          appMode="EDIT"
          widgetId="ss33"
          tableType="tabulator"
          tabulatorOptions={{
            columns: colDefs,
            data: fakeData,
          }}
          uniformProps={{
            commonOptions: {
              layout: 'fitDataStretch',
              groupBy: 'PRINT_EMPL',
              groupToggleElement: 'header', //
              groupHeader: function (value, count, data, group) {
                //value - the value all members of this group share
                //count - the number of rows in this group
                //data - an array of all the row data objects in this group
                //group - the group component for the group
                console.log(value, count, data, group);
                return (
                  value +
                  "<span style='color:#d00; margin-left:10px;'>(" +
                  count +
                  ' 条记录)</span>'
                );
              },
            },
          }}
        />
      </div>
    </>
  );
};

const colDefs = [
  {
    formatter: 'rowSelection',
    titleFormatter: 'rowSelection',
    width: 40,
    hozAlign: 'center',
  },
  { field: 'PRINT_EMPL', title: '标题——PRINT_EMPL', visible: false },
  { field: 'NAME', title: '标题——NAME', visible: false },
  { field: 'TRADE_NAME', title: '标题——TRADE_NAME', visible: false },
  { field: 'SPECS', title: '标题——SPECS' },
  { field: 'APPLY_NUM', title: '标题——APPLY_NUM' },
  { field: 'RETAIL_PRICE', title: '标题——RETAIL_PRICE' },
  { field: 'PURCHASE_PRICE', title: '标题——PURCHASE_PRICE' },
  { field: 'MO_ORDER', title: '标题——MO_ORDER' },
  { field: 'APPLY_DATE', title: '标题——APPLY_DATE' },
  { field: 'DRUG_DEPT_CODE', title: '标题——DRUG_DEPT_CODE' },
  { field: 'DRUG_CODE', title: '标题——DRUG_CODE' },
  { field: 'PACK_QTY', title: '标题——PACK_QTY' },
  { field: 'DRUG_TYPE', title: '标题——DRUG_TYPE' },
  { field: 'DRUG_QUALITY', title: '标题——DRUG_QUALITY' },
  { field: 'PACK_UNIT', title: '标题——PACK_UNIT' },
  { field: 'MIN_UNIT', title: '标题——MIN_UNIT' },
  { field: 'BATCH_NO', title: '标题——BATCH_NO' },
  { field: 'APPLY_OPERCODE', title: '标题——APPLY_OPERCODE' },
  { field: 'RECIPE_NO', title: '标题——RECIPE_NO' },
  { field: 'SEQUENCE_NO', title: '标题——SEQUENCE_NO' },
  { field: 'PATIENT_ID', title: '标题——PATIENT_ID' },
  { field: 'EXEC_SQN', title: '标题——EXEC_SQN' },
  { field: 'APPLY_BILLCODE', title: '标题——APPLY_BILLCODE' },
  { field: 'BED_NO', title: '标题——BED_NO' },
];
