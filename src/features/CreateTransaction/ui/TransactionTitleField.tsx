import { Field, Input } from '@chakra-ui/react';
import { useFormContext, useFormState } from 'react-hook-form';

import type { CreateTransactionFormValues } from '@/features/CreateTransaction/model/types';

export const TransactionTitleField = () => {
  const { control, register } = useFormContext<CreateTransactionFormValues>();
  const { errors } = useFormState({ control, name: 'title' });
  return (
    <Field.Root mt="1" gap="1" invalid={Boolean(errors.title)}>
      <Field.Label fontSize="xs" fontWeight="500" color="text.subtle">
        Название операции
      </Field.Label>
      <Input
        placeholder="Например, покупка продуктов"
        variant="subtle"
        h="10"
        px="3"
        rounded="xl"
        bg="surface.subtle"
        color="text.primary"
        fontSize="sm"
        focusRingColor="brand.fg"
        _placeholder={{ color: 'text.subtle' }}
        {...register('title', {
          required: 'Укажи название',
          validate: (value) => Boolean(value.trim()) || 'Название не должно быть пустым',
        })}
      />
      <Field.ErrorText role="alert" fontSize="xs">
        {errors.title?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};
