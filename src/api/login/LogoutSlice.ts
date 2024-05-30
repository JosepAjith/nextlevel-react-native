import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type LogoutResponse = {
    status: any;
  message: string;
}


export type LogoutState = {
  OutData: LogoutResponse | null;
  loadingOut: boolean;
  OutError: boolean;
};

const initialState: LogoutState = {
    OutData: null,
    loadingOut: false,
    OutError: false,
};

export const createLogout = createAsyncThunk<
  {OutData: LogoutResponse | null},
  {requestBody: any}
>('createLogout', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createLogout(requestBody);
    
    if (response.kind == 'success') {
      return {
        OutData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        OutData: initialState.OutData,
    };
  }
});

const LogoutSlice = createSlice({
  name: 'logout',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createLogout.pending, state => {
        state.OutData = initialState.OutData;
        state.loadingOut = true;
        state.OutError = false;
      })
      .addCase(createLogout.fulfilled, (state, action) => {
        state.OutData = action.payload.OutData;
        state.OutError = false;
        state.loadingOut = false;
      })
      .addCase(createLogout.rejected, state => {
        state.OutError = true;
        state.loadingOut = false;
        state.OutData = initialState.OutData;
      });
  },
});

export const {reset} = LogoutSlice.actions;
export default LogoutSlice.reducer;
