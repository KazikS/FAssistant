import { describe, it, expect } from 'vitest';

import {
  setCategory,
  setPeriod,
  setType,
  transactionReducer,
  type TransactionSliceState,
} from '..';

describe('transactions reducers', () => {
  const testState: TransactionSliceState = {
    filters: {
      type: null,
      category: 'beauty',
      period: null,
    },
    items: null,
  };
  it('установка категории', () => {
    const store = transactionReducer(testState, setCategory('beauty'));
    expect(store.filters.category).toBe('beauty');
  });

  it('установка типа транзакци, сброс противоречащей категории', () => {
    const store = transactionReducer(testState, setType('income'));
    expect(store.filters.category).toBe(null);
    expect(store.filters.type).toBe('income');
  });

  it('сохраняет совместимую категорию при смене типа', () => {
    const state: TransactionSliceState = {
      ...testState,
      filters: { ...testState.filters, type: 'income', category: 'savings' },
    };
    const store = transactionReducer(state, setType('expense'));
    expect(store.filters.type).toBe('expense');
    expect(store.filters.category).toBe('savings');
  });

  it('сбрасывает категорию отдельно от типа', () => {
    const state: TransactionSliceState = {
      ...testState,
      filters: { ...testState.filters, type: 'expense' },
    };
    const store = transactionReducer(state, setCategory(null));
    expect(store.filters.category).toBe(null);
    expect(store.filters.type).toBe('expense');
  });

  it('установка периода', () => {
    const state: TransactionSliceState = {
      ...testState,
      filters: { ...testState.filters, type: 'income', category: null },
    };
    const store = transactionReducer(state, setPeriod('2026-09'));
    expect(store.filters.period).toBe('2026-09');
    expect(store.filters.type).toBe('income');
  });
});
