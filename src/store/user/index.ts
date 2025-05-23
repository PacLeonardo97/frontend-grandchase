/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearAllChar } from '../allChar';
import { clearChar } from '../char';
import api from '@/api';
import type { IUser } from '@/interface/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface userState {
  accessToken: string;
  refreshToken: string;
  data: IUser;
  loading: boolean;
  error: string;
}

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await api.post('/auth/local', {
      identifier: email,
      password,
    });

    return data.data;
  },
);

export const clearAllRedux = createAsyncThunk(
  'auth/logout',
  (_, { dispatch }) => {
    dispatch(clearChar());
    dispatch(clearAllChar());
    dispatch(logout());
  },
);

const initialState: userState = {
  accessToken: '',
  refreshToken: '',
  data: {} as IUser,
  error: '',
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.loading = false;
      state.data = {} as IUser;
      state.accessToken = '';
      state.refreshToken = '';
    },
    userRefreshToken(state, payload) {
      state.accessToken = payload.payload.accessToken;
      state.refreshToken = payload.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

export const { logout, userRefreshToken } = userSlice.actions;

export default userSlice.reducer;
