import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type ChangePasswordResponse = {
  status: any;
  message:   any;
}

export type ChangePasswordState = {
  changePasswordData: ChangePasswordResponse | null;
  loadingChangePassword: boolean;
  changePasswordError: boolean;
};

const initialState: ChangePasswordState = {
    changePasswordData: null,
    loadingChangePassword: false,
    changePasswordError: false,
};

export const changePassword = createAsyncThunk<
  {changePasswordData: ChangePasswordResponse | null},
  {requestBody: any}
>('changePassword', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.changePassword(requestBody);
    
    if (response.kind == 'success') {
      return {
        changePasswordData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        changePasswordData: initialState.changePasswordData,
    };
  }
});

const ChangePasswordSlice = createSlice({
  name: 'ChangePassword',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(changePassword.pending, state => {
        state.changePasswordData = initialState.changePasswordData;
        state.loadingChangePassword = true;
        state.changePasswordError = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordData = action.payload.changePasswordData;
        state.loadingChangePassword = false;
        state.changePasswordError = false;
      })
      .addCase(changePassword.rejected, state => {
        state.changePasswordError = true;
        state.loadingChangePassword = false;
        state.changePasswordData = initialState.changePasswordData;
      });
  },
});

export const {reset} = ChangePasswordSlice.actions;
export default ChangePasswordSlice.reducer;
