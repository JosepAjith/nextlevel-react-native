import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type TripJoinResponse = {
  status: any;
  message: any;
}

export type TripJoinState = {
  joinData: TripJoinResponse | null;
  loadingJoin: boolean;
  joinError: boolean;
};

const initialState: TripJoinState = {
    joinData: null,
    loadingJoin: false,
    joinError: false,
};

export const joinTrip = createAsyncThunk<
  {joinData: TripJoinResponse | null},
  {requestBody: any, uri: any}
>('joinTrip', async ({requestBody, uri}) => {
  if (requestBody != null) {
    const response = await apiInterface.joinTrip(requestBody, uri);
    
    if (response.kind == 'success') {
      return {
        joinData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        joinData: initialState.joinData,
    };
  }
});

const TripJoinSlice = createSlice({
  name: 'TripJoin',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(joinTrip.pending, state => {
        state.joinData = initialState.joinData;
        state.loadingJoin = true;
        state.joinError = false;
      })
      .addCase(joinTrip.fulfilled, (state, action) => {
        state.joinData = action.payload.joinData;
        state.loadingJoin = false;
        state.joinError = false;
      })
      .addCase(joinTrip.rejected, state => {
        state.joinError = true;
        state.loadingJoin = false;
        state.joinData = initialState.joinData;
      });
  },
});

export const {reset} = TripJoinSlice.actions;
export default TripJoinSlice.reducer;
