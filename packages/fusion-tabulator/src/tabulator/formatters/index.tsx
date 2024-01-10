import MultiValueFormatter from './MultiValueFormatter';

export const CUSTOM_FORMATTER_LIST = [
  'multiValue',
];

export const checkIsCustomFormatter = (value: string) => CUSTOM_FORMATTER_LIST.includes(value);

export const CUSTOM_FORMATTER_MAP = {
  'multiValue': MultiValueFormatter
};