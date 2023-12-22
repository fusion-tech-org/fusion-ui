import { FC, } from 'react';
import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil';

import {
  FilterContainer,
  ConfigsContainer,
  Container,
  Main,
  TableContainer
} from 'styles/global-styles';
import type { TabulatorProps } from './interface';

import { ReactTabulatorProps, TabulatorReact } from './tabulator/TabulatorReact';
import { S2React, S2ReactProps } from './s2/S2React';
import { TabulatorTableType } from './interface';
import { TableConfigBar } from 'components/TableConfigs';

type RenderCompByTypeProps = {
  s2Options?: S2ReactProps;
  tabulatorOptions?: ReactTabulatorProps;
};

const renderCompByTableType = (tableType: TabulatorTableType, props: RenderCompByTypeProps) => {
  const { tabulatorOptions = {}, s2Options = {} } = props;
  switch (tableType) {
    case "s2":
      return <S2React {...(s2Options as S2ReactProps)} />;
    case "tabulator":
      return <TabulatorReact {...(tabulatorOptions as ReactTabulatorProps)} />;
    default:
      return <TabulatorReact {...(tabulatorOptions as ReactTabulatorProps)} />;
  }
};

export const Tabulator: FC<RenderCompByTypeProps & TabulatorProps> = (props) => {
  const { widgetId, tableType = 'tabulator', appMode = 'EDIT', ...restProps } = props;
  // const tabulatorGlobalState = atom({
  //   key: `tabulator_${widgetId}`, // unique ID (with respect to other atoms/selectors)
  //   default: '', // default value (aka initial value)
  // });

  return (
    <RecoilRoot>
      <Container widget-id={widgetId}>
        <Main>
          <FilterContainer>
            过滤栏
          </FilterContainer>
          <TableContainer>
            {renderCompByTableType(tableType, restProps)}
          </TableContainer>
          {/* <Footer>
            footer
          </Footer> */}
        </Main>
        {
          appMode === 'EDIT' && <ConfigsContainer>
            <TableConfigBar />
          </ConfigsContainer>
        }
      </Container>
    </RecoilRoot>
  )
};

