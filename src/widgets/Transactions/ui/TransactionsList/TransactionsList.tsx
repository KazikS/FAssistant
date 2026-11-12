import { Flex, Text } from '@chakra-ui/react';

import type { Transaction } from '@/entities/transaction/model/types';
import { parseDate } from '@/widgets/Transactions/lib';

import { TransactionItem } from './TransactionItem';

export const TransactionsList = ({ transactions }: { transactions: Transaction[] }) => {
  const groupedByDate = transactions.reduce<Record<string, Transaction[]>>((acc, transaction) => {
    const key = transaction.date;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(transaction);
    return acc;
  }, {});
  return (
    <Flex flexDirection="column" bg="surface.primary" rounded="2xl" px="1" py="2">
      {Object.keys(groupedByDate).map((date) => {
        const currentDate = new Date(date);
        return (
          <Flex flexDirection="column" key={date}>
            <Text ml="2" textStyle="subtle">
              {parseDate(currentDate, true).label}
            </Text>
            {groupedByDate[date].map((transaction) => (
              <TransactionItem
                title={transaction.title}
                category={transaction.category}
                amount={transaction.amount}
                type={transaction.type}
                key={transaction.id}
              />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
};
