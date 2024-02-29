import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type LoginResponse = {
  status: any;
  message: string;
  error: string;
  token: string;
  verified? : any;
}

export type LoginCreateState = {
  LoginData: LoginResponse | null;
  loadingLogin: boolean;
  LoginError: boolean;
};

const initialState: LoginCreateState = {
  LoginData: null,
  loadingLogin: false,
  LoginError: false,
};

export const createLogin = createAsyncThunk<
  {LoginData: LoginResponse | null},
  {requestBody: any}
>('createLogin', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.createLogin(requestBody);
    
    if (response.kind == 'success') {
      return {
        LoginData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
      LoginData: initialState.LoginData,
    };
  }
});

const LoginCreateSlice = createSlice({
  name: 'loginCreate',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createLogin.pending, state => {
        state.LoginData = initialState.LoginData;
        state.loadingLogin = true;
        state.LoginError = false;
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.LoginData = action.payload.LoginData;
        state.LoginError = false;
        state.loadingLogin = false;
      })
      .addCase(createLogin.rejected, state => {
        state.LoginError = true;
        state.loadingLogin = false;
        state.LoginData = initialState.LoginData;
      });
  },
});

export const {reset} = LoginCreateSlice.actions;
export default LoginCreateSlice.reducer;
