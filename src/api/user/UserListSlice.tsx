import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { UserListData, UserListResponse } from './UserListResponse';

export type UserListState = {
  users: UserListResponse | null;
  loadingUsers: boolean;
  usersError: boolean;
};

const initialState: UserListState = {
    users: null,
    loadingUsers: false,
    usersError: false,
};

export const fetchUserList = createAsyncThunk<
  {users: UserListResponse | null},
  {requestBody: any}
>('fetchUserList', async ({requestBody}) => {
  const response = await apiInterface.fetchUserList(requestBody);
  

  if (response.kind == 'success') {
    return {
        users: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const UserListSlice = createSlice({
  name: 'UserList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserList.pending, state => {
        state.loadingUsers = true;
        state.usersError = false;
        state.users = initialState.users;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.users = initialState.users;
        state.users = action.payload.users;
        state.usersError = false;
        state.loadingUsers = false;
      })
      .addCase(fetchUserList.rejected, state => {
        state.usersError = true;
        state.loadingUsers = false;
        state.users = initialState.users;
      });
  },
});

export default UserListSlice.reducer;
