import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type RegisterResponse = {
    status: any;
    token:   string;
    message: string;
    error: any;
}

export type RegisterCreateState = {
  RegisterData: RegisterResponse | null;
  loadingRegister: boolean;
  RegisterError: boolean;
};

const initialState: RegisterCreateState = {
    RegisterData: null,
    loadingRegister: false,
    RegisterError: false,
};

export const createRegister = createAsyncThunk<
  {RegisterData: RegisterResponse | null},
  {requestBody: any}
>('createRegister', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createRegister(requestBody);
    if (response.kind == 'success') {
      return {
        RegisterData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        RegisterData: initialState.RegisterData,
    };
  }
});

const RegisterCreateSlice = createSlice({
  name: 'registerCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createRegister.pending, state => {
        state.RegisterData = initialState.RegisterData;
        state.loadingRegister = true;
        state.RegisterError = false;
      })
      .addCase(createRegister.fulfilled, (state, action) => {
        state.RegisterData = action.payload.RegisterData;
        state.RegisterError = false;
        state.loadingRegister = false;
      })
      .addCase(createRegister.rejected, state => {
        state.RegisterError = true;
        state.loadingRegister = false;
        state.RegisterData = initialState.RegisterData;
      });
  },
});

export const {reset} = RegisterCreateSlice.actions;
export default RegisterCreateSlice.reducer;
