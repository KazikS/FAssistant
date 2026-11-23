import { Text } from '@chakra-ui/react';
import { useState } from 'react';

import { getTransactionMonths, loadTransactions } from '@/entities/transaction';
import { usePageTitle } from '@/shared/hooks';
import { PageHeader } from '@/shared/ui/PageHeader';
import { PeriodSelector } from '@/shared/ui/PeriodSelector';

export default function DashboardPage() {
  const title = usePageTitle();

  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  let months: string[];
  try {
    months = getTransactionMonths(loadTransactions(), currentMonth);
  } catch {
    return (
      <>
        <PageHeader title={title} />
        <Text role="alert" color="fg.error">
          Не удалось прочитать операции. Сохранённые данные не изменены.
        </Text>
      </>
    );
  }

  return (
    <PageHeader
      title={title}
      endContent={
        <PeriodSelector
          variant="stepper"
          months={months}
          value={months.includes(selectedMonth) ? selectedMonth : currentMonth}
          onChange={setSelectedMonth}
        />
      }
    />
  );
}
