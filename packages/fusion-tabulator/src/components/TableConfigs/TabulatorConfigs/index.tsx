
import { Tabs } from '@arco-design/web-react';

import { TabulatorConfigContainer } from "../styles";
import { paneStyle, tabItems } from './constants';

const TabPane = Tabs.TabPane;


export const TabulatorConfigs = () => {
  return (
    <TabulatorConfigContainer>
      <Tabs defaultActiveTab='general' direction="vertical" style={{ height: '100%' }}>
        {tabItems.map(item => (
          <TabPane destroyOnHide key={item.key} title={item.title}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>
    </TabulatorConfigContainer>
  )
};