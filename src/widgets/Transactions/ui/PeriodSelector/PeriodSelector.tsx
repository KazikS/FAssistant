import { useState } from 'react';

import { ls } from '@/shared/lib/LocalStorage';
import { CustomSelect, type SelectItemType } from '@/shared/ui/CustomSelect';
import { isPeriod, parseDate } from '@/widgets/Transactions/lib';

const parsePeriod = (raw: unknown): SelectItemType[] | null =>
  Array.isArray(raw) && raw.every(isPeriod) ? raw : null;

export const PeriodSelector = () => {
  const [LSPeriods] = useState(() => ls.get('periods', parsePeriod));

  const currentMonth = parseDate(new Date());
  const selectItems = LSPeriods ?? [currentMonth];

  return (
    <CustomSelect
      items={selectItems}
      onValueChange={() => console.log('change period')}
      placeholder="Все время"
      display={{ base: 'none', md: 'flex' }}
    />
  );
};
