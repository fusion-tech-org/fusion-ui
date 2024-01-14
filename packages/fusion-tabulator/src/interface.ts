import type { ColProps, RulesProps } from '@arco-design/web-react';
import { S2ReactProps } from './s2/S2React';
import { ReactTabulatorProps, TableMode } from './tabulator/interface';

export type TabulatorTableType = 'tabulator' | 's2';

export type PlatformAppMode = 'EDIT' | 'PUBLISHED' | 'INSTALL';

export type RenderCompByTypeProps = {
  appMode: PlatformAppMode;
  s2Options?: S2ReactProps;
  tabulatorOptions?: ReactTabulatorProps;
  actionId?: string;
  enableRemote?: boolean;
  widgetId?: string;
  onUpdateWidgetMetaProperty?: (params: Record<string, unknown>) => void;
  onCustomSelectDropdownItem?: VoidFunction;
  onEvents?: (eventName: string, data?: Record<string, any>) => void;
  eventMaps?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tabulator?: Record<string, any>;
  };
  quickAddDropdownDefinitions?: {
    data: any[];
    columns: any[];
  };
  tableMode?: TableMode;
};

export type RenderConfigByTypeProps = {
  tabulatorProps?: Record<string, unknown>;
};

export type FilterConfigurationItem = {
  label: string;
  field: string;
  type: 'input' | 'button' | 'select' | 'date' | 'checkbox' | 'radio';
  rules?: RulesProps[];
  labelCol?: ColProps;
  labelAlign?: 'left' | 'right';
  wGrid?: number; // unit is the grid
  hGrid?: number;
  eventName?: string;
  extraProps?: Record<string, unknown>;
};
export interface FilterDefinitions {
  initialValues?: Record<string, unknown>;
  items?: FilterConfigurationItem[];
  rowHeight?: number; // unit is the px
  cols?: number;
}

export interface TabulatorProps {
  widgetId: string;
  tableType: TabulatorTableType;
  appMode: PlatformAppMode;
  filterDefinitions?: FilterDefinitions;
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
  quickAddDropdownDefinitions?: {
    data: any[];
    columns: any[];
  };
  eventMaps?: {
    tabulator?: Record<string, unknown>;
  };
  onUpdateWidgetMetaProperty?: (params: Record<string, unknown>) => void;
  onUpdateWidgetProperty?: (params: Record<string, unknown>) => void;
  onCustomSelectDropdownItem?: VoidFunction;
  actionId?: string;
  enableRemote?: boolean;
  tableMode?: TableMode;
  onEvents?: (eventName: string, data?: Record<string, any>) => void;
}

export type FusionTabulatorProps = RenderCompByTypeProps & TabulatorProps;
