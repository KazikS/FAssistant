import { Flex, Spacer } from '@chakra-ui/react';

import { selectCategory, setCategory } from '@/entities/transaction';
import { CustomSelect } from '@/shared/ui/CustomSelect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { CategorySelector } from './CategorySelector';
import { getCategories, CATEGORIES, toCategoryKey } from './CategorySelector/config';
import { PeriodSelector } from './PeriodSelector';

export const Transactions = () => {
  const categoryItems = getCategories('other').map((key) => ({
    label: CATEGORIES[key],
    value: key,
  }));
  const activeCategory = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();

  return (
    <Flex gap="4">
      <CategorySelector />
      <CustomSelect
        items={categoryItems}
        placeholder="Все категории"
        onValueChange={(value) => dispatch(setCategory(toCategoryKey(value)))}
        value={activeCategory ?? 'all'}
        display={{ base: 'none', md: 'flex' }}
      />
      <Spacer />
      <PeriodSelector />
    </Flex>
  );
};
