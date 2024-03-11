import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { NotificationData, NotificationResponse } from './NotificationResponse';

export type NotifListState = {
  notification: NotificationResponse | null;
  loadingNotifications: boolean;
  notificationError: boolean;
};

const initialState: NotifListState = {
    notification: null,
    loadingNotifications: false,
    notificationError: false,
};

export const fetchNotifications = createAsyncThunk<
  {notification: NotificationResponse | null},
  {requestBody: any, uri: any}
>('fetchNotifications', async ({requestBody, uri}) => {
  const response = await apiInterface.fetchNotifications(requestBody, uri);
  

  if (response.kind == 'success') {
    return {
        notification: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const GetNotificationSlice = createSlice({
  name: 'GetNotification',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loadingNotifications = true;
        state.notificationError = false;
        state.notification = initialState.notification;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notification = initialState.notification;
        state.notification = action.payload.notification;
        state.notificationError = false;
        state.loadingNotifications = false;
      })
      .addCase(fetchNotifications.rejected, state => {
        state.notificationError = true;
        state.loadingNotifications = false;
        state.notification = initialState.notification;
      });
  },
});

export default GetNotificationSlice.reducer;
