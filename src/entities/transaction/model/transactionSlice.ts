import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TransactionsSliceState = {
  category: string | null;
};

const initialState: TransactionsSliceState = {
  category: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
  selectors: {
    selectCategory: (state) => state.category,
  },
});

export const { setCategory } = transactionsSlice.actions;
export const { selectCategory } = transactionsSlice.selectors;
export const transactionReducer = transactionsSlice.reducer;
