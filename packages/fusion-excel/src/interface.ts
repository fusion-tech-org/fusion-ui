import type { IWorkbookData } from '@univerjs/core';

export interface ExcelWidgetProps {
  adapter?: 'univer';
  enableRemoteUrl?: boolean;
  enableIndexedDB?: boolean;
  fileUrl?: string;
  readonly?: boolean;
  data?: IWorkbookData['sheets'];
}

export interface ParseFileParams {
  fileUrl: string;
  enableRemoteUrl?: boolean;
  adapter?: 'univer';
}
