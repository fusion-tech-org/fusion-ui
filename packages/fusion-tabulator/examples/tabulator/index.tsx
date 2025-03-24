import React, { useCallback, useRef, useState } from 'react';
import { Button, Layout } from '@arco-design/web-react';
import { Tabs } from '@arco-design/web-react';

import {
  TabulatorReact,
  ColumnDefinition,
  TabulatorTableData,
} from '../../src/index';
import {
  baseTableData,
  baseTableColumn,
  autoTableData,
  colConfigTableData,
  colConfigTableColumns,
} from '../constants';
import { forIn } from 'lodash';
import { fakeCols1, fakeCols2, fakeData1, fakeData2 } from './constant';

const TabPane = Tabs.TabPane;

const Content = Layout.Content;

export function TabulatorExamples() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  const handleUpdateWidgetMetaProperty = useCallback((params: any) => {
    forIn(params, (value, key) => {
      if (key === 'tabulatorRef') {
        tableRef.current = value;
      } else {
      }
    });
  }, []);

  const handleToggle1 = () => {
    if (!tableRef.current) {
      return;
    }

    tableRef.current.clearData();

    tableRef.current.setColumns(fakeCols1);
    tableRef.current.setData(fakeData1);
  };

  const handleToggle2 = () => {
    if (!tableRef.current) {
      return;
    }
  };

  return (
    <Layout className="byte-layout-collapse-demo">
      <Content
        style={{
          background: 'rgb(240,255,255)',
          textAlign: 'center',
          padding: '30px',
        }}
      >
        <Tabs defaultActiveTab="1">
          <TabPane key="1" title="基本示例">
            <div>
              <Button onClick={handleToggle1}>Toggle 1</Button>
              <Button onClick={handleToggle2}>Toggle 2</Button>
            </div>
            <TabulatorReact
              data={baseTableData}
              columns={baseTableColumn}
              onUpdateWidgetMetaProperty={handleUpdateWidgetMetaProperty}
            />
          </TabPane>
          <TabPane key="2" title="自动列">
            <TabulatorReact data={autoTableData} />
          </TabPane>
          <TabPane key="3" title="列配置">
            <TabulatorReact
              data={colConfigTableData}
              columns={colConfigTableColumns}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
