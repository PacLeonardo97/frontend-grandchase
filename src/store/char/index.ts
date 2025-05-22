/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api';
import { ETypeEquips } from '@/enum/equips.enum';
import type { IChar } from '@/interface/char';
import { IEquips } from '@/interface/equip';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface charState {
  data?: IChar;
  loading: boolean;
  error: string;
}

export const fetchChar = createAsyncThunk(
  'fetchChar',
  async (id: number, { dispatch }) => {
    const response = await api.get(`/chars/${id}`);
    dispatch(createDefaultEquip());
    return response.data;
  },
);

interface ICreateChar {
  name: string;
  level?: number;
  total_atk?: number;
}

export const fetchCreateChar = createAsyncThunk(
  'fetchCreateChar',
  async (data: ICreateChar, { dispatch }) => {
    const response = await api.post(`/chars`, { ...data });
    dispatch(createDefaultEquip());
    return response.data;
  },
);

const initialState: charState = {
  data: { equips: [] } as unknown as IChar,
  error: '',
  loading: false,
};

export const charSlice = createSlice({
  name: 'char',
  initialState,
  reducers: {
    clearChar(state) {
      state.data = { equips: [] } as unknown as IChar;
      state.error = '';
      state.loading = false;
    },
    changeEquip(state, action: PayloadAction<IEquips>) {
      const index = state.data?.equips.findIndex(
        (item) => item.type === action.payload.type,
      );

      if (index !== undefined && index !== -1) {
        console.log('foo ->', state.data!.equips[index]);
        state.data!.equips[index] = action.payload;
      }
    },
    createDefaultEquip(state) {
      const equipDefault = Object.keys(ETypeEquips) as ETypeEquips[];
      for (const element of equipDefault) {
        state.data?.equips.push({ type: element });
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
        const equipDefault = Object.keys(ETypeEquips) as ETypeEquips[];

        state.data = {
          ...action.payload,
          equips: equipDefault.map((type) => {
            const existingEquip = action.payload.equips?.find(
              (e) => e.type === type,
            );
            return existingEquip ?? { type };
          }),
        };
      })
      .addCase(fetchChar.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });

    //fetchCreateChar
    builder
      .addCase(fetchCreateChar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateChar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCreateChar.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

const charReducer = charSlice.reducer;
export const { clearChar, changeEquip, createDefaultEquip } = charSlice.actions;
export default charReducer;
