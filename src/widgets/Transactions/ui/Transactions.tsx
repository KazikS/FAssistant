import { Flex, Grid, Spacer } from '@chakra-ui/react';

import { type CategoryKey } from '@/entities/transaction';
import type { PeriodKey, Transaction, TransactionType } from '@/entities/transaction/model/types';
import { CustomSelect, type SelectItemType } from '@/shared/ui/CustomSelect';
import { getCategories, toCategory } from '@/widgets/Transactions/lib';

import { MobileCategorySelector } from './MobileCategorySelector';
import { PeriodSelector } from './PeriodSelector';
import { TransactionsList } from './TransactionsList';
import { TypeTabs } from './TypeTabs';

type TransactionProps = {
  activeType: TransactionType | null;
  activeCategory: CategoryKey | null;
  activePeriod: PeriodKey | null;
  transactions: Transaction[];
  months: SelectItemType[];
  onSetCategory: (value: CategoryKey | null) => void;
  onSetType: (value: TransactionType | null) => void;
  onSetPeriod: (value: PeriodKey | null) => void;
};

export const Transactions = ({
  activeType,
  activeCategory,
  activePeriod,
  transactions,
  months,
  onSetCategory,
  onSetType,
  onSetPeriod,
}: TransactionProps) => {
  const categoryItems = [{ label: 'Все категории', value: 'all' }, ...getCategories(activeType)];
  return (
    <Flex flexDir="column">
      <Flex gap="4" flexDirection={{ base: 'column', md: 'row' }} mb="5">
        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap="4">
          <TypeTabs activeType={activeType} onSetType={onSetType} />
          <CustomSelect
            items={categoryItems}
            placeholder="Все категории"
            onValueChange={(value) => onSetCategory(toCategory(value))}
            value={activeCategory}
            display={{ base: 'none', md: 'flex' }}
          />
        </Grid>
        <Spacer display={{ base: 'none', md: 'flex' }} />
        <PeriodSelector monthts={months} activePeriod={activePeriod} onSetPeriod={onSetPeriod} />
        <MobileCategorySelector
          items={categoryItems}
          activeCategory={activeCategory}
          onSetCategory={onSetCategory}
        />
      </Flex>

      <TransactionsList transactions={transactions} />
    </Flex>
  );
};
