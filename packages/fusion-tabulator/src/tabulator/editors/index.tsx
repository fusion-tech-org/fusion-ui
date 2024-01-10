import DateEditor from './DateEditor';

export const CUSTOM_EDITOR_LIST = [
  'dateEditor',
];

export const checkIsCustomEditor = (value: string) => CUSTOM_EDITOR_LIST.includes(value);

export const CUSTOM_EDITOR_MAP = {
  'dateEditor': DateEditor
};