import { ReactNode } from 'react';

import TabulatorReact from './tabulator/TabulatorReact';
import { S2React } from './s2/S2React';
import { TabulatorTableType } from './interface';

export const TableRenderMap: Record<TabulatorTableType, ReactNode> = {
  editable: <TabulatorReact />,
  analysable: <S2React />
};