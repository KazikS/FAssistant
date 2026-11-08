import { CATEGORIES, TRANSACTION_TYPES, type CategoryKey } from './categories';
import type { TransactionType } from './types';

export const isCategoryKey = (value: string): value is CategoryKey =>
  Object.hasOwn(CATEGORIES, value);

export const isTransactionType = (value: string): value is TransactionType =>
  Object.hasOwn(TRANSACTION_TYPES, value);
