import type { PeriodKey } from '@/entities/transaction/model/types';
import { CustomSelect, type SelectItemType } from '@/shared/ui/CustomSelect';
import { toPeriod } from '@/widgets/Transactions/lib';

type PeriodSelectorProps = {
  monthts: SelectItemType[];
  activePeriod: PeriodKey | null;
  onSetPeriod: (value: PeriodKey | null) => void;
};

export const PeriodSelector = ({ monthts, activePeriod, onSetPeriod }: PeriodSelectorProps) => {
  const items: SelectItemType[] = [{ label: 'Все время', value: 'all' }, ...monthts];
  return (
    <CustomSelect
      items={items}
      onValueChange={(value) => onSetPeriod(toPeriod(value))}
      placeholder="Все время"
      value={activePeriod}
      display={{ base: 'none', md: 'flex' }}
    />
  );
};
