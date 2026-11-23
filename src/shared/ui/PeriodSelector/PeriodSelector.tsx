import { Flex, IconButton, Text } from '@chakra-ui/react';
import { LuCalendar, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import { CustomSelect } from '@/shared/ui/CustomSelect';

type PeriodSelectorProps = {
  /** Month keys in YYYY-MM format, newest first. */
  months: string[];
} & (
  | { variant: 'stepper'; value: string; onChange: (month: string) => void }
  | { variant: 'select'; value: string | null; onChange: (month: string | null) => void }
);

const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
const monthAndYear = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });
const allTime = { label: 'Все время', value: 'all' };

export const PeriodSelector = (props: PeriodSelectorProps) => {
  const stepper = props.variant === 'stepper';
  const items = props.months.map((value) => {
    const date = new Date(`${value}-01T12:00:00`);
    if (!stepper) return { value, label: monthAndYear.format(date) };
    const month = monthName.format(date);
    return { value, label: `${month[0].toUpperCase()}${month.slice(1)} ${value.slice(0, 4)}` };
  });
  const index = props.months.indexOf(props.value ?? '');
  const selected = items[index];
  const previous = items[index + 1];
  const next = items[index - 1];

  return (
    <>
      <CustomSelect
        items={stepper ? items : [allTime, ...items]}
        placeholder={stepper ? 'Месяц' : allTime.label}
        triggerLabel={
          stepper ? `Выбрать месяц, сейчас ${selected?.label ?? props.value}` : undefined
        }
        value={props.value ?? allTime.value}
        onValueChange={(value) => {
          if (value && value !== allTime.value) props.onChange(value);
          else if (props.variant === 'select') props.onChange(null);
        }}
        mobileIcon={<LuCalendar />}
        display={stepper ? { base: 'flex', md: 'none' } : 'flex'}
      />
      {stepper && (
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          bg="surface.primary"
          color="text.primary"
          borderWidth="1px"
          borderColor="border.primary"
          rounded="xl"
          p="1"
          shadow="xs"
        >
          <IconButton
            aria-label="Предыдущий месяц"
            variant="ghost"
            size="xs"
            rounded="xl"
            disabled={!previous}
            onClick={() => props.onChange(previous.value)}
          >
            <LuChevronLeft />
          </IconButton>
          <Text aria-live="polite" textStyle="control" whiteSpace="nowrap" px="1">
            {selected?.label}
          </Text>
          <IconButton
            aria-label="Следующий месяц"
            variant="ghost"
            size="xs"
            rounded="xl"
            disabled={!next}
            onClick={() => props.onChange(next.value)}
          >
            <LuChevronRight />
          </IconButton>
        </Flex>
      )}
    </>
  );
};
