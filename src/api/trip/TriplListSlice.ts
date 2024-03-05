import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { TripListResponse } from './TripListResponse';

export type TripListState = {
  trip: TripListResponse[];
  loadingTrip: boolean;
  tripError: boolean;
};

const initialState: TripListState = {
  trip: [],
  loadingTrip: false,
  tripError: false,
};

export const fetchTripList = createAsyncThunk<
  {trip: TripListResponse[]},
  {requestBody: any, uri: any}
>('fetchTripList', async ({requestBody, uri}) => {
  const response = await apiInterface.fetchTripList(requestBody, uri);
  

  if (response.kind == 'success') {
    return {
      trip: response.body ?? [],
    };
  } else {
    throw 'Error fetching customers';
  }
});

const TripListSlice = createSlice({
  name: 'TripList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTripList.pending, state => {
        state.loadingTrip = true;
        state.tripError = false;
        state.trip = [];
      })
      .addCase(fetchTripList.fulfilled, (state, action) => {
        state.trip = [];
        state.trip = state.trip.concat(action.payload.trip);
        state.tripError = false;
        state.loadingTrip = false;
      })
      .addCase(fetchTripList.rejected, state => {
        state.tripError = true;
        state.loadingTrip = false;
        state.trip = [];
      });
  },
});

export default TripListSlice.reducer;
