import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type UpdateLevelResponse = {
  status: any;
  message: string;
}

export type UpdateLevelState = {
  updateLevelData: UpdateLevelResponse | null;
  loadingLevelUpdate: boolean;
  LevelUpdateError: boolean;
};

const initialState: UpdateLevelState = {
    updateLevelData: null,
    loadingLevelUpdate: false,
    LevelUpdateError: false,
};

export const updateLevel = createAsyncThunk<
  {updateLevelData: UpdateLevelResponse | null},
  {requestBody: any}
>('updateLevel', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.updateLevel(requestBody);
    
    if (response.kind == 'success') {
      return {
        updateLevelData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        updateLevelData: initialState.updateLevelData,
    };
  }
});

const UpdateLevelSlice = createSlice({
  name: 'UpdateLevel',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(updateLevel.pending, state => {
        state.updateLevelData = initialState.updateLevelData;
        state.loadingLevelUpdate = true;
        state.LevelUpdateError = false;
      })
      .addCase(updateLevel.fulfilled, (state, action) => {
        state.updateLevelData = action.payload.updateLevelData;
        state.LevelUpdateError = false;
        state.loadingLevelUpdate = false;
      })
      .addCase(updateLevel.rejected, state => {
        state.LevelUpdateError = true;
        state.loadingLevelUpdate = false;
        state.updateLevelData = initialState.updateLevelData;
      });
  },
});

export const {reset} = UpdateLevelSlice.actions;
export default UpdateLevelSlice.reducer;
