import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { RoleUpgradeResponse } from './RoleUpgradeResponse';

export type RoleUpgradeState = {
  upgrades: RoleUpgradeResponse | null;
  loadingUpgrades: boolean;
  upgradesError: boolean;
};

const initialState: RoleUpgradeState = {
  upgrades: null,
  loadingUpgrades: false,
  upgradesError: false,
};

export const fetchRoleUpgradeList = createAsyncThunk<
  { upgrades: RoleUpgradeResponse | null },
  { requestBody: any }
>('fetchRoleUpgradeList', async ({ requestBody }) => {
  const response = await apiInterface.fetchRoleUpgradeList(requestBody);

  if (response.kind == 'success') {
    return {
      upgrades: response.body ?? null,
    };
  } else {
    throw 'Error fetching role upgrades';
  }
});

const RoleUpgradeSlice = createSlice({
  name: 'RoleUpgrade',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRoleUpgradeList.pending, state => {
        state.loadingUpgrades = true;
        state.upgradesError = false;
        state.upgrades = initialState.upgrades;
      })
      .addCase(fetchRoleUpgradeList.fulfilled, (state, action) => {
        state.upgrades = action.payload.upgrades;
        state.upgradesError = false;
        state.loadingUpgrades = false;
      })
      .addCase(fetchRoleUpgradeList.rejected, state => {
        state.upgradesError = true;
        state.loadingUpgrades = false;
        state.upgrades = initialState.upgrades;
      });
  },
});

export default RoleUpgradeSlice.reducer;
