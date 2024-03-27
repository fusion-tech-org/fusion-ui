import { RecoilRoot } from 'recoil';

import { Tabulator } from './Tabulator';
import { FusionTabulatorProps } from './interface';

export type { FusionTabulatorProps } from './interface';

export type {
  ColumnDefinition,
  Options as FusionTabulatorOptions,
  EventCallBackMethods,
} from 'tabulator-tables';
export { TabulatorFull } from 'tabulator-tables';

export type { TabulatorTableData } from './tabulator/interface';

export { TabulatorReact } from './tabulator/index';

export default function TabulatorWithRecoil(props: FusionTabulatorProps) {
  return (
    <RecoilRoot>
      <Tabulator {...props} />
    </RecoilRoot>
  );
}
