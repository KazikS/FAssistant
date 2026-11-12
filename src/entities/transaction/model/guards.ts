import { CATEGORIES, TRANSACTION_TYPES, type CategoryKey } from './categories';
import type { PeriodKey, TransactionType } from './types';

export const isCategoryKey = (value: string): value is CategoryKey =>
  Object.hasOwn(CATEGORIES, value);

export const isTransactionType = (value: string): value is TransactionType =>
  Object.hasOwn(TRANSACTION_TYPES, value);

export const isPeriodKey = (value: string): value is PeriodKey =>
  /^\d+-(0[1-9]|1[0-2])$/.test(value);
