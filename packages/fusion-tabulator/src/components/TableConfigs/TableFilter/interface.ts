import type { Layout } from 'react-grid-layout';

import type { FilterDefinitions, PlatformAppMode } from 'src/interface';

export type TableFilterProps = {
  className?: string;
  onLayoutChange?: (layout: Layout[]) => void;
  onFieldValuesChange?: (fieldValues: Record<string, any>) => void;
  onLayoutSave?: (layout: Layout[]) => void;
  filterDefinitions: FilterDefinitions;
  savedLayout?: Layout[];
  appMode: PlatformAppMode;
};

export type TableFilterState = {
  layout: Layout[];
  enableEdit: boolean;
};
