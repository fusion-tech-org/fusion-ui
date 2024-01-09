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
  width: 30px;
  font-size: 12px;
  line-height: 1;
  padding: 8px 0;
  color: #666;
  background-color: #f5f5f5;
  /* overflow-wrap: break-word; */
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  align-items: center;
  border: 0 solid #eee;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
