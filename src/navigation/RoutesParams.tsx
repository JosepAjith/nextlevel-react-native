
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
  AddTripScreen: undefined;
  ProfileScreen: undefined;
  TripDetails: {id:any};
  SettingsScreen: undefined;
  AboutScreen: undefined;
  EditProfile: undefined;
  AddCar: {id: any};
  MarshalList: undefined;
  UserList: undefined;
  TripMembers: undefined;
JoinTrip: {id: any, status:any, type:any};
};
