import { useForm } from 'react-hook-form';

import { setCreateDrawerOpen } from '@/entities/transaction';
import { isTransaction } from '@/entities/transaction/model/guards';
import type { Transaction } from '@/entities/transaction/model/types';
import { ls } from '@/shared/lib';
import { useAppDispatch } from '@/store/hooks';

import type { CreateTransactionFormValues } from './types';

const defaultValues: CreateTransactionFormValues = {
  type: 'income',
  amount: '',
  title: '',
  category: null,
};

export const useCreateTransactionForm = () => {
  const form = useForm<CreateTransactionFormValues>({ defaultValues });
  const {
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitted },
  } = form;
  const dispatch = useAppDispatch();

  const addToInput = (value: string) => {
    const amount = getValues('amount');
    if (value === ',' && amount.includes(',')) return;
    setValue('amount', value === ',' && amount === '' ? '0,' : amount + value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: isSubmitted,
    });
  };
  const deleteSymbol = () => {
    setValue('amount', getValues('amount').slice(0, -1), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: isSubmitted,
    });
  };
  const onSubmit = (values: CreateTransactionFormValues) => {
    if (values.category === null) return;
    const currentDate = new Date();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      date: [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, '0'),
        String(currentDate.getDate()).padStart(2, '0'),
      ].join('-'),
      type: values.type,
      category: values.category,
      amount: Number(values.amount.replace(',', '.')),
      title: values.title.trim(),
    };

    clearErrors('root');
    try {
      const saved =
        ls.get<Transaction[]>('transactions', (raw) => {
          if (Array.isArray(raw) && raw.every(isTransaction)) {
            return raw;
          }
          if (isTransaction(raw)) {
            return [raw];
          }
          return null;
        }) ?? [];

      ls.set('transactions', [...saved, transaction]);
    } catch {
      setError('root.save', {
        type: 'storage',
        message: 'Не удалось сохранить операцию. Попробуй ещё раз.',
      });
      return;
    }
    reset();
    dispatch(setCreateDrawerOpen(false));
  };
  return { form, addToInput, deleteSymbol, onSubmit: form.handleSubmit(onSubmit) };
};
