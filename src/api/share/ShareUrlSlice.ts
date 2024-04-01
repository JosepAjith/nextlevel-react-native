import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type ShareUrlResponse = {
  status: any;
  message: string;
};

export type ShareUrlState = {
  shareUrlData: ShareUrlResponse | null;
  loadingUrlShare: boolean;
  urlShareError: boolean;
};

const initialState: ShareUrlState = {
  shareUrlData: null,
  loadingUrlShare: false,
  urlShareError: false,
};

export const urlShare = createAsyncThunk<
  { shareUrlData: ShareUrlResponse | null },
  { requestBody: any }
>('urlShare', async ({ requestBody }) => {
  if (requestBody != null) {
    const response = await apiInterface.urlShare(requestBody); 
    if (response.kind == 'success') {
      return {
        shareUrlData: response.body ?? null,
      };
    } else {
      throw 'Error while sharing URL'; 
    }
  } else {
    return {
      shareUrlData: initialState.shareUrlData,
    };
  }
});

const ShareUrlSlice = createSlice({
  name: 'ShareUrl',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(urlShare.pending, state => {
        state.shareUrlData = initialState.shareUrlData;
        state.loadingUrlShare = true;
        state.urlShareError = false;
      })
      .addCase(urlShare.fulfilled, (state, action) => {
        state.shareUrlData = action.payload.shareUrlData;
        state.urlShareError = false;
        state.loadingUrlShare = false;
      })
      .addCase(urlShare.rejected, state => {
        state.urlShareError = true;
        state.loadingUrlShare = false;
        state.shareUrlData = initialState.shareUrlData;
      });
  },
});

export const { reset } = ShareUrlSlice.actions;
export default ShareUrlSlice.reducer;
