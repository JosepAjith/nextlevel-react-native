import moment from 'moment';
import {Alert, Linking, Platform, ToastAndroid} from 'react-native';

export const makeCall = (phoneNumber: string) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export const showToast = (message: any) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      1,
      50,
    );
  } else {
    Alert.alert(message);
  }
  
};


//Database Date Format - 2023-04-27
export const getCurrentDateDb = (currentDate: moment.MomentInput) => {
  return moment(currentDate).format('YYYY-MM-DD');
};

//User Date Format - 27-04-2023
export const getUserDate = (currentDate: moment.MomentInput) => {
  return moment(currentDate).format('DD-MM-YYYY');
};

export const getDateTime = (currentDate: moment.MomentInput) => {
  return moment(currentDate).format('DD-MM-YYYY h:mm A');
};

export const getUserTime = (currentDate: moment.MomentInput) => {
  return moment(currentDate).format('h:mm A');
};

export const roundValueAsNumber = (value: number): number => {
  const multiplier: number = Math.pow(10, 2);
  return Math.round(value * multiplier) / multiplier;
};

export const formattedTime = (value: moment.MomentInput) => { 
  return moment(value, 'HH:mm:ss').format('hh:mm A');
}

export const formatTime = (value: moment.MomentInput) => { 
  return moment(value, 'HH:mm:ss').format('h:mm A');
}

export const getDayTime = (currentDate: moment.MomentInput) => {
  return moment(currentDate).format('ddd h:mm A');
};

export const roundValueAsString = (value: number): string => {
  const multiplier: number = Math.pow(10, 2);
  const roundedNumber: number = Math.round(value * multiplier) / multiplier;
  return roundedNumber.toFixed(2);
};
