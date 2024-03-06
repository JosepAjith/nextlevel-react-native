import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { UserListData } from './UserListResponse';

export type UserListState = {
  users: UserListData[];
  loadingUsers: boolean;
  usersError: boolean;
};

const initialState: UserListState = {
    users: [],
    loadingUsers: false,
    usersError: false,
};

export const fetchUserList = createAsyncThunk<
  {users: UserListData[]},
  {requestBody: any}
>('fetchUserList', async ({requestBody}) => {
  const response = await apiInterface.fetchUserList(requestBody);
  

  if (response.kind == 'success') {
    return {
        users: response.body ?? [],
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
        state.users = [];
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.users = [];
        state.users = state.users.concat(action.payload.users);
        state.usersError = false;
        state.loadingUsers = false;
      })
      .addCase(fetchUserList.rejected, state => {
        state.usersError = true;
        state.loadingUsers = false;
        state.users = [];
      });
  },
});

export default UserListSlice.reducer;
