import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import { Tabs } from '@arco-design/web-react';

import {
  TabulatorReact, ColumnDefinition,
  TabulatorTableData
} from '../../src/index';
import {
  baseTableData,
  baseTableColumn
} from './constants';

const TabPane = Tabs.TabPane;

const Content = Layout.Content;

export function TabulatorExamples() {
  return (
    <Layout className='byte-layout-collapse-demo'>
      <Content style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px' }}>
        <Tabs defaultActiveTab='1'>
          <TabPane key='1' title='基本示例'>
            <TabulatorReact data={baseTableData} columns={baseTableColumn} />
          </TabPane>
          <TabPane key='2' title='Tab 2' disabled>
            Content of Tab Panel 2
          </TabPane>
          <TabPane key='3' title='Tab 3'>
            Content of Tab Panel 3
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}

