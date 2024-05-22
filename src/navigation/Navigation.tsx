import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../constants/AppStrings';
const Navigation = () => {
  const dispatch = useDispatch();
  const linking = {
    prefixes: ['https://nxtlevel4x4.com'], // Add your desired prefixes here
  };

  useEffect(() => {
    // Add deep linking handling here
    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });
  }, []);

  const handleDeepLink = async ({ url }) => {
    // Parse the URL and extract information if needed
    console.log('Received deep link:', url);
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    
    await AsyncStorage.setItem(AppStrings.DEEP_LINK_ID, String(id))
  }
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // state.isConnected is a boolean that indicates if the device is connected to the internet
      //  console.log(state);
      dispatch({
        type: 'SET_NET_CONNECTION',
        payload: state.isConnected,
      });
    });
    // Cleanup the event listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <NavigationContainer linking={linking}>
      <AppStack />
    </NavigationContainer>
  );
};

export default Navigation;
