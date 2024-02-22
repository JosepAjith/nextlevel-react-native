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

const {TextField} = Incubator;

export type ResetPasswordScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ResetPasswordScreen'
>;

export type ResetPasswordScreenRouteProps = RouteProp<RootStackParams, 'ResetPasswordScreen'>;

interface Props {}

const ResetPasswordScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProps>();

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
    </View>
  );
};
export default ResetPasswordScreen;
