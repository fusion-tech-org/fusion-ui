import { FC, ReactNode } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import {
  FilterContainer,
  Footer,
  ConfigsContainer,
  Container,
  Main,
  TableContainer
} from 'styles/global-styles';
import type { TabulatorProps } from './interface';
import { TableRenderMap } from './constants';


export const Tabulator: FC<TabulatorProps> = (props) => {
  const { widgetId, tableType = 'editable', appMode = 'EDIT' } = props;
  const tabulatorGlobalState = atom({
    key: `tabulator_${widgetId}`, // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });

  return (
    <RecoilRoot>
      <Container widgetId='t001'>
        <Main>
          <FilterContainer>
            过滤栏
          </FilterContainer>
          <TableContainer>
            {TableRenderMap[tableType]}
          </TableContainer>
          <Footer>
            footer
          </Footer>
        </Main>
        {
          appMode === 'EDIT' && <ConfigsContainer>
            Table Configuarations
          </ConfigsContainer>
        }
      </Container>
    </RecoilRoot>
  )
};

