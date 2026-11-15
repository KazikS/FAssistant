import { Field } from '@chakra-ui/react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { CATEGORIES } from '@/entities/transaction';
import { isCategoryKey } from '@/entities/transaction/model/guards';
import type { CreateTransactionFormValues } from '@/features/CreateTransaction/model/types';
import { ChipSelect, GridSelect } from '@/shared/ui/CustomSelect';

export const TransactionCategoryField = () => {
  const { control, getValues } = useFormContext<CreateTransactionFormValues>();
  const activeType = useWatch({ control, name: 'type' });
  const chipItems = Object.keys(CATEGORIES)
    .filter(isCategoryKey)
    .filter((category) => CATEGORIES[category].types.some((type) => type === activeType))
    .map((category) => ({
      value: category,
      label: CATEGORIES[category].label,
      icon: CATEGORIES[category].icon,
    }));
  return (
    <Controller
      name="category"
      control={control}
      rules={{
        required: 'Выбери категорию',
        validate: (value) =>
          (value !== null && CATEGORIES[value].types.some((type) => type === getValues('type'))) ||
          'Категория не подходит для этого типа операции',
      }}
      render={({ field, fieldState }) => (
        <Field.Root mt="5" gap="1" invalid={Boolean(fieldState.error)}>
          <ChipSelect
            items={chipItems}
            activeChip={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            display={{ base: 'flex', md: 'none' }}
            role="group"
            aria-label="Категория операции"
            variant="icon"
            checkedBg={field.value ? `category.${field.value}.surface` : undefined}
            checkedTextColor={field.value ? `category.${field.value}.solid` : undefined}
          />
          <GridSelect
            items={chipItems}
            activeCell={field.value}
            onValueChange={field.onChange}
            display={{ base: 'none', md: 'grid' }}
            role="group"
            aria-label="Категория опреции"
            variant="icon"
            checkedBg={field.value ? `category.${field.value}.surface` : undefined}
            checkedTextColor={field.value ? `category.${field.value}.solid` : undefined}
          />
          <Field.ErrorText role="alert" fontSize="xs">
            {fieldState.error?.message}
          </Field.ErrorText>
        </Field.Root>
      )}
    />
  );
};
