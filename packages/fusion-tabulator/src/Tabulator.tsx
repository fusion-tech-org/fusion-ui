import { FC, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

import {
  FilterContainer,
  ConfigsContainer,
  Container,
  Main,
  TableContainer,
} from 'styles/global-styles';
import type {
  // FilterDefinitions,
  FusionTabulatorProps,
  RenderCompByTypeProps,
  RenderConfigByTypeProps,
} from './interface';
import {
  ReactTabulatorProps,
  TabulatorReact,
} from './tabulator/index';
import { S2React, S2ReactProps } from './s2/S2React';
import { TabulatorTableType } from './interface';
import { TableConfigBar } from 'components/TableConfigs';
import { Drawer } from '@arco-design/web-react';
import { openConfigDrawerAtom } from './constants';
import { TabulatorConfigs } from 'components/TableConfigs/TabulatorConfigs';
import { TableFilter } from 'components/TableConfigs/TableFilter';
import { isArray } from 'lodash';

const renderCompByTableType = (
  tableType: TabulatorTableType,
  props: RenderCompByTypeProps
) => {
  const {
    tabulatorOptions,
    s2Options = {},
    appMode,
    onUpdateWidgetMetaProperty,
    onEvents,
    onCustomSelectDropdownItem,
    eventMaps = {},
    actionId,
    widgetId,
    enableRemote,
    tableMode,
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
          onCustomSelectDropdownItem={onCustomSelectDropdownItem}
          onEvents={onEvents}
          eventMaps={eventMaps['tabulator']}
          actionId={actionId}
          tableMode={tableMode}
          enableRemote={enableRemote}
        />
      );
    default:
      return (
        <TabulatorReact
          {...(tabulatorOptions as ReactTabulatorProps)}
          appMode={appMode}
          tableMode={tableMode}
          enableRemote={enableRemote}
          data={[...data]}
          widgetId={widgetId}
          onUpdateWidgetMetaProperty={onUpdateWidgetMetaProperty}
          eventMaps={eventMaps['tabulator']}
          actionId={actionId}
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
    // tableMode = 'normal',
    tableMode = 'editable',
    onUpdateWidgetProperty,
    onUpdateWidgetMetaProperty,
    configs,
    filterDefinitions,
    ...restProps
  } = props;
  console.log('Tabulator props -> ', props);

  const refMain = useRef(null);
  const [isOpenConfigDrawer, setIsOpenConfigDrawer] =
    useRecoilState(openConfigDrawerAtom);

  const handleDrawerCancel = () => {
    setIsOpenConfigDrawer(false);
  };

  const handleFilterLayoutChange = useCallback((layout) => {
    console.log('layout have changed: ', layout);
  }, []);

  const handleFilterLayoutSave = useCallback((layout) => {
    console.log('layout saved', layout);
  }, []);

  const handleFieldValuesChange = (fieldValues: any) => {
    console.log('fieldValues have changed: ', fieldValues);
    onUpdateWidgetMetaProperty({
      filterData: fieldValues,
    });
  }

  return (
    <Container widget-id={widgetId} id={`${TABULATOR_PREFIX}_${widgetId}`} appMode={appMode}>
      <Main ref={refMain}>
        {
          isArray(filterDefinitions?.items) && filterDefinitions.items.length > 0 && (
            <FilterContainer>
              <TableFilter
                appMode={appMode}
                filterDefinitions={filterDefinitions}
                onLayoutChange={handleFilterLayoutChange}
                onFieldValuesChange={handleFieldValuesChange}
                onLayoutSave={handleFilterLayoutSave}
              />
            </FilterContainer>
          )
        }
        <TableContainer>
          {renderCompByTableType(tableType, { onUpdateWidgetMetaProperty, tableMode, appMode, ...restProps })}
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
