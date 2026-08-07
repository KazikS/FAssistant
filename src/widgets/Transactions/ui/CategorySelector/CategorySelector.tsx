import { HStack, useBreakpointValue } from '@chakra-ui/react';

import { useActiveCategory } from '@/widgets/Transactions/hooks/useActiveCategory';

import { CategoryVariant } from './CategoryVariant';
import { CATEGORIES, getCategories } from './config';

export const CategorySelector = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const categories = isMobile ? getCategories('all') : getCategories('main');

  const { select, active } = useActiveCategory();

  return (
    <HStack
      bgColor={{ md: 'surface.muted' }}
      maxW="full"
      p="3px"
      rounded="xl"
      gap={{ base: '2', md: '0' }}
      overflowX="scroll"
      scrollbar="hidden"
    >
      {categories.map((category) => (
        <CategoryVariant
          label={CATEGORIES[category]}
          key={category}
          isActive={category === active}
          setActive={() => select(category)}
        />
      ))}
    </HStack>
  );
};
