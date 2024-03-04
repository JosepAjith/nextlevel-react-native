import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type EditProfileResponse = {
  status: any;
  message: any;
}

export type EditProfileState = {
  editProfileData: EditProfileResponse | null;
  loadingEditProfile: boolean;
  editProfileError: boolean;
};

const initialState: EditProfileState = {
    editProfileData: null,
    loadingEditProfile: false,
    editProfileError: false,
};

export const editProfile = createAsyncThunk<
  {editProfileData: EditProfileResponse | null},
  {requestBody: any}
>('editProfile', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.editProfile(requestBody);
    
    if (response.kind == 'success') {
      return {
        editProfileData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        editProfileData: initialState.editProfileData,
    };
  }
});

const EditProfileSlice = createSlice({
  name: 'EditProfile',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(editProfile.pending, state => {
        state.editProfileData = initialState.editProfileData;
        state.loadingEditProfile = true;
        state.editProfileError = false;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.editProfileData = action.payload.editProfileData;
        state.loadingEditProfile = false;
        state.editProfileError = false;
      })
      .addCase(editProfile.rejected, state => {
        state.editProfileError = true;
        state.loadingEditProfile = false;
        state.editProfileData = initialState.editProfileData;
      });
  },
});

export const {reset} = EditProfileSlice.actions;
export default EditProfileSlice.reducer;
