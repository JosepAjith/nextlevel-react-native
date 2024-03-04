import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type CarDeleteResponse = {
    status: any;
    message: string;
}

export type CarDeleteState = {
  CarDeleteData: CarDeleteResponse | null;
  loadingCarDelete: boolean;
  CarDeleteError: boolean;
};

const initialState: CarDeleteState = {
    CarDeleteData: null,
    loadingCarDelete: false,
    CarDeleteError: false,
};

export const deleteCar = createAsyncThunk<
  {CarDeleteData: CarDeleteResponse | null},
  {requestBody: any}
>('deleteCar', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.deleteCar(requestBody);
    if (response.kind == 'success') {
      return {
        CarDeleteData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        CarDeleteData: initialState.CarDeleteData,
    };
  }
});

const CarDeleteSlice = createSlice({
  name: 'CarDelete',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(deleteCar.pending, state => {
        state.CarDeleteData = initialState.CarDeleteData;
        state.loadingCarDelete = true;
        state.CarDeleteError = false;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.CarDeleteData = action.payload.CarDeleteData;
        state.CarDeleteError = false;
        state.loadingCarDelete = false;
      })
      .addCase(deleteCar.rejected, state => {
        state.CarDeleteError = true;
        state.loadingCarDelete = false;
        state.CarDeleteData = initialState.CarDeleteData;
      });
  },
});

export const {reset} = CarDeleteSlice.actions;
export default CarDeleteSlice.reducer;
