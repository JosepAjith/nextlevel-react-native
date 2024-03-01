import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { TripDetailsResponse } from './TripListResponse';

export type TripDetailsState = {
  tripDetails: TripDetailsResponse | null;
  loadingTripDetails: boolean;
  tripDetailsError: boolean;
};

const initialState: TripDetailsState = {
  tripDetails: null,
  loadingTripDetails: false,
  tripDetailsError: false,
};

export const fetchTripDetails = createAsyncThunk<
  {tripDetails: TripDetailsResponse | null},
  {requestBody: any}
>('fetchTripDetails', async ({requestBody}) => {
  const response = await apiInterface.fetchTripDetails(requestBody);
  

  if (response.kind == 'success') {
    return {
      tripDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const TripDetailsSlice = createSlice({
  name: 'TripDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTripDetails.pending, state => {
        state.loadingTripDetails = true;
        state.tripDetailsError = false;
        state.tripDetails = initialState.tripDetails;
      })
      .addCase(fetchTripDetails.fulfilled, (state, action) => {
        state.tripDetails = initialState.tripDetails;
        state.tripDetails = action.payload.tripDetails;
        state.tripDetailsError = false;
        state.loadingTripDetails = false;
      })
      .addCase(fetchTripDetails.rejected, state => {
        state.tripDetailsError = true;
        state.loadingTripDetails = false;
        state.tripDetails = initialState.tripDetails;
      });
  },
});

export default TripDetailsSlice.reducer;
