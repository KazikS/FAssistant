import type { RootState } from '@/store';

export const selectUserFull = (state: RootState) => state.user || '';
export const selectUserName = (state: RootState) => state.user.name || '';
export const selectUserEmail = (state: RootState) => state.user.email || '';
