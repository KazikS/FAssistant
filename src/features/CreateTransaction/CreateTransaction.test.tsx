import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { setCreateDrawerOpen, transactionReducer } from '@/entities/transaction';
import { userReducer } from '@/entities/user';
import { ls } from '@/shared/lib';
import { system } from '@/shared/theme/theme';

import { CreateTransaction } from './CreateTransaction';

const renderForm = () => {
  const store = configureStore({
    reducer: { transactions: transactionReducer, user: userReducer },
    preloadedState: {
      transactions: {
        ...transactionReducer(undefined, { type: 'init' }),
        ui: { isCreateDrawerOpen: true },
      },
    },
  });

  render(
    <Provider store={store}>
      <ChakraProvider value={system}>
        <CreateTransaction />
      </ChakraProvider>
    </Provider>
  );

  return { store, user: userEvent.setup() };
};

beforeEach(() => {
  const saved = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => saved.get(key) ?? null,
    setItem: (key: string, value: string) => saved.set(key, value),
    removeItem: (key: string) => saved.delete(key),
  });
  vi.spyOn(ls, 'set');
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('CreateTransaction', () => {
  it('показывает ошибки обязательных полей и не сохраняет пустую форму', async () => {
    const { user, store } = renderForm();

    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(await screen.findByText('Укажи сумму')).toBeInTheDocument();
    expect(screen.getByText('Укажи название')).toBeInTheDocument();
    expect(screen.getByText('Выбери категорию')).toBeInTheDocument();
    expect(ls.set).not.toHaveBeenCalled();
    expect(store.getState().transactions.ui.isCreateDrawerOpen).toBe(true);
  });

  it('обновляет сумму экранными кнопками, пропускает повторную запятую и удаляет символ', async () => {
    const { user } = renderForm();
    const amount = screen.getByRole('textbox', { name: 'Сумма операции' });

    await user.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(await screen.findByText('Укажи сумму')).toBeInTheDocument();

    for (const key of ['1', '2', ',', ',', '5']) {
      await user.click(screen.getByRole('button', { name: key }));
    }
    expect(amount).toHaveValue('12,5');
    expect(screen.queryByText('Укажи сумму')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Удалить последнюю цифру' }));
    expect(amount).toHaveValue('12,');

    await user.clear(amount);
    await user.click(screen.getByRole('button', { name: ',' }));
    expect(amount).toHaveValue('0,');
  });

  it('сохраняет значения RHF, преобразует сумму с точкой и закрывает окно', async () => {
    const { user, store } = renderForm();

    await user.click(screen.getByRole('tab', { name: 'Расход' }));
    await user.type(screen.getByRole('textbox', { name: 'Сумма операции' }), '1240.50');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), '  Обед  ');
    await user.click(screen.getByRole('button', { name: 'Кафе и рестораны' }));
    expect(ls.set).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => {
      expect(ls.set).toHaveBeenCalledWith('transactions', [
        expect.objectContaining({
          id: expect.any(String),
          date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
          type: 'expense',
          category: 'cafe',
          amount: 1240.5,
          title: 'Обед',
        }),
      ]);
    });
    expect(ls.set).toHaveBeenCalledTimes(1);
    expect(store.getState().transactions.ui.isCreateDrawerOpen).toBe(false);

    act(() => store.dispatch(setCreateDrawerOpen(true)));
    expect(await screen.findByRole('textbox', { name: 'Сумма операции' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Название операции' })).toHaveValue('');
    expect(screen.getByRole('tab', { name: 'Доход' })).toHaveAttribute('aria-selected', 'true');
  });

  it('сбрасывает несовместимую категорию при смене типа и требует выбрать новую', async () => {
    const { user } = renderForm();

    await user.click(screen.getByRole('button', { name: 'Зарплата' }));
    expect(screen.getByRole('button', { name: 'Зарплата' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await user.click(screen.getByRole('tab', { name: 'Расход' }));
    expect(screen.queryByRole('button', { name: 'Зарплата' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(await screen.findByText('Выбери категорию')).toBeInTheDocument();
    expect(ls.set).not.toHaveBeenCalled();
  });

  it('не сохраняет нулевую сумму и название из пробелов', async () => {
    const { user } = renderForm();

    await user.type(screen.getByRole('textbox', { name: 'Сумма операции' }), '0');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), '   ');
    await user.click(screen.getByRole('button', { name: 'Зарплата' }));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(await screen.findByText('Сумма должна быть больше нуля')).toBeInTheDocument();
    expect(screen.getByText('Название не должно быть пустым')).toBeInTheDocument();
    expect(ls.set).not.toHaveBeenCalled();
  });

  it('сохраняет черновик и показывает ошибку, если localStorage недоступен', async () => {
    vi.mocked(ls.set).mockImplementationOnce(() => {
      throw new Error('Storage is unavailable');
    });
    const { user, store } = renderForm();

    await user.type(screen.getByRole('textbox', { name: 'Сумма операции' }), '100');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), 'Аванс');
    await user.click(screen.getByRole('button', { name: 'Зарплата' }));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(
      await screen.findByText('Не удалось сохранить операцию. Попробуй ещё раз.')
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Название операции' })).toHaveValue('Аванс');
    expect(screen.getByRole('textbox', { name: 'Сумма операции' })).toHaveValue('100');
    expect(store.getState().transactions.ui.isCreateDrawerOpen).toBe(true);
    expect(ls.set).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['битый JSON', '{broken'],
    ['неверный формат', 'null'],
    [
      'частично повреждённый массив',
      JSON.stringify([
        {
          id: 'existing',
          date: '2026-11-15',
          title: 'Зарплата',
          amount: 100,
          type: 'income',
          category: 'salary',
        },
        { id: 'broken', date: 'invalid' },
      ]),
    ],
  ])('не перезаписывает историю: %s', async (_name, raw) => {
    localStorage.setItem('transactions', raw);
    const { user, store } = renderForm();

    await user.type(screen.getByRole('textbox', { name: 'Сумма операции' }), '100');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), 'Аванс');
    await user.click(screen.getByRole('button', { name: 'Зарплата' }));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(
      await screen.findByText('Не удалось сохранить операцию. Попробуй ещё раз.')
    ).toBeInTheDocument();
    expect(localStorage.getItem('transactions')).toBe(raw);
    expect(ls.set).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: 'Название операции' })).toHaveValue('Аванс');
    expect(store.getState().transactions.ui.isCreateDrawerOpen).toBe(true);
  });

  it('не сохраняет сумму с точностью больше двух знаков после запятой', async () => {
    const { user } = renderForm();

    await user.type(screen.getByRole('textbox', { name: 'Сумма операции' }), '1,234');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), 'Аванс');
    await user.click(screen.getByRole('button', { name: 'Зарплата' }));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(await screen.findByText('Не больше двух знаков после запятой')).toBeInTheDocument();
    expect(ls.set).not.toHaveBeenCalled();
  });
});
