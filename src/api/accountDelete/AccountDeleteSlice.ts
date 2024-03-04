import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type DeleteResponse = {
  status: any;
  message:   any;
}

export type DeleteState = {
  deleteData: DeleteResponse | null;
  loadingDelete: boolean;
  deleteError: boolean;
};

const initialState: DeleteState = {
    deleteData: null,
    loadingDelete: false,
    deleteError: false,
};

export const deleteAccount = createAsyncThunk<
  {deleteData: DeleteResponse | null},
  {requestBody: any}
>('deleteAccount', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.deleteAccount(requestBody);
    
    if (response.kind == 'success') {
      return {
        deleteData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        deleteData: initialState.deleteData,
    };
  }
});

const AccountDeleteSlice = createSlice({
  name: 'AccountDelete',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(deleteAccount.pending, state => {
        state.deleteData = initialState.deleteData;
        state.loadingDelete = true;
        state.deleteError = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.deleteData = action.payload.deleteData;
        state.loadingDelete = false;
        state.deleteError = false;
      })
      .addCase(deleteAccount.rejected, state => {
        state.deleteError = true;
        state.loadingDelete = false;
        state.deleteData = initialState.deleteData;
      });
  },
});

export const {reset} = AccountDeleteSlice.actions;
export default AccountDeleteSlice.reducer;
