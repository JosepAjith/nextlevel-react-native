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
import CarDeleteSlice from './src/api/car/CarDeleteSlice';
import AccountDeleteSlice from './src/api/accountDelete/AccountDeleteSlice';
import EditProfileSlice from './src/api/profile/EditProfileSlice';
import TripCreateSlice from './src/api/trip/TripCreateSlice';
import TripJoinSlice from './src/api/joinTrip/TripJoinSlice';
import TripCancelSlice from './src/api/joinTrip/TripCancelSlice';
import UserListSlice from './src/api/user/UserListSlice';
import MemberListSlice from './src/api/member/MemberListSlice';
import UpdateRoleSlice from './src/api/levelUpdate/UpdateRoleSlice';
import TripDeleteSlice from './src/api/trip/TripDeleteSlice';
import TripStatusChangeSlice from './src/api/trip/TripStatusChangeSlice';
import MarkAttendanceSlice from './src/api/markAttendance/MarkAttendanceSlice';
import SendNotificationSlice from './src/api/notification/SendNotificationSlice';
import GetNotificationSlice from './src/api/notification/GetNotificationSlice';
import DeleteNotificationSlice from './src/api/notification/DeleteNotificationSlice';
import MemberStatusSlice from './src/api/member/MemberStatusSlice';
import ShareUrlSlice from './src/api/share/ShareUrlSlice';
import LogoutSlice from './src/api/login/LogoutSlice';
import SupportTripListSlice from './src/api/trip/SupportTripListSlice';


const rootReducer = combineReducers({
  TripReducer: TripReducer,
  registerCreate: RegisterCreateSlice,
  GlobalVariables: GlobalVariables,
  loginCreate: LoginCreateSlice,
  logout: LogoutSlice,
  SendOtp: SendOtpSlice,
  VerifyOtp: VerifyOtpSlice,
  ChangePassword: ChangePasswordSlice,
  TripList: TriplListSlice,
  SupportTripList: SupportTripListSlice,
  TripDetails: TripDetailsSlice,
  ProfileDetails: ProfileDetailsSlice,
  CarCreate: CarCreateSlice,
  CarDelete: CarDeleteSlice,
  AccountDelete: AccountDeleteSlice,
  EditProfile: EditProfileSlice,
  TripCreate: TripCreateSlice,
  TripJoin: TripJoinSlice,
  TripCancel: TripCancelSlice,
  UserList: UserListSlice,
  MemberList: MemberListSlice,
  UpdateRole: UpdateRoleSlice,
  TripDelete: TripDeleteSlice,
  TripStatusChange: TripStatusChangeSlice,
  MarkAttendance: MarkAttendanceSlice,
  SendNotification: SendNotificationSlice,
  GetNotification: GetNotificationSlice,
  DeleteNotification: DeleteNotificationSlice,
  MemberStatus: MemberStatusSlice,
  ShareUrl: ShareUrlSlice
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
