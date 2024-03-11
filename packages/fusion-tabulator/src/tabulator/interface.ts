import { PlatformAppMode } from 'src/interface';
import {
  ColumnDefinition,
  EventCallBackMethods,
  Options,
  OptionsColumns,
} from 'tabulator-tables';

export interface TabulatorTableData {
  tuid?: string | number;
  [key: string]: any;
}

export type TableMode = 'normal' | 'editable';

export interface ReactTabulatorProps {
  columns?: ColumnDefinition[];
  options?: Options;
  eventMaps?: Record<
    keyof EventCallBackMethods,
    <K extends keyof EventCallBackMethods>(
      event: K,
      callback?: EventCallBackMethods[K]
    ) => void
  >;
  onRef?: (ref: any) => void;
  classNames?: string;
  widgetId?: string;
  tableMode?: TableMode;
  data?: TabulatorTableData[];
  layout?: OptionsColumns['layout'];
  appMode?: PlatformAppMode;
  configs?: {
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
  onUpdateWidgetMetaProperty?: (params: Record<string, any>) => void;
  onUpdateWidgetProperty?: (params: Record<string, any>) => void;
  onCustomSelectDropdownItem?: VoidFunction;
  onExtraInputValueChanged?: (value: string) => void;
  actionId?: string;
  uniqueKey?: string; // the unique key for multi tabulator in one page
  enableRemote?: boolean;
  quickAddDropdownDefinitions?: {
    data: any[];
    columns: any[];
  };
  uniformProps?: Record<string, any>;
  onEvents?: (eventName: string, data?: Record<string, any>) => void;
}
