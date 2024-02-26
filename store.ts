import {combineReducers, configureStore} from '@reduxjs/toolkit';
import TripReducer from './src/screens/mytrip/TripReducer';


const rootReducer = combineReducers({
  TripReducer: TripReducer
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
