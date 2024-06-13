import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { SupportTripDetailsResponse } from './TripListResponse';

export type SupportTripListState = {
    supportTrip: SupportTripDetailsResponse | null;
  loadingSupportTrip: boolean;
  supportTripError: boolean;
};

const initialState: SupportTripListState = {
    supportTrip: null,
    loadingSupportTrip: false,
    supportTripError: false,
};

export const fetchSupportTripList = createAsyncThunk<
  {supportTrip: SupportTripDetailsResponse | null},
  {requestBody: any, uri: any}
>('fetchSupportTripList', async ({requestBody, uri}) => {
  const response = await apiInterface.fetchSupportTripList(requestBody, uri);
  

  if (response.kind == 'success') {
    return {
        supportTrip: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const SupportTripListSlice = createSlice({
  name: 'SupportTripList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSupportTripList.pending, state => {
        state.loadingSupportTrip = true;
        state.supportTripError = false;
        state.supportTrip = initialState.supportTrip;
      })
      .addCase(fetchSupportTripList.fulfilled, (state, action) => {
        state.supportTrip = initialState.supportTrip;
        state.supportTrip = action.payload.supportTrip;
        state.supportTripError = false;
        state.loadingSupportTrip = false;
      })
      .addCase(fetchSupportTripList.rejected, state => {
        state.supportTripError = true;
        state.loadingSupportTrip = false;
        state.supportTrip = initialState.supportTrip;
      });
  },
});

export default SupportTripListSlice.reducer;
