import { Heading, HStack, Text, Flex, Spacer } from '@chakra-ui/react';

import { CATEGORIES, type CategoryKey } from '@/entities/transaction';
import type { TransactionType } from '@/entities/transaction/model/types';

type TransactionProps = {
  title: string;
  category: CategoryKey;
  amount: number;
  type: TransactionType;
};

export const TransactionItem = ({ title, category, amount, type }: TransactionProps) => {
  const { label, icon } = CATEGORIES[category];
  const CurrentIcon = icon;
  const currentAmount = type === 'income' ? amount : amount * -1;
  return (
    <HStack w="full" px="4" py="1">
      <Flex
        w="8"
        h="8"
        justifyContent="center"
        alignItems="center"
        rounded="xl"
        bgColor={`category.${category}.surface`}
      >
        <CurrentIcon />
      </Flex>
      <Flex flexDirection="column">
        <Heading textStyle="control" textWrap="wrap">
          {title}
        </Heading>
        <Text textStyle="subtle">{label}</Text>
      </Flex>
      <Spacer />
      <Text
        color={type === 'income' ? 'income.solid' : 'expense.solid'}
        textStyle="numbers"
        textWrap="nowrap"
      >
        {currentAmount} ₽
      </Text>
    </HStack>
  );
};
