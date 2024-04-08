import DateEditor from './DateEditor';
import CustomAutoCompleteEditor from './CustomAutoCompleteEditor';
import CustomMultiSelectEditor from './CustomMultiSelectEditor';
import CustomDatePikcer from './DatePickerEditor';

export const CUSTOM_EDITOR_LIST = [
  'dateEditor',
  'autoComplete',
  'select',
  'datePicker',
] as const;

export type AVALIABLE_EDITOR_LIST = (typeof CUSTOM_EDITOR_LIST)[number];

export const checkIsCustomEditor = (value: AVALIABLE_EDITOR_LIST) =>
  CUSTOM_EDITOR_LIST.includes(value);

export const CUSTOM_EDITOR_MAP: Record<AVALIABLE_EDITOR_LIST, any> = {
  dateEditor: DateEditor,
  autoComplete: CustomAutoCompleteEditor,
  select: CustomMultiSelectEditor,
  datePicker: CustomDatePikcer,
};
