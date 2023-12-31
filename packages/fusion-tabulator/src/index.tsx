

import { RecoilRoot } from 'recoil';
import { Tabulator } from './Tabulator';
import { FusionTabulatorProps } from './interface';

export type {
  ColumnDefinition,
  Options as FusionTabulatorOptions,
  EventCallBackMethods,
} from 'tabulator-tables';

export type { TabulatorTableData } from './tabulator/index';

export { TabulatorReact } from './tabulator/index';

export default function TabulatorWithRecoil(props: FusionTabulatorProps) {
  console.log('all props ', props);
  return (
    <RecoilRoot>
      <Tabulator {...props} />
    </RecoilRoot>
  )
}