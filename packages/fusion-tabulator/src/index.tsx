import { Tabulator } from './Tabulator';

export type { FusionTabulatorProps } from './interface';

export type {
  ColumnDefinition,
  Options as FusionTabulatorOptions,
  EventCallBackMethods,
} from 'tabulator-tables';
export { TabulatorFull } from 'tabulator-tables';

export type { TabulatorTableData } from './tabulator/interface';

export { TabulatorReact } from './tabulator/index';

export default Tabulator;
