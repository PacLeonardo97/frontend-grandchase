/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from '../';
import api from '@/api';
import { EChar, EClassChar } from '@/enum/char.enum';
import type { IChar } from '@/interface/char';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface charState {
  data?: IChar[];
  loading: boolean;
  error: string;
}

export const fetchAllChars = createAsyncThunk(
  'fetchAllChars',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (!state.user.accessToken) throw Error('No Access Token');
    const response = await api.get('/chars');
    return response.data;
  },
);

const initialState: charState = {
  data: [] as unknown as charState['data'],
  error: '',
  loading: false,
};

export const allCharSlice = createSlice({
  name: 'allChar',
  initialState,
  reducers: {
    clearAllChar(state) {
      state.data = [];
      state.error = '';
      state.loading = false;
    },
    changeDataByCharSelected(state, action: PayloadAction<IChar>) {
      state.data = state.data?.map((item) => {
        return item.name === action.payload.name ? action.payload : item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChars.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllChars.fulfilled,
        (state, action: PayloadAction<IChar[]>) => {
          state.loading = false;
          state.data = Object.keys(EChar).map((name: any) => {
            const charExist = action.payload?.find(
              (payload) => name === payload.name,
            );
            return charExist
              ? charExist
              : { name, class_char: EClassChar.class_1 };
          });

          state.error = '';
        },
      )
      .addCase(fetchAllChars.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

export const { clearAllChar, changeDataByCharSelected } = allCharSlice.actions;

export default allCharSlice.reducer;
