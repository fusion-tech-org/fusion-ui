import type { Layout } from 'react-grid-layout';

import type { filterDefinitions, PlatformAppMode } from 'src/interface';

export type TableFilterProps = {
  className?: string;
  onLayoutChange?: (layout: Layout[]) => void;
  onLayoutSave?: (layout: Layout[]) => void;
  filterDefinitions: filterDefinitions;
  savedLayout?: Layout[];
  appMode: PlatformAppMode;
};

export type TableFilterState = {
  layout: Layout[];
  enableEdit: boolean;
};
