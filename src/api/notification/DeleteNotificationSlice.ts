import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type DeleteNotifResponse = {
  status: any;
  message: string;
}


export type DeleteNotifState = {
  NotifDeleteData: DeleteNotifResponse | null;
  loadingDeleteNotif: boolean;
  NotifDeleteError: boolean;
};

const initialState: DeleteNotifState = {
    NotifDeleteData: null,
    loadingDeleteNotif: false,
    NotifDeleteError: false,
};

export const deleteNotif = createAsyncThunk<
  {NotifDeleteData: DeleteNotifResponse | null},
  {requestBody: any}
>('deleteNotif', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.deleteNotif(requestBody);
    
    if (response.kind == 'success') {
      return {
        NotifDeleteData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        NotifDeleteData: initialState.NotifDeleteData,
    };
  }
});

const DeleteNotificationSlice = createSlice({
  name: 'DeleteNotification',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(deleteNotif.pending, state => {
        state.NotifDeleteData = initialState.NotifDeleteData;
        state.loadingDeleteNotif = true;
        state.NotifDeleteError = false;
      })
      .addCase(deleteNotif.fulfilled, (state, action) => {
        state.NotifDeleteData = action.payload.NotifDeleteData;
        state.NotifDeleteError = false;
        state.loadingDeleteNotif = false;
      })
      .addCase(deleteNotif.rejected, state => {
        state.NotifDeleteError = true;
        state.loadingDeleteNotif = false;
        state.NotifDeleteData = initialState.NotifDeleteData;
      });
  },
});

export const {reset} = DeleteNotificationSlice.actions;
export default DeleteNotificationSlice.reducer;
