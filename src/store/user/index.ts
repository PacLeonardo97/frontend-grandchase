/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api';
import type { IUser } from '@/interface/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface userState {
  accessToken: string;
  refreshToken: string;
  user: IUser;
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
    localStorage.setItem('@GC/access_token', data.data.accessToken);
    localStorage.setItem('@GC/refresh_token', data.data.refreshToken);
    return data.data;
  },
);

const initialState: userState = {
  accessToken: '',
  refreshToken: '',
  user: {} as IUser,
  error: '',
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        // state.user = {} as IUser;
        // state.accessToken = '';
        // state.refreshToken = '';
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

export default userSlice.reducer;
