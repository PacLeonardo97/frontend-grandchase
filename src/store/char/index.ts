import api from '@/api';
import type { IChar } from '@/interface/char';
import { IEquips } from '@/interface/equip';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface charState {
  data?: IChar;
  loading: boolean;
  error: string;
}

export const fetchChar = createAsyncThunk('fetchChar', async (id: number) => {
  const response = await api.get(`/chars/${id}`);
  return response.data;
});

const initialState: charState = {
  data: {} as IChar,
  error: '',
  loading: false,
};

export const charSlice = createSlice({
  name: 'char',
  initialState,
  reducers: {
    clearEquip(state) {
      state.data = {} as IChar;
      state.error = '';
      state.loading = false;
    },
    changeEquip(state, action: PayloadAction<IEquips>) {
      const index = state.data?.equips.findIndex(
        (item) => item.type === action.payload.type,
      );
      if (index !== undefined && index !== -1) {
        state.data!.equips[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.response?.data.error.message;
      });
  },
});

const charReducer = charSlice.reducer;
export const { clearEquip, changeEquip } = charSlice.actions;
export default charReducer;
