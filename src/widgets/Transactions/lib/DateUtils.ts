import { isObject } from '@/shared/lib';
import type { SelectItemType } from '@/shared/ui/CustomSelect';

export const isPeriod = (raw: unknown): raw is SelectItemType =>
  isObject(raw) && typeof raw.label === 'string' && typeof raw.value === 'string';

export const parseDate = (date: Date): SelectItemType => {
  const label = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return {
    label,
    value: `${year}-${month}`,
  };
};
