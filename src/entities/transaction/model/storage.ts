import { ls } from '@/shared/lib';

import { isTransaction } from './guards';
import type { Transaction } from './types';

export const loadTransactions = (): Transaction[] =>
  ls.get<Transaction[]>('transactions', (raw) => {
    if (Array.isArray(raw) && raw.every(isTransaction)) return raw;
    if (isTransaction(raw)) return [raw];
    throw new Error('Сохранённые операции имеют неверный формат');
  }) ?? [];
