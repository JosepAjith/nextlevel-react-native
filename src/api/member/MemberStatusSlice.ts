import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type MemberStatusResponse = {
  status: any;
  message: any;
}

export type MemberStatusState = {
  statusData: MemberStatusResponse | null;
  loadingStatus: boolean;
  statusError: boolean;
};

const initialState: MemberStatusState = {
    statusData: null,
    loadingStatus: false,
    statusError: false,
};

export const MemberStatusChange = createAsyncThunk<
  {statusData: MemberStatusResponse | null},
  {requestBody: any, uri: any}
>('MemberStatusChange', async ({requestBody, uri}) => {
  if (requestBody != null) {
    const response = await apiInterface.MemberStatusChange(requestBody, uri);
    
    if (response.kind == 'success') {
      return {
        statusData: response.body ?? null,
      };
    } else {
      throw 'Error while changing status';
    }
  } else {
    return {
        statusData: initialState.statusData,
    };
  }
});

const MemberStatusSlice = createSlice({
  name: 'MemberStatus',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(MemberStatusChange.pending, state => {
        state.statusData = initialState.statusData;
        state.loadingStatus = true;
        state.statusError = false;
      })
      .addCase(MemberStatusChange.fulfilled, (state, action) => {
        state.statusData = action.payload.statusData;
        state.loadingStatus = false;
        state.statusError = false;
      })
      .addCase(MemberStatusChange.rejected, state => {
        state.statusError = true;
        state.loadingStatus = false;
        state.statusData = initialState.statusData;
      });
  },
});

export const {reset} = MemberStatusSlice.actions;
export default MemberStatusSlice.reducer;
