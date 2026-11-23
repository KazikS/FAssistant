import type { Transaction } from './types';

export const getTransactionMonths = (transactions: Transaction[], includeMonth?: string) => {
  const months = new Set(transactions.map(({ date }) => date.slice(0, 7)));
  if (includeMonth) months.add(includeMonth);
  return [...months].sort().reverse();
};
