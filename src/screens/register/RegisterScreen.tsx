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
import {ScrollView, ToastAndroid, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {createRegister, reset} from '../../api/register/RegisterCreateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {RegisterRequest} from '../../api/register/RegisterRequest';
import {showToast} from '../../constants/commonUtils';
import {RegisterValidation} from '../../api/register/RegistorValidation';

const {TextField} = Incubator;

export type RegisterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'RegisterScreen'
>;

export type RegisterScreenRouteProps = RouteProp<
  RootStackParams,
  'RegisterScreen'
>;

interface Props {}

const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation<RegisterScreenNavigationProps>();
  const [agree, setAgree] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {RegisterData, loadingRegister, RegisterError} = useSelector(
    (state: RootState) => state.registerCreate,
  );
  const [registerInput, setRegister] = useState<RegisterRequest>(
    new RegisterRequest(),
  );
  const [registerValidate, setValidate] = useState<RegisterValidation>(
    new RegisterValidation(),
  );
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
    if (registerInput.nickname == '') {
      setValidate({
        ...registerValidate,
        InvalidNickname: true,
        error: '*Required',
      });
      return false;
    }
    if (registerInput.name == '') {
      setValidate({...registerValidate, InvalidName: true, error: '*Required'});
      return false;
    }
    if (registerInput.email == '') {
      setValidate({
        ...registerValidate,
        InvalidEmail: true,
        error: '*Required',
      });
      return false;
    }

    if (
      registerInput.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerInput.email)
    ) {
      showToast('Invalid email address. Please enter a valid email.');
      return false;
    }
    if (registerInput.phone == '') {
      setValidate({
        ...registerValidate,
        InvalidPhone: true,
        error: '*Required',
      });
      return false;
    }
    if (registerInput.phone && !/^\d{10}$/.test(registerInput.phone)) {
      showToast('Invalid mobile number. Please enter a 10-digit number.');
      return false;
    }
    if (registerInput.password == '') {
      setValidate({
        ...registerValidate,
        InvalidPassword: true,
        error: '*Required',
      });
      return false;
    }
    if (registerInput.password_confirmation == '') {
      setValidate({
        ...registerValidate,
        InvalidConfirmation: true,
        error: '*Required',
      });
      return false;
    }
    if (registerInput.password != registerInput.password_confirmation) {
      showToast('Password Mismatch');
    }
    if (!agree) {
      showToast('Agree to your policy to register');
      return false;
    }

    return true;
  }

  const Register = async () => {
    dispatch(createRegister({requestBody: registerInput}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (RegisterData != null) {
      if (!loadingRegister && !RegisterError && RegisterData.status) {
       showToast(RegisterData.message)
        AsyncStorage.setItem(
          AppStrings.ACCESS_TOKEN,
          RegisterData.token == null ? '' : RegisterData.token,
        );
        navigation.replace(RouteNames.VerificationScreen);
      } else {
        showToast(RegisterData.message)
      }
    }
  }, [RegisterData]);

  return (
    <ScrollView>
      <View flex backgroundColor={AppColors.Black} padding-20>
        <Header title={'Sign up'} />

        <TextField
          fieldStyle={styles.field}
          label={'Nick Name'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginT-40
          onChangeText={(text: any) => {
            setRegister({...registerInput, nickname: text, type: 'user'});
            setValidate({...registerValidate, InvalidNickname: false});
          }}
          trailingAccessory={
            <Text red10>
              {registerValidate.InvalidNickname ? '*Required' : ''}
            </Text>
          }
        />
        <Text style={styles.change} marginT-10>
          * Changing nickname will be done only by admin.
        </Text>

        <TextField
          fieldStyle={styles.field}
          label={'Full Name'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginV-25
          onChangeText={(text: any) => {
            setRegister({...registerInput, name: text});
            setValidate({...registerValidate, InvalidName: false});
          }}
          trailingAccessory={
            <Text red10>{registerValidate.InvalidName ? '*Required' : ''}</Text>
          }
        />

        <TextField
          fieldStyle={styles.field}
          label={'E-mail'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          onChangeText={(text: any) => {
            setRegister({...registerInput, email: text});
            setValidate({...registerValidate, InvalidEmail: false});
          }}
          trailingAccessory={
            <Text red10>
              {registerValidate.InvalidEmail ? '*Required' : ''}
            </Text>
          }
        />

        <TextField
          fieldStyle={styles.field}
          label={'Contact Number'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginV-25
          onChangeText={(text: any) => {
            setRegister({...registerInput, phone: text});
            setValidate({...registerValidate, InvalidPhone: false});
          }}
          trailingAccessory={
            <Text red10>
              {registerValidate.InvalidPhone ? '*Required' : ''}
            </Text>
          }
        />

        <TextField
          fieldStyle={styles.field}
          label={'Password'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-25
          secureTextEntry={!registerValidate.showPassword}
          trailingAccessory={
            <View row center>
              <Text marginR-10 red10>
                {registerValidate.InvalidPassword ? '*Required' : ''}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setValidate({
                    ...registerValidate,
                    showPassword: !registerValidate.showPassword,
                  })
                }>
                {registerValidate.showPassword ? (
                  <Image source={AppImages.EYECLOSE} width={23} height={15} />
                ) : (
                  <Image source={AppImages.EYE} />
                )}
              </TouchableOpacity>
            </View>
          }
          onChangeText={(text: any) => {
            setRegister({...registerInput, password: text});
            setValidate({...registerValidate, InvalidPassword: false});
          }}
        />

        <TextField
          fieldStyle={styles.field}
          label={'Re-enter password'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          secureTextEntry={!registerValidate.showConfirmPass}
          trailingAccessory={
            <View row center>
              <Text marginR-10 red10>
                {registerValidate.InvalidConfirmation ? '*Required' : ''}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setValidate({
                    ...registerValidate,
                    showConfirmPass: !registerValidate.showConfirmPass,
                  })
                }>
                {registerValidate.showConfirmPass ? (
                  <Image source={AppImages.EYECLOSE} width={23} height={15} />
                ) : (
                  <Image source={AppImages.EYE} />
                )}
              </TouchableOpacity>
            </View>
          }
          onChangeText={(text: any) => {
            setRegister({...registerInput, password_confirmation: text});
            setValidate({...registerValidate, InvalidConfirmation: false});
          }}
        />
        <View row centerV marginV-30>
          <Checkbox
            value={agree}
            label={
              <Text style={[styles.forgot, {color: 'white', lineHeight: 20}]}>
                I agree to Dynamic Layers{' '}
                <Text style={styles.lineText}>Notification Policy</Text> and
                acknowledge the{' '}
                <Text style={styles.lineText}>Privacy Policy</Text>.
              </Text>
            }
            color={AppColors.Orange}
            style={{borderColor: 'white'}}
            onValueChange={value => setAgree(value)}
          />
        </View>

        <ButtonView
          title="Sign up"
          onPress={() => {
            if (isValidate()) {
              Register();
            }
          }}
        />

        <View marginT-20 center>
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.LoginScreen)}>
            <Text style={styles.title}>
              Already have an account ?{' '}
              <Text color={AppColors.Orange}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default RegisterScreen;
