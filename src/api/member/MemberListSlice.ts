import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { MemberListData } from './MemberListResponse';

export type MemberListState = {
  members: MemberListData[];
  loadingMembers: boolean;
  membersError: boolean;
};

const initialState: MemberListState = {
    members: [],
    loadingMembers: false,
    membersError: false,
};

export const fetchMemberList = createAsyncThunk<
  {members: MemberListData[]},
  {requestBody: any}
>('fetchMemberList', async ({requestBody}) => {
  const response = await apiInterface.fetchMemberList(requestBody);
  

  if (response.kind == 'success') {
    return {
        members: response.body ?? [],
    };
  } else {
    throw 'Error fetching customers';
  }
});

const MemberListSlice = createSlice({
  name: 'MemberList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMemberList.pending, state => {
        state.loadingMembers = true;
        state.membersError = false;
        state.members = [];
      })
      .addCase(fetchMemberList.fulfilled, (state, action) => {
        state.members = [];
        state.members = state.members.concat(action.payload.members);
        state.membersError = false;
        state.loadingMembers = false;
      })
      .addCase(fetchMemberList.rejected, state => {
        state.membersError = true;
        state.loadingMembers = false;
        state.members = [];
      });
  },
});

export default MemberListSlice.reducer;
