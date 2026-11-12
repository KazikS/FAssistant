import { Box, HStack } from '@chakra-ui/react';

import { type CategoryKey } from '@/entities/transaction';
import { toCategory } from '@/widgets/Transactions/lib';

type ItemProps = {
  label: string;
  value: string;
};

type Props = {
  items: ItemProps[];
  activeCategory: CategoryKey | null;
  onSetCategory: (value: CategoryKey | null) => void;
};

export const MobileCategorySelector = ({ items, activeCategory, onSetCategory }: Props) => {
  return (
    <HStack w="full" overflowX="auto" scrollbar="hidden" display={{ base: 'flex', md: 'none' }}>
      {items.map((item) => {
        const category = toCategory(item.value);
        const isActive = category === activeCategory;

        return (
          <Box
            key={item.value}
            px="3"
            py="2"
            rounded="3xl"
            bgColor={isActive ? 'brand.solid' : 'transparent'}
            onClick={() => onSetCategory(category)}
            as="button"
            textWrap="nowrap"
            cursor="pointer"
            textStyle="control"
            color={isActive ? 'text.onBrand' : 'text.subtle'}
          >
            {item.label}
          </Box>
        );
      })}
    </HStack>
  );
};
