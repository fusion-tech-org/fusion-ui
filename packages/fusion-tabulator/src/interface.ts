export type TabulatorTableType = 'editable' | 'analysable';

export type PlatformAppMode = 'EDIT' | 'PUBLISHED' | 'INSTALL';

export interface TabulatorProps {
  widgetId: string;
  tableType: TabulatorTableType;
  appMode: PlatformAppMode;
}
