import { Button, Drawer, Flex, Icon, IconButton, Portal, Text } from '@chakra-ui/react';
import { FormProvider, useWatch } from 'react-hook-form';
import { LuX } from 'react-icons/lu';

import { CATEGORIES, selectCreateDrawerOpen, setCreateDrawerOpen } from '@/entities/transaction';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useCreateTransactionForm } from './model/useCreateTransactionForm';
import { TransactionAmountField } from './ui/TransactionAmountField';
import { TransactionCategoryField } from './ui/TransactionCategoryField';
import { TransactionKeypad } from './ui/TransactionKeypad';
import { TransactionTitleField } from './ui/TransactionTitleField';
import { TransactionTypeTabs } from './ui/TransactionTypeTabs';

export const CreateTransaction = () => {
  const { form, addToInput, deleteSymbol, onSubmit } = useCreateTransactionForm();
  const { errors, isSubmitting } = form.formState;
  const activeCategory = useWatch({ control: form.control, name: 'category' });
  const open = useAppSelector(selectCreateDrawerOpen);
  const dispatch = useAppDispatch();

  return (
    <FormProvider {...form}>
      <Drawer.Root
        open={open}
        onOpenChange={({ open }) => dispatch(setCreateDrawerOpen(open))}
        placement={{ base: 'bottom', md: 'end' }}
        closeOnInteractOutside={true}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner justifyContent={{ base: 'center', md: 'end' }}>
            <Drawer.Content
              maxW="md"
              maxH="100dvh"
              overflow="hidden"
              roundedTop="2xl"
              bg="surface.primary"
            >
              <Drawer.Header minH={{ base: '12', md: '16' }} px="4" py="1">
                <Flex flexDirection="column">
                  <Drawer.Title fontSize="lg">Новая операция</Drawer.Title>
                  <Text textStyle="subtle">{new Date().toLocaleDateString('ru')}</Text>
                </Flex>
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
                  onSubmit={onSubmit}
                  noValidate
                >
                  <TransactionTypeTabs />
                  <TransactionAmountField />
                  <Text
                    color="text.subtle"
                    fontSize="xs"
                    textAlign="center"
                    display={{ md: 'none' }}
                  >
                    {activeCategory ? CATEGORIES[activeCategory].label : 'Категория'} ·{' '}
                    {new Date().toLocaleDateString('ru')}
                  </Text>
                  <TransactionTitleField />
                  <TransactionCategoryField />
                  <TransactionKeypad addToInput={addToInput} deleteSymbol={deleteSymbol} />
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
    </FormProvider>
  );
};
