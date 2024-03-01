import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type SendOtpResponse = {
  status: any;
  message:   any;
}

export type SendOtpState = {
  sendOtpData: SendOtpResponse | null;
  loadingSendOtp: boolean;
  sendOtpError: boolean;
};

const initialState: SendOtpState = {
    sendOtpData: null,
    loadingSendOtp: false,
    sendOtpError: false,
};

export const sendOtp = createAsyncThunk<
  {sendOtpData: SendOtpResponse | null},
  {requestBody: any, url: any}
>('sendOtp', async ({requestBody, url}) => {
  if (requestBody != null) {
    const response = await apiInterface.sendOtp(requestBody, url);
    
    if (response.kind == 'success') {
      return {
        sendOtpData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        sendOtpData: initialState.sendOtpData,
    };
  }
});

const SendOtpSlice = createSlice({
  name: 'SendOtp',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(sendOtp.pending, state => {
        state.sendOtpData = initialState.sendOtpData;
        state.loadingSendOtp = true;
        state.sendOtpError = false;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.sendOtpData = action.payload.sendOtpData;
        state.loadingSendOtp = false;
        state.sendOtpError = false;
      })
      .addCase(sendOtp.rejected, state => {
        state.sendOtpError = true;
        state.loadingSendOtp = false;
        state.sendOtpData = initialState.sendOtpData;
      });
  },
});

export const {reset} = SendOtpSlice.actions;
export default SendOtpSlice.reducer;
