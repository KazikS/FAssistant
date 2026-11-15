import { Tabs } from '@chakra-ui/react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';

import { CATEGORIES } from '@/entities/transaction';
import { isTransactionType } from '@/entities/transaction/model/guards';
import { transactionTabs } from '@/features/CreateTransaction/config';
import type { CreateTransactionFormValues } from '@/features/CreateTransaction/model/types';

export const TransactionTypeTabs = () => {
  const { control, getValues, setValue } = useFormContext<CreateTransactionFormValues>();
  const { isSubmitted } = useFormState({ control });
  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <Tabs.Root
          variant="plain"
          size="sm"
          w="full"
          value={field.value}
          onBlur={field.onBlur}
          onValueChange={({ value }) => {
            if (!isTransactionType(value)) return;
            field.onChange(value);
            const category = getValues('category');
            if (category !== null && !CATEGORIES[category].types.some((type) => type === value)) {
              setValue('category', null, {
                shouldDirty: true,
                shouldValidate: isSubmitted,
              });
            }
          }}
        >
          <Tabs.List bg="surface.muted" rounded="xl" p="1" w="full">
            {transactionTabs.map(({ value, label, color }) => (
              <Tabs.Trigger
                key={value}
                type="button"
                value={value}
                _selected={{ color }}
                textStyle="control"
                w="full"
                justifyContent="center"
              >
                {label}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator rounded="xl" bgColor="surface.primary" />
          </Tabs.List>
        </Tabs.Root>
      )}
    />
  );
};
