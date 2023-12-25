import { Button } from '@arco-design/web-react';

import { ConfigBarContainer } from "./styles";

import {

  useSetRecoilState,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil';
import { openConfigDrawerAtom } from '../../constants';

export interface TableConfigBarProps {
  widgetId: string;
}



export const TableConfigBar = (props: TableConfigBarProps) => {
  const { widgetId } = props;
  // const setIsOpenConfigDrawer = useSetRecoilState(openConfigDrawerAtom);

  return (
    <ConfigBarContainer>
      <Button>配置表格</Button>
    </ConfigBarContainer>
  )
};