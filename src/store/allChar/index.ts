/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api';
import type { IChar } from '@/interface/char';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface charState {
  data?: IChar[];
  loading: boolean;
  error: string;
}

export const fetchAllChars = createAsyncThunk('fetchAllChars', async () => {
  const response = await api.get('/chars');
  return response.data;
});

const initialState: charState = {
  data: [] as unknown as charState['data'],
  error: '',
  loading: false,
};

export const allCharSlice = createSlice({
  name: 'allChar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllChars.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllChars.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

const charReducer = allCharSlice.reducer;

export default charReducer;
