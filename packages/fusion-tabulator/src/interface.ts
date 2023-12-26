import { S2ReactProps } from './s2/S2React';
import { ReactTabulatorProps } from './tabulator/TabulatorReact';

export type TabulatorTableType = 'tabulator' | 's2';

export type PlatformAppMode = 'EDIT' | 'PUBLISHED' | 'INSTALL';

export type RenderCompByTypeProps = {
  appMode: PlatformAppMode;
  s2Options?: S2ReactProps;
  tabulatorOptions?: ReactTabulatorProps;
  queryInfo?: string;
  widgetId?: string;
  onUpdateWidgetMetaProperty?: (params: Record<string, unknown>) => void;
  eventMaps?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tabulator?: Record<string, any>;
  };
};

export type RenderConfigByTypeProps = {
  tabulatorProps?: Record<string, unknown>;
};

export interface TabulatorProps {
  widgetId: string;
  tableType: TabulatorTableType;
  appMode: PlatformAppMode;
  configs?: {
    tabulator?: {
      generalConfigs?: Record<string, unknown>;
      loadedConfigs?: Record<string, unknown>;
      columnConfigs?: Record<string, unknown>;
      rowConfigs?: Record<string, unknown>;
      cellConfigs?: Record<string, unknown>;
      keyBindingConfigs?: Record<string, unknown>;
      eventConfigs?: Record<string, unknown>;
      styleConfigs?: Record<string, unknown>;
      advancedConfigs?: Record<string, unknown>;
    };
  };
  eventMaps?: {
    tabulator?: Record<string, unknown>;
  };
  onUpdateWidgetMetaProperty?: (params: Record<string, unknown>) => void;
  onUpdateWidgetProperty?: (params: Record<string, unknown>) => void;
  queryInfo?: string;
}

export type FusionTabulatorProps = RenderCompByTypeProps & TabulatorProps;
