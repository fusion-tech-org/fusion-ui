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

// import { ReactNode } from 'react';

import { ReactTabulatorProps, TabulatorReact } from './tabulator/TabulatorReact';
import { S2React, S2ReactProps } from './s2/S2React';
import { TabulatorTableType } from './interface';

type RenderCompByTypeProps = ReactTabulatorProps | S2ReactProps;

const renderCompByTableType = (tableType: TabulatorTableType, props: RenderCompByTypeProps) => {
  switch (tableType) {
    case "analysable":
      return <S2React {...(props as S2ReactProps)} />;
    case "editable":
      return <TabulatorReact {...(props as ReactTabulatorProps)} />;
    default:
      return <TabulatorReact {...(props as ReactTabulatorProps)} />;
  }
};

export const Tabulator: FC<RenderCompByTypeProps & TabulatorProps> = (props) => {
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
            {renderCompByTableType(tableType, props)}
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

