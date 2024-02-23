import React, {useState} from 'react';
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
      />

      <ButtonView title="Get OTP" onPress={() => {navigation.navigate(RouteNames.VerificationScreen)}} />
    </View>
  );
};
export default ForgotPasswordScreen;
