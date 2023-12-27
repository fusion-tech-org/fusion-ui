import type { Layout } from 'react-grid-layout';

import type { FilterConfigurations, PlatformAppMode } from 'src/interface';

export type TableFilterProps = {
  className?: string;
  onLayoutChange?: (layout: Layout[]) => void;
  onLayoutSave?: (layout: Layout[]) => void;
  filterConfigurations: FilterConfigurations;
  savedLayout?: Layout[];
  appMode: PlatformAppMode;
};

export type TableFilterState = {
  layout: Layout[];
  enableEdit: boolean;
};
