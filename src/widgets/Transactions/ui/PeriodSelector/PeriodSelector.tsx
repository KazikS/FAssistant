import { useMemo } from 'react';

import { ls } from '@/shared/lib/LocalStorage';
import { CustomSelect, type SelectItemType } from '@/shared/ui/CustomSelect';
import { isPeriod, parseDate } from '@/widgets/Transactions/lib';

export const PeriodSelector = () => {
  const parsePeriod = (raw: unknown): SelectItemType[] | null =>
    Array.isArray(raw) && isPeriod(raw) ? raw : null;
  const LSPeriods = useMemo(() => ls.get('periods', parsePeriod), []);

  const currentMonth = parseDate(new Date());
  const selectItems = LSPeriods ? LSPeriods : [currentMonth];

  return (
    <CustomSelect
      items={selectItems}
      onValueChange={() => console.log('change period')}
      placeholder="Все время"
      display={{ base: 'none', md: 'flex' }}
    />
  );
};
