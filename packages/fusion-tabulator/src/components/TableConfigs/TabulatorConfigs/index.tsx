
import { Tabs } from '@arco-design/web-react';

import { TabulatorConfigContainer } from "../styles";
import { tabItems } from './constants';
import { FC } from 'react';

const TabPane = Tabs.TabPane;

export interface TabulatorConfigsProps {
  onUpdateWidgetProperty?: (params: Record<string, any>) => void;
}

export const TabulatorConfigs: FC<TabulatorConfigsProps> = (props) => {
  return (
    <TabulatorConfigContainer>
      <Tabs defaultActiveTab='general' direction="vertical" style={{ height: '100%' }}>
        {tabItems.map(item => (
          <TabPane destroyOnHide key={item.key} title={item.title}>
            {item.content(props)}
          </TabPane>
        ))}
      </Tabs>
    </TabulatorConfigContainer>
  )
};