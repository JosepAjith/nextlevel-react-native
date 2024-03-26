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
import {KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {LoginRequest} from '../../api/login/LoginRequest';
import {LoginValidation} from '../../api/login/LoginValidation';
import {createLogin, reset} from '../../api/login/LoginCreateSlice';
import {showToast} from '../../constants/commonUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import Loader from '../../components/Loader';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'LoginScreen'
>;

export type LoginScreenRouteProps = RouteProp<RootStackParams, 'LoginScreen'>;

interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const [remember, setRemember] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {LoginData, loadingLogin, LoginError} = useSelector(
    (state: RootState) => state.loginCreate,
  );
  const [loginInput, setLogin] = useState<LoginRequest>(new LoginRequest());
  const [loginValidate, setValidate] = useState<LoginValidation>(
    new LoginValidation(),
  );
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  useEffect(() => {
    const setFCMToken = async () => {
      let token;
      token = await AsyncStorage.getItem(AppStrings.FCM_TOKEN);
      if (token != null) {
        setLogin({
          ...loginInput,
          fcmToken: token,
        });
      }
    };

    setFCMToken();
  }, []);

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
    if (loginInput.email == '') {
      setValidate({
        ...loginValidate,
        InvalidEmail: true,
        error: '*Required',
      });
      return false;
    }
    if (loginInput.password == '') {
      setValidate({
        ...loginValidate,
        InvalidPassword: true,
        error: '*Required',
      });
      return false;
    }

    return true;
  }

  const Login = async () => {
    dispatch(createLogin({requestBody: loginInput}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (LoginData != null) {
      if (!loadingLogin && !LoginError && LoginData.status) {
        showToast(LoginData.message);
        AsyncStorage.setItem(
          AppStrings.ACCESS_TOKEN,
          LoginData.token == null ? '' : LoginData.token,
        );
        AsyncStorage.setItem(AppStrings.IS_LOGIN, 'true');
        AsyncStorage.setItem(AppStrings.TYPE, LoginData.user.level);
        AsyncStorage.setItem(
          AppStrings.LOGIN_USER_ID,
          String(LoginData.user.id),
        );
        navigation.replace(RouteNames.BottomTabs);
      } else {
        if (LoginData.verified == 0) {
          navigation.navigate(RouteNames.VerificationScreen, {
            email: loginInput.email,
            from: 'login',
          });
        }
        showToast(LoginData.message);
      }
    }
  }, [LoginData]);

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }} // Make sure it takes full height of the screen
    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Adjust behavior for iOS
  >
    <ScrollView style={{backgroundColor:AppColors.Black}}>
    <View flex backgroundColor={AppColors.Black} padding-20>
      <View center marginT-20 marginB-40>
        <Text style={styles.title}>Sign in</Text>
      </View>

      {loadingLogin && <BackgroundLoader />}

      <TextField
        fieldStyle={styles.field}
        label={'E-mail'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        onChangeText={(text: any) => {
          setLogin({...loginInput, email: text});
          setValidate({...loginValidate, InvalidEmail: false});
        }}
        trailingAccessory={
          <Text red10>{loginValidate.InvalidEmail ? '*Required' : ''}</Text>
        }
      />

      <TextField
        fieldStyle={styles.field}
        label={'Password'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginT-25
        secureTextEntry={!loginValidate.showPassword}
        trailingAccessory={
          <View row center>
            <Text marginR-10 red10>
              {loginValidate.InvalidPassword ? '*Required' : ''}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setValidate({
                  ...loginValidate,
                  showPassword: !loginValidate.showPassword,
                })
              }>
              {loginValidate.showPassword ? (
                <Image source={AppImages.EYECLOSE} width={23} height={15} />
              ) : (
                <Image source={AppImages.EYE} />
              )}
            </TouchableOpacity>
          </View>
        }
        onChangeText={(text: any) => {
          setLogin({...loginInput, password: text});
          setValidate({...loginValidate, InvalidPassword: false});
        }}
      />
      
      <View row centerV marginV-30>
        {/* <Checkbox
          value={remember}
          label="Remember me"
          color={AppColors.Orange}
          labelStyle={[styles.forgot, {color: 'white'}]}
          style={{borderColor: 'white'}}
          onValueChange={value => setRemember(value)}
        /> */}
        <View flex right>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(RouteNames.ForgotPasswordScreen)
            }>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ButtonView
        title="Sign in"
        onPress={() => {
          if (isValidate()) {
            Login();
          }
        }}
      />

      <View marginT-20 center>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.RegisterScreen)}>
          <Text style={styles.title}>
            Don't have an account ?{' '}
            <Text color={AppColors.Orange}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
