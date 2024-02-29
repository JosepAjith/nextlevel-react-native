import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type TravelDetails = {
    status: number;
    data:   TravelDetailsData;
}

export type TravelDetailsData = {
  id:           number;
    user_id:      number;
    city_id_from: number;
    city_id_to:   number;
    date:         Date;
    time:         string;
    allow_weight: number;
    note:         string;
    note_arabic: string;
    created_at:   Date;
    updated_at:   Date;
    user:         User;
}

export type User = {
  id:                number;
  name:              string;
  email:             string;
  phone:             any;
  email_verified_at: null;
  type:              string;
  image:             string;
  created_at:        Date;
  updated_at:        Date;
  rating:            Rating;
}

export type Rating = {
  user_id:     number;
  avg_ratting: number;
}

export type TravelDetailsState = {
  travelDetails: TravelDetails | null;
  loadingTravelDetails: boolean;
  travelDetailsError: boolean;
};

const initialState: TravelDetailsState = {
    travelDetails: null,
    loadingTravelDetails: false,
    travelDetailsError: false,
};

export const fetchTravelDetails = createAsyncThunk<
  {travelDetails: TravelDetails | null},
  {requestBody: any}
>('fetchTravelDetails', async ({requestBody}) => {
  const response = await apiInterface.fetchTravelDetails(requestBody);
  

  if (response.kind == 'success') {
    return {
        travelDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const TravelDetailsSlice = createSlice({
  name: 'TravelDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTravelDetails.pending, state => {
        state.loadingTravelDetails = true;
        state.travelDetailsError = false;
        state.travelDetails = initialState.travelDetails;
      })
      .addCase(fetchTravelDetails.fulfilled, (state, action) => {
        state.travelDetails = initialState.travelDetails;
        state.travelDetails = action.payload.travelDetails;
        state.travelDetailsError = false;
        state.loadingTravelDetails = false;
      })
      .addCase(fetchTravelDetails.rejected, state => {
        state.travelDetailsError = true;
        state.loadingTravelDetails = false;
        state.travelDetails = initialState.travelDetails;
      });
  },
});

export default TravelDetailsSlice.reducer;
