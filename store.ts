import {combineReducers, configureStore} from '@reduxjs/toolkit';
import TripReducer from './src/screens/mytrip/TripReducer';
import RegisterCreateSlice from './src/api/register/RegisterCreateSlice';
import GlobalVariables from './src/constants/GlobalVariables';
import LoginCreateSlice from './src/api/login/LoginCreateSlice';
import SendOtpSlice from './src/api/forgotPassword/SendOtpSlice';
import VerifyOtpSlice from './src/api/forgotPassword/VerifyOtpSlice';
import ChangePasswordSlice from './src/api/password/ChangePasswordSlice';
import TriplListSlice from './src/api/trip/TriplListSlice';
import TripDetailsSlice from './src/api/trip/TripDetailsSlice';
import ProfileDetailsSlice from './src/api/profile/ProfileDetailsSlice';
import CarCreateSlice from './src/api/car/CarCreateSlice';


const rootReducer = combineReducers({
  TripReducer: TripReducer,
  registerCreate: RegisterCreateSlice,
  GlobalVariables: GlobalVariables,
  loginCreate: LoginCreateSlice,
  SendOtp: SendOtpSlice,
  VerifyOtp: VerifyOtpSlice,
  ChangePassword: ChangePasswordSlice,
  TripList: TriplListSlice,
  TripDetails: TripDetailsSlice,
  ProfileDetails: ProfileDetailsSlice,
  CarCreate: CarCreateSlice
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
