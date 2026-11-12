import { isPeriodKey } from '@/entities/transaction/model/guards';
import type { PeriodKey } from '@/entities/transaction/model/types';
import { isObject } from '@/shared/lib';
import type { SelectItemType } from '@/shared/ui/CustomSelect';

export const isPeriod = (raw: unknown): raw is SelectItemType =>
  isObject(raw) && typeof raw.label === 'string' && typeof raw.value === 'string';

export const parseDate = (date: Date, period?: boolean): SelectItemType => {
  const labelParams: Intl.DateTimeFormatOptions = period
    ? { day: '2-digit', month: 'long', year: 'numeric' }
    : { month: 'long', year: 'numeric' };
  const label = new Intl.DateTimeFormat('ru-RU', labelParams).format(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return {
    label,
    value: `${year}-${month}`,
  };
};

export const toPeriod = (value: string | undefined): PeriodKey | null => {
  return value !== undefined && isPeriodKey(value) ? value : null;
};
