import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { MemberListData } from './MemberListResponse';

export type MemberListState = {
  members: MemberListData | null;
  loadingMembers: boolean;
  membersError: boolean;
};

const initialState: MemberListState = {
    members: null,
    loadingMembers: false,
    membersError: false,
};

export const fetchMemberList = createAsyncThunk<
  {members: MemberListData | null},
  {requestBody: any}
>('fetchMemberList', async ({requestBody}) => {
  const response = await apiInterface.fetchMemberList(requestBody);
  

  if (response.kind == 'success') {
    return {
        members: response.body ?? null,
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
        state.members = initialState.members;
      })
      .addCase(fetchMemberList.fulfilled, (state, action) => {
        state.members = initialState.members;
        state.members = action.payload.members;
        state.membersError = false;
        state.loadingMembers = false;
      })
      .addCase(fetchMemberList.rejected, state => {
        state.membersError = true;
        state.loadingMembers = false;
        state.members = initialState.members;
      });
  },
});

export default MemberListSlice.reducer;
