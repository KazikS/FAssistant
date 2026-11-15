import {
  Button,
  Drawer,
  Field,
  Grid,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Portal,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { LuDelete, LuX } from 'react-icons/lu';

import {
  CATEGORIES,
  selectCreateDrawerOpen,
  setCreateDrawerOpen,
  type CategoryKey,
} from '@/entities/transaction';
import { isCategoryKey, isTransactionType } from '@/entities/transaction/model/guards';
import type { Transaction, TransactionType } from '@/entities/transaction/model/types';
import { ls } from '@/shared/lib';
import { ChipSelect } from '@/shared/ui/ChipSelect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const controls = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'backspace'];

type FormValues = {
  type: TransactionType;
  amount: string;
  title: string;
  category: CategoryKey | null;
};

const defaultValues: FormValues = {
  type: 'income',
  amount: '',
  title: '',
  category: null,
};

const transactionTabs: { value: TransactionType; label: string; color: string }[] = [
  { value: 'income', label: 'Доход', color: 'fg.success' },
  { value: 'expense', label: 'Расход', color: 'fg.error' },
];

export const CreateTransaction = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormValues>({ defaultValues });

  const activeType = useWatch({ control, name: 'type' });
  const activeCategory = useWatch({ control, name: 'category' });
  const open = useAppSelector(selectCreateDrawerOpen);
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
  const chipItems = Object.keys(CATEGORIES)
    .filter(isCategoryKey)
    .filter((category) => CATEGORIES[category].types.some((type) => type === activeType))
    .map((category) => ({
      value: category,
      label: CATEGORIES[category].label,
      icon: CATEGORIES[category].icon,
    }));

  const onSubmit = (values: FormValues) => {
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
      ls.set('transaction', transaction);
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
  return (
    <Drawer.Root
      open={open}
      onOpenChange={({ open }) => dispatch(setCreateDrawerOpen(open))}
      placement={{ base: 'bottom', md: 'start' }}
      closeOnInteractOutside={true}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner justifyContent="center">
          <Drawer.Content
            maxW="md"
            maxH="100dvh"
            overflow="hidden"
            roundedTop="2xl"
            bg="surface.primary"
          >
            <Drawer.Header minH="12" flexShrink="0" px="4" py="1" pe="16">
              <Drawer.Title fontSize="lg">Новая операция</Drawer.Title>
              <Drawer.CloseTrigger asChild top="0.5" insetEnd="2">
                <IconButton
                  type="button"
                  aria-label="Закрыть форму"
                  variant="ghost"
                  boxSize="11"
                  rounded="xl"
                  color="text.subtle"
                >
                  <Icon as={LuX} boxSize="5" />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body minH="0" px="4" pt="0" pb="2">
              <form
                id="create-transaction-form"
                style={{ width: '100%', minWidth: '0' }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
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
                        if (
                          category !== null &&
                          !CATEGORIES[category].types.some((type) => type === value)
                        ) {
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
                        return (
                          (Number.isFinite(amount) && amount > 0) || 'Сумма должна быть больше нуля'
                        );
                      },
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Field.Root invalid={Boolean(fieldState.error)} gap="0">
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
                          h="44px"
                          py="0"
                          lineHeight="1"
                          fontSize="36px"
                          variant="subtle"
                          borderWidth="0"
                          bg="transparent"
                          focusVisibleRing="none"
                          textAlign="center"
                          color={transactionTabs.find((t) => t.value === activeType)?.color}
                          w="auto"
                          minW="1ch"
                          maxW="full"
                          css={{ fieldSizing: 'content' }}
                        />
                      </InputGroup>
                      <Field.ErrorText role="alert" alignSelf="center" fontSize="xs">
                        {fieldState.error?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  )}
                />
                <Text color="text.subtle" fontSize="xs" textAlign="center">
                  {activeCategory ? CATEGORIES[activeCategory].label : 'Категория'} · сегодня
                </Text>
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
                      validate: (value) =>
                        Boolean(value.trim()) || 'Название не должно быть пустым',
                    })}
                  />
                  <Field.ErrorText role="alert" fontSize="xs">
                    {errors.title?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Controller
                  name="category"
                  control={control}
                  rules={{
                    required: 'Выбери категорию',
                    validate: (value) =>
                      (value !== null &&
                        CATEGORIES[value].types.some((type) => type === getValues('type'))) ||
                      'Категория не подходит для этого типа операции',
                  }}
                  render={({ field, fieldState }) => (
                    <Field.Root mt="1" gap="1" invalid={Boolean(fieldState.error)}>
                      <ChipSelect
                        items={chipItems}
                        activeChip={field.value}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        display="flex"
                        role="group"
                        aria-label="Категория операции"
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
                <Grid
                  aria-label="Ввод суммы"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  gap="2"
                  mt="2"
                >
                  {controls.map((key) => (
                    <Button
                      key={key}
                      type="button"
                      aria-label={key === 'backspace' ? 'Удалить последнюю цифру' : key}
                      onClick={() => (key === 'backspace' ? deleteSymbol() : addToInput(key))}
                      variant="plain"
                      bgColor={
                        key === ',' || key === 'backspace' ? 'transparent' : 'surface.subtle'
                      }
                      color={key === ',' || key === 'backspace' ? 'text.subtle' : 'text.primary'}
                      w="full"
                      minW="0"
                      h="clamp(44px, 6.5dvh, 52px)"
                      rounded="xl"
                      borderWidth="0"
                      p="0"
                      fontSize="22px"
                      fontWeight="600"
                      _hover={{ bg: 'surface.muted' }}
                      _active={{ bg: 'surface.muted', transform: 'scale(0.97)' }}
                    >
                      {key === 'backspace' ? <Icon as={LuDelete} boxSize="5" /> : key}
                    </Button>
                  ))}
                </Grid>
              </form>
            </Drawer.Body>
            <Drawer.Footer
              flexShrink="0"
              flexDirection="column"
              alignItems="stretch"
              px="4"
              pt="2"
              pb="max(12px, env(safe-area-inset-bottom))"
            >
              {errors.root?.save && (
                <Text role="alert" color="fg.error" fontSize="xs">
                  {errors.root.save.message}
                </Text>
              )}
              <Button
                form="create-transaction-form"
                type="submit"
                loading={isSubmitting}
                w="full"
                h="11"
                rounded="xl"
                bgColor="accent.primary"
                color="text.onAccent"
                fontSize="15px"
                fontWeight="600"
              >
                Сохранить
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
