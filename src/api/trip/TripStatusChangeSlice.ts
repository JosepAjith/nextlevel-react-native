import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type TripStatusChangeResponse = {
    status: any;
    message: string;
}

export type TripStatusChangeState = {
    TripStatusChangeData: TripStatusChangeResponse | null;
  loadingChangedStatus: boolean;
  changedStatusError: boolean;
};

const initialState: TripStatusChangeState = {
    TripStatusChangeData: null,
    loadingChangedStatus: false,
    changedStatusError: false,
};

export const changeTripStatus = createAsyncThunk<
  {TripStatusChangeData: TripStatusChangeResponse | null},
  {requestBody: any}
>('changeTripStatus', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.changeTripStatus(requestBody);
    if (response.kind == 'success') {
      return {
        TripStatusChangeData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        TripStatusChangeData: initialState.TripStatusChangeData,
    };
  }
});

const TripStatusChangeSlice = createSlice({
  name: 'TripStatusChange',
  initialState: initialState,
  reducers: {
    changeReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(changeTripStatus.pending, state => {
        state.TripStatusChangeData = initialState.TripStatusChangeData;
        state.loadingChangedStatus = true;
        state.changedStatusError = false;
      })
      .addCase(changeTripStatus.fulfilled, (state, action) => {
        state.TripStatusChangeData = action.payload.TripStatusChangeData;
        state.changedStatusError = false;
        state.loadingChangedStatus = false;
      })
      .addCase(changeTripStatus.rejected, state => {
        state.changedStatusError = true;
        state.loadingChangedStatus = false;
        state.TripStatusChangeData = initialState.TripStatusChangeData;
      });
  },
});

export const {changeReset} = TripStatusChangeSlice.actions;
export default TripStatusChangeSlice.reducer;
