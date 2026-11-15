import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  setCategory,
  setCreateDrawerOpen,
  setPeriod,
  transactionReducer,
} from '@/entities/transaction';
import { userReducer } from '@/entities/user';
import { CreateTransaction } from '@/features/CreateTransaction';
import { system } from '@/shared/theme/theme';

import TransactionsPage from './TransactionsPage';

const renderPage = () => {
  const store = configureStore({
    reducer: { transactions: transactionReducer, user: userReducer },
  });
  const view = render(
    <MemoryRouter initialEntries={['/transactions']}>
      <Provider store={store}>
        <ChakraProvider value={system}>
          <TransactionsPage />
          <CreateTransaction />
        </ChakraProvider>
      </Provider>
    </MemoryRouter>
  );
  return { ...view, store, user: userEvent.setup() };
};

beforeEach(() => {
  const saved = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => saved.get(key) ?? null,
    setItem: (key: string, value: string) => saved.set(key, value),
    removeItem: (key: string) => saved.delete(key),
  });
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

describe('TransactionsPage persistence', () => {
  it('показывает пустой список, если операций ещё нет', () => {
    renderPage();
    expect(screen.getByText('Список операций пуст')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('сохраняет две операции, восстанавливает их после монтирования и фильтрует', async () => {
    const { store, user, unmount } = renderPage();

    act(() => store.dispatch(setCreateDrawerOpen(true)));
    await user.type(await screen.findByRole('textbox', { name: 'Сумма операции' }), '100');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), 'Аванс');
    await user.click(screen.getByRole('button', { name: 'Зарплата' }));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(await screen.findByRole('heading', { name: 'Аванс' })).toBeInTheDocument();

    act(() => store.dispatch(setCreateDrawerOpen(true)));
    await user.click(await screen.findByRole('tab', { name: 'Расход' }));
    await user.type(await screen.findByRole('textbox', { name: 'Сумма операции' }), '50');
    await user.type(screen.getByRole('textbox', { name: 'Название операции' }), 'Обед');
    await user.click(screen.getByRole('button', { name: 'Кафе и рестораны' }));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(await screen.findByRole('heading', { name: 'Обед' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Аванс' })).toBeInTheDocument();

    unmount();
    const restored = renderPage();
    expect(screen.getByRole('heading', { name: 'Аванс' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Обед' })).toBeInTheDocument();

    await restored.user.type(screen.getByPlaceholderText('Поиск по названию'), 'ОБЕД');
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Аванс' })).not.toBeInTheDocument()
    );
    expect(screen.getByRole('heading', { name: 'Обед' })).toBeInTheDocument();
    await restored.user.clear(screen.getByPlaceholderText('Поиск по названию'));
    expect(await screen.findByRole('heading', { name: 'Аванс' })).toBeInTheDocument();

    await restored.user.click(screen.getByRole('button', { name: 'Расход' }));
    expect(screen.queryByRole('heading', { name: 'Аванс' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Обед' })).toBeInTheDocument();
    act(() => restored.store.dispatch(setCategory('groceries')));
    expect(screen.getByText('Список операций пуст')).toBeInTheDocument();
    act(() => {
      restored.store.dispatch(setCategory(null));
      restored.store.dispatch(setPeriod('2000-01'));
    });
    expect(screen.getByText('Список операций пуст')).toBeInTheDocument();
    act(() => restored.store.dispatch(setPeriod(null)));
    expect(screen.getByRole('heading', { name: 'Обед' })).toBeInTheDocument();
  });

  it.each([
    ['битый JSON', '{broken'],
    [
      'неверная дата',
      JSON.stringify([
        {
          id: 'bad',
          date: '2026-02-30',
          title: 'Ошибка',
          amount: 100,
          type: 'income',
          category: 'salary',
        },
      ]),
    ],
  ])('показывает ошибку чтения и сохраняет исходные данные: %s', (_name, raw) => {
    localStorage.setItem('transactions', raw);
    renderPage();
    expect(screen.getByRole('alert')).toHaveTextContent('Не удалось прочитать операции');
    expect(localStorage.getItem('transactions')).toBe(raw);
  });

  it('показывает ошибку при недоступном хранилище', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('Storage is unavailable');
    });
    renderPage();
    expect(screen.getByRole('alert')).toHaveTextContent('Не удалось прочитать операции');
  });
});
