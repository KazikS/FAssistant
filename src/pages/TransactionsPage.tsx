import { Box } from '@chakra-ui/react';

import {
  selectCategory,
  selectType,
  setCategory,
  setType,
  type CategoryKey,
} from '@/entities/transaction';
import { mockTransactions } from '@/entities/transaction/model/mockTransactions';
import type { TransactionType } from '@/entities/transaction/model/types';
import { usePageTitle } from '@/shared/hooks';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Transactions } from '@/widgets/Transactions';

export default function TransactionsPage() {
  const activeCategory = useAppSelector(selectCategory);
  const activeType = useAppSelector(selectType);
  const transactions = mockTransactions
    .filter((transaction) => (activeType ? transaction.type === activeType : transaction))
    .filter((transaction) =>
      activeCategory ? transaction.category === activeCategory : transaction
    );
  const title = usePageTitle();
  const dispatch = useAppDispatch();
  const handleSetType = (value: TransactionType | null) => {
    dispatch(setType(value));
  };

  const handleSetCategory = (value: CategoryKey | null) => {
    dispatch(setCategory(value));
  };
  return (
    <Box>
      <PageHeader
        title={title}
        subtitle={`Найдено ${transactions.length} записей`}
        btnText="+ Операция"
      />
      <Transactions
        activeCategory={activeCategory}
        activeType={activeType}
        transactions={transactions}
        onSetCategory={handleSetCategory}
        onSetType={handleSetType}
      />
    </Box>
  );
}
