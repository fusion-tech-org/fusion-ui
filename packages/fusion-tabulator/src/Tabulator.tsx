import { FC, useRef } from 'react';
import { useRecoilState } from 'recoil';

import {
  FilterContainer,
  ConfigsContainer,
  Container,
  Main,
  TableContainer,
} from 'styles/global-styles';
import type {
  FusionTabulatorProps,
  RenderCompByTypeProps,
  RenderConfigByTypeProps,
} from './interface';
import {
  ReactTabulatorProps,
  TabulatorReact,
} from './tabulator/TabulatorReact';
import { S2React, S2ReactProps } from './s2/S2React';
import { TabulatorTableType } from './interface';
import { TableConfigBar } from 'components/TableConfigs';
import { Drawer } from '@arco-design/web-react';
import { openConfigDrawerAtom } from './constants';
import { TabulatorConfigs } from 'components/TableConfigs/TabulatorConfigs';

const renderCompByTableType = (
  tableType: TabulatorTableType,
  props: RenderCompByTypeProps
) => {
  const {
    tabulatorOptions,
    s2Options = {},
    appMode,
    onUpdateWidgetMetaProperty,
    eventMaps = {},
    queryInfo,
    widgetId,
  } = props;
  const { data = [], ...restTabulatorOptions } = tabulatorOptions || {};

  switch (tableType) {
    case 's2':
      return <S2React {...(s2Options as S2ReactProps)} />;
    case 'tabulator':
      return (
        <TabulatorReact
          {...(restTabulatorOptions as ReactTabulatorProps)}
          data={[...data]}
          appMode={appMode}
          widgetId={widgetId}
          onUpdateWidgetMetaProperty={onUpdateWidgetMetaProperty}
          eventMaps={eventMaps['tabulator']}
          queryInfo={queryInfo}
        />
      );
    default:
      return (
        <TabulatorReact
          {...(tabulatorOptions as ReactTabulatorProps)}
          appMode={appMode}
          data={[...data]}
          widgetId={widgetId}
          onUpdateWidgetMetaProperty={onUpdateWidgetMetaProperty}
          eventMaps={eventMaps['tabulator']}
          queryInfo={queryInfo}
        />
      );
  }
};

export interface RenderConfigCommonProps {
  onUpdateWidgetProperty?: (params: Record<string, unknown>) => void;
}

const renderConfigByTableType = (
  tableType: TabulatorTableType,
  props: RenderConfigByTypeProps & RenderConfigCommonProps
) => {
  const { tabulatorProps = {}, onUpdateWidgetProperty } = props;
  switch (tableType) {
    case 'tabulator':
      return <TabulatorConfigs {...tabulatorProps} onUpdateWidgetProperty={onUpdateWidgetProperty} />;
    default:
      return <TabulatorConfigs {...tabulatorProps} onUpdateWidgetProperty={onUpdateWidgetProperty} />;
  }
};

export const TABULATOR_PREFIX = 'TABULATOR_CONTAINER';

export const Tabulator: FC<FusionTabulatorProps> = (props) => {
  const {
    widgetId,
    tableType = 'tabulator',
    appMode = 'EDIT',
    onUpdateWidgetProperty,
    configs,
    ...restProps
  } = props;
  console.log('Tabulator props -> ', props);
  const refMain = useRef(null);
  const [isOpenConfigDrawer, setIsOpenConfigDrawer] =
    useRecoilState(openConfigDrawerAtom);

  // const handleDrawerOk = () => {
  //   setIsOpenConfigDrawer(false);
  // };

  const handleDrawerCancel = () => {
    setIsOpenConfigDrawer(false);
  };

  return (
    <Container widget-id={widgetId} id={`${TABULATOR_PREFIX}_${widgetId}`}>
      <Main ref={refMain}>
        <FilterContainer>过滤栏</FilterContainer>
        <TableContainer>
          {renderCompByTableType(tableType, { appMode, ...restProps })}
        </TableContainer>
        {/* <Footer>
            footer
          </Footer> */}
      </Main>
      {appMode === 'EDIT' && (
        <>
          <ConfigsContainer>
            <TableConfigBar widgetId={widgetId} />
          </ConfigsContainer>
          <Drawer
            width="90%"
            title={null}
            getPopupContainer={() => refMain && refMain.current}
            visible={isOpenConfigDrawer}
            footer={null}
            onCancel={handleDrawerCancel}
          >
            {renderConfigByTableType(tableType, { onUpdateWidgetProperty })}
          </Drawer>
        </>
      )}
    </Container>
  );
};
