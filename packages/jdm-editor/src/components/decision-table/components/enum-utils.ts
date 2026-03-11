import type { ColumnEnum } from '../../../helpers/schema';

export type EnumMode = 'none' | 'inline' | 'ref';

export const ENUM_MODE_OPTIONS: { value: EnumMode; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'inline', label: 'Inline' },
  { value: 'ref', label: 'Dictionary' },
];

export const getEnumMode = (e?: ColumnEnum): EnumMode => {
  if (!e) return 'none';
  return e.type;
};

export const parseEnumString = (str: string): { label: string; value: string }[] => {
  if (!str?.trim()) return [];
  return str
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, value] = line.split(';');
      return { label: label.trim(), value: (value ?? label).trim() };
    });
};

export const serializeEnumValues = (items?: { label: string; value: string }[]): string => {
  if (!items?.length) return '';
  return items.map((item) => (item.label === item.value ? item.label : `${item.label};${item.value}`)).join('\n');
};
