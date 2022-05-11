import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../features/Chart/chartSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});
