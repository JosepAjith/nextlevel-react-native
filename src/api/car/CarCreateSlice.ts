import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type CarResponse = {
    status: any;
    message: string;
}

export type CarCreateState = {
  CarData: CarResponse | null;
  loadingCar: boolean;
  CarError: boolean;
};

const initialState: CarCreateState = {
    CarData: null,
    loadingCar: false,
    CarError: false,
};

export const createCar = createAsyncThunk<
  {CarData: CarResponse | null},
  {requestBody: any}
>('createCar', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createCar(requestBody);
    if (response.kind == 'success') {
      return {
        CarData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        CarData: initialState.CarData,
    };
  }
});

const CarCreateSlice = createSlice({
  name: 'CarCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createCar.pending, state => {
        state.CarData = initialState.CarData;
        state.loadingCar = true;
        state.CarError = false;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.CarData = action.payload.CarData;
        state.CarError = false;
        state.loadingCar = false;
      })
      .addCase(createCar.rejected, state => {
        state.CarError = true;
        state.loadingCar = false;
        state.CarData = initialState.CarData;
      });
  },
});

export const {reset} = CarCreateSlice.actions;
export default CarCreateSlice.reducer;
