import { FC } from 'react';

import { TableContainer } from 'styles/global-styles';
import type { FusionTabulatorProps, RenderCompByTypeProps } from './interface';
import { TabulatorReact } from './tabulator/index';
import type { ReactTabulatorProps } from './tabulator/interface';
import { S2React, S2ReactProps } from './s2/S2React';
import { TabulatorTableType } from './interface';

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
    onExtraInputValueChanged,
    eventMaps = {},
    actionId,
    widgetId,
    enableRemote = false,
    tableMode,
    quickAddDropdownDefinitions,
    uniformProps,
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
          onExtraInputValueChanged={onExtraInputValueChanged}
          onEvents={onEvents}
          eventMaps={eventMaps['tabulator']}
          actionId={actionId}
          tableMode={tableMode}
          enableRemote={enableRemote}
          uniformProps={uniformProps}
          quickAddDropdownDefinitions={quickAddDropdownDefinitions}
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

export const TABULATOR_PREFIX = 'TABULATOR_CONTAINER';

export const Tabulator: FC<FusionTabulatorProps> = (props) => {
  const {
    widgetId,
    tableType = 'tabulator',
    appMode = 'EDIT',
    tableMode = 'normal',
    onUpdateWidgetProperty,
    onUpdateWidgetMetaProperty,
    configs,
    filterDefinitions,
    ...restProps
  } = props;
  console.log('Tabulator props -> ', props);

  return (
    <TableContainer
      widget-id={widgetId}
      id={`${TABULATOR_PREFIX}_${widgetId}`}
      tableMode={tableMode}
    >
      {renderCompByTableType(tableType, {
        onUpdateWidgetMetaProperty,
        tableMode,
        appMode,
        ...restProps,
      })}
    </TableContainer>
  );
};

export interface RenderConfigCommonProps {
  onUpdateWidgetProperty?: (params: Record<string, unknown>) => void;
}
