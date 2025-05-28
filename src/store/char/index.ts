/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';

import { type RootState } from '../';
import api from '@/api';
import { ETypeEquips } from '@/enum/equips.enum';
import { getMockFromChar } from '@/helper/skill';
import type { IChar } from '@/interface/char';
import { IEquips } from '@/interface/equip';
import { ICharSkills } from '@/interface/skill';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface charState {
  data: IChar;
  loading: boolean;
  error: string;
}

function mergeEquips(localEquips: IEquips[] = [], apiEquips: IEquips[] = []) {
  const merged = apiEquips.map((apiEquip) => {
    const localMatch = localEquips.find(
      (localEquip) => localEquip.type === apiEquip.type,
    );
    return localMatch?.img && localMatch ? localMatch : apiEquip;
  });

  // Depois, adicionamos os equips locais que não existem na API (extras)
  const extraLocalEquips = localEquips.filter((localEquip) => {
    return !apiEquips.some((apiEquip) => apiEquip.type === localEquip.type);
  });

  return [...merged, ...extraLocalEquips];
}

export const fetchChar = createAsyncThunk(
  'fetchChar',
  async (data: IChar, { getState }) => {
    const state = getState() as RootState;
    const localEquips = state.char.data?.equips;
    const localSkills = state.allChar.data?.find(
      (item) => item.name === data.name,
    )?.skills;

    const oldData = {
      equips: localEquips as IEquips[],
      skills: localSkills as ICharSkills,
    };

    if (!state.user.accessToken) return { ...data, ...oldData };

    const req = await api.get<IChar>(`/chars/${data.id}`);
    const localEquipsAllChars = state.allChar.data?.find(
      (item) => item.name === req.data.name,
    )?.equips;
    return {
      ...req.data,
      equips: mergeEquips(
        localEquipsAllChars?.length ? localEquipsAllChars : localEquips,
        req.data.equips ?? [],
      ),
    };
  },
);

interface ICreateChar {
  name?: string;
  level?: number;
  total_atk?: number;
}

export const fetchCreateChar = createAsyncThunk(
  'fetchCreateChar',
  async (data: ICreateChar) => {
    const req = await api.post(`/chars`, { ...data });
    return req.data;
  },
);
const equipDefault = Object.keys(ETypeEquips) as ETypeEquips[];

const initialState: charState = {
  data: {
    equips: [],
  } as unknown as IChar,
  error: '',
  loading: false,
};

export const charSlice = createSlice({
  name: 'char',
  initialState,
  reducers: {
    clearChar(state) {
      state.data = {
        skills: {},
        equips: equipDefault.map((item) => ({
          type: item,
        })),
      } as unknown as IChar;
      state.error = '';
      state.loading = false;
    },
    changeEquip(state, action: PayloadAction<IEquips>) {
      if (!state.data?.equips?.length) {
        state.data!.equips = equipDefault.map((item) => ({
          type: item,
        }));
      }
      const index = state.data?.equips?.findIndex(
        (item) => item.type === action.payload.type,
      );

      if (index !== undefined && index !== -1) {
        state.data!.equips![index] = action.payload;
      }
    },
    updateChar(state, action: PayloadAction<Partial<IChar>>) {
      state.data = _.merge(state.data, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChar.fulfilled, (state, action: PayloadAction<IChar>) => {
        state.loading = false;
        if (!state.data?.equips?.length) {
          state.data!.equips = equipDefault.map((type) => {
            const existingEquip = action?.payload?.equips?.find(
              (e) => e.type === type,
            );
            return existingEquip ?? { type };
          });
        }
        const hasSkillPayload = !!(
          action.payload.skills && Object.keys(action.payload.skills).length
        );
        const hasSkillState = !!Object.keys(state.data.skills).length;

        if (!hasSkillPayload && !hasSkillState) {
          console.log('state.data.name ->');

          state.data.skills = getMockFromChar(
            state.data.name || action.payload.name,
          );
        }

        state.data = _.merge(state.data, action.payload);
        state.error = '';
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
          state.data = action.payload;
          state.error = '';
        },
      )
      .addCase(fetchCreateChar.rejected, (state, action) => {
        state.loading = false;
        const err = action.error as any;
        state.error = err.response?.data.error.message;
      });
  },
});

const charReducer = charSlice.reducer;
export const { clearChar, changeEquip, updateChar } = charSlice.actions;
export default charReducer;
