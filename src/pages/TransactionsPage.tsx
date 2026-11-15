import { Box } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import {
  selectCategory,
  selectCreateDrawerOpen,
  selectPeriod,
  selectType,
  setCategory,
  setCreateDrawerOpen,
  setPeriod,
  setType,
  type CategoryKey,
} from '@/entities/transaction';
import { isTransaction } from '@/entities/transaction/model/guards';
import type { PeriodKey, Transaction, TransactionType } from '@/entities/transaction/model/types';
import { usePageTitle } from '@/shared/hooks';
import { debounce, LS } from '@/shared/lib';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Transactions } from '@/widgets/Transactions';
import { parseDate } from '@/widgets/Transactions/lib';

export default function TransactionsPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const activeCategory = useAppSelector(selectCategory);
  const activeType = useAppSelector(selectType);
  const activePeriod = useAppSelector(selectPeriod);
  const isOpen = useAppSelector(selectCreateDrawerOpen);
  const dispatch = useAppDispatch();
  const ls = new LS();

  const allTransactions =
    ls.get<Transaction[]>('transactions', (raw) =>
      Array.isArray(raw) && raw.every(isTransaction) ? raw : null
    ) ?? [];

  console.log(allTransactions);

  const transactions = allTransactions.filter(
    (transaction) =>
      (!activeType || transaction.type === activeType) &&
      (!activeCategory || transaction.category === activeCategory) &&
      (!activePeriod || transaction.date.slice(0, 7) === activePeriod) &&
      transaction.title.toLowerCase().includes(searchValue)
  );

  const title = usePageTitle();
  const monthKeys = [...new Set(allTransactions.map((item) => item.date.slice(0, 7)))];
  const months = monthKeys
    .sort()
    .reverse()
    .map((month) => parseDate(new Date(`${month}-01T12:00:00`)));

  const handleSetType = (value: TransactionType | null) => {
    dispatch(setType(value));
  };

  const handleSetCategory = (value: CategoryKey | null) => {
    dispatch(setCategory(value));
  };

  const handleSetPeriod = (value: PeriodKey | null) => {
    dispatch(setPeriod(value));
  };

  const debouncedSearch = useMemo(
    () => debounce(100, (value: string) => setSearchValue(value.toLowerCase())),
    []
  );

  const onClickAction = () => {
    dispatch(setCreateDrawerOpen(!isOpen));
  };

  return (
    <Box>
      <PageHeader
        title={title}
        subtitle={`Найдено ${transactions.length} записей`}
        btnText="+ Операция"
        btnAction={onClickAction}
      />
      <Transactions
        activeCategory={activeCategory}
        activeType={activeType}
        transactions={transactions}
        months={months}
        onSetCategory={handleSetCategory}
        onSetType={handleSetType}
        onSetPeriod={handleSetPeriod}
        activePeriod={activePeriod}
        onTextChanged={debouncedSearch}
      />
    </Box>
  );
}
