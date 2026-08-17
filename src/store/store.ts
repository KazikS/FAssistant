import { configureStore } from '@reduxjs/toolkit';

import { transactionReducer } from '@/entities/transaction';
import { userReducer } from '@/entities/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
