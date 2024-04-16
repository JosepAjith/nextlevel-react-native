import { DeleteResponse } from './accountDelete/AccountDeleteSlice';
import {
  ApiFormData,
  SimpleApiClient,
  apiClient,
} from './apiClient';
import { CarResponse } from './car/CarCreateSlice';
import { SendOtpResponse } from './forgotPassword/SendOtpSlice';
import { VerifyOtpResponse } from './forgotPassword/VerifyOtpSlice';
import { TripCancelResponse } from './joinTrip/TripCancelSlice';
import { TripJoinResponse } from './joinTrip/TripJoinSlice';
import { UpdateRoleResponse } from './levelUpdate/UpdateRoleSlice';
import { LoginResponse } from './login/LoginCreateSlice';
import { MarkAttendanceResponse } from './markAttendance/MarkAttendanceSlice';
import { MemberListData } from './member/MemberListResponse';
import { MemberStatusResponse } from './member/MemberStatusSlice';
import { DeleteNotifResponse } from './notification/DeleteNotificationSlice';
import { NotificationData, NotificationResponse } from './notification/NotificationResponse';
import { SendNotifResponse } from './notification/SendNotificationSlice';
import { ChangePasswordResponse } from './password/ChangePasswordSlice';
import { EditProfileResponse } from './profile/EditProfileSlice';
import { ProfileDetails } from './profile/ProfileDetailsSlice';
import { RegisterResponse } from './register/RegisterCreateSlice';
import { AddTripResponse } from './trip/TripCreateSlice';
import { TripDeleteResponse } from './trip/TripDeleteSlice';
import { TripDetailsResponse, TripListResponse } from './trip/TripListResponse';
import { TripStatusChangeResponse } from './trip/TripStatusChangeSlice';
import { UserListData, UserListResponse } from './user/UserListResponse';

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

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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
  requestBody: any,uri: any
): Promise<NetworkResponse<TripDetailsResponse>> => {
  const response = await apiClient(uri, 'POST', requestBody);

  if (response && response.status) {
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

//API FOR TRIP DETAILS
export const fetchTripDetails = async (
  requestBody: any,
): Promise<NetworkResponse<TripDetailsResponse>> => {
  const response = await apiClient('trip/show', 'POST', requestBody);

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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

  if (response && response.status) {
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

//API FOR CREATING Trip
export const createTrip = async (
  requestBody: any, uri: any
): Promise<NetworkResponse<AddTripResponse>> => {
  const response = await ApiFormData(uri, 'POST', requestBody);
  if (response && response.status) {
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

//API FOR JOINING TRIP
export const joinTrip = async (
  requestBody: any, uri: any
): Promise<NetworkResponse<TripJoinResponse>> => {
  const response = await apiClient(uri, 'POST', requestBody);

  if (response && response.status) {
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

//API FOR CANCELING TRIP
export const cancelTrip = async (
  requestBody: any
): Promise<NetworkResponse<TripCancelResponse>> => {
  const response = await apiClient('booking/sign-out-trip', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR USER AnD MARSHALS LIST
export const fetchUserList = async (
  requestBody: any
): Promise<NetworkResponse<UserListResponse>> => {
  const response = await apiClient('level-user-wise', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR USER AnD MARSHALS LIST
export const fetchMemberList = async (
  requestBody: any
): Promise<NetworkResponse<MemberListData[]>> => {
  const response = await apiClient('trip/trip-users', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR UPDATING ROLE
export const updateRole = async (
  requestBody: any
): Promise<NetworkResponse<UpdateRoleResponse>> => {
  const response = await apiClient('update-role', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR DELETING CREATED TRIP
export const deleteTrip = async (
  requestBody: any
): Promise<NetworkResponse<TripDeleteResponse>> => {
  const response = await apiClient('trip/delete', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR CHANGING STATUSOF CREATED TRIP
export const changeTripStatus = async (
  requestBody: any
): Promise<NetworkResponse<TripStatusChangeResponse>> => {
  const response = await apiClient('trip/change-trip-status', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR MARKING ATTTENDANCE
export const markAttendance = async (
  requestBody: any, uri: any
): Promise<NetworkResponse<MarkAttendanceResponse>> => {
  const response = await apiClient(uri, 'POST', requestBody);

  if (response && response.status) {
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

//API FOR SENDING NOTIFICATION
export const sendNotif = async (
  requestBody: any
): Promise<NetworkResponse<SendNotifResponse>> => {
  const response = await apiClient('notification/send-notification', 'POST', requestBody);

  if (response && response.status) {
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
export const fetchNotifications = async (
  requestBody: any,uri: any
): Promise<NetworkResponse<NotificationResponse>> => {
  const response = await apiClient(uri, 'POST', requestBody);

  if (response && response.status) {
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

//API FOR DELETING NOTIFICATION
export const deleteNotif = async (
  requestBody: any,
): Promise<NetworkResponse<DeleteNotifResponse>> => {
  const response = await apiClient('notification/notification-delete', 'POST', requestBody);

  if (response && response.status) {
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

//API FOR KickOff and ONBOARD
export const MemberStatusChange = async (
  requestBody: any, uri: any
): Promise<NetworkResponse<MemberStatusResponse>> => {
  const response = await apiClient(uri, 'POST', requestBody);

  if (response && response.status) {
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

//API FOR sharing url
export const urlShare = async (
  requestBody: any
): Promise<NetworkResponse<MemberStatusResponse>> => {
  const response = await apiClient('save-random-token', 'POST', requestBody);

  if (response && response.status) {
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


