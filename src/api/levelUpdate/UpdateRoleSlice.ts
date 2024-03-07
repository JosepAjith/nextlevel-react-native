import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type UpdateRoleResponse = {
  status: any;
  message: string;
}

export type UpdateRoleState = {
  updateRoleData: UpdateRoleResponse | null;
  loadingRoleUpdate: boolean;
  roleUpdateError: boolean;
};

const initialState: UpdateRoleState = {
    updateRoleData: null,
    loadingRoleUpdate: false,
    roleUpdateError: false,
};

export const updateRole = createAsyncThunk<
  {updateRoleData: UpdateRoleResponse | null},
  {requestBody: any}
>('updateRole', async ({requestBody}) => {
  if (requestBody != null) {
    const response = await apiInterface.updateRole(requestBody);
    
    if (response.kind == 'success') {
      return {
        updateRoleData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
  } else {
    return {
        updateRoleData: initialState.updateRoleData,
    };
  }
});

const UpdateRoleSlice = createSlice({
  name: 'UpdateRole',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(updateRole.pending, state => {
        state.updateRoleData = initialState.updateRoleData;
        state.loadingRoleUpdate = true;
        state.roleUpdateError = false;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.updateRoleData = action.payload.updateRoleData;
        state.roleUpdateError = false;
        state.loadingRoleUpdate = false;
      })
      .addCase(updateRole.rejected, state => {
        state.roleUpdateError = true;
        state.loadingRoleUpdate = false;
        state.updateRoleData = initialState.updateRoleData;
      });
  },
});

export const {reset} = UpdateRoleSlice.actions;
export default UpdateRoleSlice.reducer;
