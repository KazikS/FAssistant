import { Flex, Grid, Spacer } from '@chakra-ui/react';

import { selectCategory, selectType, setCategory } from '@/entities/transaction';
import { mockTransactions } from '@/entities/transaction/model/mockTransactions';
import { CustomSelect } from '@/shared/ui/CustomSelect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCategories, toCategory } from '@/widgets/Transactions/lib';

import { MobileCategorySelector } from './MobileCategorySelector';
import { PeriodSelector } from './PeriodSelector';
import { TransactionsList } from './TransactionsList';
import { TypeTabs } from './TypeTabs';

export const Transactions = () => {
  const activeType = useAppSelector(selectType);
  const activeCategory = useAppSelector(selectCategory);
  const categoryItems = [{ label: 'Все категории', value: 'all' }, ...getCategories(activeType)];
  const dispatch = useAppDispatch();

  const transactions = mockTransactions
    .filter((transaction) => (activeType ? transaction.type === activeType : transaction))
    .filter((transaction) =>
      activeCategory ? transaction.category === activeCategory : transaction
    );
  return (
    <Flex flexDir="column">
      <Flex gap="4" flexDirection={{ base: 'column', md: 'row' }} mb="5">
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap="4">
          <TypeTabs />
          <CustomSelect
            items={categoryItems}
            placeholder="Все категории"
            onValueChange={(value) => dispatch(setCategory(toCategory(value)))}
            value={activeCategory}
            display={{ base: 'none', md: 'flex' }}
          />
        </Grid>
        <Spacer display={{ base: 'none', md: 'flex' }} />
        <PeriodSelector />
        <MobileCategorySelector items={categoryItems} />
      </Flex>

      <TransactionsList transactions={transactions} />
    </Flex>
  );
};
