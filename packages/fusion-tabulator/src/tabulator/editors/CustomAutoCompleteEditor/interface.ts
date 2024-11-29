export type Mode = 'simple' | 'list' | 'groupList' | 'table' | 'grid';

export interface AutoCompleteProps {
  initValue?: string;
  editorParams?: Record<string, any>;
  onRendered?: (fn: CallableFunction) => void;
  // success: (value: any) => void;
  onSelectItem: (item: AutoItem) => void;
  cancel: VoidFunction;
  mode: Mode;
  rectStyle: {
    left: number;
    bottom: number;
    width: number;
  };
}

export interface AutoItem {
  label: string;
  value: any;
  [key: string]: unknown;
}

export interface UseAutoCompleteParams {
  source: (text: string) => Array<{
    value: string;
    label: string;
    [key: string]: unknown;
  }>;
  onChange: (item: AutoItem) => void;
  onCancel: CallableFunction;
  delay?: number;
  inZone: boolean;
  listRef?: React.Ref<HTMLElement | Window>;
}

export interface VirtuosoWidgetCommonProps {
  data?: any[];
  currentItemIndex?: number;
  onMount?: VoidFunction;
  // ref?: React.Ref<VirtuosoHandle>;
  scrollerRef?: (ref: HTMLElement | Window) => any;
  onClickItem: (item: AutoItem | Record<string, any> | number) => void;
}
