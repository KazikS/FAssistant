import { HStack, useBreakpointValue } from '@chakra-ui/react';

import { selectCategory, setCategory } from '@/entities/transaction';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { CategoryVariant } from './CategoryVariant';
import { CATEGORIES, getCategories } from './config';

export const CategorySelector = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const categories = isMobile ? getCategories('all') : getCategories('main');
  const activeCategory = useAppSelector(selectCategory) ?? 'all';
  const dispatch = useAppDispatch();

  return (
    <HStack
      bgColor={{ md: 'surface.muted' }}
      maxW="full"
      w={{ base: undefined, md: 'fit' }}
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
          isActive={category === activeCategory}
          setActive={() => dispatch(setCategory(category))}
        />
      ))}
    </HStack>
  );
};
