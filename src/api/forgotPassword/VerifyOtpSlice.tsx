import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type VerifyOtpResponse = {
  status: any;
  message:   any;
  token: string;
}

export type VerifyOtpState = {
  verifyOtpData: VerifyOtpResponse | null;
  loadingVerifyOtp: boolean;
  verifyOtpError: boolean;
};

const initialState: VerifyOtpState = {
    verifyOtpData: null,
    loadingVerifyOtp: false,
    verifyOtpError: false,
};

export const otpVerify = createAsyncThunk<
  {verifyOtpData: VerifyOtpResponse | null},
  {requestBody: any}
>('otpVerify', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.otpVerify(requestBody);
    
    if (response.kind == 'success') {
      return {
        verifyOtpData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        verifyOtpData: initialState.verifyOtpData,
    };
  }
});

const VerifyOtpSlice = createSlice({
  name: 'VerifyOtp',
  initialState: initialState,
  reducers: {
    verifyReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(otpVerify.pending, state => {
        state.verifyOtpData = initialState.verifyOtpData;
        state.loadingVerifyOtp = true;
        state.verifyOtpError = false;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.verifyOtpData = action.payload.verifyOtpData;
        state.loadingVerifyOtp = false;
        state.verifyOtpError = false;
      })
      .addCase(otpVerify.rejected, state => {
        state.verifyOtpError = true;
        state.loadingVerifyOtp = false;
        state.verifyOtpData = initialState.verifyOtpData;
      });
  },
});

export const {verifyReset} = VerifyOtpSlice.actions;
export default VerifyOtpSlice.reducer;
