import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type travelResponse = {
  status: any;
  data:   Data;
}

export type Data = {
  message: string;
  data:[]
}

export type TravelCreateState = {
  TravelData: travelResponse | null;
  loadingTravel: boolean;
  TravelError: boolean;
};

const initialState: TravelCreateState = {
    TravelData: null,
    loadingTravel: false,
    TravelError: false,
};

export const createTravel = createAsyncThunk<
  {TravelData: travelResponse | null},
  {requestBody: any}
>('createTravel', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createTravel(requestBody);
    
    if (response.kind == 'success') {
      return {
        TravelData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
      TravelData: initialState.TravelData,
    };
  }
});

const TravelCreateSlice = createSlice({
  name: 'TravelCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createTravel.pending, state => {
        state.TravelData = initialState.TravelData;
        state.loadingTravel = true;
        state.TravelError = false;
      })
      .addCase(createTravel.fulfilled, (state, action) => {
        state.TravelData = action.payload.TravelData;
        state.TravelError = false;
        state.loadingTravel = false;
      })
      .addCase(createTravel.rejected, state => {
        state.TravelError = true;
        state.loadingTravel = false;
        state.TravelData = initialState.TravelData;
      });
  },
});

export const {reset} = TravelCreateSlice.actions;
export default TravelCreateSlice.reducer;
