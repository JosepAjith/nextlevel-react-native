import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
const Navigation = () => {
  const dispatch = useDispatch();
  const linking = {
    prefixes: ['https://nxtlevel4x4.com', 'nxtlevel4x4://'], // Add your desired prefixes here
  };

  
  
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
