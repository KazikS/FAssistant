import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { CATEGORIES, type CategoryKey } from './categories';
import type { PeriodKey, Transaction, TransactionFilters, TransactionType } from './types';

export type TransactionSliceState = {
  filters: TransactionFilters;
  items: Transaction[] | null;
};

const initialState: TransactionSliceState = {
  filters: {
    type: null,
    category: null,
    period: null,
  },
  items: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryKey | null>) => {
      state.filters.category = action.payload;
    },
    setType: (state, action: PayloadAction<TransactionType | null>) => {
      const type = action.payload;
      state.filters.type = type;
      const category = state.filters.category;
      if (type === null) {
        state.filters.category = null;
        return;
      }
      if (category === null) {
        return;
      }
      const allowed: TransactionType[] = CATEGORIES[category].types;
      if (!allowed.includes(type)) state.filters.category = null;
    },
    setPeriod: (state, action: PayloadAction<PeriodKey | null>) => {
      state.filters.period = action.payload;
    },
  },
  selectors: {
    selectCategory: (state) => state.filters.category,
    selectType: (state) => state.filters.type,
    selectPeriod: (state) => state.filters.period,
  },
});

export const { setCategory, setPeriod, setType } = transactionsSlice.actions;
export const { selectCategory, selectPeriod, selectType } = transactionsSlice.selectors;
export const transactionReducer = transactionsSlice.reducer;
