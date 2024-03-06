import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type TripCancelResponse = {
  status: any;
  message: any;
}

export type TripCancelState = {
  cancelData: TripCancelResponse | null;
  loadingCancel: boolean;
  cancelError: boolean;
};

const initialState: TripCancelState = {
    cancelData: null,
    loadingCancel: false,
    cancelError: false,
};

export const cancelTrip = createAsyncThunk<
  {cancelData: TripCancelResponse | null},
  {requestBody: any}
>('cancelTrip', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.cancelTrip(requestBody);
    
    if (response.kind == 'success') {
      return {
        cancelData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        cancelData: initialState.cancelData,
    };
  }
});

const TripCancelSlice = createSlice({
  name: 'TripCancel',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(cancelTrip.pending, state => {
        state.cancelData = initialState.cancelData;
        state.loadingCancel = true;
        state.cancelError = false;
      })
      .addCase(cancelTrip.fulfilled, (state, action) => {
        state.cancelData = action.payload.cancelData;
        state.loadingCancel = false;
        state.cancelError = false;
      })
      .addCase(cancelTrip.rejected, state => {
        state.cancelError = true;
        state.loadingCancel = false;
        state.cancelData = initialState.cancelData;
      });
  },
});

export const {reset} = TripCancelSlice.actions;
export default TripCancelSlice.reducer;
