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
import AppFonts from '../../constants/AppFonts';

const {TextField} = Incubator;

export type MyTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyTripScreen'
>;

export type MyTripScreenRouteProps = RouteProp<
  RootStackParams,
  'MyTripScreen'
>;

interface Props {}

const MyTripScreen: React.FC<Props> = () => {
  const navigation = useNavigation<MyTripScreenNavigationProps>();

  return (
    <View flex backgroundColor={AppColors.Orange} padding-20>

    </View>
  );
};
export default MyTripScreen;