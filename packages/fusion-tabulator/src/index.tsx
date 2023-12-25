

import { RecoilRoot } from 'recoil';
import { Tabulator } from './Tabulator';

export type { ColumnDefinition, Options as FusionTabulatorOptions } from 'tabulator-tables';

export type { TabulatorTableData } from './tabulator/TabulatorReact';

export { TabulatorReact } from './tabulator/TabulatorReact';

export default function TabulatorWithRecoil(props) {
  return (
    <RecoilRoot>
      <Tabulator {...props} />
    </RecoilRoot>
  )
}