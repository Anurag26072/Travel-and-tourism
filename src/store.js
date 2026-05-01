import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from './features/itinerarySlice';

export const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
  },
});
