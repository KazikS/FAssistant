import type { CategoryKey } from './categories';

export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  date: string;
  type: TransactionType;
  category: CategoryKey;
  amount: number;
  title: string;
  description: string;
};

export type CategoryMeta = {
  key: CategoryKey;
  label: string;
  types: TransactionType[];
  icon: string;
};

type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
export type PeriodKey = `${number}-${Month}`;

export type TransactionFilters = {
  type: TransactionType | null;
  category: CategoryKey | null;
  period: PeriodKey | null;
};
