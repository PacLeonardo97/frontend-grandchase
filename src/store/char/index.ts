/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '../';
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
  async (data: IChar, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.user.accessToken) return data;
    const req = await api.get(`/chars/${data.id}`);
    dispatch(createDefaultEquip());
    return req.data;
  },
);

export const fetchPutChar = createAsyncThunk(
  'fetchPutChar',
  async ({ id, ...data }: ICreateChar & { id?: number }, { getState }) => {
    const state = getState() as RootState;
    if (!state.user.accessToken) return;
    const req = await api.put(`/chars/${id}`, { ...data });
    return req.data;
  },
);

interface ICreateChar {
  name?: string;
  level?: number;
  total_atk?: number;
}

export const fetchCreateChar = createAsyncThunk(
  'fetchCreateChar',
  async (data: ICreateChar, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.user.accessToken) return data;
    const req = await api.post(`/chars`, { ...data });
    dispatch(createDefaultEquip());
    return req.data;
  },
);

const initialState: charState = {
  data: { equips: [] } as unknown as IChar,
  error: '',
  loading: false,
};

const equipDefault = Object.keys(ETypeEquips) as ETypeEquips[];

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
      const index = state.data?.equips?.findIndex(
        (item) => item.type === action.payload.type,
      );

      if (index !== undefined && index !== -1) {
        state.data!.equips![index] = action.payload;
      }
    },
    createDefaultEquip(state) {
      for (const element of equipDefault) {
        state.data?.equips?.push({ type: element });
      }
    },
    updateChar(state, action: PayloadAction<IChar>) {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChar.fulfilled, (state, action: PayloadAction<IChar>) => {
        state.loading = false;
        const equips = equipDefault.map((type) => {
          const existingEquip = action.payload?.equips?.find(
            (e) => e.type === type,
          );
          return existingEquip ?? { type };
        });
        console.log('equips -->', equips);
        state.data = {
          ...action.payload,
          equips,
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
      .addCase(
        fetchCreateChar.fulfilled,
        (state, action: PayloadAction<IChar>) => {
          state.loading = false;
          state.data = {
            ...action.payload,
            equips: equipDefault.map((type) => {
              const existingEquip = action?.payload?.equips?.find(
                (e) => e.type === type,
              );
              return existingEquip ?? { type };
            }),
          };
        },
      )
      .addCase(fetchCreateChar.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });

    //fetchPutChar
    builder
      .addCase(fetchPutChar.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPutChar.fulfilled,
        (state, action: PayloadAction<IChar>) => {
          state.loading = false;
          state.data = {
            ...action.payload,
            equips: equipDefault.map((type) => {
              const existingEquip = action.payload?.equips?.find(
                (e) => e.type === type,
              );
              return existingEquip ?? { type };
            }),
          };
        },
      )
      .addCase(fetchPutChar.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

const charReducer = charSlice.reducer;
export const { clearChar, changeEquip, createDefaultEquip, updateChar } =
  charSlice.actions;
export default charReducer;
