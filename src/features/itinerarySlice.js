import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTrip: null,
  spots: [], // list of activities or places
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    addSpot: (state, action) => {
      // payload expects { id, name, date, type }
      state.spots.push(action.payload);
    },
    removeSpot: (state, action) => {
      // payload expects spot id
      state.spots = state.spots.filter(spot => spot.id !== action.payload);
    },
    setActiveTrip: (state, action) => {
      state.activeTrip = action.payload;
    }
  }
});

export const { addSpot, removeSpot, setActiveTrip } = itinerarySlice.actions;
export default itinerarySlice.reducer;
