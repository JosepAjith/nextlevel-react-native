import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type AddTripResponse = {
  status: any;
  message: string;
}

export type TripCreateState = {
  addTripData: AddTripResponse | null;
  loadingAddTrip: boolean;
  addTripError: boolean;
};

const initialState: TripCreateState = {
  addTripData: null,
  loadingAddTrip: false,
  addTripError: false,
};

export const createTrip = createAsyncThunk<
  {addTripData: AddTripResponse | null},
  {requestBody: any, uri: any}
>('createTrip', async ({requestBody, uri}) => {
  if (requestBody != null) {
    const response = await apiInterface.createTrip(requestBody, uri);
    if (response.kind == 'success') {
      return {
        addTripData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
      addTripData: initialState.addTripData,
    };
  }
});

const TripCreateSlice = createSlice({
  name: 'TripCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createTrip.pending, state => {
        state.addTripData = initialState.addTripData;
        state.loadingAddTrip = true;
        state.addTripError = false;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.addTripData = action.payload.addTripData;
        state.addTripError = false;
        state.loadingAddTrip = false;
      })
      .addCase(createTrip.rejected, state => {
        state.addTripError = true;
        state.loadingAddTrip = false;
        state.addTripData = initialState.addTripData;
      });
  },
});

export const {reset} = TripCreateSlice.actions;
export default TripCreateSlice.reducer;
