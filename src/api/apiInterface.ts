import {
  ApiFormData,
  SimpleApiClient,
  apiClient,
} from './apiClient';
import { SendOtpResponse } from './forgotPassword/SendOtpSlice';
import { VerifyOtpResponse } from './forgotPassword/VerifyOtpSlice';
import { LoginResponse } from './login/LoginCreateSlice';
import { ChangePasswordResponse } from './password/ChangePasswordSlice';
import { RegisterResponse } from './register/RegisterCreateSlice';
import { TripListResponse } from './trip/TripListResponse';

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
  const response = await ApiFormData('update/profile', 'POST', requestBody);

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

// API FOR SENDING OTP
export const sendOtp = async (
  requestBody: any,
): Promise<NetworkResponse<SendOtpResponse | null>> => {
  const response = await apiClient('forgot-password', 'POST', requestBody);

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
//API FOR TRAVEL LIST
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

//API FOR PROFILE DETAILS
export const fetchProfileDetails = async (
  requestBody: any
): Promise<NetworkResponse<ProfileDetails | null>> => {
  const response = await apiClient('get/profile', 'POST', requestBody);

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
