import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RouteNames } from './Routes';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import ChangePasswordScreen from '../screens/password/ChangePasswordScreen';
import ResetPasswordScreen from '../screens/password/ResetPasswordScreen';
import VerificationScreen from '../screens/verification/VerificationScreen';
import ForgotPasswordScreen from '../screens/forgotPass/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'slide_from_right',
        animationDuration: 1000,
      }}>
      <Stack.Screen name={RouteNames.OnboardScreen} component={OnboardScreen} />
      <Stack.Screen name={RouteNames.LoginScreen} component={LoginScreen}/>
      <Stack.Screen name={RouteNames.RegisterScreen} component={RegisterScreen}/>
      <Stack.Screen name={RouteNames.ForgotPasswordScreen} component={ForgotPasswordScreen} />
      <Stack.Screen name={RouteNames.ChangePasswordScreen} component={ChangePasswordScreen} />
      <Stack.Screen name={RouteNames.ResetPasswordScreen} component={ResetPasswordScreen}/>
      <Stack.Screen name={RouteNames.VerificationScreen} component={VerificationScreen}/>
    </Stack.Navigator>
  );
};


export default AppStack;
