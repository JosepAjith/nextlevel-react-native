import React, {useEffect, useState} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import OTPTextView from 'react-native-otp-textinput';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {otpVerify, verifyReset} from '../../api/forgotPassword/VerifyOtpSlice';
import {showToast} from '../../constants/commonUtils';
import {reset, sendOtp} from '../../api/forgotPassword/SendOtpSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';

const {TextField} = Incubator;

export type VerificationScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'VerificationScreen'
>;

export type VerificationScreenRouteProps = RouteProp<
  RootStackParams,
  'VerificationScreen'
>;

interface Props {}

const VerificationScreen: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<VerificationScreenNavigationProps>();
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {verifyOtpData, loadingVerifyOtp, verifyOtpError} = useSelector(
    (state: RootState) => state.VerifyOtp,
  );
  const {sendOtpData, loadingSendOtp, sendOtpError} = useSelector(
    (state: RootState) => state.SendOtp,
  );
  const email = route.params.email;
  const from = route.params.from;
  const [otp, setOtp] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 10; // Reset timer to 5 minutes when it reaches 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleResend = async () => {
    let request = JSON.stringify({
      email: email,
    });
    dispatch(sendOtp({requestBody: request, url: 'resend-otp'}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (sendOtpData != null) {
      if (!loadingSendOtp && !sendOtpError && sendOtpData.status) {
        if (!isTimerRunning) {
          setIsTimerRunning(true);
        }
        showToast(sendOtpData.message);
      } else {
        showToast(sendOtpData.message);
      }
    }
  }, [sendOtpData]);

  const Verify = async () => {
    let request = JSON.stringify({
      email: email,
      otp: otp,
    });
    dispatch(otpVerify({requestBody: request}))
      .then(() => {
        dispatch(verifyReset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (verifyOtpData != null) {
      if (!loadingVerifyOtp && !verifyOtpError && verifyOtpData.status) {
        showToast(verifyOtpData.message);
        AsyncStorage.setItem(
          AppStrings.ACCESS_TOKEN,
          verifyOtpData.token == null ? '' : verifyOtpData.token,
        );
        if (from == 'login') {
          navigation.replace(RouteNames.BottomTabs);
        } else if (from == 'register') {
          navigation.replace(RouteNames.LoginScreen);
        } else if (from == 'forgot') {
          navigation.replace(RouteNames.ChangePasswordScreen);
        }
      } else {
        showToast(verifyOtpData.message);
      }
    }
  }, [verifyOtpData]);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title={'Verify Your Account'} />

      <View marginT-40 marginB-20>
        <Text style={styles.heading}>Enter OTP</Text>
      </View>

      <View marginB-20>
        <Text style={styles.text}>
          Otp is send to your registered email "{email}". Please Verify
        </Text>
      </View>

      <OTPTextView
        handleTextChange={e => {
          setOtp(e);
        }}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        inputCount={6}
        tintColor={'white'}
      />
      <ButtonView title="Verify OTP" onPress={Verify} />

      <View row marginT-10>
        <View flex>
          <Text style={styles.text}>Request code again</Text>
        </View>

        <View flex right>
          {!isTimerRunning ? (
            <TouchableOpacity
              onPress={() => {
                handleResend();
              }}>
              <Text style={[styles.text, {opacity: 1}]}>Send again</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>
              {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(
                timer % 60,
              ).padStart(2, '0')}`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
export default VerificationScreen;
