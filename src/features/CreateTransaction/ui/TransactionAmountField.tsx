import { Field, Input, InputGroup } from '@chakra-ui/react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { transactionTabs } from '@/features/CreateTransaction/config';
import type { CreateTransactionFormValues } from '@/features/CreateTransaction/model/types';

export const TransactionAmountField = () => {
  const { control } = useFormContext<CreateTransactionFormValues>();
  const activeType = useWatch({ control, name: 'type' });
  return (
    <Controller
      name="amount"
      control={control}
      rules={{
        required: 'Укажи сумму',
        validate: {
          format: (value) =>
            /^\d+(,\d{0,2})?$/.test(value) || 'Не больше двух знаков после запятой',
          positive: (value) => {
            const amount = Number(value.replace(',', '.'));
            return (Number.isFinite(amount) && amount > 0) || 'Сумма должна быть больше нуля';
          },
        },
      }}
      render={({ field, fieldState }) => (
        <Field.Root invalid={Boolean(fieldState.error)} gap="0">
          <Field.Label
            display={{ base: 'none', md: 'block' }}
            fontSize="14px"
            mt="5"
            fontWeight="bold"
          >
            Сумма
          </Field.Label>
          <InputGroup
            endElement="₽"
            w="fit"
            maxW="full"
            mx="auto"
            display="flex"
            endElementProps={{
              fontSize: '24px',
              color: 'text.subtle',
            }}
            mt="1"
          >
            <Input
              aria-label="Сумма операции"
              {...field}
              onChange={(event) => {
                const value = event.target.value.replaceAll('.', ',');
                if (/^\d*(,\d*)?$/.test(value)) field.onChange(value);
              }}
              inputMode="decimal"
              placeholder="0"
              _placeholder={{ color: 'inherit', opacity: 1 }}
              py="6"
              rounded="xl"
              lineHeight="1"
              fontSize="36px"
              fontWeight={{ md: 'bold' }}
              variant="subtle"
              bg={{ base: 'transparent', md: 'surface.muted' }}
              focusVisibleRing="none"
              textAlign={{ base: 'center', md: 'start' }}
              color={transactionTabs.find((t) => t.value === activeType)?.color}
              w={{ base: 'auto', md: 'full' }}
              maxW="full"
              css={{ base: { fieldSizing: 'content' }, md: { fieldSizing: 'fixed' } }}
            />
          </InputGroup>
          <Field.ErrorText role="alert" alignSelf="center" fontSize="xs">
            {fieldState.error?.message}
          </Field.ErrorText>
        </Field.Root>
      )}
    />
  );
};
