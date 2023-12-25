import { FC, useRef, } from 'react';
import {
  AtomOptions,
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
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
import { Drawer } from '@arco-design/web-react';
import { openConfigDrawerAtom } from './constants';

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
// export const tabulatorGlobalState = atom<{
//   showFilter: boolean;
// }>({
//   key: `tabulator_global`, // unique ID (with respect to other atoms/selectors)
//   showFilter: false,
// });

export const TABULATOR_PREFIX = 'TABULATOR_CONTAINER';


export const Tabulator: FC<RenderCompByTypeProps & TabulatorProps> = (props) => {
  const { widgetId, tableType = 'tabulator', appMode = 'EDIT', ...restProps } = props;
  const refMain = useRef(null);
  const openConfigDrawerAtom = atom({
    key: 'isOpenConfigDrawer',
    default: false,
  });

  console.log(openConfigDrawerAtom);

  const handleDrawerOk = () => {

  }

  const handleDrawerCancel = () => {

  }

  return (
    <RecoilRoot>
      <Container widget-id={widgetId} id={`${TABULATOR_PREFIX}_${widgetId}`}>
        <Main ref={refMain}>
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
            <TableConfigBar widgetId={widgetId} />
          </ConfigsContainer>
        }
        <Drawer
          width="90%"
          title={null}
          getPopupContainer={() => refMain && refMain.current}
          visible={false}
          onOk={handleDrawerOk}
          onCancel={handleDrawerCancel}
        >
          <div>Here is an example text.</div>

          <div>Here is an example text.</div>
        </Drawer>
      </Container>
    </RecoilRoot>
  )
};

