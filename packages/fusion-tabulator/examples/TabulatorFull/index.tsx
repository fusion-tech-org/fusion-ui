import { useState } from 'react';
import TabulatorWithRecoil from '../../src';
import {
  colConfigTableData,
  colConfigTableColumns
} from '../constants';
import { Input, Select, Form } from '@arco-design/web-react';

const tagsApi = 'https://api.fujia.site/api/v1/tags';
const articlesApi = 'https://api.fujia.site/api/v1/articles';
const platformApi = 'https://staging.fusiontech.cn/api/v1/actions/execute'

export const TabulatorFull = () => {
  const [queryInfo, setQueryInfo] = useState('');

  const handleFormChange = (value) => {
    console.log(value);
    setQueryInfo(value.queryInfo)
  }

  return (
    <div>
      <Form onChange={handleFormChange}>
        <Form.Item label="API" field='queryInfo'>
          <Select options={[
            {
              label: '为空',
              value: ''
            },
            {
              label: 'tags',
              value: tagsApi,
            },
            {
              label: 'articles',
              value: articlesApi
            },
          ]} />
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', padding: '32px' }}>

        <TabulatorWithRecoil appMode="EDIT" widgetId='ss' tableType="tabulator" actionId={queryInfo} />
      </div>
    </div>
  )
};