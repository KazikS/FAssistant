import type { CategoryKey } from '@/entities/transaction';
import type { TransactionType } from '@/entities/transaction/model/types';

export type CreateTransactionFormValues = {
  type: TransactionType;
  amount: string;
  title: string;
  category: CategoryKey | null;
};
