import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type ProfileDetails = {
  status:             number;
  user:               User;
  trip_status_counts: any;
}


export type User = {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: string;
  created_at:        string;
  updated_at:        string;
  nick_name:         string;
  phone:             string;
  image:             string;
  type:              string;
  dob:               string;
  gender:            string;
  location:          string;
  emirates:          string;
  nationality:       string;
  occupation:        string;
  interest:          string;
  referred_by:       string;
  user_delete:       number;
  level:             string;
  is_admin:          string;
  fcm_token:         string;
  cars:               Car[];
}

export type Car = {
    id:             number;
    model_name:     string;
    purchased_year: string;
    make:           string;
    trim:           string;
    model_series:   string;
    image:          string;
    user_id:        string;
    deleted_at:     string;
    created_at:     string;
    updated_at:     string;
}

export type ProfileDetailsState = {
    profileDetails: ProfileDetails | null;
  loadingProfileDetails: boolean;
  profileDetailsError: boolean;
};

const initialState: ProfileDetailsState = {
    profileDetails: null,
    loadingProfileDetails: false,
    profileDetailsError: false,
};

export const fetchProfileDetails = createAsyncThunk<
  {profileDetails: ProfileDetails | null},
  {requestBody: any}
>('fetchProfileDetails', async ({requestBody}) => {
  const response = await apiInterface.fetchProfileDetails(requestBody);
  if (response.kind == 'success') {
    return {
        profileDetails: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const ProfileDetailsSlice = createSlice({
  name: 'ProfileDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfileDetails.pending, state => {
        state.loadingProfileDetails = true;
        state.profileDetailsError = false;
        state.profileDetails = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.profileDetails = null;
        state.profileDetails = action.payload.profileDetails;
        state.profileDetailsError = false;
        state.loadingProfileDetails = false;
      })
      .addCase(fetchProfileDetails.rejected, state => {
        state.profileDetailsError = true;
        state.loadingProfileDetails = false;
        state.profileDetails = null;
      });
  },
});

export default ProfileDetailsSlice.reducer;
