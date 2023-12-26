import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { ConfigBarContainer } from './styles';
import { openConfigDrawerAtom } from '../../constants';

export interface TableConfigBarProps {
  widgetId: string;
}

export const TableConfigBar = (props: TableConfigBarProps) => {
  // const { widgetId } = props;

  const setIsOpenConfigDrawer = useSetRecoilState(openConfigDrawerAtom);

  return (
    <ConfigBarContainer>
      <CfgBtn
        onClick={() => setIsOpenConfigDrawer(true)}
      >
        配置表格
      </CfgBtn>
    </ConfigBarContainer>
  );
};

const CfgBtn = styled.div`
  /* width: 16px; */
  font-size: 12px;
  line-height: 1;
  padding: 6px 2px;
  color: #666;
  background-color: #f5f5f5;
  overflow-wrap: break-word;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
