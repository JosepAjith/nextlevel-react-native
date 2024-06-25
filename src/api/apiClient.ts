import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../constants/AppStrings';
import {Alert} from 'react-native';
import {showToast} from '../constants/commonUtils';
import NetInfo from '@react-native-community/netinfo';

// let BASE_URL = 'https://next-level.prompttechdemohosting.com/api/';
let BASE_URL = 'https://nxtlevel4x4.com/api/';
// let BASE_URL = 'https://nxt-level-live.prompttechdemohosting.com/api/';

export const apiClient = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  if (isConnected) {
    try {
      const response = await axios(BASE_URL + endPoint, {
        method: method,
        data: requestBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
        }
      });
      return response;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        showToast('Request timed out');
      } else if (error.response) {
        // Update UI accordingly
        showToast(error.response.data.message);
        console.log(error.response.data);
      } else if (error.request) {
        showToast(error.request);
      } else {
        showToast(`Error message: ${error.message}`);
      }
      throw error; // Rethrow the error to propagate it to the calling code
    }
  } else {
    showToast('Need Internet connection');
  }
};

export const SimpleApiClient = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  if (isConnected) {
  try {
    const response = await axios(BASE_URL + endPoint, {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      showToast('Request timed out');
    } else if (error.response) {
      // Update UI accordingly
      showToast(error.response.data.message);
      console.log(error.response.data);
    } else if (error.request) {
      showToast(error.request);
    } else {
      showToast(`Error message: ${error.message}`);
    }
    throw error;
  }
} else {
  showToast('Need Internet connection');
}
};

export const ApiFormData = async (
  endPoint: string,
  method: string,
  requestBody: any,
) => {
  const isConnected = await NetInfo.fetch().then(state => state.isConnected);
  if (isConnected) {
  try {
    const response = await axios(BASE_URL + endPoint, {
      method: method,
      data: requestBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
      }
    });
    return response;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      showToast('Request timed out');
    } else if (error.response) {
      // Update UI accordingly
      showToast(error.response.data.message);
      console.log(error.response.data);
    } else if (error.request) {
      showToast(error.request);
    } else {
      showToast(`Error message: ${error.message}`);
    }
    throw error; // Rethrow the error to propagate it to the calling code
  }
} else {
  showToast('Need Internet connection');
}
};

export const getWithAuthCall = async (endPoint: string) => {
  const response = await axios.get(BASE_URL + endPoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + (await AsyncStorage.getItem(AppStrings.ACCESS_TOKEN)),
    }
  });
  return response;
};
