import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserSliceState = {
  name: string | null;
  email: string | null;
};

const initialState: UserSliceState = {
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUser: (state, action: PayloadAction<UserSliceState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const { setName, setEmail, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
