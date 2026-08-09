import { Flex } from '@chakra-ui/react';

import { CustomSelect } from '@/shared/ui/CustomSelect';
import { useActiveCategory } from '@/widgets/Transactions/hooks/useActiveCategory';

import { CategorySelector } from './CategorySelector';
import { getCategories, CATEGORIES, toCategoryKey } from './CategorySelector/config';

export const Transactions = () => {
  const items = getCategories('other').map((key) => ({
    label: CATEGORIES[key],
    value: key,
  }));
  const { active, select } = useActiveCategory();
  return (
    <Flex gap="4">
      <CategorySelector />
      <CustomSelect
        items={items}
        placeholder="Все категории"
        onValueChange={(value) => select(toCategoryKey(value))}
        value={active}
        variant="outline"
        display={{ base: 'none', md: 'flex' }}
      />
    </Flex>
  );
};
