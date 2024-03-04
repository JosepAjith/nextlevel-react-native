import { DeleteResponse } from './accountDelete/AccountDeleteSlice';
import {
  ApiFormData,
  SimpleApiClient,
  apiClient,
} from './apiClient';
import { CarResponse } from './car/CarCreateSlice';
import { SendOtpResponse } from './forgotPassword/SendOtpSlice';
import { VerifyOtpResponse } from './forgotPassword/VerifyOtpSlice';
import { LoginResponse } from './login/LoginCreateSlice';
import { ChangePasswordResponse } from './password/ChangePasswordSlice';
import { ProfileDetails } from './profile/ProfileDetailsSlice';
import { RegisterResponse } from './register/RegisterCreateSlice';
import { TripDetailsResponse, TripListResponse } from './trip/TripListResponse';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

//API FOR REGISTER
export const createRegister = async (
  requestBody: any,
): Promise<NetworkResponse<RegisterResponse>> => {
  const response = await SimpleApiClient('register', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR LOGIN
export const createLogin = async (
  requestBody: any,
): Promise<NetworkResponse<LoginResponse>> => {
  const response = await SimpleApiClient('login', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

// API FOR CHANGING PASSWORD
export const changePassword = async (
  requestBody: any,
): Promise<NetworkResponse<ChangePasswordResponse | null>> => {
  const response = await apiClient('forgot-password-change', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

// API FOR EDITING PROFILE
export const editProfile = async (
  requestBody: any,
): Promise<NetworkResponse<EditProfileResponse | null>> => {
  const response = await ApiFormData('update-profile', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    }
  }
};

// API FOR SENDING OTP
export const sendOtp = async (
  requestBody: any, url: any
): Promise<NetworkResponse<SendOtpResponse | null>> => {
  const response = await apiClient(url, 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

// API FOR VERIFYING OTP
export const otpVerify = async (
  requestBody: any,
): Promise<NetworkResponse<VerifyOtpResponse | null>> => {
  const response = await apiClient('verify-otp', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
//API FOR TRIP LIST
export const fetchTripList = async (
  requestBody: any,
): Promise<NetworkResponse<TripListResponse[]>> => {
  const response = await apiClient('trip/list', 'POST', requestBody);

  if (response.status) {
    const json = await response.data.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR TRIP DETAILS
export const fetchTripDetails = async (
  requestBody: any,
): Promise<NetworkResponse<TripDetailsResponse>> => {
  const response = await apiClient('trip/show', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR PROFILE DETAILS
export const fetchProfileDetails = async (
  requestBody: any
): Promise<NetworkResponse<ProfileDetails | null>> => {
  const response = await apiClient('user-profile', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR CREATING CAR
export const createCar = async (
  requestBody: any, uri: any
): Promise<NetworkResponse<CarResponse>> => {
  const response = await ApiFormData(uri, 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR DELETING CAR
export const deleteCar = async (
  requestBody: any,
): Promise<NetworkResponse<CarResponse>> => {
  const response = await apiClient('car/delete', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

//API FOR DELETING ACCOUNT
export const deleteAccount = async (
  requestBody: any,
): Promise<NetworkResponse<DeleteResponse>> => {
  const response = await apiClient('account-delete', 'POST', requestBody);

  if (response.status) {
    const json = await response.data;
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
