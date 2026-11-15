import type { TransactionType } from '@/entities/transaction/model/types';

export const transactionTabs: { value: TransactionType; label: string; color: string }[] = [
  { value: 'income', label: 'Доход', color: 'fg.success' },
  { value: 'expense', label: 'Расход', color: 'fg.error' },
];
