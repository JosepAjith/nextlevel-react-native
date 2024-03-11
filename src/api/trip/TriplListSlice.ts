import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { TripDetailsResponse, TripListResponse } from './TripListResponse';

export type TripListState = {
  trip: TripDetailsResponse | null;
  loadingTrip: boolean;
  tripError: boolean;
};

const initialState: TripListState = {
  trip: null,
  loadingTrip: false,
  tripError: false,
};

export const fetchTripList = createAsyncThunk<
  {trip: TripDetailsResponse | null},
  {requestBody: any, uri: any}
>('fetchTripList', async ({requestBody, uri}) => {
  const response = await apiInterface.fetchTripList(requestBody, uri);
  

  if (response.kind == 'success') {
    return {
      trip: response.body ?? null,
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
        state.trip = initialState.trip;
      })
      .addCase(fetchTripList.fulfilled, (state, action) => {
        state.trip = initialState.trip;
        state.trip = action.payload.trip;
        state.tripError = false;
        state.loadingTrip = false;
      })
      .addCase(fetchTripList.rejected, state => {
        state.tripError = true;
        state.loadingTrip = false;
        state.trip = initialState.trip;
      });
  },
});

export default TripListSlice.reducer;
