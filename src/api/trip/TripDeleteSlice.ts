import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type TripDeleteResponse = {
    status: any;
    message: string;
}

export type TripDeleteState = {
    TripDeleteData: TripDeleteResponse | null;
  loadingTripDelete: boolean;
  TripDeleteError: boolean;
};

const initialState: TripDeleteState = {
    TripDeleteData: null,
    loadingTripDelete: false,
    TripDeleteError: false,
};

export const deleteTrip = createAsyncThunk<
  {TripDeleteData: TripDeleteResponse | null},
  {requestBody: any}
>('deleteTrip', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.deleteTrip(requestBody);
    if (response.kind == 'success') {
      return {
        TripDeleteData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        TripDeleteData: initialState.TripDeleteData,
    };
  }
});

const TripDeleteSlice = createSlice({
  name: 'TripDelete',
  initialState: initialState,
  reducers: {
    deleteReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(deleteTrip.pending, state => {
        state.TripDeleteData = initialState.TripDeleteData;
        state.loadingTripDelete = true;
        state.TripDeleteError = false;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.TripDeleteData = action.payload.TripDeleteData;
        state.TripDeleteError = false;
        state.loadingTripDelete = false;
      })
      .addCase(deleteTrip.rejected, state => {
        state.TripDeleteError = true;
        state.loadingTripDelete = false;
        state.TripDeleteData = initialState.TripDeleteData;
      });
  },
});

export const {deleteReset} = TripDeleteSlice.actions;
export default TripDeleteSlice.reducer;
