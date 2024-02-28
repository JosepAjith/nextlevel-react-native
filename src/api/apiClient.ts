import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../constants/AppStrings';
import { Alert } from 'react-native';

let BASE_URL = 'https://next-level.prompttechdemohosting.com/api/';

export const apiClient = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  try{
  const response = await axios(
    BASE_URL + endPoint,
    {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
      },
    },
  );
  return response;
} catch (error) {
  // Handle errors here
  Alert.alert('API request failed:', error.message);
  throw error; // Rethrow the error to propagate it to the calling code
}
};


export const SimpleApiClient = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  try {
    const response = await axios(BASE_URL + endPoint, {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error)
    // Handle errors here
    Alert.alert('API request failed:', error.message);
    throw error; // Rethrow the error to propagate it to the calling code
  }
};

export const ApiFormData = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  try {
  const response = await axios(
    BASE_URL + endPoint,
    {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
      },
    },
  );
  return response;
} catch (error) {
  // Handle errors here
  Alert.alert('API request failed:', error.message);
  throw error; // Rethrow the error to propagate it to the calling code
}
};

export const getWithAuthCall = async (
  endPoint: string
) => {
  const response = await axios.get(
    BASE_URL + endPoint,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
      },
    },
  );
  return response;
};
