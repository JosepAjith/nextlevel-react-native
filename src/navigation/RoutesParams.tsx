
export type RootStackParams = {
  SplashScreen: undefined;
  OnboardScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ChangePasswordScreen: undefined;
  ResetPasswordScreen: undefined;
  VerificationScreen: {email: string, from: string};
  SuccessScreen: {from:string};
  BottomTabs: undefined;
  HomeScreen: undefined;
  MyTripScreen: undefined;
  AddTripScreen: {id: any};
  ProfileScreen: undefined;
  TripDetails: {id:any, isDeepLink: any};
  SettingsScreen: undefined;
  AboutScreen: undefined;
  EditProfile: undefined;
  AddCar: {id: any};
  MarshalList: undefined;
  UserList: undefined;
  TripMembers: {id: any,userId: any, status: any};
JoinTrip: {id: any, status:any, type:any};
NotificationScreen: undefined;
BroadcastScreen: {id: any,userId: any};
MapScreen: {setPlaceLocation?: any, type: any, lat: any, long: any};
DeleteAccount: undefined;
UserPicker:{level: any,onSelectUsers: any, selectUsers: any}
};
