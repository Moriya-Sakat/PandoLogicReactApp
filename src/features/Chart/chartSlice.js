import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './chartAPI';

const initialState = {
  value: [],
  status: 'idle',
};

export const fetchDataAsync = createAsyncThunk(
  'chart/fetchData',
  async () => {
    const response = await fetchData();
    return response;
  }
);

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setData: (state, action) => [...state, action.payload],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { setData } = chartSlice.actions;

export const selectData = (state) => state.chart.value;

export default chartSlice.reducer;
