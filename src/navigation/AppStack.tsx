import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from './Routes';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import ChangePasswordScreen from '../screens/password/ChangePasswordScreen';
import ResetPasswordScreen from '../screens/password/ResetPasswordScreen';
import VerificationScreen from '../screens/verification/VerificationScreen';
import ForgotPasswordScreen from '../screens/forgotPass/ForgotPasswordScreen';
import SuccessScreen from '../screens/successPage/SuccessScreen';
import BottomTabs from '../screens/Dashboard/BottomTabs';
import TripDetails from '../screens/details/TripDetails';
import SettingsScreen from '../screens/settings/SettingsScreen';
import AboutScreen from '../screens/about/AboutScreen';
import EditProfile from '../screens/edit/EditProfile';
import AddCar from '../screens/car/AddCar';
import MarshalList from '../screens/marshal/MarshalList';
import UserList from '../screens/user/UserList';
import TripMembers from '../screens/members/TripMembers';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import JoinTrip from '../screens/join/JoinTrip';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AddTripScreen from '../screens/addtrip/AddTripScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import BroadcastScreen from '../screens/broadcast/BroadcastScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationDuration: 1000,
      }}>
        <Stack.Screen name={RouteNames.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={RouteNames.OnboardScreen} component={OnboardScreen} />
      <Stack.Screen name={RouteNames.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={RouteNames.RegisterScreen}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={RouteNames.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={RouteNames.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={RouteNames.ResetPasswordScreen}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={RouteNames.VerificationScreen}
        component={VerificationScreen}
      />
      <Stack.Screen name={RouteNames.SuccessScreen} component={SuccessScreen} />
      <Stack.Screen name={RouteNames.BottomTabs} component={BottomTabs} />
      <Stack.Screen name={RouteNames.TripDetails} component={TripDetails} />
      <Stack.Screen
        name={RouteNames.SettingsScreen}
        component={SettingsScreen}
      />
      <Stack.Screen name={RouteNames.AboutScreen} component={AboutScreen} />
      <Stack.Screen name={RouteNames.EditProfile} component={EditProfile} />
      <Stack.Screen name={RouteNames.AddCar} component={AddCar} />
      <Stack.Screen name={RouteNames.MarshalList} component={MarshalList} />
      <Stack.Screen name={RouteNames.UserList} component={UserList} />
      <Stack.Screen name={RouteNames.TripMembers} component={TripMembers} />
      <Stack.Screen name={RouteNames.JoinTrip} component={JoinTrip} />
      <Stack.Screen name={RouteNames.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={RouteNames.AddTripScreen} component={AddTripScreen} />
      <Stack.Screen name={RouteNames.NotificationScreen} component={NotificationScreen} />
      <Stack.Screen name={RouteNames.BroadcastScreen} component={BroadcastScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
