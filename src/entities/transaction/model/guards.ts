import { isObject } from '@/shared/lib';

import { CATEGORIES, TRANSACTION_TYPES, type CategoryKey } from './categories';
import type { PeriodKey, Transaction, TransactionType } from './types';

export const isCategoryKey = (value: string): value is CategoryKey =>
  Object.hasOwn(CATEGORIES, value);

export const isTransactionType = (value: string): value is TransactionType =>
  Object.hasOwn(TRANSACTION_TYPES, value);

export const isPeriodKey = (value: string): value is PeriodKey =>
  /^\d+-(0[1-9]|1[0-2])$/.test(value);

export const isTransaction = (raw: unknown): raw is Transaction =>
  isObject(raw) &&
  typeof raw.id === 'string' &&
  typeof raw.date === 'string' &&
  typeof raw.title === 'string' &&
  typeof raw.amount === 'number' &&
  Number.isFinite(raw.amount) &&
  typeof raw.type === 'string' &&
  isTransactionType(raw.type) &&
  typeof raw.category === 'string' &&
  isCategoryKey(raw.category);
