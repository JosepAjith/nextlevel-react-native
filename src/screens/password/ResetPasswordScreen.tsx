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
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components/Header';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {PasswordRequest} from '../../api/password/PasswordRequest';
import {PasswordValidation} from '../../api/password/PasswordValidation';
import {showToast} from '../../constants/commonUtils';
import {changePassword, reset} from '../../api/password/ChangePasswordSlice';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type ResetPasswordScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ResetPasswordScreen'
>;

export type ResetPasswordScreenRouteProps = RouteProp<
  RootStackParams,
  'ResetPasswordScreen'
>;

interface Props {}

const ResetPasswordScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [currentPass, setCurrent] = useState('');
  const {changePasswordData, loadingChangePassword, changePasswordError} =
    useSelector((state: RootState) => state.ChangePassword);
  const [passwordInput, setPassword] = useState<PasswordRequest>(
    new PasswordRequest(),
  );
  const [passwordValidate, setValidate] = useState<PasswordValidation>(
    new PasswordValidation(),
  );
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
    if (currentPass == '') {
      setValidate({
        ...passwordValidate,
        InvalidCurrent: true,
        error: '*Required',
      });
      return false;
    }
    if (passwordInput.password == '') {
      setValidate({
        ...passwordValidate,
        InvalidPassword: true,
        error: '*Required',
      });
      return false;
    }
    if (passwordInput.password_confirmation == '') {
      setValidate({
        ...passwordValidate,
        InvalidConfirmation: true,
        error: '*Required',
      });
      return false;
    }
    if (passwordInput.password != passwordInput.password_confirmation) {
      showToast('Password Mismatch');
    }
    return true;
  }

  const Reset = async () => {
    dispatch(changePassword({requestBody: passwordInput}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (changePasswordData != null) {
      if (
        !loadingChangePassword &&
        !changePasswordError &&
        changePasswordData.status
      ) {
        showToast(changePasswordData.message);
        navigation.replace(RouteNames.SuccessScreen, {from: 'reset'});
      } else {
        showToast(changePasswordData.message);
      }
    }
  }, [changePasswordData]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}} // Make sure it takes full height of the screen
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Adjust behavior for iOS
    >
      <View flex backgroundColor={AppColors.Black} padding-20>
        <Header title="Reset Password" />

        {loadingChangePassword && <BackgroundLoader />}

        <ScrollView>
          <View>
            <TextField
              fieldStyle={styles.field}
              label={'Current Password'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginT-40
              secureTextEntry={!passwordValidate.showCurrent}
              trailingAccessory={
                <View row center>
                  <Text marginR-10 red10>
                    {passwordValidate.InvalidCurrent ? '*Required' : ''}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setValidate({
                        ...passwordValidate,
                        showConfirmPass: !passwordValidate.showCurrent,
                      })
                    }>
                    {passwordValidate.showCurrent ? (
                      <Image
                        source={AppImages.EYECLOSE}
                        width={23}
                        height={15}
                      />
                    ) : (
                      <Image source={AppImages.EYE} />
                    )}
                  </TouchableOpacity>
                </View>
              }
              onChangeText={(text: any) => {
                setCurrent(text);
                setValidate({...passwordValidate, InvalidCurrent: false});
              }}
            />

            <TextField
              fieldStyle={styles.field}
              label={'New Password'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginT-25
              secureTextEntry={!passwordValidate.showPassword}
              trailingAccessory={
                <View row center>
                  <Text marginR-10 red10>
                    {passwordValidate.InvalidPassword ? '*Required' : ''}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setValidate({
                        ...passwordValidate,
                        showPassword: !passwordValidate.showPassword,
                      })
                    }>
                    {passwordValidate.showPassword ? (
                      <Image
                        source={AppImages.EYECLOSE}
                        width={23}
                        height={15}
                      />
                    ) : (
                      <Image source={AppImages.EYE} />
                    )}
                  </TouchableOpacity>
                </View>
              }
              onChangeText={(text: any) => {
                setPassword({...passwordInput, password: text});
                setValidate({...passwordValidate, InvalidPassword: false});
              }}
            />

            <View marginT-10>
              <Text style={styles.text1}>
                Create a new password. Ensure it differs from previous ones for
                security
              </Text>
            </View>

            <TextField
              fieldStyle={styles.field}
              label={'Re-enter Password'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginT-25
              marginB-40
              secureTextEntry={!passwordValidate.showConfirmPass}
              trailingAccessory={
                <View row center>
                  <Text marginR-10 red10>
                    {passwordValidate.InvalidConfirmation ? '*Required' : ''}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setValidate({
                        ...passwordValidate,
                        showConfirmPass: !passwordValidate.showConfirmPass,
                      })
                    }>
                    {passwordValidate.showConfirmPass ? (
                      <Image
                        source={AppImages.EYECLOSE}
                        width={23}
                        height={15}
                      />
                    ) : (
                      <Image source={AppImages.EYE} />
                    )}
                  </TouchableOpacity>
                </View>
              }
              onChangeText={(text: any) => {
                setPassword({...passwordInput, password_confirmation: text});
                setValidate({...passwordValidate, InvalidConfirmation: false});
              }}
            />

            <ButtonView
              title="Reset Password"
              onPress={() => {
                if (isValidate()) {
                  Reset();
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
export default ResetPasswordScreen;
