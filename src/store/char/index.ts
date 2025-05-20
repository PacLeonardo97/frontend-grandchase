import api from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface charState {
  data?: {
    id: number;
    documentId: string;
    name: string;
    level: number;
    total_atk: number;
    total_points: number;
  };
  loading: boolean;
  error: string;
}

export const fetchAllChars = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await api.get('/chars');
    return response.data;
  },
);

const initialState: charState = {
  data: [] as unknown as charState['data'],
  error: '',
  loading: false,
};

export const charSlice = createSlice({
  name: 'char',
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

        state.error = action.error.response?.data.error.message;
      });
  },
});

const charReducer = charSlice.reducer;

export default charReducer;
