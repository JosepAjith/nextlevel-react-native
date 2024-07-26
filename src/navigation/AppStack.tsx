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
import MapScreen from '../screens/map/MapScreen';
import DeleteAccount from '../screens/settings/DeleteAccount';
import { CommonActions, useNavigation } from '@react-navigation/native';
import UserPicker from '../screens/addtrip/UserPicker';
import UserTrips from '../screens/user/UserTrips';
import { AppState, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../constants/AppStrings';
import SupportUserTrips from '../screens/user/SupportUserTrips';
import UpgradeLevel from '../screens/upgrade/UpgradeLevel';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleDeepLink = async ({ url }) => {
      try {
        console.log('Received deep link:', url);
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        
        await AsyncStorage.setItem(AppStrings.DEEP_LINK_ID, String(id))
        .then(()=>{
            Navigate();
        })
        // Clear the navigation stack and show the splash screen
      
      } catch (error) {
        console.error('Error handling deep link:', error);
      }
    };

    const Navigate = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: RouteNames.SplashScreen }],
        })
      );
    };



    const handleUrlEvent = (event) => {
      if (event.url) {
        handleDeepLink({ url: event.url });
      }
    };

    Linking.addEventListener('url', handleUrlEvent);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        Linking.addEventListener('url', handleUrlEvent);

        Linking.getInitialURL().then((url) => {
          if (url) {
            console.log('linking')
            handleDeepLink({ url });
          }
        });
      }
      setAppState(nextAppState);
    });

    return () => {
      appStateListener.remove();
    };
  }, [appState, navigation]);

  const removeDeepLink = async () => {
    try {
      await AsyncStorage.removeItem(AppStrings.DEEP_LINK_ID);
    } catch (error) {
      console.error('Error removing deep link ID:', error);
    }
  };

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
      <Stack.Screen
        name={RouteNames.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={RouteNames.BroadcastScreen}
        component={BroadcastScreen}
      />
      <Stack.Screen name={RouteNames.MapScreen} component={MapScreen} />
      <Stack.Screen name={RouteNames.DeleteAccount} component={DeleteAccount} />
      <Stack.Screen name={RouteNames.UserPicker} component={UserPicker} />
      <Stack.Screen name={RouteNames.UserTrips} component={UserTrips} />
      <Stack.Screen name={RouteNames.SupportUserTrips} component={SupportUserTrips} />
      <Stack.Screen name={RouteNames.UpgradeLevel} component={UpgradeLevel} />
    </Stack.Navigator>
  );
};

export default AppStack;
