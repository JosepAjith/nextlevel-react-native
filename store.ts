import {combineReducers, configureStore} from '@reduxjs/toolkit';
import TripReducer from './src/screens/mytrip/TripReducer';
import RegisterCreateSlice from './src/api/register/RegisterCreateSlice';
import GlobalVariables from './src/constants/GlobalVariables';
import LoginCreateSlice from './src/api/login/LoginCreateSlice';


const rootReducer = combineReducers({
  TripReducer: TripReducer,
  registerCreate: RegisterCreateSlice,
  GlobalVariables: GlobalVariables,
  loginCreate: LoginCreateSlice
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
