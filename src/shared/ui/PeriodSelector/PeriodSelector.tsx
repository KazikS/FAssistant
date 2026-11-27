import { LuCalendar } from 'react-icons/lu';

import { CustomSelect } from '@/shared/ui/CustomSelect';

type PeriodSelectorProps = {
  /** Month keys in YYYY-MM format, newest first. */
  months: string[];
} & (
  | { allowAllTime?: false; value: string; onChange: (month: string) => void }
  | { allowAllTime: true; value: string | null; onChange: (month: string | null) => void }
);

const monthAndYear = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });
const allTime = { label: 'Все время', value: 'all' };

export const PeriodSelector = (props: PeriodSelectorProps) => {
  const months = props.months.map((value) => ({
    value,
    label: monthAndYear.format(new Date(`${value}-01T12:00:00`)),
  }));
  const selected = months.find((month) => month.value === props.value);

  return (
    <CustomSelect
      items={props.allowAllTime ? [allTime, ...months] : months}
      placeholder={props.allowAllTime ? allTime.label : 'Месяц'}
      triggerLabel={selected && `Выбрать месяц, сейчас ${selected.label}`}
      value={props.value ?? allTime.value}
      onValueChange={(value) => {
        if (value && value !== allTime.value) props.onChange(value);
        else if (props.allowAllTime) props.onChange(null);
      }}
      mobileIcon={<LuCalendar />}
    />
  );
};
