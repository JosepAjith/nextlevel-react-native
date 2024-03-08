import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type MarkAttendanceResponse = {
  status: any;
  message: any;
}

export type MarkAttendanceState = {
  attendanceData: MarkAttendanceResponse | null;
  loadingAttendance: boolean;
  attendanceError: boolean;
};

const initialState: MarkAttendanceState = {
  attendanceData: null,
  loadingAttendance: false,
  attendanceError: false,
};

export const markAttendance = createAsyncThunk<
  { attendanceData: MarkAttendanceResponse | null },
  { requestBody: any, uri: any }
>('markAttendance', async ({ requestBody, uri }) => {
  if (requestBody != null) {
    const response = await apiInterface.markAttendance(requestBody, uri);

    if (response.kind == 'success') {
      return {
        attendanceData: response.body ?? null,
      };
    } else {
      throw 'Error while marking attendance';
    }
  } else {
    return {
      attendanceData: initialState.attendanceData,
    };
  }
});

const MarkAttendanceSlice = createSlice({
  name: 'MarkAttendance',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(markAttendance.pending, state => {
        state.attendanceData = initialState.attendanceData;
        state.loadingAttendance = true;
        state.attendanceError = false;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.attendanceData = action.payload.attendanceData;
        state.loadingAttendance = false;
        state.attendanceError = false;
      })
      .addCase(markAttendance.rejected, state => {
        state.attendanceError = true;
        state.loadingAttendance = false;
        state.attendanceData = initialState.attendanceData;
      });
  },
});

export const { reset } = MarkAttendanceSlice.actions;
export default MarkAttendanceSlice.reducer;
