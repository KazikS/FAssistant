import { Box, HStack } from '@chakra-ui/react';

import { selectCategory, setCategory } from '@/entities/transaction';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toCategory } from '@/widgets/Transactions/lib';

type ItemProps = {
  label: string;
  value: string;
};

type Props = {
  items: ItemProps[];
};

export const MobileCategorySelector = ({ items }: Props) => {
  const activeCategory = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();
  return (
    <HStack w="full" overflowX="auto" scrollbar="hidden" display={{ base: 'flex', md: 'none' }}>
      {items.map((item) => {
        const category = toCategory(item.value);
        const isActive = category === activeCategory;

        return (
          <Box
            key={item.value}
            px="4"
            py="2"
            rounded="3xl"
            bgColor={isActive ? 'brand.solid' : 'transparent'}
            onClick={() => dispatch(setCategory(category))}
            as="button"
            textWrap="nowrap"
            cursor="pointer"
            color={isActive ? 'text.onBrand' : 'text.subtle'}
          >
            {item.label}
          </Box>
        );
      })}
    </HStack>
  );
};
