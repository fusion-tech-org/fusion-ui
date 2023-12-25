import { S2ReactProps } from './s2/S2React';
import { ReactTabulatorProps } from './tabulator/TabulatorReact';

export type TabulatorTableType = 'tabulator' | 's2';

export type PlatformAppMode = 'EDIT' | 'PUBLISHED' | 'INSTALL';

export type RenderCompByTypeProps = {
  appMode: PlatformAppMode;
  s2Options?: S2ReactProps;
  tabulatorOptions?: ReactTabulatorProps;
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
      generalConfigs?: Record<string, any>;
      loadedConfigs?: Record<string, any>;
      columnConfigs?: Record<string, any>;
      rowConfigs?: Record<string, any>;
      cellConfigs?: Record<string, any>;
      keyBindingConfigs?: Record<string, any>;
      eventConfigs?: Record<string, any>;
      styleConfigs?: Record<string, any>;
      advancedConfigs?: Record<string, any>;
    };
  };
  eventMaps?: {
    tabulator?: Record<string, any>;
  };
  onUpdateWidgetMetaProperty?: (params: Record<string, any>) => void;
  onUpdateWidgetProperty?: (params: Record<string, any>) => void;
  queryInfo?: string;
}

export type FusionTabulatorProps = RenderCompByTypeProps & TabulatorProps;
