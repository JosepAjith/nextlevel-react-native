import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type SendNotifResponse = {
  status: any;
  message: string;
}


export type SendNotifState = {
  NotifSendData: SendNotifResponse | null;
  loadingSendNotif: boolean;
  NotifSendError: boolean;
};

const initialState: SendNotifState = {
    NotifSendData: null,
    loadingSendNotif: false,
    NotifSendError: false,
};

export const sendNotif = createAsyncThunk<
  {NotifSendData: SendNotifResponse | null},
  {requestBody: any}
>('sendNotif', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.sendNotif(requestBody);
    
    if (response.kind == 'success') {
      return {
        NotifSendData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        NotifSendData: initialState.NotifSendData,
    };
  }
});

const SendNotificationSlice = createSlice({
  name: 'SendNotification',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(sendNotif.pending, state => {
        state.NotifSendData = initialState.NotifSendData;
        state.loadingSendNotif = true;
        state.NotifSendError = false;
      })
      .addCase(sendNotif.fulfilled, (state, action) => {
        state.NotifSendData = action.payload.NotifSendData;
        state.NotifSendError = false;
        state.loadingSendNotif = false;
      })
      .addCase(sendNotif.rejected, state => {
        state.NotifSendError = true;
        state.loadingSendNotif = false;
        state.NotifSendData = initialState.NotifSendData;
      });
  },
});

export const {reset} = SendNotificationSlice.actions;
export default SendNotificationSlice.reducer;
