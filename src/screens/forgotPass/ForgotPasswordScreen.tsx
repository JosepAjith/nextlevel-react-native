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
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../constants/commonUtils';
import {reset, sendOtp} from '../../api/forgotPassword/SendOtpSlice';

const {TextField} = Incubator;

export type ForgotPasswordScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ForgotPasswordScreen'
>;

export type ForgotPasswordScreenRouteProps = RouteProp<
  RootStackParams,
  'ForgotPasswordScreen'
>;

interface Props {}

const ForgotPasswordScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [InvalidEmail, setInvalidEmail] = useState(false);
  const [error, setError] = useState('');

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {sendOtpData, loadingSendOtp, sendOtpError} = useSelector(
    (state: RootState) => state.SendOtp,
  );
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
    if (email == '') {
      setInvalidEmail(true);
      setError('*required');
      return false;
    }

    return true;
  }

  const forgot = async () => {
    let request = JSON.stringify({
      email: email,
    });
    dispatch(sendOtp({requestBody: request}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (sendOtpData != null) {
      if (!loadingSendOtp && !sendOtpError && sendOtpData.status) {
        showToast(sendOtpData.message);
        navigation.replace(RouteNames.VerificationScreen, {
          email: email,
          from: 'forgot',
        });
      } else {
        showToast(sendOtpData.message);
      }
    }
  }, [sendOtpData]);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title={'Forgot Password'} />

      <View marginV-30>
        <Text style={styles.text}>
          Please provide the email address associated with your account, and we
          will send you a one-time password (OTP) to verify your identity.
        </Text>
      </View>

      <TextField
        fieldStyle={styles.field}
        label={'E-mail'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-30
        onChangeText={(text: any) => {
          setEmail(text);
          setInvalidEmail(false);
        }}
        trailingAccessory={<Text red10>{InvalidEmail ? '*Required' : ''}</Text>}
      />

      <ButtonView
        title="Get OTP"
        onPress={() => {
          if (isValidate()) {
            forgot();
          }
        }}
      />
    </View>
  );
};
export default ForgotPasswordScreen;
